import { InteractionAuthorizer } from "./interactionAuthorizer";

export class PingAuthorizer extends InteractionAuthorizer {
  authorize(): boolean {
    return true;
  }
}
