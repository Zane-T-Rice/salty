import { InteractionController } from "./interactionController";
import { VoteAuthorizer } from "../authorizers";
import { VoteService } from "../services";
import { VoteValidator } from "../validators";

export class VoteController extends InteractionController {
  constructor() {
    super(new VoteAuthorizer(), new VoteValidator(), new VoteService());
  }
}
