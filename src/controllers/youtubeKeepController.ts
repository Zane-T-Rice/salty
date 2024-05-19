import { CommandController } from "./commandController";
import { YoutubeKeepAuthorizer } from "../authorizers";
import { YoutubeKeepService } from "../services";
import { YoutubeKeepValidator } from "../validators";

export class YoutubeKeepController extends CommandController {
  constructor() {
    super(new YoutubeKeepAuthorizer(), new YoutubeKeepValidator(), new YoutubeKeepService());
  }
}
