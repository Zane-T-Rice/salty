import * as dotenv from "dotenv";
import {
  ArchiveThreadButtonInteractionController,
  PingController,
  StartThreadController,
} from "./controllers";
import { Client, Intents, Interaction, Message } from "discord.js";
import { Router } from "./router";

const router = new Router(
  new PingController(),
  new ArchiveThreadButtonInteractionController(),
  new StartThreadController()
);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", async (message: Message) => {
  await router.routeMessage(message);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isButton()) router.routeButtonInteraction(interaction);
});

dotenv.config();
client.login(process.env.TOKEN);
