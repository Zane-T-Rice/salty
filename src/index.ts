import * as dotenv from "dotenv";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { PingController, VoteButtonInteractionController, VoteController, YoutubeController } from "./controllers";
import { Router } from "./router";

const router = new Router(new PingController(), new VoteController(), new VoteButtonInteractionController(), new YoutubeController);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) router.routeButtonInteraction(interaction);
  router.routeInteraction(interaction);
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

dotenv.config();
client.login(process.env.TOKEN);
