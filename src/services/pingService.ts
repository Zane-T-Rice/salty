import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { InteractionService } from "./interactionService";

export class PingService extends InteractionService {
  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.reply("pong");
  }
}
