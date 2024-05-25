import { InteractionAuthorizer } from "./interactionAuthorizer";

export class VoteAuthorizer extends InteractionAuthorizer {
  authorize(): boolean {
    return true;
  }
}
