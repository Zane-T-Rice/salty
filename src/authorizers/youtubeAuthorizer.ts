import { InteractionAuthorizer } from "./interactionAuthorizer";

export class YoutubeAuthorizer extends InteractionAuthorizer {
  authorize(): boolean {
    return true;
  }
}
