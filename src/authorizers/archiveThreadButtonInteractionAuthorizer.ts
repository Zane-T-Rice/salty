import { ButtonInteraction, GuildMemberRoleManager } from "discord.js";
import { InteractionAuthorizer } from "./interactionAuthorizer";

export class ArchiveThreadButtonInteractionAuthorizer extends InteractionAuthorizer {
  authorize(interaction: ButtonInteraction): boolean {
    const threadRole = (interaction.member?.roles as GuildMemberRoleManager)?.cache.find(
      (role) => role.name === "Threader"
    );
    return !!threadRole;
  }
}
