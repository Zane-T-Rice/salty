import { createInteraction } from "../testUtils";
import { YoutubeValidator } from "./youtubeValidator";

describe("YoutubeValidator", () => {
  const youtubeValidator = new YoutubeValidator();

  describe("validate", () => {
    it.each([
      // True cases
      { expectedResult: true, urls: "is a url", folder: "a folder", argUrls: "url", argFolder: "folder" },
      {
        expectedResult: true,
        urls: "are multiple urls",
        folder: "a folder",
        argUrls: "url url url",
        argFolder: "folder",
      },
      { expectedResult: true, urls: "is a url", folder: "no folder", argUrls: "url", argFolder: "" },
      { expectedResult: true, urls: "are multiple urls", folder: "no folder", argUrls: "url url url", argFolder: "" },
      { expectedResult: true, urls: "is a url", folder: "a null folder", argUrls: "url", argFolder: null },

      // False cases
      { expectedResult: false, urls: "is a url", folder: "a bad folder name", argUrls: "url", argFolder: ".." },
      {
        expectedResult: false,
        urls: "are multiple urls",
        folder: "a bad folder name",
        argUrls: "url url url",
        argFolder: "~",
      },
      { expectedResult: false, urls: "is not a url", folder: "there is a folder", argUrls: "", argFolder: "folder" },
      {
        expectedResult: false,
        urls: "is not a url",
        folder: "there is not a folder",
        argUrls: "",
        argFolder: "",
      },

      // False because of nulls cases
      {
        expectedResult: false,
        urls: "is a null urls",
        folder: "there is not a folder",
        argUrls: null,
        argFolder: "",
      },
      {
        expectedResult: false,
        urls: "is a null urls",
        folder: "a null folder",
        argUrls: null,
        argFolder: null,
      },
    ])("should return $expectedResult if there $urls and $folder.", async ({ expectedResult, argUrls, argFolder }) => {
      const result = await youtubeValidator.validate(createInteraction({ urls: argUrls, folder: argFolder }));
      expect(result).toBe(expectedResult);
    });
  });
});
