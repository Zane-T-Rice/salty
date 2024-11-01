import { InteractionController } from "./interactionController";
import { UpdateServerAuthorizer } from "../authorizers";
import { UpdateServerService } from "../services";
import { UpdateServerValidator } from "../validators";

export class UpdateServerController extends InteractionController {
  constructor() {
    super(new UpdateServerAuthorizer(), new UpdateServerValidator(), new UpdateServerService());
  }
}
