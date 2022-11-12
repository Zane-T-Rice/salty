import { CommandService } from "./commandService";
import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";

export class PingService extends CommandService {
  async handleMessage(_args: string[], message: Message | ChatInputCommandInteraction<CacheType>): Promise<void> {
    message.reply("pong");
  }
}
