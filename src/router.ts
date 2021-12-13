import {
  ArchiveThreadButtonInteractionController,
  CommandController,
  InteractionController,
  PingController,
  StartThreadController,
  VoteButtonInteractionController,
  VoteController,
} from "./controllers";
import { ButtonInteraction, Message } from "discord.js";
import { isMention } from "./utils";

export class Router {
  private pingController: PingController;
  private archiveThreadButtonInteractionController: ArchiveThreadButtonInteractionController;
  private startThreadController: StartThreadController;
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
    archiveThreadButtonInteractionController: ArchiveThreadButtonInteractionController,
    startThreadController: StartThreadController,
    voteController: VoteController,
    voteButtonInteractionController: VoteButtonInteractionController
  ) {
    this.pingController = pingController;
    this.archiveThreadButtonInteractionController = archiveThreadButtonInteractionController;
    this.startThreadController = startThreadController;
    this.voteController = voteController;
    this.voteButtonInteractionController = voteButtonInteractionController;

    this.commandsToControllers = {
      "!ping": this.pingController,
      "!t": this.startThreadController,
      "!vote": this.voteController,
    };

    this.buttonInteractionsToControllers = {
      archiveThreadButton: this.archiveThreadButtonInteractionController,
      vote: this.voteButtonInteractionController,
    };
  }

  async routeMessage(message: Message): Promise<void> {
    if (message.author?.bot) return;
    let args = message.content.trim().split(" ");
    args = args.filter((arg) => !isMention(arg));
    await this.commandsToControllers[args[0]]?.handleMessage(args, message);
  }

  async routeButtonInteraction(interaction: ButtonInteraction): Promise<void> {
    const buttonType = interaction.customId.split(":")[0];
    await this.buttonInteractionsToControllers[buttonType]?.handleInteraction(interaction);
  }
}
