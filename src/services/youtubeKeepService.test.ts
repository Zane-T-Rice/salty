import * as child_process from "child_process";
import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { YoutubeKeepService } from "./youtubeKeepService";
jest.mock("child_process");

describe("youtubeKeepService", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
      callback(null, { stdout: "" });
    });
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const youtubeKeepService = new YoutubeKeepService();
      expect(youtubeKeepService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should try to download from all given urls", async () => {
      const message = {
        deferReply: jest.fn(),
        editReply: jest.fn(),
      } as unknown as ChatInputCommandInteraction<CacheType>;
      const youtubeKeepService = new YoutubeKeepService();
      await youtubeKeepService.handleMessage(["url", "url2", "url3"], message);
      expect(child_process.exec).toHaveBeenCalledTimes(3);
      expect(message.editReply).toHaveBeenCalledWith(
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

      const message = {
        deferReply: jest.fn(),
        editReply: jest.fn(),
      } as unknown as ChatInputCommandInteraction<CacheType>;
      const youtubeKeepService = new YoutubeKeepService();
      await youtubeKeepService.handleMessage(["url", "url2", "url3"], message);
      expect(child_process.exec).toHaveBeenCalledTimes(3);
      expect(message.editReply).toHaveBeenCalledWith(
        `Failed to download url.\nFailed to download url2.\nFailed to download url3.`
      );
    });
  });
});
