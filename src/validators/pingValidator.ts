import { InteractionValidator } from "./interactionValidator";

export class PingValidator extends InteractionValidator {
  async validate(): Promise<boolean> {
    return true;
  }
}
