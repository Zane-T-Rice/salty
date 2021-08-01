import { Messages, Threads } from "../apis";
import { CommandService } from "./commandService";
import { Message } from "discord.js";
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
    let threadName = randomBytes(5).toString("hex");
    if (args.length > 1) {
      threadName = args.slice(1).join(" ");
    }
    threadName = threadName.slice(0, 100);

    if (message.mentions?.users?.size) {
      const userToReplyTo = message.mentions.users.first();
      const recentMessagesInChannel =
        await this.messages.getMessagesFromChannel(message.channel.id);
      const messageToStartThreadWith = recentMessagesInChannel.find(
        (message) => message.author.id === userToReplyTo.id
      );
      if (!messageToStartThreadWith) return;
      messageId = messageToStartThreadWith.id;
    }

    await this.threads.startThreadWithMessage(
      message.channel.id,
      messageId,
      threadName
    );
  }
}
