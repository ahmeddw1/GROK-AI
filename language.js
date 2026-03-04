const { SlashCommandBuilder } = require("discord.js");
const { setLang } = require("../utils/translate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("Set bot language")
    .addStringOption(opt =>
      opt.setName("lang")
        .setDescription("English, Arabic, French, etc")
        .setRequired(true)
    ),

  async execute(interaction) {
    const lang = interaction.options.getString("lang");
    setLang(interaction.guild.id, lang);
    await interaction.reply(`🌍 Language set to ${lang}`);
  }
};
