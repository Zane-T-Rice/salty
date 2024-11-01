import { InteractionAuthorizer } from "./interactionAuthorizer";

export class UpdateServerAuthorizer extends InteractionAuthorizer {
  authorize(): boolean {
    return true;
  }
}
