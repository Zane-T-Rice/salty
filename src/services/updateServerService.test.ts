import * as child_process from "child_process";
import * as dotenv from "dotenv";
import { createAutocompleteInteraction } from "../testUtils/createAutocompleteInteraction";
import { createInteraction } from "../testUtils";
// import { MessageFlags } from "discord.js";
import { UpdateServerService } from "./updateServerService";
jest.mock("child_process");
jest.mock("node:fs");

const createEditReply = (content: string) => ({
  content,
});

describe("UpdateServerService", () => {
  const servers = [
    {
      id: "0192d295-ac96-73a3-a58c-275aab322238",
      applicationName: "valheim",
      containerName: "valheim_container",
      createdAt: "2024-10-27T09:14:01.900Z",
      updatedAt: "2024-10-27T09:14:01.900Z",
    },
    {
      id: "0192d295-b022-708d-968a-68c794fc5f2e",
      applicationName: "valheim2",
      containerName: "valheim2_container",
      createdAt: "2024-10-27T09:14:51.134Z",
      updatedAt: "2024-10-27T09:14:51.134Z",
    },
  ];
  beforeAll(() => {
    dotenv.config();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const updateServerService = new UpdateServerService();
      expect(updateServerService).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    it("should try to update the server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
        callback(null, { stdout: JSON.stringify(servers[0]) });
      });
      const interaction = createInteraction({ name: servers[0].id });
      const updateServerService = new UpdateServerService();
      await updateServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(1);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        `curl --request POST \
          --url ${process.env.SERVER_MANAGER_SERVICE_URL}/servers/${servers[0].id}/update \
          --header 'Content-Type: application/json' \
          --header 'authorization-key: ${process.env.SERVER_MANAGER_SERVICE_AUTHORIZATION_KEY}' \
          --header 'owner: ${process.env.SERVER_MANAGER_SERVICE_OWNER}' \
          --data '{}'
        `,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(`The server ${servers[0].applicationName}/${servers[0].containerName} has been updated.`)
      );
    });
    it("should handle error when updateing server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });
      const updateServerService = new UpdateServerService();
      const interaction = createInteraction({ name: servers[0].id });
      await updateServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(1);
      expect(interaction.editReply).toHaveBeenCalledWith(createEditReply(`This feature is not available right now.`));
    });
    it("should handle error json when updateing server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
        callback(null, {
          stdout: JSON.stringify({
            name: "NotFoundError",
            message: `The server with id ${servers[0].id} was not found.`,
          }),
        });
      });
      const updateServerService = new UpdateServerService();
      const interaction = createInteraction({ name: servers[0].id });
      await updateServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(1);
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(
          `Make sure you select an option rather than typing in the name directly.\nIf you did that, then the server may not be updateable or maybe it is taking a really long time to update.\nThis feature may not be available right now.`
        )
      );
    });
  });

  describe("handleAutocomplete", () => {
    it("Should suggest possible existing server names", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(servers) });
      });

      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("");
      const updateServerService = new UpdateServerService();
      await updateServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim/valheim_container",
          value: "0192d295-ac96-73a3-a58c-275aab322238",
        },
        {
          name: "valheim2/valheim2_container",
          value: "0192d295-b022-708d-968a-68c794fc5f2e",
        },
      ]);
    });

    it("Should suggest possible existing server names based on current input", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(servers) });
      });

      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("valheim2");
      const updateServerService = new UpdateServerService();
      await updateServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim2/valheim2_container",
          value: "0192d295-b022-708d-968a-68c794fc5f2e",
        },
      ]);
    });

    it("Should use cached servers when available", async () => {
      (child_process.exec as unknown as jest.Mock)
        .mockImplementationOnce((_, callback) => {
          callback(null, { stdout: JSON.stringify(servers) });
        })
        .mockImplementationOnce((_, callback) => {
          callback(null, { stdout: JSON.stringify(servers) });
        })
        .mockImplementationOnce((_, callback) => {
          callback(null, { stdout: JSON.stringify(new Error()) }); // This should not happen in this test.
        });

      // This interaction will populate the serversCache
      let interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("valheim2");
      const updateServerService = new UpdateServerService();
      await updateServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim2/valheim2_container",
          value: "0192d295-b022-708d-968a-68c794fc5f2e",
        },
      ]);

      // This interaction will use the serversCache
      interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("valheim2");
      await updateServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim2/valheim2_container",
          value: "0192d295-b022-708d-968a-68c794fc5f2e",
        },
      ]);

      // Invalidate the serversCache
      updateServerService.serversCache.createdAt = Date.now() - 10_000;

      // This interaction will repopulate the serversCache
      interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("valheim2");
      await updateServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim2/valheim2_container",
          value: "0192d295-b022-708d-968a-68c794fc5f2e",
        },
      ]);

      // Twice the interaction does not use the cache, once the interaction does use the cache.
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(2);
    });

    it("Should handle errors when getting servers", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
        callback(null, {
          stdout: JSON.stringify({
            name: "NotFoundError",
            message: `The server with id ${servers[0].id} was not found.`,
          }),
        });
      });

      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("");
      const updateServerService = new UpdateServerService();
      await updateServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "This feature is not available right now.",
          value: "This feature is not available right now.",
        },
      ]);
    });
  });
});
