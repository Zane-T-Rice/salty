import { VoteButtonInteractionController } from "./voteButtonInteractionController";

describe("voteButtonInteractionController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const voteButtonInteractionController = new VoteButtonInteractionController();
      expect(voteButtonInteractionController).not.toBe(undefined);
    });
  });
});
