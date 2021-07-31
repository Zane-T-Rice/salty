import { Message } from "discord.js";
import { Messages } from "./messages";

const messages = new Messages();

describe("threads apis", () => {
  describe("handleMessage", () => {
    it("should call axios.get", async () => {
      jest.spyOn(messages, "get").mockResolvedValueOnce([]);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      await messages.getMessagesFromChannel(message.channel.id);
      expect(messages.get).toBeCalledWith(
        `/channels/${message.channel.id}/messages`
      );
    });
  });
});
