import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";
import { PingController, VoteButtonInteractionController, VoteController, YoutubeController } from "./controllers";
import { Router } from "./router";

const pingControllerInstance = new PingController();
const voteController = new VoteController();
const voteButtonInteractionController = new VoteButtonInteractionController();
const youtubeController = new YoutubeController();
const router = new Router(pingControllerInstance, voteController, voteButtonInteractionController, youtubeController);

let isChatInputCommand;
let isAutocomplete;
beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(pingControllerInstance, "handleInteraction").mockResolvedValueOnce();
  jest.spyOn(pingControllerInstance, "handleAutocomplete").mockResolvedValueOnce();
  jest.spyOn(voteButtonInteractionController, "handleInteraction").mockResolvedValueOnce();
  isChatInputCommand = jest.fn().mockReturnValue(true);
  isAutocomplete = jest.fn().mockReturnValue(false);
});

describe("router", () => {
  describe("routeMessage", () => {
    it("should route ping messages", async () => {
      const content = "ping";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
        isAutocomplete,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleInteraction).toHaveBeenCalledWith(
        expect.objectContaining({ commandName: content })
      );
    });

    it("should route autocomplete messages", async () => {
      isChatInputCommand.mockReturnValueOnce(false);
      isAutocomplete.mockReturnValueOnce(true);
      const content = "ping";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
        isAutocomplete,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleAutocomplete).toHaveBeenCalledWith(
        expect.objectContaining({ commandName: content })
      );
    });

    it("should handle route for nonexistent autocomplete messages", async () => {
      isChatInputCommand.mockReturnValueOnce(false);
      isAutocomplete.mockReturnValueOnce(true);
      const content = "ping-pong";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
        isAutocomplete,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleAutocomplete).not.toHaveBeenCalled();
    });

    it("should handle non chat commands", async () => {
      isChatInputCommand.mockReturnValueOnce(false);
      const content = "ping";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
        isAutocomplete,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleInteraction).not.toHaveBeenCalledWith();
    });

    it("should handle interactions that are not commands", async () => {
      const content = "notacommand";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
        isAutocomplete,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleInteraction).not.toHaveBeenCalled();
    });
  });

  describe("routeButtonInteraction", () => {
    it("should route vote button", async () => {
      const buttonInteraction = {
        customId: "vote:",
      } as ButtonInteraction;
      await router.routeButtonInteraction(buttonInteraction);
      expect(voteButtonInteractionController.handleInteraction).toHaveBeenCalledWith(buttonInteraction);
    });
    it("should handle interactions that are not recognized", async () => {
      const buttonInteraction = {
        customId: "notRecognizedInteraction:threadChannelid",
      } as ButtonInteraction;
      await router.routeButtonInteraction(buttonInteraction);
      expect(voteButtonInteractionController.handleInteraction).not.toHaveBeenCalled();
    });
  });
});
