import { CommandAuthorizer } from "./commandAuthorizer";

export class VoteAuthorizer extends CommandAuthorizer {
  authorize(): boolean {
    return true;
  }
}
