import { CommandValidator } from "./commandValidator";

export class VoteValidator extends CommandValidator {
  validate(args: string[]): boolean {
    const joined = args.join(" ");
    const pipeDelimited = joined.split("|");
    return pipeDelimited.length >= 0 && pipeDelimited.length <= 25;
  }
}
