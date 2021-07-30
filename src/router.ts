import { Message } from "discord.js";
import { PingController, StartThreadController } from "./controllers";

const commandsToControllers = {
  "!ping": new PingController(),
  "!t": new StartThreadController(),
};

export async function routeMessage(message: Message) {
  if (message.author?.bot) return;
  const args = message.content.trim().split(" ");
  await commandsToControllers[args[0]]?.handleMessage(args, message);
}
