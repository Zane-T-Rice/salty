import { isCustomEmoji, parseCustomEmojiId } from "../utils";
import { Message, MessageButton, ReplyMessageOptions } from "discord.js";
import { CommandService } from "./commandService";

export class VoteService extends CommandService {
  async handleMessage(args: string[], message: Message): Promise<void> {
    const joined = args.slice(1).join(" ");
    const pipeDelimited = joined.split("|").map((arg) => arg.trim());
    const components = pipeDelimited.map((arg, index) => {
      const emoji = isCustomEmoji(arg) ? parseCustomEmojiId(arg) : "";
      const label = emoji ? "" : arg.replace(/:/g, "");
      const button = new MessageButton()
        .setCustomId(`vote:${index}:${message.id}:${label}:${emoji}:0`)
        .setLabel(`${label} 0`)
        .setStyle("PRIMARY");
      if (emoji) button.setEmoji(emoji);
      return button;
    });
    const messageReply = {
      content: "Vote",
      components: [
        {
          type: 1,
          components,
        },
      ],
    } as ReplyMessageOptions;

    message.reply(messageReply);
  }
}
