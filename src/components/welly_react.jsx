import React, { useState } from "react";
import "./welly_style.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Welly.\nNeed tips for stress relief, studying smarter, or staying motivated? I’m here to help.",
    },
  ]);

  const handleSend = async (msg) => {
    if (!msg) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);

    try {
      // Call backend
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.response || "Sorry, Welly couldn't respond." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong connecting to Welly." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div
        className="chatbot-icon"
        onClick={() => setOpen(true)}
        style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
      >
        <img
          src="/wellie-fotor-bg-remover-2025082413644.png"
          alt="Chatbot"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />
      </div>

      {/* Chatbot Popup */}
      {open && (
        <div
          className="chatbot-container"
          style={{ position: "fixed", bottom: "90px", right: "20px", zIndex: 1000 }}
        >
          <div className="chat-header">
            Welly
            <button className="close-btn" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="chat-body" id="chatBody">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.sender}-message`}>
                {m.text.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const msg = e.target.value.trim();
                  if (msg) {
                    handleSend(msg);
                    e.target.value = "";
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
