import { CommandAuthorizer } from "../authorizers";
import { CommandService } from "../services";
import { CommandValidator } from "../validators";
import { CacheType, ChatInputCommandInteraction, Message } from "discord.js";
import { isMention } from "../utils";

export abstract class CommandController {
  private authorizer: CommandAuthorizer;
  private service: CommandService;
  private validator: CommandValidator;

  constructor(authorizer: CommandAuthorizer, validator: CommandValidator, service: CommandService) {
    this.authorizer = authorizer;
    this.service = service;
    this.validator = validator;
  }

  public async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    let args = interaction.options.getString("args")?.trim().split(" ") || [];
    args = args.filter((arg) => !isMention(arg));

    try {
      if (!this.authorizer.authorize(args, interaction)) return;
      if (!this.validator.validate(args, interaction)) return;
      await this.service.handleMessage(args, interaction);
    } catch (error) {
      // Tag it and bag it, but mostly just try not to crash.
      console.error(error);
    }
  }
}
