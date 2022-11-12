import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";

export abstract class CommandService {
  abstract handleMessage(args: string[], message: Message | ChatInputCommandInteraction<CacheType>): Promise<void>;
}
