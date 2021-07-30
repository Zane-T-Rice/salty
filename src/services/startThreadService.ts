import { Message } from "discord.js";
import { CommandService } from "./commandService";
import { randomBytes } from "crypto";
import { startThreadWithMessage } from "../apis/threads";

export class StartThreadService extends CommandService {
  async handleMessage(_args: string[], message: Message): Promise<void> {
    const threadName = randomBytes(5).toString("hex");
    await startThreadWithMessage(message.channel.id, message.id, threadName);
  }
}
