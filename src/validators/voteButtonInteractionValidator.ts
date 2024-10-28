import { InteractionValidator } from "./interactionValidator";

export class VoteButtonInteractionValidator extends InteractionValidator {
  async validate(): Promise<boolean> {
    return true;
  }
}
