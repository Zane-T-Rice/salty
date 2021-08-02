// ERROR: CANNOT EDIT A MESSAGE AUTHORED BY ANOTHER USER
// This code is incredibly dead. I wanted to add a button to my messages,
// but that doesn't seem possible.
import { Message, MessageEditOptions } from "discord.js";
import { CommandService } from "./commandService";

export class CreateStartThreadButtonService extends CommandService {
  async handleMessage(_args: string[], message: Message): Promise<void> {
    const messageEditOptions = {
      components: [
        {
          type: 1,
          components: [
            {
              customId: `startThread:${message.channel.id}:${message.id}`,
              label: "Reply",
              style: 1,
              type: 2,
            },
          ],
        },
      ],
    } as MessageEditOptions;

    message.edit(messageEditOptions);
  }
}
