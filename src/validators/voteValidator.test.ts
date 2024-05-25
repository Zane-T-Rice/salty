import { createInteraction } from "../testUtils/createInteraction";
import { VoteValidator } from "./voteValidator";

describe("VoteValidator", () => {
  const voteValidator = new VoteValidator();

  describe("validate", () => {
    // True tests
    it("should return true for 2 arguments", () => {
      const result = voteValidator.validate(createInteraction({ args: "one | two" }));
      expect(result).toBe(true);
    });
    it("should return true for 1 arguments", () => {
      const result = voteValidator.validate(createInteraction({ args: "one" }));
      expect(result).toBe(true);
    });

    // False tests
    it("should return false for no arguments", () => {
      const result = voteValidator.validate(createInteraction({ args: "" }));
      expect(result).toBe(false);
    });
    it("should return false for 26 arguments", () => {
      const args: string[] = [];
      for (let i = 0; i <= 25; i++) {
        args.push("arg");
      }
      const result = voteValidator.validate(createInteraction({ args: args.join("|") }));
      expect(result).toBe(false);
    });
    it("should return false for when there is no args string at all", () => {
      const result = voteValidator.validate(createInteraction({}));
      expect(result).toBe(false);
    });
  });
});
