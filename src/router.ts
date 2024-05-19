import { ButtonInteraction, CacheType, Interaction } from "discord.js";
import {
  CommandController,
  InteractionController,
  PingController,
  VoteButtonInteractionController,
  VoteController,
  YoutubeController,
  YoutubeKeepController,
} from "./controllers";

export class Router {
  private pingController: PingController;
  private voteButtonInteractionController: VoteButtonInteractionController;
  private voteController: VoteController;
  private youtubeController: YoutubeController;
  private youtubeKeepController: YoutubeKeepController;
  private commandsToControllers: {
    [key: string]: CommandController;
  };
  private buttonInteractionsToControllers: {
    [key: string]: InteractionController;
  };

  constructor(
    pingController: PingController,
    voteController: VoteController,
    voteButtonInteractionController: VoteButtonInteractionController,
    youtubeController: YoutubeController,
    youtubeKeepController: YoutubeKeepController
  ) {
    this.pingController = pingController;
    this.voteController = voteController;
    this.voteButtonInteractionController = voteButtonInteractionController;
    this.youtubeController = youtubeController;
    this.youtubeKeepController = youtubeKeepController;

    this.commandsToControllers = {
      ping: this.pingController,
      vote: this.voteController,
      yt: this.youtubeController,
      ytk: this.youtubeKeepController,
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
    if (!interaction.isChatInputCommand()) return;

    await this.commandsToControllers[interaction.commandName]?.handleInteraction(interaction);
  }
}
