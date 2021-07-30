import { CommandController } from "./commandController";
import { PingAuthorizer } from "../authorizers";
import { PingService } from "../services";
import { PingValidator } from "../validators";

export class PingController extends CommandController {
  constructor() {
    super(new PingAuthorizer(), new PingValidator(), new PingService());
  }
}
