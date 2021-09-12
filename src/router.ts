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
  private commandsToControllers: Map<string, CommandController>;
  private buttonInteractionsToControllers: Map<string, InteractionController>;

  constructor(
    pingController: PingController,
    archiveThreadButtonInteractionController: ArchiveThreadButtonInteractionController,
    startThreadController: StartThreadController
  ) {
    this.pingController = pingController;
    this.archiveThreadButtonInteractionController =
      archiveThreadButtonInteractionController;
    this.startThreadController = startThreadController;

    this.commandsToControllers = new Map<string, CommandController>();
    this.commandsToControllers.set("!ping", this.pingController);
    this.commandsToControllers.set("!t", this.startThreadController);

    this.buttonInteractionsToControllers = new Map<
      string,
      InteractionController
    >();
    this.buttonInteractionsToControllers.set(
      "archiveThreadButton",
      this.archiveThreadButtonInteractionController
    );
  }

  async routeMessage(message: Message): Promise<void> {
    if (message.author?.bot) return;
    let args = message.content.trim().split(" ");
    args = args.filter((arg) => !isMention(arg));
    await this.commandsToControllers.get(args[0])?.handleMessage(args, message);
  }

  async routeButtonInteraction(interaction: ButtonInteraction): Promise<void> {
    const buttonType = interaction.customId.split(":")[0];
    await this.buttonInteractionsToControllers
      .get(buttonType)
      .handleInteraction(interaction);
  }
}
