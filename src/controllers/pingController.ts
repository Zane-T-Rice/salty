import { CommandController } from './commandController';
import { PingValidator } from '../validators';
import { PingService } from '../services';

export class PingController extends CommandController {
  constructor() {
    super(new PingValidator, new PingService);
  }
}
