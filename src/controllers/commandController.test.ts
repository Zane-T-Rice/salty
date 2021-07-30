import { Message } from "discord.js";
import { CommandController } from "./commandController";

const validator = { validate: jest.fn() };
const service = { handleMessage: jest.fn() };

class CommandControllerImpl extends CommandController {
  constructor() {
    super(validator, service);
  }
}

describe("commandController", () => {
  beforeEach(() => {
    validator.validate.mockClear();
    service.handleMessage.mockClear();
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const commandController = new CommandControllerImpl();
      expect(commandController).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should call handleMessage in the service if validate return true", () => {
      validator.validate.mockReturnValueOnce(true);
      const commandController = new CommandControllerImpl();
      commandController.handleMessage([], {} as Message);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(service.handleMessage).toHaveBeenCalledTimes(1);
    });

    it("should not call handleMessage in the service if validate return false", () => {
      validator.validate.mockReturnValueOnce(false);
      const commandController = new CommandControllerImpl();
      commandController.handleMessage([], {} as Message);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(service.handleMessage).toHaveBeenCalledTimes(0);
    });
  });
});
