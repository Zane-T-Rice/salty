import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { CommandController } from "./commandController";

const authorizer = { authorize: jest.fn() };
const validator = { validate: jest.fn() };
const service = { handleMessage: jest.fn() };

class CommandControllerImpl extends CommandController {
  constructor() {
    super(authorizer, validator, service);
  }
}

describe("commandController", () => {
  beforeEach(() => {
    authorizer.authorize.mockClear();
    validator.validate.mockClear();
    service.handleMessage.mockClear();
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const commandController = new CommandControllerImpl();
      expect(commandController).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    const options = {
      getString: jest.fn().mockReturnValueOnce(""),
    };
    it("should call handleInteraction in the service if validate and authorize return true", () => {
      authorizer.authorize.mockReturnValueOnce(true);
      validator.validate.mockReturnValueOnce(true);
      const commandController = new CommandControllerImpl();
      commandController.handleInteraction({ options } as unknown as ChatInputCommandInteraction<CacheType>);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(service.handleMessage).toHaveBeenCalledTimes(1);
    });

    it("should not call handleInteraction in the service if validate returns false", () => {
      authorizer.authorize.mockReturnValueOnce(true);
      validator.validate.mockReturnValueOnce(false);
      const commandController = new CommandControllerImpl();
      commandController.handleInteraction({ options } as unknown as ChatInputCommandInteraction<CacheType>);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(service.handleMessage).toHaveBeenCalledTimes(0);
    });

    it("should not call handleInteraction in the service if authorize returns false", () => {
      authorizer.authorize.mockReturnValueOnce(false);
      const commandController = new CommandControllerImpl();
      commandController.handleInteraction({ options } as unknown as ChatInputCommandInteraction<CacheType>);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(0);
      expect(service.handleMessage).toHaveBeenCalledTimes(0);
    });

    it("should handle errors gracefully", () => {
      const error = new Error("mock error");
      authorizer.authorize.mockImplementation(() => {
        throw error;
      });
      console.error = jest.fn();
      const commandController = new CommandControllerImpl();
      commandController.handleInteraction({ options } as unknown as ChatInputCommandInteraction<CacheType>);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(0);
      expect(service.handleMessage).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
