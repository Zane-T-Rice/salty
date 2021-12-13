import { VoteValidator } from "./voteValidator";

describe("VoteValidator", () => {
  const voteValidator = new VoteValidator();

  describe("validate", () => {
    it("should return true for 2 arguments", () => {
      const result = voteValidator.validate(["one", "two"]);
      expect(result).toBe(true);
    });
    it("should return false for 1 arguments", () => {
      const result = voteValidator.validate(["one"]);
      expect(result).toBe(false);
    });
    it("should return false for 7 arguments", () => {
      const result = voteValidator.validate(["one", "two", "three", "four", "five", "six", "seven"]);
      expect(result).toBe(false);
    });
  });
});
