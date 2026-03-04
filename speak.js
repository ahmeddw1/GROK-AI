const { SlashCommandBuilder } = require("discord.js");
const speak = require("../utils/tts");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("speak")
    .setDescription("AI speaks in VC")
    .addStringOption(opt =>
      opt.setName("text")
        .setDescription("Text to speak")
        .setRequired(true)
    ),

  async execute(interaction) {
    const text = interaction.options.getString("text");
    await interaction.reply("🔊 Speaking...");
    await speak(interaction, text);
  }
};
