import { InteractionAuthorizer } from "./interactionAuthorizer";

export class RestartServerAuthorizer extends InteractionAuthorizer {
  authorize(): boolean {
    return true;
  }
}
