import { ButtonInteraction, CacheType, Interaction } from "discord.js";
import {
  InteractionController,
  PingController,
  RestartServerController,
  VoteButtonInteractionController,
  VoteController,
  YoutubeController,
} from "./controllers";

export class Router {
  private pingController: PingController;
  private restartServerController: RestartServerController;
  private voteButtonInteractionController: VoteButtonInteractionController;
  private voteController: VoteController;
  private youtubeController: YoutubeController;
  private commandsToControllers: {
    [key: string]: InteractionController;
  };
  private buttonInteractionsToControllers: {
    [key: string]: InteractionController;
  };

  constructor(
    pingController: PingController,
    restartServerController: RestartServerController,
    voteController: VoteController,
    voteButtonInteractionController: VoteButtonInteractionController,
    youtubeController: YoutubeController
  ) {
    this.pingController = pingController;
    this.restartServerController = restartServerController;
    this.voteController = voteController;
    this.voteButtonInteractionController = voteButtonInteractionController;
    this.youtubeController = youtubeController;

    this.commandsToControllers = {
      ping: this.pingController,
      restartserver: this.restartServerController,
      vote: this.voteController,
      yt: this.youtubeController,
    };

    this.buttonInteractionsToControllers = {
      vote: this.voteButtonInteractionController,
    };
  }

  async routeButtonInteraction(interaction: ButtonInteraction): Promise<void> {
    const buttonType = interaction.customId.split(":")[0];
    await this.buttonInteractionsToControllers[buttonType]?.handleInteraction(interaction);
  }

  async routeInteraction(interaction: Interaction<CacheType>): Promise<void> {
    if (interaction.isChatInputCommand())
      await this.commandsToControllers[interaction.commandName]?.handleInteraction(interaction);
    if (interaction.isAutocomplete())
      await this.commandsToControllers[interaction.commandName]?.handleAutocomplete?.(interaction);
  }
}
