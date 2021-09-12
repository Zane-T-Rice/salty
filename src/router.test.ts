import {
  ArchiveThreadButtonInteractionController,
  PingController,
  StartThreadController,
} from "./controllers";
import { ButtonInteraction, Message } from "discord.js";
import { Router } from "./router";

const pingControllerInstance = new PingController();
const startThreadControllerInstance = new StartThreadController();
const archiveThreadButtonInteractionController =
  new ArchiveThreadButtonInteractionController();
const router = new Router(
  pingControllerInstance,
  archiveThreadButtonInteractionController,
  startThreadControllerInstance
);

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(pingControllerInstance, "handleMessage").mockResolvedValueOnce();
  jest
    .spyOn(startThreadControllerInstance, "handleMessage")
    .mockResolvedValueOnce();
  jest
    .spyOn(archiveThreadButtonInteractionController, "handleInteraction")
    .mockResolvedValueOnce();
});

describe("router", () => {
  describe("routeMessage", () => {
    it("should route ping messages", async () => {
      const content = "!ping";
      await router.routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).toHaveBeenCalledWith(
        [content],
        { content }
      );
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
    it("should route archiveThreadButton", async () => {
      const buttonInteraction = {
        customId: "archiveThreadButton:threadChannelid",
      } as ButtonInteraction;
      await router.routeButtonInteraction(buttonInteraction);
      expect(
        archiveThreadButtonInteractionController.handleInteraction
      ).toHaveBeenCalledWith(buttonInteraction);
    });
  });
});
