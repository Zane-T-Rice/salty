import { Message } from "discord.js";
import { YoutubeService } from "./youtubeService";
const child_process = require("child_process");
jest.mock("child_process");

describe("youtubeService", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    child_process.exec.mockImplementation((command, callback) => {
      callback(null, { stdout: "" });
    });
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const youtubeService = new YoutubeService();
      expect(youtubeService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should try to download from all given urls", async () => {
      const message = { reply: jest.fn() } as unknown as Message;
      const youtubeService = new YoutubeService();
      await youtubeService.handleMessage(["url", "url2", "url3"], message);
      expect(child_process.exec).toHaveBeenCalledTimes(3);
      expect(message.reply).toHaveBeenCalledWith(
        `Finished downloading url.\nFinished downloading url2.\nFinished downloading url3.`
      );
    });
  });

  describe("handleMessage", () => {
    it("should report any failed downloads", async () => {
      child_process.exec.mockImplementationOnce((command, callback) => {
        throw 1;
      });
      child_process.exec.mockImplementationOnce((command, callback) => {
        throw 1;
      });
      child_process.exec.mockImplementationOnce((command, callback) => {
        throw 1;
      });

      const message = { reply: jest.fn() } as unknown as Message;
      const youtubeService = new YoutubeService();
      await youtubeService.handleMessage(["url", "url2", "url3"], message);
      expect(child_process.exec).toHaveBeenCalledTimes(3);
      expect(message.reply).toHaveBeenCalledWith(
        `Failed to download url.\nFailed to download url2.\nFailed to download url3.`
      );
    });
  });
});
