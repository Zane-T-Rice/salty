import { YoutubeKeepController } from "./youtubeKeepController";

describe("YoutubeKeepController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const youtubeKeepController = new YoutubeKeepController();
      expect(youtubeKeepController).not.toBe(undefined);
    });
  });
});
