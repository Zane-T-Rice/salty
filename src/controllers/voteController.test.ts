import { VoteController } from "./voteController";

describe("voteController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const voteController = new VoteController();
      expect(voteController).not.toBe(undefined);
    });
  });
});
