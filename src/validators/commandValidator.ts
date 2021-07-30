import { Message } from "discord.js";

export abstract class CommandValidator {
  abstract validate(args: string[], message: Message): boolean;
}
