import { StartThreadValidator } from "./startThreadValidator";

describe("StartThreadValidator", () => {
  const startThreadValidator = new StartThreadValidator();

  describe("validate", () => {
    it("should return true", () => {
      const result = startThreadValidator.validate();
      expect(result).toBe(true);
    });
  });
});
