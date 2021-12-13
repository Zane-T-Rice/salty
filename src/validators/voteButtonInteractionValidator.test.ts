import { VoteButtonInteractionValidator } from "./voteButtonInteractionValidator";

describe("VoteButtonInteractionValidator", () => {
  const voteButtonInteractionValidator = new VoteButtonInteractionValidator();

  describe("validate", () => {
    it("should return true", () => {
      const result = voteButtonInteractionValidator.validate();
      expect(result).toBe(true);
    });
  });
});
