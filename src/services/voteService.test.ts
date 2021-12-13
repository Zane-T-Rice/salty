import { Message } from "discord.js";
import { VoteService } from "./voteService";

describe("voteService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const voteService = new VoteService();
      expect(voteService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should reply with pong", () => {
      const message = { reply: jest.fn(), id: "messageId" } as unknown as Message;
      const voteService = new VoteService();
      voteService.handleMessage(["!vote", "one", "two"], message);
      expect(message.reply).toHaveBeenCalledWith({
        components: [
          {
            components: [
              { customId: "vote:0:messageId:one:0", label: "one 0", style: 1, type: 2 },
              { customId: "vote:1:messageId:two:0", label: "two 0", style: 1, type: 2 },
            ],
            type: 1,
          },
        ],
        content: "Vote",
      });
    });
  });
});
