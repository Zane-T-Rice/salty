import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { InteractionValidator } from "./interactionValidator";

export class VoteValidator extends InteractionValidator {
  async validate(interaction: ChatInputCommandInteraction<CacheType>): Promise<boolean> {
    const args =
      interaction.options
        .getString("args")
        ?.trim()
        .split("|")
        .filter((e) => !!e) || [];
    const isValid = args.length > 0 && args.length <= 25;
    if (!isValid)
      interaction.reply({
        content: "The number of arguments must be [1,25].",
        ephemeral: true,
      });
    return isValid;
  }
}
