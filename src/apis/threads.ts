import { DiscordApis } from "./discordApis";
import { ThreadChannel } from "discord.js";

export class Threads extends DiscordApis {
  async startThreadWithMessage(channelId: string, messageId: string, name: string): Promise<ThreadChannel> {
    return (await this.post(`/channels/${channelId}/messages/${messageId}/threads`, {
      name,
    })) as ThreadChannel;
  }

  async addThreadMember(channelId: string, userId: string): Promise<void> {
    await this.put(`/channels/${channelId}/thread-members/${userId}`, {});
  }

  async archiveThread(channelId: string): Promise<ThreadChannel> {
    const result = await this.patch(`/channels/${channelId}`, {
      archived: true,
    });
    return result as ThreadChannel;
  }

  async unarchiveThread(channelId: string): Promise<ThreadChannel> {
    const result = await this.patch(`/channels/${channelId}`, {
      archived: false,
    });
    return result as ThreadChannel;
  }
}
