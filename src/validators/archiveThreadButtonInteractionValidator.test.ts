import { ArchiveThreadButtonInteractionValidator } from "./archiveThreadButtonInteractionValidator";

describe("ArchiveThreadButtonInteractionValidator", () => {
  const archiveThreadButtonInteractionValidator =
    new ArchiveThreadButtonInteractionValidator();

  describe("validate", () => {
    it("should return true", () => {
      const result = archiveThreadButtonInteractionValidator.validate();
      expect(result).toBe(true);
    });
  });
});
