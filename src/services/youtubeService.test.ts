import * as child_process from "child_process";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import { createAutocompleteInteraction } from "../testUtils/createAutocompleteInteraction";
import { createInteraction } from "../testUtils";
import { YoutubeService } from "./youtubeService";
jest.mock("child_process");
jest.mock("node:fs");

const createEditReply = (content: string) => ({
  content,
});

describe("youtubeService", () => {
  beforeAll(() => {
    dotenv.config();
  });

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
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(4);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        `yt-dlp -o "${process.env.YOUTUBE_DIRECTORY}/%(title)s [%(id)s].%(ext)s" 'url'`,
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        4,
        `curl --request POST              --url '${process.env.JELLYFIN_URL}/Items/${process.env.YOUTUBE_DIRECTORY_JELLYFIN_ID}/Refresh?metadataRefreshMode=ValidationOnly&imageRefreshMode=None'              --header 'Authorization: MediaBrowser Token="${process.env.API_KEY}"'`,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(`Finished downloading <url>.\nFinished downloading <url2>.\nFinished downloading <url3>.`)
      );
    });

    it("should try to download from all given urls to the specified folder", async () => {
      const interaction = createInteraction({ urls: "url url2 url3", folder: "folder" });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(5);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        `mkdir "${process.env.YOUTUBE_DIRECTORY}/folder"`,
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        2,
        `yt-dlp -o "${process.env.YOUTUBE_DIRECTORY}/folder/%(title)s [%(id)s].%(ext)s" 'url'`,
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        5,
        `curl --request POST              --url '${process.env.JELLYFIN_URL}/Items/${process.env.YOUTUBE_DIRECTORY_JELLYFIN_ID}/Refresh?metadataRefreshMode=ValidationOnly&imageRefreshMode=None'              --header 'Authorization: MediaBrowser Token="${process.env.API_KEY}"'`,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(`Finished downloading <url>.\nFinished downloading <url2>.\nFinished downloading <url3>.`)
      );
    });

    it("should try to download from all given urls to the specified existing folder", async () => {
      const interaction = createInteraction({ urls: "url url2 url3", folder: "RabbitAndSteel" });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(4);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        `yt-dlp -o "${process.env.YOUTUBE_DIRECTORY}/RabbitAndSteel/%(title)s [%(id)s].%(ext)s" 'url'`,
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        4,
        `curl --request POST              --url '${process.env.JELLYFIN_URL}/Items/${process.env.YOUTUBE_DIRECTORY_JELLYFIN_ID}/Refresh?metadataRefreshMode=ValidationOnly&imageRefreshMode=None'              --header 'Authorization: MediaBrowser Token="${process.env.API_KEY}"'`,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(`Finished downloading <url>.\nFinished downloading <url2>.\nFinished downloading <url3>.`)
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
        createEditReply(`Failed to download <url>.\nFailed to download <url2>.\nFailed to download <url3>.`)
      );
    });

    it("should handle null urls or null folder", async () => {
      const interaction = createInteraction({ urls: null, folder: null });
      const youtubeService = new YoutubeService();
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(0);
      expect(interaction.editReply).toHaveBeenCalledWith(createEditReply(""));
    });

    it("should handle any failure when creating the requested directory.", async () => {
      (fs.readdirSync as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });

      const youtubeService = new YoutubeService();
      const interaction = createInteraction({ urls: "url url2 url3", folder: "folder" });
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(4);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        `yt-dlp -o "${process.env.YOUTUBE_DIRECTORY}/%(title)s [%(id)s].%(ext)s" 'url'`,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(
          `Failed to create the requested folder "folder". Continuing by using the root folder.\n\nFinished downloading <url>.\nFinished downloading <url2>.\nFinished downloading <url3>.`
        )
      );
    });

    it("should handle any failure when requesting a refresh of the YouTube library.", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: "" });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: "" });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: "" });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: "" });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce(() => {
        throw 1;
      });

      const youtubeService = new YoutubeService();
      const interaction = createInteraction({ urls: "url url2 url3", folder: "folder" });
      await youtubeService.handleInteraction(interaction);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(5);
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        1,
        `mkdir "${process.env.YOUTUBE_DIRECTORY}/folder"`,
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        2,
        `yt-dlp -o "${process.env.YOUTUBE_DIRECTORY}/folder/%(title)s [%(id)s].%(ext)s" 'url'`,
        expect.any(Function)
      );
      expect(child_process.exec as unknown as jest.Mock).toHaveBeenNthCalledWith(
        5,
        `curl --request POST              --url '${process.env.JELLYFIN_URL}/Items/${process.env.YOUTUBE_DIRECTORY_JELLYFIN_ID}/Refresh?metadataRefreshMode=ValidationOnly&imageRefreshMode=None'              --header 'Authorization: MediaBrowser Token="${process.env.API_KEY}"'`,
        expect.any(Function)
      );
      expect(interaction.editReply).toHaveBeenCalledWith(
        createEditReply(`Finished downloading <url>.\nFinished downloading <url2>.\nFinished downloading <url3>.`)
      );
    });
  });

  describe("handleAutocomplete", () => {
    it("Should suggest possible existing folder names", async () => {
      (fs.readdirSync as unknown as jest.Mock).mockImplementationOnce(() => [
        { name: "RabbitAndSteel", isDirectory: () => true },
        { name: "Decino", isDirectory: () => true },
        { name: "YouTubeKeep", isDirectory: () => true },
        { name: "Best of the Worst", isDirectory: () => false },
      ]);

      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("");
      const youtubeService = new YoutubeService();
      await youtubeService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "RabbitAndSteel",
          value: "RabbitAndSteel",
        },
        {
          name: "Decino",
          value: "Decino",
        },
        {
          name: "YouTubeKeep",
          value: "YouTubeKeep",
        },
      ]);
    });

    it("Should suggest possible existing folder names based on current input", async () => {
      (fs.readdirSync as unknown as jest.Mock).mockImplementationOnce(() => [
        { name: "RabbitAndSteel", isDirectory: () => true },
        { name: "Decino", isDirectory: () => true },
        { name: "YouTubeKeep", isDirectory: () => true },
        { name: "Best of the Worst", isDirectory: () => false },
      ]);

      const interaction = createAutocompleteInteraction();
      (interaction.options.getFocused as unknown as jest.Mock).mockReturnValueOnce("D");
      const youtubeService = new YoutubeService();
      await youtubeService.handleAutocomplete(interaction);

      expect(interaction.options.getFocused).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledTimes(1);
      expect(interaction.respond).toHaveBeenCalledWith([
        {
          name: "Decino",
          value: "Decino",
        },
      ]);
    });
  });
});
