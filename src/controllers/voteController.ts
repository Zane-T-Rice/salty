import { Messages, Threads } from "../apis";
import { CommandController } from "./commandController";
import { VoteAuthorizer } from "../authorizers";
import { VoteService } from "../services";
import { VoteValidator } from "../validators";

export class VoteController extends CommandController {
  constructor() {
    super(new VoteAuthorizer(), new VoteValidator(), new VoteService());
  }
}
