const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Poll the audience.")
    .addStringOption((option) =>
      option.setName("args").setDescription("Pipe delimited list of options in the poll.").setRequired(true)
    ),
};
