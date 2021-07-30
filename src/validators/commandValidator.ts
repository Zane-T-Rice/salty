export abstract class CommandValidator {
  abstract validate(args: string[], message: any): boolean;
}
