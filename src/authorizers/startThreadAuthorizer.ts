import { Message } from "discord.js";
import { CommandAuthorizer } from "./commandAuthorizer";

export class StartThreadAuthorizer extends CommandAuthorizer {
  authorize(_args: string[], message: Message): boolean {
    const threadRole = message.member?.roles?.find(
      (role) => role.name === "Threader"
    );
    return !!threadRole;
  }
}
