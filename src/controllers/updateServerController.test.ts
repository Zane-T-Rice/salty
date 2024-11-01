import { UpdateServerController } from "./updateServerController";

describe("UpdateServerController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const updateServerController = new UpdateServerController();
      expect(updateServerController).not.toBe(undefined);
    });
  });
});
