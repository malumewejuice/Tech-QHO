import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // Fast + cheaper than GPT-4o
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "⚠️ Error contacting AI server." });
  }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
