import { VoteButtonInteractionValidator } from "./voteButtonInteractionValidator";

describe("VoteButtonInteractionValidator", () => {
  const voteButtonInteractionValidator = new VoteButtonInteractionValidator();

  describe("validate", () => {
    it("should return true", async () => {
      const result = await voteButtonInteractionValidator.validate();
      expect(result).toBe(true);
    });
  });
});
