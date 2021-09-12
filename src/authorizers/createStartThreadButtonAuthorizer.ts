import { CommandAuthorizer } from "./commandAuthorizer";
import { Message } from "discord.js";

export class CreateStartThreadButtonAuthorizer extends CommandAuthorizer {
  authorize(_args: string[], message: Message): boolean {
    const threadRole = message.member?.roles?.cache.find((role) => role.name === "ThreaderButtons");
    return !!threadRole;
  }
}
