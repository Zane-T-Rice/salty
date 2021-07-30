import * as dotenv from "dotenv";
import { Client, Message } from "discord.js";
import { routeMessage } from "./router";

const client = new Client();
client.on("message", async (message: Message) => {
  await routeMessage(message);
});
dotenv.config();
client.login(process.env.TOKEN);
