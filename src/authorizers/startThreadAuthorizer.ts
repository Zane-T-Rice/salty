import { CommandAuthorizer } from "./commandAuthorizer";
import { Message } from "discord.js";

export class StartThreadAuthorizer extends CommandAuthorizer {
  authorize(_args: string[], message: Message): boolean {
    const threadRole = message.member?.roles?.cache.find(
      (role) => role.name === "Threader"
    );
    return !!threadRole;
  }
}
