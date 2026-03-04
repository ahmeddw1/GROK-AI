const fs = require("fs");

function getLang(guildId) {
  const data = JSON.parse(fs.readFileSync("./languages.json"));
  return data[guildId] || "English";
}

function setLang(guildId, lang) {
  const data = JSON.parse(fs.readFileSync("./languages.json"));
  data[guildId] = lang;
  fs.writeFileSync("./languages.json", JSON.stringify(data, null, 2));
}

module.exports = { getLang, setLang };
