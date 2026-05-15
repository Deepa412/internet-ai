const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.send("🚀 Internet AI Server is running");
});
// 🌐 AI + Internet endpoint
app.post("/chat", async (req, res) => {
  let msg = req.body.message;

  try {
    // Internet info
    let search = await axios.get(
      `https://api.duckduckgo.com/?q=${msg}&format=json`
    );

    let webInfo = search.data.AbstractText || "No live data found";

    // Ollama AI response
    let ai = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: `
User question: ${msg}

Internet info: ${webInfo}

Answer in simple Hindi:
`
    });

    res.json({ reply: ai.data.response });

  } catch (err) {
    res.json({ reply: "Error in AI system" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
