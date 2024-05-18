import { CommandAuthorizer } from "./commandAuthorizer";

export class YoutubeAuthorizer extends CommandAuthorizer {
  authorize(): boolean {
    return true;
  }
}
