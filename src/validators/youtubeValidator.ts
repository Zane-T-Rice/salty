import { CacheType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { InteractionValidator } from "./interactionValidator";
import { isMention } from "../utils";

export class YoutubeValidator extends InteractionValidator {
  async validate(interaction: ChatInputCommandInteraction<CacheType>): Promise<boolean> {
    let urls =
      interaction.options
        .getString("urls")
        ?.trim()
        .split(" ")
        .filter((e) => !!e) || [];
    urls = urls.filter((url) => !isMention(url));
    const folder = interaction.options.getString("folder")?.trim() || "";
    const validUrls = urls.length > 0;
    const validFolder = folder.match(/^[a-zA-Z0-9_ ]*$/)?.length > 0;
    const errorReply = [
      !validUrls ? "You must supply at least one string in urls." : null,
      !validFolder ? "You must use a folder name matching /^[a-zA-Z0-9_ ]*$/" : null,
    ]
      .filter((e) => !!e)
      .join(" ");
    if (errorReply.length > 0)
      interaction.reply({
        content: errorReply,
        flags: MessageFlags.Ephemeral,
      });
    return validUrls && validFolder;
  }
}
