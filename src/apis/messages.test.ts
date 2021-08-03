import { Message } from "discord.js";
import { Messages } from "./messages";

const messages = new Messages();

describe("threads apis", () => {
  describe("getMessagesFromChannel", () => {
    it("should call axios.get", async () => {
      jest.spyOn(messages, "get").mockResolvedValueOnce([]);
      const message = { channel: { id: "testChannelId" } } as Message;
      await messages.getMessagesFromChannel(message.channel.id);
      expect(messages.get).toBeCalledWith(
        `/channels/${message.channel.id}/messages`
      );
    });
  });
  
  describe("sendMessageToChannel", () => {
    it("should call axios.post", async () => {
      jest.spyOn(messages, "post").mockResolvedValueOnce({});
      const channelId = 'testChannelId';
      const content = 'testContent';
      await messages.sendMessageToChannel(channelId, content);
      expect(messages.post).toBeCalledWith(
        `/channels/${channelId}/messages`,
        { content }
      );
    });
  });
});
