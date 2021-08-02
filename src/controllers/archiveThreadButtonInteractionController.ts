import { Channels, Threads } from "../apis";
import { ArchiveThreadButtonInteractionAuthorizer } from "../authorizers";
import { ArchiveThreadButtonInteractionService } from "../services";
import { ArchiveThreadButtonInteractionValidator } from "../validators";
import { InteractionController } from "./interactionController";

export class ArchiveThreadButtonInteractionController extends InteractionController {
  constructor() {
    super(
      new ArchiveThreadButtonInteractionAuthorizer(),
      new ArchiveThreadButtonInteractionValidator(),
      new ArchiveThreadButtonInteractionService(new Channels(), new Threads())
    );
  }
}
