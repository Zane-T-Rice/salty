import * as fs from "node:fs";
import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";
import { exec as exec2 } from "child_process";
import { InteractionService } from "./interactionService";
import { isMention } from "../utils";
import { promisify } from "util";
const exec = promisify(exec2);

export class YoutubeService implements InteractionService {
  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    interaction.deferReply();

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
        const dirents = fs.readdirSync("/home/zane/mount/Footage/Anime/YouTube", { withFileTypes: true });

        // If there is no file or directory with the name already, then create the new directory.
        if (!dirents.some((dirent) => dirent.name === folder)) {
          await exec(`mkdir "/home/zane/mount/Footage/Anime/YouTube/${folder}"`);
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
          `yt-dlp -o "/home/zane/mount/Footage/Anime/YouTube${folder ? `/${folder}` : ""}/%(title)s [%(id)s].%(ext)s" '${url}'`
        );
        return `Finished downloading ${url}.`;
      } catch (e) {
        return `Failed to download ${url}.`;
      }
    });

    downloadStatusMessages.push(...(await Promise.all(downloadPromises)));
    await interaction.editReply(downloadStatusMessages.join("\n"));
  }

  async handleAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focusedValue = interaction.options.getFocused();
    const choices = fs
      .readdirSync("/home/zane/mount/Footage/Anime/YouTube", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    const filtered = choices.filter((choice) => choice.startsWith(focusedValue)).slice(0, 25);
    await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
  }
}
