import { CommandService } from './commandService';

export class PingService extends CommandService {
  handleMessage(args: string[], message: any) {
    message.reply('pong');
  };
};
