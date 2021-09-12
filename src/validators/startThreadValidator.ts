import { CommandValidator } from "./commandValidator";
import { Message } from "discord.js";

export class StartThreadValidator extends CommandValidator {
  validate(_args: string[], message: Message): boolean {
    return !message.channel.isThread();
  }
}
