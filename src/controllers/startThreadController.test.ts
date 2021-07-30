import { StartThreadController } from "./startThreadController";

describe("startThreadController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const startThreadController = new StartThreadController();
      expect(startThreadController).not.toBe(undefined);
    });
  });
});
