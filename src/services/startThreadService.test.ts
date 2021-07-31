import { Collection, Message, User } from "discord.js";
import { StartThreadService } from "./startThreadService";
import { Messages, Threads } from "../apis";

describe("startThreadService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const startThreadService = new StartThreadService(
        new Messages(),
        new Threads()
      );
      expect(startThreadService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should call startThreadWithMessage", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      const messages = new Messages();
      const threads = new Threads();
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce(undefined);
      const startThreadService = new StartThreadService(messages, threads);
      await startThreadService.handleMessage([], message);
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
    });

    it("should call startThreadWithMessage with the given thread name", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
      } as Message;
      const messages = new Messages();
      const threads = new Threads();
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce(undefined);
      const startThreadService = new StartThreadService(messages, threads);

      await startThreadService.handleMessage(
        ["!t", "thread", "name", "test"],
        message
      );
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        "thread name test"
      );
    });

    it("should call getMessagesFromChannel and use the correct message id from that call to startThreadWithMessage", async () => {
      const messages = new Messages();
      const threads = new Threads();
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce(undefined);
      const startThreadService = new StartThreadService(messages, threads);
      jest
        .spyOn(messages, "getMessagesFromChannel")
        .mockResolvedValueOnce([
          { id: "notThisone", author: { id: "nope" } } as Message,
          { id: "replyToMe", author: { id: "replyToMeUser" } } as Message,
          { id: "alsoNotThisOne", author: { id: "also nope" } } as Message,
        ]);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      message.mentions.users.set("coolUser", { id: "replyToMeUser" } as User);
      await startThreadService.handleMessage([], message);
      expect(messages.getMessagesFromChannel).toHaveBeenCalledWith(
        message.channel.id
      );
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        "replyToMe",
        expect.any(String)
      );
    });

    it("handles getMessagesFromChannel returning no matches", async () => {
      const messages = new Messages();
      const threads = new Threads();
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce(undefined);
      const startThreadService = new StartThreadService(messages, threads);
      jest.spyOn(messages, "getMessagesFromChannel").mockResolvedValueOnce([]);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      message.mentions.users.set("coolUser", { id: "replyToMeUser" } as User);
      await startThreadService.handleMessage([], message);
      expect(messages.getMessagesFromChannel).toHaveBeenCalledWith(
        message.channel.id
      );
      expect(threads.startThreadWithMessage).not.toHaveBeenCalled();
    });

    it("handles no mentions", async () => {
      const messages = new Messages();
      const threads = new Threads();
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce(undefined);
      const startThreadService = new StartThreadService(messages, threads);
      jest.spyOn(messages, "getMessagesFromChannel").mockResolvedValueOnce([]);
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      await startThreadService.handleMessage([], message);
      expect(messages.getMessagesFromChannel).not.toHaveBeenCalled();
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
    });
  });
});
