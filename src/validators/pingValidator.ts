import { CommandValidator } from "./commandValidator";

export class PingValidator extends CommandValidator {
  validate(): boolean {
    return true;
  }
}
