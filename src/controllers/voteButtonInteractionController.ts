import { InteractionController } from "./interactionController";
import { VoteButtonInteractionAuthorizer } from "../authorizers";
import { VoteButtonInteractionService } from "../services";
import { VoteButtonInteractionValidator } from "../validators";

export class VoteButtonInteractionController extends InteractionController {
  constructor() {
    super(
      new VoteButtonInteractionAuthorizer(),
      new VoteButtonInteractionValidator(),
      new VoteButtonInteractionService()
    );
  }
}
