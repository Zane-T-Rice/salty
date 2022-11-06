import * as dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Interaction, Message } from "discord.js";
import { PingController, VoteButtonInteractionController, VoteController } from "./controllers";
import { Router } from "./router";

const router = new Router(new PingController(), new VoteController(), new VoteButtonInteractionController());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.MessageCreate, async (message: Message) => {
  await router.routeMessage(message);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isButton()) router.routeButtonInteraction(interaction);
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

dotenv.config();
client.login(process.env.TOKEN);
