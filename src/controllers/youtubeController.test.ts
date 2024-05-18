import { YoutubeController } from "./youtubeController";

describe("youtubeController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const youtubeController = new YoutubeController();
      expect(youtubeController).not.toBe(undefined);
    });
  });
});
