import { InteractionAuthorizer } from "./interactionAuthorizer";

export class VoteButtonInteractionAuthorizer extends InteractionAuthorizer {
  authorize(): boolean {
    return true;
  }
}
