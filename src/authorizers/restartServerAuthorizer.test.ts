import { RestartServerAuthorizer } from "./restartServerAuthorizer";

describe("restartServerAuthorizer", () => {
  const restartServerAuthorizer = new RestartServerAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = restartServerAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
