import { Message, TextChannel, ThreadChannel } from "discord.js";
import { StartThreadValidator } from "./startThreadValidator";

describe("StartThreadValidator", () => {
  const startThreadValidator = new StartThreadValidator();

  describe("validate", () => {
    it("should return true for text channels", () => {
      const result = startThreadValidator.validate([], {
        channel: {
          type: "GUILD_TEXT",
        } as TextChannel,
      } as Message);
      expect(result).toBe(true);
    });

    it("should return false for thread channel", () => {
      const message = {
        channel: {
          type: "GUILD_PUBLIC_THREAD",
        } as ThreadChannel,
      } as Message;
      const result = startThreadValidator.validate([], message);
      expect(result).toBe(false);
    });
  });
});
