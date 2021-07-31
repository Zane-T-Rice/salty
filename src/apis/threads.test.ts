import { Message } from "discord.js";
import { Threads } from "./threads";

const threads = new Threads();

describe("threads apis", () => {
  describe("handleMessage", () => {
    it("should call axios.post", async () => {
      jest.spyOn(threads, "post").mockResolvedValueOnce(undefined);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      await threads.startThreadWithMessage(
        message.channel.id,
        message.id,
        "test"
      );
      expect(threads.post).toBeCalledWith(
        `/channels/${message.channel.id}/messages/${message.id}/threads`,
        { name: "test" }
      );
    });
  });
});
