import { InteractionValidator } from "./interactionValidator";

export class PingValidator extends InteractionValidator {
  validate(): boolean {
    return true;
  }
}
