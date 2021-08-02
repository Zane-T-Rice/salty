import * as dotenv from "dotenv";
import {
  Client,
  Intents,
  InteractionUpdateOptions,
  Message,
  MessagePayload,
  ThreadChannel,
} from "discord.js";
import { routeMessage } from "./router";
import { randomBytes } from "crypto";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("messageCreate", async (message: Message) => {
  await routeMessage(message);
});

client.on("threadCreate", async (threadChannel: ThreadChannel) => {
  const messagePayload = new MessagePayload(threadChannel, {
    content:
      "When you are done with this thread, you can archive it by pressing this button.",
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            label: "Archive Thread",
            style: 1,
            customId: randomBytes(30).toString("hex"),
          },
        ],
      },
    ],
  });
  threadChannel.send(messagePayload);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  const messageEditOptions = {
    components: [
      {
        type: 1,
        components: [
          {
            disabled: true,
            type: 2,
            label: "You've been ponged",
            style: 1,
            customId: interaction.customId,
          },
        ],
      },
    ],
  } as InteractionUpdateOptions;
  await interaction.update(messageEditOptions);
  await interaction.followUp("pong");
});
dotenv.config();
client.login(process.env.TOKEN);
