import { Message } from "discord.js";
import { Threads } from "./threads";

const threads = new Threads();

describe("Threads", () => {
  describe("startThreadWithMessage", () => {
    it("should call axios.post", async () => {
      jest.spyOn(threads, "post").mockResolvedValueOnce(undefined);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      await threads.startThreadWithMessage(message.channel.id, message.id, "test");
      expect(threads.post).toBeCalledWith(`/channels/${message.channel.id}/messages/${message.id}/threads`, {
        name: "test",
      });
    });
  });
  describe("addThreadMember", () => {
    it("should call axios.put", async () => {
      jest.spyOn(threads, "put").mockResolvedValueOnce(undefined);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        author: { id: "testAuthorId" },
      } as Message;
      await threads.addThreadMember(message.channel.id, message.author.id);
      expect(threads.put).toBeCalledWith(`/channels/${message.channel.id}/thread-members/${message.author.id}`, {});
    });
  });
  describe("archiveThread", () => {
    it("should call axios.patch", async () => {
      jest.spyOn(threads, "patch").mockResolvedValueOnce(undefined);
      const channelId = "testMessageId";
      await threads.archiveThread(channelId);
      expect(threads.patch).toBeCalledWith(`/channels/${channelId}`, {
        archived: true,
      });
    });
  });
  describe("unarchiveThread", () => {
    it("should call axios.patch", async () => {
      jest.spyOn(threads, "patch").mockResolvedValueOnce(undefined);
      const channelId = "testMessageId";
      await threads.unarchiveThread(channelId);
      expect(threads.patch).toBeCalledWith(`/channels/${channelId}`, {
        archived: false,
      });
    });
  });
});
