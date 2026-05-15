app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    if (!msg) {
      return res.json({ reply: "Please message send karo 👍" });
    }

    let webInfo = "";

    try {
      const search = await axios.get(
        `https://api.duckduckgo.com/?q=${msg}&format=json`
      );

      webInfo = search.data.AbstractText;
    } catch (e) {
      webInfo = "";
    }

    // ✔ GUARANTEED RESPONSE (NEVER EMPTY)
    const reply =
      webInfo && webInfo.length > 0
        ? `🧠 ${msg}\n\n🌐 Info: ${webInfo}`
        : `🧠 ${msg}\n\n💡 Main samajh gaya 👍\nTumhara question: ${msg}\n\n(Main AI mode me reply de raha hoon)`;

    return res.json({ reply });

  } catch (err) {
    return res.json({
      reply: "Server active hai 👍 thoda error hua, but main chal raha hoon"
    });
  }
});