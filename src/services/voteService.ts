import { BaseMessageOptions, ButtonBuilder, ButtonStyle, Message } from "discord.js";
import { isCustomEmoji, parseCustomEmojiId } from "../utils";
import { CommandService } from "./commandService";

export type ButtonRow = {
  type: number;
  components: ButtonBuilder[];
};

export class VoteService extends CommandService {
  async handleMessage(args: string[], message: Message): Promise<void> {
    const joined = args.slice(1).join(" ");
    const pipeDelimited = joined.split("|").map((arg) => arg.trim());
    const components = pipeDelimited.map((arg, index) => {
      const emoji = isCustomEmoji(arg) ? parseCustomEmojiId(arg) : "";
      const label = emoji ? "" : arg.replace(/:/g, "");
      const button = new ButtonBuilder()
        .setCustomId(`vote:${index % 5}:${message.id}:${label}:${emoji}:0:${Math.floor(index / 5.0)}`)
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

    message.reply(messageReply);
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
