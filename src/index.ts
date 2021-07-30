import * as dotenv from "dotenv";
import { Client, Message } from "discord.js";
import { routeMessage } from "./router";

const client = new Client();
client.on("message", (message: Message) => {
  routeMessage(message);
});
dotenv.config();
client.login(process.env.TOKEN);
