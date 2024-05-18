import { YoutubeAuthorizer } from "./youtubeAuthorizer";

describe("YoutubeAuthorizer", () => {
  const pingAuthorizer = new YoutubeAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = pingAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
