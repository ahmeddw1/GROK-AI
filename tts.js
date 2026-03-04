const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const googleTTS = require("google-tts-api");
const fetch = require("node-fetch");

async function speak(interaction, text) {
  const channel = interaction.member.voice.channel;
  if (!channel) return interaction.reply("Join VC first.");

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
  });

  const url = googleTTS.getAudioUrl(text.slice(0, 200), { lang: "en" });
  const response = await fetch(url);
  const buffer = await response.buffer();

  const player = createAudioPlayer();
  const resource = createAudioResource(buffer);

  player.play(resource);
  connection.subscribe(player);
}

module.exports = speak;
