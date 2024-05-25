import { BaseMessageOptions, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction } from "discord.js";
import { isCustomEmoji, parseCustomEmojiId } from "../utils";
import { InteractionService } from "./interactionService";

export type ButtonRow = {
  type: number;
  components: ButtonBuilder[];
};

export class VoteService implements InteractionService {
  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    const joined = interaction.options.getString("args");
    const pipeDelimited = joined.split("|").map((arg) => arg.trim());
    const components = pipeDelimited.map((arg, index) => {
      const emoji = isCustomEmoji(arg) ? parseCustomEmojiId(arg) : "";
      const label = emoji ? "" : arg.replace(/:/g, "");
      const button = new ButtonBuilder()
        .setCustomId(`vote:${index % 5}:${interaction.id}:${label}:${emoji}:${Math.floor(index / 5.0)}`)
        .setLabel(`${label} 0`)
        .setStyle(ButtonStyle.Primary);
      if (emoji) button.setEmoji(emoji);
      return button;
    });
    const buttonRows = this.splitComponents(components);
    const messageReply = {
      content: "Vote",
      components: buttonRows,
    } as BaseMessageOptions;

    interaction.reply(messageReply);
  }

  splitComponents(buttons: ButtonBuilder[]): ButtonRow[] {
    const numberOfRows = Math.ceil(buttons.length / 5.0);
    const rows: ButtonRow[] = [];

    for (let i = 0; i < numberOfRows; i++) {
      rows.push({ type: 1, components: buttons.slice(i * 5, (i + 1) * 5) });
    }

    return rows;
  }
}
