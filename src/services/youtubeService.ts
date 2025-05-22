import * as dotenv from "dotenv";
import * as fs from "node:fs";
import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { exec as exec2 } from "child_process";
import { InteractionService } from "./interactionService";
import { isMention } from "../utils";
import { promisify } from "util";
const exec = promisify(exec2);
dotenv.config();

export class YoutubeService implements InteractionService {
  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.deferReply({ flags: MessageFlags.Ephemeral });

    let urls =
      interaction.options
        .getString("urls")
        ?.trim()
        .split(" ")
        .filter((e) => !!e) || [];
    urls = urls.filter((url) => !isMention(url));
    let folder = interaction.options.getString("folder")?.trim();

    const downloadStatusMessages: string[] = [];
    try {
      // Create the folder if it does not already exist.
      if (folder) {
        // List of directories and files in YouTube directory.
        const dirents = fs.readdirSync(process.env.YOUTUBE_DIRECTORY, { withFileTypes: true });

        // If there is no file or directory with the name already, then create the new directory.
        if (!dirents.some((dirent) => dirent.name === folder)) {
          await exec(`mkdir "${process.env.YOUTUBE_DIRECTORY}/${folder}"`);
        }
      }
    } catch (e) {
      downloadStatusMessages.push(
        `Failed to create the requested folder "${folder}". Continuing by using the root folder.\n`
      );
      folder = null;
    }

    const downloadPromises = urls.map(async (url) => {
      try {
        // Now download the video into the requested folder.
        await exec(
          // Downloading directly into the final destination has caused
          // some odd issues. Downloading into /tmp and then moving the
          // completed file to the final destination has been more stable.
          `yt-dlp \
            -P "${process.env.YOUTUBE_DIRECTORY}${folder ? `/${folder}` : ""}" \
            -P "temp:/tmp" \
            -o "%(title).64s [%(id)s].%(ext)s" '${url}'`
        );
        return `Finished downloading <${url}>.`;
      } catch (e) {
        console.error(e);
        return `Failed to download <${url}>.`;
      }
    });

    downloadStatusMessages.push(...(await Promise.all(downloadPromises)));

    // Only refresh the library if something was actually downloaded.
    if (downloadStatusMessages.some((message) => message.match(/^Finished downloading /)?.length > 0)) {
      try {
        await exec(`curl --request POST \
             --url '${process.env.JELLYFIN_URL}/Items/${process.env.YOUTUBE_DIRECTORY_JELLYFIN_ID}/Refresh?metadataRefreshMode=ValidationOnly&imageRefreshMode=None' \
             --header 'Authorization: MediaBrowser Token="${process.env.API_KEY}"'`);
      } catch (e) {
        // Do nothing. The user will just have to wait a bit for jellyfin to sense the file.
      }
    }

    await interaction.editReply({
      content: downloadStatusMessages.join("\n"),
    });
  }

  async handleAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focusedValue = interaction.options.getFocused();
    const choices = fs
      .readdirSync(process.env.YOUTUBE_DIRECTORY, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    const filtered = choices.filter((choice) => choice.startsWith(focusedValue)).slice(0, 25);
    await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
  }
}
