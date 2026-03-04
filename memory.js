const fs = require("fs");

function getMemory(guildId) {
  const data = JSON.parse(fs.readFileSync("./memory.json"));
  return data[guildId] || [];
}

function saveMemory(guildId, messages) {
  const data = JSON.parse(fs.readFileSync("./memory.json"));
  data[guildId] = messages.slice(-10);
  fs.writeFileSync("./memory.json", JSON.stringify(data, null, 2));
}

module.exports = { getMemory, saveMemory };
