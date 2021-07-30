import { Message } from "discord.js";
import { CommandAuthorizer } from "../authorizers";
import { CommandService } from "../services";
import { CommandValidator } from "../validators";

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

  public handleMessage(args: string[], message: Message): void {
    try {
      if (!this.authorizer.authorize(args, message)) return;
      if (!this.validator.validate(args, message)) return;
      this.service.handleMessage(args, message);
    } catch (error) {
      // Tag it and bag it, but mostly just try not to crash.
      console.error(error);
    }
  }
}
