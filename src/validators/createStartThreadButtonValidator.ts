import { CommandValidator } from "./commandValidator";
import { Message } from "discord.js";

export class CreateStartThreadButtonValidator extends CommandValidator {
  validate(_args: string[], message: Message): boolean {
    if (message.channel.isThread()) return false;
    return true;
  }
}
