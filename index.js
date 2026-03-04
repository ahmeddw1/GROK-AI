require("dotenv").config();
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const express = require("express");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();

// Load Commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  client.user.setActivity("AI Everywhere 🌍", { type: ActivityType.Playing });
});

// Interaction
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (err) {
    console.error(err);
    if (!interaction.replied)
      await interaction.reply({ content: "❌ Error.", ephemeral: true });
  }
});

// Dashboard API
const app = express();
app.get("/stats", (req, res) => {
  res.json({
    servers: client.guilds.cache.size,
    users: client.users.cache.size
  });
});
app.listen(process.env.PORT || 3000);

client.login(process.env.TOKEN);