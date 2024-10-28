import { RestartServerController } from "./restartServerController";

describe("RestartServerController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const restartServerController = new RestartServerController();
      expect(restartServerController).not.toBe(undefined);
    });
  });
});
