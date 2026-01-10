import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "https://your-render-chatbot-url.onrender.com/message"; // replace with your deployed URL

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      // add bot reply to chat
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
    }

    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, width: 300, background: "#FFF", border: "1px solid #ddd", borderRadius: 8, padding: 10, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
      <div style={{ maxHeight: 250, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
            <span style={{ background: msg.sender === "user" ? "#FFD54F" : "#eee", padding: "6px 10px", borderRadius: 12, display: "inline-block" }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
