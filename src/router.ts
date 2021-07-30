import { PingController } from './controllers';

const commandsToControllers = {
  '!ping': new PingController()
};

export const routeMessage = (message: any) => {
  const args = message?.content?.trim()?.split(' ');
  const command = args ?? args[0];
  if (commandsToControllers[command]) commandsToControllers[command].handleMessage(args, message);
};
