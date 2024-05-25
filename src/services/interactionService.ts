import { AutocompleteInteraction, Interaction } from "discord.js";

export interface InteractionService {
  handleInteraction(interaction: Interaction): Promise<void>;
  handleAutocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}
