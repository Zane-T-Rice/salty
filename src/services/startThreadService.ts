import { Message, MessagePayload } from "discord.js";
import { CommandService } from "./commandService";
import { randomBytes } from "crypto";
import { Threads } from "../apis";

export class StartThreadService extends CommandService {
  private threads: Threads;

  constructor(threads: Threads) {
    super();
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

    const threadChannel = await this.threads.startThreadWithMessage(
      message.channel.id,
      messageId,
      threadName
    );

    await this.threads.addThreadMember(threadChannel.id, message.author.id);

    const threadMessage = args.slice(1).join(" ").slice(0, 2000);
    if (threadMessage) {
      const messagePayload = new MessagePayload(threadChannel, {
        content: threadMessage,
      });
      threadChannel.send(messagePayload);
    }
  }
}
