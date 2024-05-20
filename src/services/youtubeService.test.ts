import * as child_process from "child_process";
import { Message } from "discord.js";
import { YoutubeService } from "./youtubeService";
jest.mock("child_process");

describe("youtubeService", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
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
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(3);
      expect(message.reply).toHaveBeenCalledWith(
        `Finished downloading url.\nFinished downloading url2.\nFinished downloading url3.`
      );
    });
  });

  describe("handleMessage", () => {
    it("should report any failed downloads", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });

      const message = { reply: jest.fn() } as unknown as Message;
      const youtubeService = new YoutubeService();
      await youtubeService.handleMessage(["url", "url2", "url3"], message);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(3);
      expect(message.reply).toHaveBeenCalledWith(
        `Failed to download url.\nFailed to download url2.\nFailed to download url3.`
      );
    });
  });
});
