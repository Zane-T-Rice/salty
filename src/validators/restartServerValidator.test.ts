import { createInteraction } from "../testUtils";
import { RestartServerValidator } from "./restartServerValidator";

describe("RestartServerValidator", () => {
  const restartValidator = new RestartServerValidator();

  describe("validate", () => {
    it.each([
      // True cases
      { expectedResult: true, name: "0192d27c-0869-749a-9616-61cecea2ad47 0192d27c-0869-749a-9616-61cecea2bc36" },

      // False cases
      { expectedResult: false, name: "not a uuid" },

      // False because of nulls cases
      {
        expectedResult: false,
        name: null,
      },
    ])("should return $expectedResult when name is $name.", async ({ expectedResult, name }) => {
      const result = await restartValidator.validate(createInteraction({ name }));
      expect(result).toBe(expectedResult);
    });
  });
});
