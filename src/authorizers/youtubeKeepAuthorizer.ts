import { CommandAuthorizer } from "./commandAuthorizer";

export class YoutubeKeepAuthorizer extends CommandAuthorizer {
  authorize(): boolean {
    return true;
  }
}
