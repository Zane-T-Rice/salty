import { Message } from "discord.js";
import { StartThreadService } from "./startThreadService";
import { startThreadWithMessage } from "../apis/threads";
jest.mock("../apis/threads");

describe("startThreadService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const startThreadService = new StartThreadService();
      expect(startThreadService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should call startThreadWithMessage", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      const startThreadService = new StartThreadService();
      await startThreadService.handleMessage([], message);
      expect(startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
    });
  });
});
