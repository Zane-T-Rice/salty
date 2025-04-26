import * as child_process from "child_process";
import * as dotenv from "dotenv";
import { createAutocompleteInteraction } from "../testUtils/createAutocompleteInteraction";
import { createInteraction } from "../testUtils";
import { RestartServerService } from "./restartServerService";
jest.mock("child_process");
jest.mock("node:fs");

const createEditReply = (content: string) => ({
  content,
});

const accessTokenObject = { access_token: "token" };

describe("RestartServerService", () => {
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
  let restartServerService;
  const mockGetServers = jest.fn();

  beforeAll(() => {
    dotenv.config();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    restartServerService = new RestartServerService();
    jest.spyOn(restartServerService, "getServers").mockImplementation(mockGetServers);
    mockGetServers.mockReturnValueOnce(servers);
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const restartServerService = new RestartServerService();
      expect(restartServerService).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    const interactionOptions = { name: `${servers[0].id}` };

    it("should try to restart the server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(accessTokenObject) });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
        callback(null, { stdout: JSON.stringify(servers[0]) });
      });
      const interaction = createInteraction(interactionOptions);
      await restartServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(2);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        2,
        `curl --request POST \
          --url ${process.env.SERVER_MANAGER_SERVICE_URL}/users/servers/${servers[0].id}/restart/ \
          --header 'Content-Type: application/json' \
          --header 'Authorization: Bearer ${accessTokenObject.access_token}' \
          --data '{}'
        `,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(`The server ${servers[0].applicationName}/${servers[0].containerName} has been restarted.`)
      );
    });
    it("should handle error when updating server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(accessTokenObject) });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });
      const interaction = createInteraction(interactionOptions);
      await restartServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(2);
      expect(interaction.editReply).toHaveBeenCalledWith(createEditReply(`This feature is not available right now.`));
    });
    it("should handle auth error when updating server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });
      const interaction = createInteraction(interactionOptions);
      await restartServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(2);
      expect(interaction.editReply).toHaveBeenCalledWith(createEditReply(`This feature is not available right now.`));
    });
    it("should handle error json when updating server", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(accessTokenObject) });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
        callback(null, {
          stdout: JSON.stringify({
            name: "NotFoundError",
            message: `The server with id ${servers[0].id} was not found.`,
          }),
        });
      });
      const interaction = createInteraction(interactionOptions);
      await restartServerService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(2);
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(
          `Make sure you select an option rather than typing in the name directly.\nIf you did that, then the server may not be restartable or maybe it is taking a really long time to restart.\nThis feature may not be available right now.`
        )
      );
    });
  });

  describe("handleAutocomplete", () => {
    it("Should suggest possible existing server names", async () => {
      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("");
      await restartServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim/valheim_container",
          value: `${servers[0].id}`,
        },
        {
          name: "valheim2/valheim2_container",
          value: `${servers[1].id}`,
        },
      ]);
    });

    it("Should suggest possible existing server names based on current input", async () => {
      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("valheim2");
      await restartServerService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "valheim2/valheim2_container",
          value: `${servers[1].id}`,
        },
      ]);
    });

    it("Should handle errors when getting servers", async () => {
      mockGetServers.mockReset().mockRejectedValueOnce({});

      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("");
      await restartServerService.handleAutocomplete(interaction);

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
