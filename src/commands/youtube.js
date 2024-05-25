const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yt")
    .setDescription("Download a youtube to the jellyfin server under Zane's desk.")
    .addStringOption((option) =>
      option
        .setName("urls")
        .setDescription("Space delimited urls that yt-dlp should try to download.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("folder")
        .setDescription("Blank uses the root YouTube folder. Must match /^[a-zA-Z0-9_ ]*$/.")
        .setAutocomplete(true)
        .setRequired(false)
    ),
};
