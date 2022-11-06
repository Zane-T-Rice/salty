import { ButtonInteraction, Message } from "discord.js";
import { PingController, VoteButtonInteractionController, VoteController } from "./controllers";
import { Router } from "./router";

const pingControllerInstance = new PingController();
const voteController = new VoteController();
const voteButtonInteractionController = new VoteButtonInteractionController();
const router = new Router(pingControllerInstance, voteController, voteButtonInteractionController);

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(pingControllerInstance, "handleMessage").mockResolvedValueOnce();
  jest.spyOn(voteButtonInteractionController, "handleInteraction").mockResolvedValueOnce();
});

describe("router", () => {
  describe("routeMessage", () => {
    it("should route ping messages", async () => {
      const content = "!ping";
      await router.routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).toHaveBeenCalledWith([content], { content });
    });

    it("should handle messages that are not commands", async () => {
      const content = "!notacommand";
      await router.routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).not.toHaveBeenCalled();
    });

    it("should ignore bot messages", async () => {
      const content = "!ping";
      const author = { bot: true };
      await router.routeMessage({ content, author } as Message);

      expect(pingControllerInstance.handleMessage).not.toHaveBeenCalled();
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
