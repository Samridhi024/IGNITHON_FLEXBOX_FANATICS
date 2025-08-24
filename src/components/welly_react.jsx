// src/components/Chatbot.jsx
import React, { useState } from "react";
import "./welly_style.css"; // paste your CSS here

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div
        className="chatbot-icon"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
        }}
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
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <div className="chat-header">
            Welly
            <button className="close-btn" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="chat-body" id="chatBody">
            <div className="message bot-message">
              Hello! I'm Welly. <br />
              Need tips for stress relief, studying smarter, or staying
              motivated? I’m here to help.
            </div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              id="userInput"
              placeholder="Ask me something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const msg = e.target.value.trim();
                  if (msg) {
                    const chatBody = document.getElementById("chatBody");
                    const div = document.createElement("div");
                    div.className = "message user-message";
                    div.textContent = msg;
                    chatBody.appendChild(div);
                    chatBody.scrollTop = chatBody.scrollHeight;
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
