import { Channel, Collection, Message, User } from "discord.js";
import { Messages, Threads } from "../apis";
import { StartThreadService } from "./startThreadService";

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
    const messages = new Messages();
    const threads = new Threads();

    beforeEach(() => {
      jest.resetAllMocks();
      jest.spyOn(messages, "getMessagesFromChannel").mockResolvedValueOnce([]);
      jest
        .spyOn(messages, "sendMessageToChannel")
        .mockResolvedValueOnce({} as Message);
      jest
        .spyOn(threads, "startThreadWithMessage")
        .mockResolvedValueOnce({ id: "threadChannelId" } as Channel);
      jest.spyOn(threads, "addThreadMember").mockResolvedValueOnce(undefined);
    });
    it("should call startThreadWithMessage", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        author: { id: "testAuthorId" },
      } as Message;
      const startThreadService = new StartThreadService(messages, threads);
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
      const startThreadService = new StartThreadService(messages, threads);
      jest
        .spyOn(messages, "getMessagesFromChannel")
        .mockReset()
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
      const startThreadService = new StartThreadService(messages, threads);
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
      const startThreadService = new StartThreadService(messages, threads);
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

    it("should call sendMessageToChannel if the user entered a message", async () => {
      const message = {
        id: "testMessageId",
        channel: { id: "testChannelId" },
        author: { id: "testAuthorId" },
      } as Message;
      const startThreadService = new StartThreadService(messages, threads);
      await startThreadService.handleMessage(["!t", "hello", "world"], message);
      expect(threads.startThreadWithMessage).toHaveBeenCalledWith(
        message.channel.id,
        message.id,
        expect.any(String)
      );
      expect(messages.sendMessageToChannel).toHaveBeenCalledWith(
        "threadChannelId",
        "hello world"
      );
    });
  });
});
