import { Message, MessageButton, ReplyMessageOptions } from "discord.js";
import { CommandService } from "./commandService";

export class VoteService extends CommandService {
  async handleMessage(args: string[], message: Message): Promise<void> {
    const components = args.slice(1).map((arg, index) => {
      const emoji = arg.includes(":") ? arg.substring(arg.lastIndexOf(":") + 1, arg.length - 1) : undefined;
      const button = new MessageButton()
        .setCustomId(`vote:${index}:${message.id}:${emoji ? "" : arg}:${emoji ? emoji : ""}:0`)
        .setLabel(`${emoji ? "" : arg} 0`)
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
