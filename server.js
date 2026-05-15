const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✔ SAFE STATIC FILE HANDLING
app.use(express.static(path.join(__dirname)));

// ✔ HOME ROUTE (safe)
app.get("/", (req, res) => {
  res.send("🚀 Internet AI Server is Running");
});

// ✔ CHAT ENDPOINT (CRASH SAFE)
app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    if (!msg) {
      return res.json({ reply: "No message received" });
    }

    const search = await axios.get(
      `https://api.duckduckgo.com/?q=${msg}&format=json`
    );

    const webInfo =
      search.data.AbstractText || "No internet info found";

    return res.json({
      reply: `🧠 Question: ${msg}\n\n🌐 Info: ${webInfo}`
    });

  } catch (err) {
    return res.json({ reply: "Server error occurred" });
  }
});

// ✔ IMPORTANT PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});