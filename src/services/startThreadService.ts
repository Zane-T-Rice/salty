import { Message, ThreadChannel } from "discord.js";
import { Messages, Threads } from "../apis";
import { CommandService } from "./commandService";
import { randomBytes } from "crypto";

export class StartThreadService extends CommandService {
  private messages: Messages;
  private threads: Threads;

  constructor(messages: Messages, threads: Threads) {
    super();
    this.messages = messages;
    this.threads = threads;
  }

  async handleMessage(args: string[], message: Message): Promise<void> {
    let messageId = message.id;
    const threadName = randomBytes(5).toString("hex");

    if (message.mentions?.users?.size) {
      const userToReplyTo = message.mentions.users.first();
      const messageToStartThreadWith = message.channel.messages.cache
        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
        .find((message) => message.author.id === userToReplyTo.id);
      if (!messageToStartThreadWith) return;
      messageId = messageToStartThreadWith.id;
    }

    const threadChannel = (await this.threads.startThreadWithMessage(
      message.channel.id,
      messageId,
      threadName
    )) as ThreadChannel;

    await this.threads.addThreadMember(threadChannel.id, message.author.id);

    const threadMessage = args.slice(1).join(" ").trim().slice(0, 2000).trim();
    if (threadMessage) {
      this.messages.sendMessageToChannel(threadChannel.id, threadMessage);
    }
  }
}
