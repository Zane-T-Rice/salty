import { Interaction } from "discord.js";

export abstract class InteractionValidator {
  abstract validate(interaction: Interaction): boolean;
}
