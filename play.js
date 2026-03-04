const { SlashCommandBuilder } = require("discord.js");
const { Player } = require("discord-player");

let player;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play music")
    .addStringOption(opt =>
      opt.setName("song")
        .setDescription("Song name or URL")
        .setRequired(true)
    ),

  async execute(interaction, client) {

    if (!player) player = new Player(client);

    const channel = interaction.member.voice.channel;
    if (!channel)
      return interaction.reply("❌ Join a voice channel first.");

    await interaction.deferReply();

    const queue = player.nodes.create(interaction.guild);

    if (!queue.connection)
      await queue.connect(channel);

    const song = interaction.options.getString("song");
    await queue.play(song);

    await interaction.editReply(`🎵 Playing: ${song}`);
  }
};