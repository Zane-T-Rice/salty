import { Message } from "discord.js";
import { PingService } from "./pingService";

describe("pingService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const pingService = new PingService();
      expect(pingService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should reply with pong", () => {
      const message = { reply: jest.fn() } as unknown as Message;
      const pingService = new PingService();
      pingService.handleMessage([], message);
      expect(message.reply).toHaveBeenCalledWith("pong");
    });
  });
});
