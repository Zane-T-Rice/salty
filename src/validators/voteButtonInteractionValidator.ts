import { InteractionValidator } from "./interactionValidator";

export class VoteButtonInteractionValidator extends InteractionValidator {
  validate(): boolean {
    return true;
  }
}
