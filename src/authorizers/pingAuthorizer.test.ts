import { PingAuthorizer } from "./pingAuthorizer";

describe("PingAuthorizer", () => {
  const pingAuthorizer = new PingAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = pingAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
