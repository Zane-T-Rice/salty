import { CommandValidator } from "./commandValidator";

export class YoutubeValidator extends CommandValidator {
  validate(args: string[]): boolean {
    return args.length > 0;
  }
}
