import * as dotenv from "dotenv";
import { Client, Intents, Message } from "discord.js";
import { routeMessage } from "./router";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on("messageCreate", async (message: Message) => {
  await routeMessage(message);
});
dotenv.config();
client.login(process.env.TOKEN);
