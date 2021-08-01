import { Message } from "discord.js";
import { PingController, StartThreadController } from "./controllers";
import { isMention } from "./utils";

const commandsToControllers = {
  "!ping": new PingController(),
  "!t": new StartThreadController(),
};

export async function routeMessage(message: Message): Promise<void> {
  if (message.author?.bot) return;
  let args = message.content.trim().split(" ");
  const firstArgWasMention = isMention(args[0]);
  args = args.filter((arg) => !isMention(arg));
  if (firstArgWasMention && args.length > 0) args = ["!t"].concat(args);
  await commandsToControllers[args[0]]?.handleMessage(args, message);
}
