import { CacheType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { InteractionValidator } from "./interactionValidator";
import { validate } from "uuid";

export class UpdateServerValidator extends InteractionValidator {
  async validate(interaction: ChatInputCommandInteraction<CacheType>): Promise<boolean> {
    const name = interaction.options.getString("name")?.trim();
    const validName = validate(name);
    const errorReply = [
      !validName ? "You must select an option from the list. (Or somehow type the uuid of the option manually)." : null,
    ]
      .filter((e) => !!e)
      .join(" ");
    if (errorReply.length > 0)
      await interaction.reply({
        content: errorReply,
        flags: MessageFlags.Ephemeral,
      });
    return validName;
  }
}
