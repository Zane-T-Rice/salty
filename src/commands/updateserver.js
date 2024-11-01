const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updateserver")
    .setDescription("Update a server. Useful for fixing client/server version mismatches.")
    .addStringOption((option) =>
      option.setName("name").setDescription("The name of the server to update.").setAutocomplete(true).setRequired(true)
    ),
};
