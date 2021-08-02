import { Collection, Message, ThreadChannel, User } from "discord.js";
import { StartThreadService } from "./startThreadService";
import { Threads } from "../apis";

describe("startThreadService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const startThreadService = new StartThreadService(new Threads());
      expect(startThreadService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    const threads = new Threads();
    const threadChannel = {
      id: "threadChannelId",
    } as ThreadChannel;
    threadChannel.send = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce(threadChannel);
      jest.spyOn(threads, "addThreadMember").mockResolvedValueOnce(undefined);
    });
    it("should call startThreadWithMessage", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        author: { id: "testAuthorId" },
      } as Message;
      const startThreadService = new StartThreadService(threads);
      await startThreadService.handleMessage([], message);
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
      expect(threads.addThreadMember).toHaveBeenCalledWith(
        "threadChannelId",
        message.author.id
      );
    });

    it("should call getMessagesFromChannel and use the correct message id from that call to startThreadWithMessage", async () => {
      const startThreadService = new StartThreadService(threads);
      const message = {
        id: "testMessageId",
        channel: {
          id: "testChannelId",
          messages: {
            cache: new Collection<string, Message>(),
          },
        },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      message.mentions.users.set("coolUser", { id: "replyToMeUser" } as User);
      message.channel.messages.cache.set("test1", {
        id: "notThisone",
        author: { id: "nope" },
      } as Message);
      message.channel.messages.cache.set("test2", {
        id: "replyToMe",
        author: { id: "replyToMeUser" },
      } as Message);
      message.channel.messages.cache.set("test3", {
        id: "alsoNotThisOne",
        author: { id: "also nope" },
      } as Message);
      await startThreadService.handleMessage([], message);
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        "replyToMe",
        expect.any(String)
      );
    });

    it("handles getMessagesFromChannel returning no matches", async () => {
      const startThreadService = new StartThreadService(threads);
      const message = {
        id: "testMessageId",
        channel: {
          id: "testChannelId",
          messages: {
            cache: new Collection<string, Message>(),
          },
        },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      message.mentions.users.set("coolUser", { id: "replyToMeUser" } as User);
      await startThreadService.handleMessage([], message);
      expect(threads.startThreadWithMessage).not.toHaveBeenCalled();
    });

    it("handles no mentions", async () => {
      const startThreadService = new StartThreadService(threads);
      const message = {
        id: "testMessageId",
        channel: {
          id: "testChannelId",
          messages: {
            cache: new Collection<string, Message>(),
          },
        },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      await startThreadService.handleMessage([], message);
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
    });

    it("should call threadChannel.send if the user entered a message", async () => {
      const message = {
        id: "testMessageId",
        channel: {
          id: "testChannelId",
          messages: {
            cache: new Collection<string, Message>(),
          },
        },
        mentions: { users: new Collection<string, User>() },
        author: { id: "tryingToReplyToSomeone" },
      } as Message;
      const startThreadService = new StartThreadService(threads);
      await startThreadService.handleMessage(["!t", "hello", "world"], message);
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
      expect(threadChannel.send).toHaveBeenCalledWith(
        expect.objectContaining({
          options: expect.objectContaining({
            content: "hello world",
          }),
          target: expect.objectContaining({
            id: threadChannel.id,
          }),
        })
      );
    });
  });
});
