import { CommandService } from '../services';
import { CommandValidator } from '../validators';

export abstract class CommandController {
  private validator: CommandValidator;
  private service: CommandService;

  constructor(validator, service) {
    this.validator = validator;
    this.service = service;
  }

  handleMessage(args, message) {
    this.validator.validate(args, message);
    this.service.handleMessage(args, message);
  };
}
