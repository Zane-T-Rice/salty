import { DiscordApis } from "./discordApis";
import { Message } from "discord.js";

export class Messages extends DiscordApis {
  async getMessagesFromChannel(channelId: string): Promise<Message[]> {
    const result = await this.get(`/channels/${channelId}/messages`);
    return result as Message[];
  }
}
