import { Channel } from "discord.js";
import { DiscordApis } from "./discordApis";

export class Threads extends DiscordApis {
  async startThreadWithMessage(
    channelId: string,
    messageId: string,
    name: string
  ): Promise<Channel> {
    return (await this.post(
      `/channels/${channelId}/messages/${messageId}/threads`,
      {
        name,
      }
    )) as Channel;
  }
}
