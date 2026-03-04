const { SlashCommandBuilder } = require("discord.js");
const runAI = require("../utils/ai");
const createEmbed = require("../utils/embed");
const cooldown = require("../utils/cooldown");
const { getMemory, saveMemory } = require("../utils/memory");
const { getLang } = require("../utils/translate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Ask Grok AI")
    .addStringOption(opt =>
      opt.setName("question")
        .setDescription("Your question")
        .setRequired(true)
    ),

  async execute(interaction) {

    if (cooldown(interaction.user.id, 5))
      return interaction.reply({ content: "⚡ Slow down!", ephemeral: true });

    await interaction.deferReply();

    const question = interaction.options.getString("question");
    const guildId = interaction.guild.id;

    const memory = getMemory(guildId);
    const lang = getLang(guildId);

    const messages = [
      { role: "system", content: `Reply only in ${lang}` },
      ...memory,
      { role: "user", content: question }
    ];

    const reply = await runAI(messages);

    saveMemory(guildId, [
      ...memory,
      { role: "user", content: question },
      { role: "assistant", content: reply }
    ]);

    await interaction.editReply({
      embeds: [createEmbed(reply)]
    });
  }
};
