import { CommandValidator } from "./commandValidator";

export class YoutubeKeepValidator extends CommandValidator {
  validate(args: string[]): boolean {
    return args.length > 0;
  }
}
