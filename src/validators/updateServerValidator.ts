import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { InteractionValidator } from "./interactionValidator";
import { validate } from "uuid";

export class UpdateServerValidator extends InteractionValidator {
  async validate(interaction: ChatInputCommandInteraction<CacheType>): Promise<boolean> {
    const name = interaction.options
      .getString("name")
      ?.trim()
      .split(" ")
      .map((value) => value.trim()); // name here is actually the uuid of a host and server (space delimited)
    const validName = Boolean(name && name.length === 2 && validate(name[0]) && validate(name[1]));
    const errorReply = [
      !validName ? "You must select an option from the list. (Or somehow type the uuid of the option manually)." : null,
    ]
      .filter((e) => !!e)
      .join(" ");
    if (errorReply.length > 0)
      await interaction.reply({
        content: errorReply,
        ephemeral: true,
      });

    return validName;
  }
}
