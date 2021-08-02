import * as dotenv from "dotenv";
import { Client, Intents, Interaction, Message } from "discord.js";
import { routeButtonInteraction, routeMessage } from "./router";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", async (message: Message) => {
  await routeMessage(message);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isButton()) routeButtonInteraction(interaction);
});

dotenv.config();
client.login(process.env.TOKEN);
