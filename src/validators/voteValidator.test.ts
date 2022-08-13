import { VoteValidator } from "./voteValidator";

describe("VoteValidator", () => {
  const voteValidator = new VoteValidator();

  describe("validate", () => {
    it("should return true for 2 arguments without pipe", () => {
      const result = voteValidator.validate(["one", "two"]);
      expect(result).toBe(true);
    });
    it("should return true for 2 arguments", () => {
      const result = voteValidator.validate(["one", "|", "two"]);
      expect(result).toBe(true);
    });
    it("should return false for 1 arguments", () => {
      const result = voteValidator.validate(["one"]);
      expect(result).toBe(false);
    });
    it("should return false for 26 arguments", () => {
      const args: string[] = [];
      for (let i = 0; i < 25; i++) {
        args.push(...["arg", "|"]);
      }
      const result = voteValidator.validate(args);
      expect(result).toBe(false);
    });
  });
});
