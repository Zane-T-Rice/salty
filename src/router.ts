import { ButtonInteraction, CacheType, Interaction } from "discord.js";
import {
  CommandController,
  InteractionController,
  PingController,
  VoteButtonInteractionController,
  VoteController,
} from "./controllers";

export class Router {
  private pingController: PingController;
  private voteButtonInteractionController: VoteButtonInteractionController;
  private voteController: VoteController;
  private commandsToControllers: {
    [key: string]: CommandController;
  };
  private buttonInteractionsToControllers: {
    [key: string]: InteractionController;
  };

  constructor(
    pingController: PingController,
    voteController: VoteController,
    voteButtonInteractionController: VoteButtonInteractionController
  ) {
    this.pingController = pingController;
    this.voteController = voteController;
    this.voteButtonInteractionController = voteButtonInteractionController;

    this.commandsToControllers = {
      ping: this.pingController,
      vote: this.voteController,
    };

    this.buttonInteractionsToControllers = {
      vote: this.voteButtonInteractionController,
    };
  }

  async routeButtonInteraction(interaction: ButtonInteraction): Promise<void> {
    const buttonType = interaction.customId.split(":")[0];
    await this.buttonInteractionsToControllers[buttonType]?.handleInteraction(interaction);
  }

  async routeInteraction(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;

    try {
      await this.commandsToControllers[interaction.commandName]?.handleInteraction(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
  }
}
