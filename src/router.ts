import {
  ArchiveThreadButtonInteractionController,
  CommandController,
  InteractionController,
  PingController,
  StartThreadController,
} from "./controllers";
import { ButtonInteraction, Message } from "discord.js";
import { isMention } from "./utils";

export class Router {
  private pingController: PingController;
  private archiveThreadButtonInteractionController: ArchiveThreadButtonInteractionController;
  private startThreadController: StartThreadController;
  private commandsToControllers: {
    [key: string]: CommandController;
  };
  private buttonInteractionsToControllers: {
    [key: string]: InteractionController;
  };

  constructor(
    pingController: PingController,
    archiveThreadButtonInteractionController: ArchiveThreadButtonInteractionController,
    startThreadController: StartThreadController
  ) {
    this.pingController = pingController;
    this.archiveThreadButtonInteractionController = archiveThreadButtonInteractionController;
    this.startThreadController = startThreadController;

    this.commandsToControllers = {
      "!ping": this.pingController,
      "!t": this.startThreadController,
    };

    this.buttonInteractionsToControllers = {
      archiveThreadButton: this.archiveThreadButtonInteractionController,
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
