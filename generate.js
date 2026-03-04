const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription("Generate AI Video")
    .addStringOption(opt =>
      opt.setName("prompt")
        .setDescription("Describe the video")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const prompt = interaction.options.getString("prompt");

    try {
      const res = await axios.post(
        "https://api.x.ai/v1/videos/generations",
        {
          model: "grok-video-latest",
          prompt
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROK_API_KEY}`
          }
        }
      );

      const videoUrl = res.data.data[0].url;

      await interaction.editReply(`🎬 Video ready:\n${videoUrl}`);

    } catch (err) {
      console.error(err);
      await interaction.editReply("❌ Video generation failed.");
    }
  }
};
