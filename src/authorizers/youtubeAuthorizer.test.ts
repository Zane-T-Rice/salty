import { YoutubeAuthorizer } from "./youtubeAuthorizer";

describe("YoutubeAuthorizer", () => {
  const youtubeAuthorizer = new YoutubeAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = youtubeAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
