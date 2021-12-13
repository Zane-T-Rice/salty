import { VoteButtonInteractionAuthorizer } from "./voteButtonInteractionAuthorizer";

describe("VoteButtonInteractionAuthorizer", () => {
  const voteButtonInteractionAuthorizer = new VoteButtonInteractionAuthorizer();

  describe("authorize", () => {
    it("should return true", () => {
      const result = voteButtonInteractionAuthorizer.authorize();
      expect(result).toBe(true);
    });
  });
});
