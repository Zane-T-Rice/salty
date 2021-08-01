import { CommandService } from "./commandService";
import { Message } from "discord.js";

export class PingService extends CommandService {
  async handleMessage(_args: string[], message: Message): Promise<void> {
    message.reply("pong");
  }
}
