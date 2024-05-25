import { InteractionController } from "./interactionController";
import { YoutubeAuthorizer } from "../authorizers";
import { YoutubeService } from "../services";
import { YoutubeValidator } from "../validators";

export class YoutubeController extends InteractionController {
  constructor() {
    super(new YoutubeAuthorizer(), new YoutubeValidator(), new YoutubeService());
  }
}
