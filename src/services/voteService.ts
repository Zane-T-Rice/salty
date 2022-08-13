import { isCustomEmoji, parseCustomEmojiId } from "../utils";
import { Message, MessageButton, ReplyMessageOptions } from "discord.js";
import { CommandService } from "./commandService";

export type ButtonRow = {
  type: number;
  components: MessageButton[];
};

export class VoteService extends CommandService {
  async handleMessage(args: string[], message: Message): Promise<void> {
    const joined = args.slice(1).join(" ");
    const pipeDelimited = joined.split("|").map((arg) => arg.trim());
    const components = pipeDelimited.map((arg, index) => {
      const emoji = isCustomEmoji(arg) ? parseCustomEmojiId(arg) : "";
      const label = emoji ? "" : arg.replace(/:/g, "");
      const button = new MessageButton()
        .setCustomId(`vote:${index % 5}:${message.id}:${label}:${emoji}:0:${Math.floor(index / 5.0)}`)
        .setLabel(`${label} 0`)
        .setStyle("PRIMARY");
      if (emoji) button.setEmoji(emoji);
      return button;
    });
    const buttonRows = this.splitComponents(components);
    const messageReply = {
      content: "Vote",
      components: buttonRows,
    } as ReplyMessageOptions;

    message.reply(messageReply);
  }

  splitComponents(buttons: MessageButton[]): ButtonRow[] {
    const numberOfRows = Math.ceil(buttons.length / 5.0);
    const rows: ButtonRow[] = [];

    for (let i = 0; i < numberOfRows; i++) {
      rows.push({ type: 1, components: buttons.slice(i * 5, (i + 1) * 5) });
    }

    return rows;
  }
}
