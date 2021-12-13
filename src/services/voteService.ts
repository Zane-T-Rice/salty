import { Message, ReplyMessageOptions } from "discord.js";
import { CommandService } from "./commandService";

export class VoteService extends CommandService {
  async handleMessage(args: string[], message: Message): Promise<void> {
    const components = args.slice(1).map((arg, index) => {
      return {
        customId: `vote:${index}:${message.id}:${arg}:0`,
        label: `${arg} 0`,
        style: 1,
        type: 2,
      };
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
