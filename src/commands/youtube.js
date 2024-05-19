const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Download a youtube to the jellyfin server under Zane's desk.")
    .addStringOption((option) =>
      option.setName("args").setDescription("Space delimited urls that yt-dlp should try to download.")
    ),
};
