import { Message } from "discord.js";
import { CommandService } from "../services";
import { CommandValidator } from "../validators";

export abstract class CommandController {
  private validator: CommandValidator;
  private service: CommandService;

  constructor(validator: CommandValidator, service: CommandService) {
    this.validator = validator;
    this.service = service;
  }

  public handleMessage(args: string[], message: Message): void {
    if (!this.validator.validate(args, message)) return;
    this.service.handleMessage(args, message);
  }
}
