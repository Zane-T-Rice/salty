import { DiscordApis } from "./discordApis";

export class Threads extends DiscordApis {
  async startThreadWithMessage(
    channelId: string,
    messageId: string,
    name: string
  ): Promise<void> {
    await this.post(`/channels/${channelId}/messages/${messageId}/threads`, {
      name,
    });
  }
}
