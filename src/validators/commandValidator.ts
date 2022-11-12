import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";

export abstract class CommandValidator {
  abstract validate(args: string[], message: Message | ChatInputCommandInteraction<CacheType>): boolean;
}
