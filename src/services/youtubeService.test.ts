import * as child_process from "child_process";
import * as fs from "node:fs";
import { createInteraction } from "../testUtils";
import { YoutubeService } from "./youtubeService";
jest.mock("child_process");
jest.mock("node:fs");

describe("youtubeService", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (child_process.exec as unknown as jest.Mock).mockImplementation((_, callback) => {
      callback(null, { stdout: "" });
    });

    (fs.readdirSync as unknown as jest.Mock).mockImplementation(() => {
      return [{ name: "YouTubeKeep" }, { name: "RabbitAndSteel" }];
    });
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const youtubeService = new YoutubeService();
      expect(youtubeService).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    it("should try to download from all given urls", async () => {
      const interaction = createInteraction({ urls: "url url2 url3", folder: "" });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(3);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        "yt-dlp -o \"/home/zane/mount/Footage/Anime/YouTube/%(title)s [%(id)s].%(ext)s\" 'url'",
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        `Finished downloading url.\nFinished downloading url2.\nFinished downloading url3.`
      );
    });

    it("should try to download from all given urls to the specified folder", async () => {
      const interaction = createInteraction({ urls: "url url2 url3", folder: "folder" });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(4);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        'mkdir "/home/zane/mount/Footage/Anime/YouTube/folder"',
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        2,
        "yt-dlp -o \"/home/zane/mount/Footage/Anime/YouTube/folder/%(title)s [%(id)s].%(ext)s\" 'url'",
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        `Finished downloading url.\nFinished downloading url2.\nFinished downloading url3.`
      );
    });

    it("should try to download from all given urls to the specified existing folder", async () => {
      const interaction = createInteraction({ urls: "url url2 url3", folder: "RabbitAndSteel" });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(3);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        "yt-dlp -o \"/home/zane/mount/Footage/Anime/YouTube/RabbitAndSteel/%(title)s [%(id)s].%(ext)s\" 'url'",
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        `Finished downloading url.\nFinished downloading url2.\nFinished downloading url3.`
      );
    });

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

      const youtubeService = new YoutubeService();
      const interaction = createInteraction({ urls: "url url2 url3", folder: "" });
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(3);
      expect(interaction.editReply).toHaveBeenCalledWith(
        `Failed to download url.\nFailed to download url2.\nFailed to download url3.`
      );
    });

    it("should handle null urls or null folder", async () => {
      const interaction = createInteraction({ urls: null, folder: null });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(0);
      expect(interaction.editReply).toHaveBeenCalledWith("");
    });

    it("should hanlde any failure when creating the requested directory.", async () => {
      (fs.readdirSync as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });

      const youtubeService = new YoutubeService();
      const interaction = createInteraction({ urls: "url url2 url3", folder: "folder" });
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(3);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        "yt-dlp -o \"/home/zane/mount/Footage/Anime/YouTube/%(title)s [%(id)s].%(ext)s\" 'url'",
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        `Failed to create the requested folder "folder". Continuing by using the root folder.\n\nFinished downloading url.\nFinished downloading url2.\nFinished downloading url3.`
      );
    });
  });
});
