import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { InteractionValidator } from "./interactionValidator";

export class VoteValidator extends InteractionValidator {
  validate(interaction: ChatInputCommandInteraction<CacheType>): boolean {
    const args =
      interaction.options
        .getString("args")
        ?.trim()
        .split("|")
        .filter((e) => !!e) || [];
    const isValid = args.length > 0 && args.length <= 25;
    if (!isValid) interaction.reply("The number of arguments must be [1,25].");
    return isValid;
  }
}
