import { CommandValidator } from "./commandValidator";

export class StartThreadValidator extends CommandValidator {
  validate(): boolean {
    return true;
  }
}
