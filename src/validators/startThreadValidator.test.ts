import { Channel, Message } from "discord.js";
import { StartThreadValidator } from "./startThreadValidator";

describe("StartThreadValidator", () => {
  const startThreadValidator = new StartThreadValidator();

  describe("validate", () => {
    it("should return true for text channels", () => {
      const channel = {} as Channel;
      channel.isThread = jest.fn().mockReturnValueOnce(false);
      const result = startThreadValidator.validate([], { channel } as Message);
      expect(result).toBe(true);
    });

    it("should return false for thread channel", () => {
      const channel = {} as Channel;
      channel.isThread = jest.fn().mockReturnValueOnce(true);
      const result = startThreadValidator.validate([], { channel } as Message);
      expect(result).toBe(false);
    });
  });
});
