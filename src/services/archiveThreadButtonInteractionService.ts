import { ButtonInteraction, InteractionUpdateOptions } from "discord.js";
import { Channels, Threads } from "../apis";
import { InteractionService } from "./interactionService";

export class ArchiveThreadButtonInteractionService extends InteractionService {
  private channels: Channels;
  private threads: Threads;

  constructor(channels: Channels, threads: Threads) {
    super();
    this.threads = threads;
    this.channels = channels;
  }

  async handleInteraction(interaction: ButtonInteraction): Promise<void> {
    const channelId = interaction.customId.split(":")[1];
    const threadChannel = await this.channels.getChannel(channelId);

    const messageEditOptions = {
      components: [
        {
          type: 1,
          components: [
            {
              customId: interaction.customId,
              label: "Toggle Archived",
              style: 1,
              type: 2,
            },
          ],
        },
      ],
    } as InteractionUpdateOptions;

    if (threadChannel.thread_metadata) {
      if (threadChannel.thread_metadata.archived) {
        await this.threads.unarchiveThread(channelId);
        await interaction.update(messageEditOptions);
      } else {
        // This is dumb because you have to say it succeeded before you actually
        // go and archive the thread. Because you can't edit an archived thread.
        await interaction.update(messageEditOptions);
        await this.threads.archiveThread(channelId);
      }
    }
  }
}
