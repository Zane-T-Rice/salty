import { DiscordApis } from "./discordApis";
import { Message } from "discord.js";

export class Messages extends DiscordApis {
  async getMessagesFromChannel(channelId: string): Promise<Message[]> {
    const result = await this.get(`/channels/${channelId}/messages`);
    return result as Message[];
  }

  async sendMessageToChannel(
    channelId: string,
    message: string
  ): Promise<Message> {
    const result = await this.post(`/channels/${channelId}/messages`, { content: message });
    return result as Message;
  }
}
