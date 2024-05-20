const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ytk")
    .setDescription("Download a premium youtube to the YouTubeKeep folder on the jellyfin server under Zane's desk.")
    .addStringOption((option) =>
      option.setName("args").setDescription("Space delimited urls that yt-dlp should try to download.")
    ),
};
