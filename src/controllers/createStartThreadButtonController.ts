import { CommandController } from "./commandController";
import { CreateStartThreadButtonAuthorizer } from "../authorizers";
import { CreateStartThreadButtonService } from "../services";
import { CreateStartThreadButtonValidator } from "../validators";

export class CreateStartThreadButtonController extends CommandController {
  constructor() {
    super(
      new CreateStartThreadButtonAuthorizer(),
      new CreateStartThreadButtonValidator(),
      new CreateStartThreadButtonService()
    );
  }
}
