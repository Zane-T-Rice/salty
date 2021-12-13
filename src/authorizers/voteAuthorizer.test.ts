import { VoteAuthorizer } from "./voteAuthorizer";

describe("VoteAuthorizer", () => {
  const voteAuthorizer = new VoteAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = voteAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
