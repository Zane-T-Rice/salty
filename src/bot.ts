import * as dotenv from "dotenv";
import { Client, Message } from "discord.js";
import { routeMessage } from "./router";

export class Bot {
  public listen(): Promise<string> {
    const client = new Client();
    client.on("message", (message: Message) => {
      routeMessage(message);
    });
    dotenv.config();
    return client.login(process.env.TOKEN);
  }
}
