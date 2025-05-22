import { CacheType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { InteractionService } from "./interactionService";

export class PingService implements InteractionService {
  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.reply({ content: "pong", flags: MessageFlags.Ephemeral });
  }
}
