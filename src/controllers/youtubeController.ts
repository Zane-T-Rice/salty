import { CommandController } from "./commandController";
import { YoutubeAuthorizer } from "../authorizers";
import { YoutubeService } from "../services";
import { YoutubeValidator } from "../validators";

export class YoutubeController extends CommandController {
  constructor() {
    super(new YoutubeAuthorizer(), new YoutubeValidator(), new YoutubeService());
  }
}
