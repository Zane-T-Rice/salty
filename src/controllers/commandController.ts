import { CommandAuthorizer } from "../authorizers";
import { CommandService } from "../services";
import { CommandValidator } from "../validators";
import { Message } from "discord.js";

export abstract class CommandController {
  private authorizer: CommandAuthorizer;
  private service: CommandService;
  private validator: CommandValidator;

  constructor(
    authorizer: CommandAuthorizer,
    validator: CommandValidator,
    service: CommandService
  ) {
    this.authorizer = authorizer;
    this.service = service;
    this.validator = validator;
  }

  public async handleMessage(args: string[], message: Message): Promise<void> {
    try {
      if (!this.authorizer.authorize(args, message)) return;
      if (!this.validator.validate(args, message)) return;
      await this.service.handleMessage(args, message);
    } catch (error) {
      // Tag it and bag it, but mostly just try not to crash.
      console.error(error);
    }
  }
}
