const { EmbedBuilder } = require("discord.js");

let i = 0;
const themes = [
  { color: "#5865F2", emoji: "✨" },
  { color: "#00FF99", emoji: "🔥" },
  { color: "#FF0080", emoji: "🌈" },
  { color: "#FFD700", emoji: "⚡" }
];

function createEmbed(text) {
  const theme = themes[i];
  i = (i + 1) % themes.length;

  return new EmbedBuilder()
    .setColor(theme.color)
    .setTitle(`${theme.emoji} Grok AI`)
    .setDescription(text.slice(0, 4000))
    .setTimestamp();
}

module.exports = createEmbed;
