const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("imagine")
    .setDescription("Generate AI Image")
    .addStringOption(opt =>
      opt.setName("prompt")
        .setDescription("Describe the image")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const prompt = interaction.options.getString("prompt");

    try {
      const res = await axios.post(
        "https://api.x.ai/v1/images/generations",
        {
          model: "grok-vision-latest",
          prompt
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROK_API_KEY}`
          }
        }
      );

      const imageUrl = res.data.data[0].url;

      await interaction.editReply(imageUrl);

    } catch (err) {
      console.error(err);
      await interaction.editReply("❌ Image generation failed.");
    }
  }
};
