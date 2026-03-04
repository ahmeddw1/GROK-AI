const axios = require("axios");

async function runAI(messages) {
  const res = await axios.post(
    "https://api.x.ai/v1/chat/completions",
    {
      model: "grok-2-latest",
      messages
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROK_API_KEY}`
      }
    }
  );

  return res.data.choices[0].message.content;
}

module.exports = runAI;
