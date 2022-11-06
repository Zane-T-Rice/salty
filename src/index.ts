import * as dotenv from "dotenv";
import { PingController, VoteButtonInteractionController, VoteController } from "./controllers";
import { Client, GatewayIntentBits, Interaction, Message } from "discord.js";
import { Router } from "./router";

const router = new Router(new PingController(), new VoteController(), new VoteButtonInteractionController());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("messageCreate", async (message: Message) => {
  await router.routeMessage(message);
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isButton()) router.routeButtonInteraction(interaction);
});

dotenv.config();
client.login(process.env.TOKEN);
