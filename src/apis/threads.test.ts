import { Message } from "discord.js";
import { startThreadWithMessage } from "./threads";
import axios from "axios";
jest.mock("axios");

describe("threads apis", () => {
  describe("handleMessage", () => {
    it("should call axios.post", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      await startThreadWithMessage(message.channel.id, message.id, "test");
      expect(axios.post).toBeCalledWith(
        `https://discordapp.com/api/channels/${message.channel.id}/messages/${message.id}/threads`,
        { name: "test" },
        { headers: { Authorization: "Bot undefined" } }
      );
    });
  });
});
