import { Interaction } from "discord.js";

export abstract class InteractionService {
  abstract handleInteraction(interaction: Interaction): Promise<void>;
}
