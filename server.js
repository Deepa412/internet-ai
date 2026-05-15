const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 📁 Serve frontend (index.html)
app.use(express.static(__dirname));

// 🌐 Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🌐 AI + Internet endpoint
app.post("/chat", async (req, res) => {
  let msg = req.body.message;

  try {
    // Internet info (DuckDuckGo)
    let search = await axios.get(
      `https://api.duckduckgo.com/?q=${msg}&format=json`
    );

    let webInfo =
      search.data.AbstractText || "No live data found from internet";

    // 🤖 Simple AI response (NO crash version)
    let reply = `
🧠 Question: ${msg}

🌐 Internet Info:
${webInfo}

💡 Simple Answer:
${webInfo}
    `;

    res.json({ reply });

  } catch (err) {
    res.json({ reply: "Error in AI system" });
  }
});

// 🚀 PORT (Railway safe)
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});