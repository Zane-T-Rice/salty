import { Message } from "discord.js";
import { PingController } from "./controllers";

const commandsToControllers = {
  "!ping": new PingController(),
};

export const routeMessage = (message: Message): void => {
  const args = message.content.trim().split(" ");
  commandsToControllers[args[0]]?.handleMessage(args, message);
};
