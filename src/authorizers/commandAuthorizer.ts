import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";

export abstract class CommandAuthorizer {
  abstract authorize(args: string[], message: Message | ChatInputCommandInteraction<CacheType>): boolean;
}
