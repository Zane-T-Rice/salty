export abstract class CommandService {
  abstract handleMessage(args: string[], message: any): void;
}
