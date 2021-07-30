import { CommandAuthorizer } from "./commandAuthorizer";

export class PingAuthorizer extends CommandAuthorizer {
  authorize(): boolean {
    return true;
  }
}
