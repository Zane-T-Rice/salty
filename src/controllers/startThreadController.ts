import { CommandController } from "./commandController";
import { StartThreadAuthorizer } from "../authorizers";
import { StartThreadService } from "../services";
import { StartThreadValidator } from "../validators";
import { Threads } from "../apis";

export class StartThreadController extends CommandController {
  constructor() {
    super(
      new StartThreadAuthorizer(),
      new StartThreadValidator(),
      new StartThreadService(new Threads())
    );
  }
}
