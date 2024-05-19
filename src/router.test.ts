import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";
import {
  PingController,
  VoteButtonInteractionController,
  VoteController,
  YoutubeController,
  YoutubeKeepController,
} from "./controllers";
import { Router } from "./router";

const pingControllerInstance = new PingController();
const voteController = new VoteController();
const voteButtonInteractionController = new VoteButtonInteractionController();
const youtubeController = new YoutubeController();
const youtubeKeepController = new YoutubeKeepController();
const router = new Router(
  pingControllerInstance,
  voteController,
  voteButtonInteractionController,
  youtubeController,
  youtubeKeepController
);

let isChatInputCommand;
beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(pingControllerInstance, "handleInteraction").mockResolvedValueOnce();
  jest.spyOn(voteButtonInteractionController, "handleInteraction").mockResolvedValueOnce();
  isChatInputCommand = jest.fn().mockReturnValue(true);
});

describe("router", () => {
  describe("routeMessage", () => {
    it("should route ping messages", async () => {
      const content = "ping";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleInteraction).toHaveBeenCalledWith(
        expect.objectContaining({ commandName: content })
      );
    });

    it("should handle non chat commands", async () => {
      isChatInputCommand.mockReturnValueOnce(false);
      const content = "ping";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
      } as unknown as ChatInputCommandInteraction<CacheType>);

      expect(pingControllerInstance.handleInteraction).not.toHaveBeenCalledWith();
    });

    it("should handle interactions that are not commands", async () => {
      const content = "notacommand";
      await router.routeInteraction({
        commandName: content,
        isChatInputCommand,
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
