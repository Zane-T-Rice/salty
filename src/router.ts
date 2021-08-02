import { ButtonInteraction, Message, ThreadChannel } from "discord.js";
import {
  ArchiveThreadButtonInteractionController,
  PingController,
  StartThreadController,
} from "./controllers";
import { isMention } from "./utils";

const commandsToControllers = {
  "!ping": new PingController(),
  "!t": new StartThreadController(),
};

const buttonInteractionsToControllers = {
  // customId: archiveThreadButton:channel.id
  archiveThreadButton: new ArchiveThreadButtonInteractionController(),
};

export async function routeMessage(message: Message): Promise<void> {
  if (message.author?.bot) return;
  let args = message.content.trim().split(" ");
  const firstArgWasMention = isMention(args[0]);
  args = args.filter((arg) => !isMention(arg));
  if (firstArgWasMention && args.length > 0) args = ["!t"].concat(args);
  await commandsToControllers[args[0]]?.handleMessage(args, message);
}

export async function routeButtonInteraction(
  interaction: ButtonInteraction
): Promise<void> {
  const buttonType = interaction.customId.split(":")[0];
  buttonInteractionsToControllers[buttonType].handleInteraction(interaction);
}
