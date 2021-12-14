import { CommandValidator } from "./commandValidator";

export class VoteValidator extends CommandValidator {
  validate(args: string[]): boolean {
    const joined = args.slice(1).join(" ");
    const pipeDelimited = joined.split("|");
    return args.length > 1 && pipeDelimited.length <= 5;
  }
}
