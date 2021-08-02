import { Interaction } from "discord.js";
import { InteractionController } from "./interactionController";

const authorizer = { authorize: jest.fn() };
const validator = { validate: jest.fn() };
const service = { handleInteraction: jest.fn() };

class interactionControllerImpl extends InteractionController {
  constructor() {
    super(authorizer, validator, service);
  }
}

describe("interactionController", () => {
  beforeEach(() => {
    authorizer.authorize.mockClear();
    validator.validate.mockClear();
    service.handleInteraction.mockClear();
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const interactionController = new interactionControllerImpl();
      expect(interactionController).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    it("should call handleInteraction in the service if validate and authorize return true", () => {
      authorizer.authorize.mockReturnValueOnce(true);
      validator.validate.mockReturnValueOnce(true);
      const interactionController = new interactionControllerImpl();
      interactionController.handleInteraction({} as Interaction);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(service.handleInteraction).toHaveBeenCalledTimes(1);
    });

    it("should not call handleInteraction in the service if validate returns false", () => {
      authorizer.authorize.mockReturnValueOnce(true);
      validator.validate.mockReturnValueOnce(false);
      const interactionController = new interactionControllerImpl();
      interactionController.handleInteraction({} as Interaction);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(1);
      expect(service.handleInteraction).toHaveBeenCalledTimes(0);
    });

    it("should not call handleInteraction in the service if authorize returns false", () => {
      authorizer.authorize.mockReturnValueOnce(false);
      const interactionController = new interactionControllerImpl();
      interactionController.handleInteraction({} as Interaction);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(0);
      expect(service.handleInteraction).toHaveBeenCalledTimes(0);
    });

    it("should handle errors gracefully", () => {
      const error = new Error("mock error");
      authorizer.authorize.mockImplementation(() => {
        throw error;
      });
      console.error = jest.fn();
      const interactionController = new interactionControllerImpl();
      interactionController.handleInteraction({} as Interaction);
      expect(authorizer.authorize).toHaveBeenCalledTimes(1);
      expect(validator.validate).toHaveBeenCalledTimes(0);
      expect(service.handleInteraction).toHaveBeenCalledTimes(0);
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
