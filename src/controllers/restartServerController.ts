import { InteractionController } from "./interactionController";
import { RestartServerAuthorizer } from "../authorizers";
import { RestartServerService } from "../services";
import { RestartServerValidator } from "../validators";

export class RestartServerController extends InteractionController {
  constructor() {
    super(new RestartServerAuthorizer(), new RestartServerValidator(), new RestartServerService());
  }
}
