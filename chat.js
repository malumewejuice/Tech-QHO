export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    // Call OpenAI API
    const response = await fetch("https://chat-bot-1zax.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // lightweight GPT-4 model
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "⚠️ No response.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
