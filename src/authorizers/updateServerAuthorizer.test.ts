import { UpdateServerAuthorizer } from "./updateServerAuthorizer";

describe("updateServerAuthorizer", () => {
  const updateServerAuthorizer = new UpdateServerAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = updateServerAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
