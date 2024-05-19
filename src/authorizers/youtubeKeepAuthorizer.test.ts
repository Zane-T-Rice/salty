import { YoutubeKeepAuthorizer } from "./youtubeKeepAuthorizer";

describe("YoutubeKeepAuthorizer", () => {
  const youtubeKeepAuthorizer = new YoutubeKeepAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = youtubeKeepAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
