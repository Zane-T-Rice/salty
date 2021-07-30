import { Message } from "discord.js";
import { CommandService } from "./commandService";

export class PingService extends CommandService {
  handleMessage(args: string[], message: Message): void {
    message.reply("pong");
  }
}
