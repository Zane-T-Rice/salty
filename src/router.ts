import { Message } from "discord.js";
import { PingController, StartThreadController } from "./controllers";

const commandsToControllers = {
  "!ping": new PingController(),
  "!t": new StartThreadController(),
};

export async function routeMessage(message: Message) {
  if (message.author?.bot) return;
  let args = message.content.trim().split(" ");
  // Strip out any mentions in the message
  args = args.filter((arg) => !arg.match(/<@![0-9]+>/));
  await commandsToControllers[args[0]]?.handleMessage(args, message);
}
