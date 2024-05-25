import { InteractionController } from "./interactionController";
import { PingAuthorizer } from "../authorizers";
import { PingService } from "../services";
import { PingValidator } from "../validators";

export class PingController extends InteractionController {
  constructor() {
    super(new PingAuthorizer(), new PingValidator(), new PingService());
  }
}
