import { PingValidator } from "./pingValidator";

describe("PingValidator", () => {
  const pingValidator = new PingValidator();

  describe("validate", () => {
    it("should return true", () => {
      const result = pingValidator.validate();
      expect(result).toBe(true);
    });
  });
});
