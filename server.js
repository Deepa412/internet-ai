const express = require("express");
const cors = require("cors");

const app = express();

// =====================
// BASIC MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK (VERY IMPORTANT)
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString()
  });
});

// =====================
// ROOT ROUTE
// =====================
app.get("/", (req, res) => {
  res.status(200).send("🚀 Internet AI Server is LIVE");
});

// =====================
// CHAT API (CRASH SAFE + GUARANTEED RESPONSE)
// =====================
app.post("/chat", async (req, res) => {
  try {
    const msg = req.body?.message;

    if (!msg || msg.trim() === "") {
      return res.status(200).json({
        reply: "❗ Please message send karo"
      });
    }

    // ✔ ALWAYS RETURN RESPONSE (NO EXTERNAL FAIL DEPENDENCY)
    return res.status(200).json({
      reply: `🧠 Tumne poocha: ${msg}\n\n💡 Main abhi stable mode me chal raha hoon aur response de raha hoon.`
    });

  } catch (err) {
    return res.status(200).json({
      reply: "⚠️ Server error hua, but main still active hoon"
    });
  }
});

// =====================
// PORT CONFIG (RAILWAY SAFE)
// =====================
const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT not found, waiting for Railway...");
}

app.listen(PORT || 3000, "0.0.0.0", () => {
  console.log("🚀 Server running on port:", PORT || 3000);
});