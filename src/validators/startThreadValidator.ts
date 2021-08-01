import { CommandValidator } from "./commandValidator";
import { Message } from "discord.js";

export class StartThreadValidator extends CommandValidator {
  validate(_args: string[], message: Message): boolean {
    if (message.channel.type.toString() === "GUILD_PUBLIC_THREAD") return false;
    return true;
  }
}
