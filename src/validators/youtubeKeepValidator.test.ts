import { YoutubeKeepValidator } from "./youtubeKeepValidator";

describe("YoutubeKeepValidator", () => {
  const youtubeKeepValidator = new YoutubeKeepValidator();

  describe("validate", () => {
    it("should return true if there is an agrument", () => {
      const result = youtubeKeepValidator.validate([""]);
      expect(result).toBe(true);
    });

    it("should return true if there are multiple agruments", () => {
      const result = youtubeKeepValidator.validate(["", ""]);
      expect(result).toBe(true);
    });

    it("should return false if there is not an agrument", () => {
      const result = youtubeKeepValidator.validate([]);
      expect(result).toBe(false);
    });
  });
});
