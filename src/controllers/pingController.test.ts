import { PingController } from "./pingController";

describe("pingController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const pingController = new PingController();
      expect(pingController).not.toBe(undefined);
    });
  });
});
