import { Message } from "discord.js";
import { PingController, StartThreadController } from "./controllers";
import { isMention } from "./utils";

const commandsToControllers = {
  "!ping": new PingController(),
  "!t": new StartThreadController(),
};

export async function routeMessage(message: Message) {
  if (message.author?.bot) return;
  let args = message.content.trim().split(" ");
  if (isMention(args[0])) args = ["!t"].concat(args);
  args = args.filter((arg) => !isMention(arg));
  await commandsToControllers[args[0]]?.handleMessage(args, message);
}
