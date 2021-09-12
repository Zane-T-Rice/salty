import { ArchiveThreadButtonInteractionController } from "./archiveThreadButtonInteractionController";

describe("archiveThreadButtonInteractionController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const archiveThreadButtonInteractionController = new ArchiveThreadButtonInteractionController();
      expect(archiveThreadButtonInteractionController).not.toBe(undefined);
    });
  });
});
