require('dotenv').config();
const TOKEN = process.env.TOKEN;

import { Client, Message } from "discord.js";
import { routeMessage } from './router';

export class Bot {
  public listen(): Promise<string> {
    let client = new Client();
    client.on('message', (message: Message) => {
      routeMessage(message);
    });
    return client.login(TOKEN);
  }
}
