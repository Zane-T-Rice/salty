const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restartserver")
    .setDescription("Restart a server for fun or for function.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the server to restart.")
        .setAutocomplete(true)
        .setRequired(true)
    ),
};
