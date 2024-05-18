import { YoutubeValidator } from "./youtubeValidator";

describe("YoutubeValidator", () => {
  const youtubeValidator = new YoutubeValidator();

  describe("validate", () => {
    it("should return true if there is an agrument", () => {
      const result = youtubeValidator.validate([""]);
      expect(result).toBe(true);
    });

    it("should return true if there are multiple agruments", () => {
      const result = youtubeValidator.validate(["", ""]);
      expect(result).toBe(true);
    });

    it("should return false if there is not an agrument", () => {
      const result = youtubeValidator.validate([]);
      expect(result).toBe(false);
    });
  });
});
