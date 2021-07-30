import { CommandValidator } from './commandValidator';

export class PingValidator extends CommandValidator {
  validate(args: string[], message: any) : boolean {
    return true;
  };
};
