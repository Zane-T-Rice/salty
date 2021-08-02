import { Interaction } from "discord.js";

export abstract class InteractionAuthorizer {
  abstract authorize(interaction: Interaction): boolean;
}
