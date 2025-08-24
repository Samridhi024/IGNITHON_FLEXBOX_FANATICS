export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // ✨ Simple example response
    let reply = "I’m Welly 🌸. You said: " + message;

    res.status(200).json({ response: reply });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
