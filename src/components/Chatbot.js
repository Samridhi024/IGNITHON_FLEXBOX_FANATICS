// import React, { useState } from "react";

// export default function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const API_URL = "https://ignithon-flexbox-fanatics.onrender.com"; // replace with your deployed URL

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // add user message to chat
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);
    
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await res.json();

//       // add bot reply to chat
//       setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
//     } catch (err) {
//       console.error("Chatbot error:", err);
//       setMessages((prev) => [...prev, { sender: "bot", text: "Oops! Something went wrong." }]);
//     }

//     setInput("");
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, width: 300, background: "#FFF", border: "1px solid #ddd", borderRadius: 8, padding: 10, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
//       <div style={{ maxHeight: 250, overflowY: "auto", marginBottom: 10 }}>
//         {messages.map((msg, i) => (
//           <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
//             <span style={{ background: msg.sender === "user" ? "#FFD54F" : "#eee", padding: "6px 10px", borderRadius: 12, display: "inline-block" }}>{msg.text}</span>
//           </div>
//         ))}
//       </div>
//       <div className="d-flex">
//         <input
//           type="text"
//           className="form-control me-2"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button className="btn btn-primary" onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Welly. Need tips for stress relief, studying smarter, or staying motivated? I’m here to help." }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  // YOUR BACKEND URL (Ensure /chat is there if your python code has @app.route('/chat'))
  const API_URL = "https://ignithon-flexbox-fanatics.onrender.com/ask"; 

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    
    // 1. Add user message & CLEAR INPUT IMMEDIATELY (Fixes the glitch)
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput(""); 
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply || "No response text found." }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops! I couldn't connect to Welly. (Check Backend)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Styles matching your screenshot
  const themeColor = "#00897B"; // The Teal/Green from your screenshot
  const subtleGray = "#F4F4F4";

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999, fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. TOGGLE BUTTON (Visible when chat is closed) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="shadow-lg"
          style={{ 
            width: "60px", 
            height: "60px", 
            borderRadius: "50%", 
            backgroundColor: themeColor, 
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
        >
          <span className="material-icons" style={{ fontSize: "30px" }}>chat</span>
        </button>
      )}

      {/* 2. CHAT WINDOW (Visible when open) */}
      {isOpen && (
        <div className="shadow-lg" style={{ 
          width: "350px", 
          height: "500px", 
          backgroundColor: "#fff", 
          borderRadius: "20px",
          display: "flex", 
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #eee"
        }}>
          
          {/* Header */}
          <div style={{ padding: "15px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "30px", height: "30px", backgroundColor: themeColor, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>W</div>
              <span style={{ fontWeight: "600", color: "#333" }}>WellEd Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#999" }}>
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#fff" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", marginBottom: "15px" }}>
                <div style={{ 
                  maxWidth: "80%", 
                  padding: "12px 16px", 
                  borderRadius: "18px", 
                  backgroundColor: msg.sender === "user" ? themeColor : subtleGray, 
                  color: msg.sender === "user" ? "#fff" : "#333",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  borderBottomRightRadius: msg.sender === "user" ? "4px" : "18px",
                  borderBottomLeftRadius: msg.sender === "bot" ? "4px" : "18px"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
                 <div style={{ padding: "10px 16px", borderRadius: "18px", backgroundColor: subtleGray, color: "#666", fontSize: "12px" }}>
                   typing...
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area (Matches your screenshot exactly) */}
          <div style={{ padding: "15px 20px", borderTop: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", alignItems: "center", backgroundColor: subtleGray, borderRadius: "30px", padding: "5px 5px 5px 20px" }}>
              <input
                type="text"
                placeholder="Ask me something..."
                style={{ 
                  flex: 1, 
                  border: "none", 
                  background: "transparent", 
                  outline: "none", 
                  fontSize: "14px",
                  color: "#333"
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                style={{ 
                  width: "35px", 
                  height: "35px", 
                  borderRadius: "50%", 
                  backgroundColor: themeColor, 
                  border: "none", 
                  color: "white", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  marginLeft: "10px"
                }}
              >
                <span className="material-icons" style={{ fontSize: "18px" }}>send</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
