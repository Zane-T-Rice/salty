import { CommandService } from "./commandService";
import { exec as exec2 } from "child_process";
import { Message } from "discord.js";
import { promisify } from "util";
const exec = promisify(exec2);

export class YoutubeService extends CommandService {
  async handleMessage(args: string[], message: Message): Promise<void> {
    const downloadPromises = args.map(async (arg) => {
      try {
        await exec(`yt-dlp -o "/home/zane/mount/Footage/Anime/YouTube/%(title)s [%(id)s].%(ext)s" '${arg}'`);
        return `Finished downloading ${arg}.`;
      } catch (e) {
        return `Failed to download ${arg}.`;
      }
    });

    const downloadStatusMessages = await Promise.all(downloadPromises);
    await message.reply(downloadStatusMessages.join("\n"));
  }
}
