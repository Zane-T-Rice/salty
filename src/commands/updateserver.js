const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updateserver")
    .setDescription(
      "Update a server. Only useful if there is a client/server version mismatch. Otherwise, you probably want to use /restartserver."
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("The name of the server to update.").setAutocomplete(true).setRequired(true)
    ),
};
