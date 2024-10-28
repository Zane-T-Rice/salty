import { PingValidator } from "./pingValidator";

describe("PingValidator", () => {
  const pingValidator = new PingValidator();

  describe("validate", () => {
    it("should return true", async () => {
      const result = await pingValidator.validate();
      expect(result).toBe(true);
    });
  });
});
