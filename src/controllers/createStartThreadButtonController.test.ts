import { CreateStartThreadButtonController } from "./createStartThreadButtonController";

describe("createStartThreadButtonController", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const createStartThreadButtonController = new CreateStartThreadButtonController();
      expect(createStartThreadButtonController).not.toBe(undefined);
    });
  });
});
