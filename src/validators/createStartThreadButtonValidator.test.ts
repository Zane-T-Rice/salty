import { Channel, Message } from "discord.js";
import { CreateStartThreadButtonValidator } from "./createStartThreadButtonValidator";

describe("CreateStartThreadButtonValidator", () => {
  const createStartThreadButtonValidator =
    new CreateStartThreadButtonValidator();

  describe("validate", () => {
    it("should return true for text channels", () => {
      const channel = {} as Channel;
      channel.isThread = jest.fn().mockReturnValueOnce(false);
      const result = createStartThreadButtonValidator.validate([], {
        channel,
      } as Message);
      expect(result).toBe(true);
    });

    it("should return false for thread channel", () => {
      const channel = {} as Channel;
      channel.isThread = jest.fn().mockReturnValueOnce(true);
      const result = createStartThreadButtonValidator.validate([], {
        channel,
      } as Message);
      expect(result).toBe(false);
    });
  });
});
