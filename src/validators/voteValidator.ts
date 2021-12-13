import { CommandValidator } from "./commandValidator";

export class VoteValidator extends CommandValidator {
  validate(args: string[]): boolean {
    return args.length > 1 && args.length <= 6;
  }
}
