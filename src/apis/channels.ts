import { DiscordApis } from "./discordApis";
import { ThreadChannel } from "discord.js";

export interface ChannelResponse extends ThreadChannel {
  thread_metadata?: {
    archived?: boolean;
  };
}

export class Channels extends DiscordApis {
  async getChannel(channelId: string): Promise<ChannelResponse> {
    return (await this.get(`/channels/${channelId}`)) as ChannelResponse;
  }
}
