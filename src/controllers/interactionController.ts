import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";
import { InteractionAuthorizer } from "../authorizers";
import { InteractionService } from "../services";
import { InteractionValidator } from "../validators";

export abstract class InteractionController {
  protected authorizer: InteractionAuthorizer;
  protected service: InteractionService;
  protected validator: InteractionValidator;

  constructor(authorizer: InteractionAuthorizer, validator: InteractionValidator, service: InteractionService) {
    this.authorizer = authorizer;
    this.service = service;
    this.validator = validator;
  }

  public async handleInteraction(
    interaction: ChatInputCommandInteraction<CacheType> | ButtonInteraction
  ): Promise<void> {
    try {
      if (!this.authorizer.authorize(interaction)) return;
      if (!this.validator.validate(interaction)) return;
      await this.service.handleInteraction(interaction);
    } catch (error) {
      // Tag it and bag it, but mostly just try not to crash.
      console.error(error);
    }
  }
}
