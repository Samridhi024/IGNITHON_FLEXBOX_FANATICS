// import React, { useState } from "react";
// import "./welly_style.css";

// const Chatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hello! I'm Welly.\nNeed tips for stress relief, studying smarter, or staying motivated? I’m here to help.",
//     },
//   ]);

//   const handleSend = async (msg) => {
//     if (!msg) return;

//     // Add user message
//     setMessages((prev) => [...prev, { sender: "user", text: msg }]);

//     try {
//       // Call backend
//       const response = await fetch("http://localhost:8000/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: msg }),
//       });

//       const data = await response.json();

//       // Add bot response
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: data.response || "Sorry, Welly couldn't respond." },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "Oops! Something went wrong connecting to Welly." },
//       ]);
//     }
//   };

//   return (
//     <>
//       {/* Floating Chatbot Icon */}
//       <div
//         className="chatbot-icon"
//         onClick={() => setOpen(true)}
//         style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
//       >
//         <img
//           src="/well.png"
//           alt="Chatbot"
//           style={{ width: "60px", height: "60px", borderRadius: "50%" }}
//         />
//       </div>

//       {/* Chatbot Popup */}
//       {open && (
//         <div
//           className="chatbot-container"
//           style={{ position: "fixed", bottom: "90px", right: "20px", zIndex: 1000 }}
//         >
//           <div className="chat-header">
//             Welly
//             <button className="close-btn" onClick={() => setOpen(false)}>
//               ×
//             </button>
//           </div>
//           <div className="chat-body" id="chatBody">
//             {messages.map((m, i) => (
//               <div key={i} className={`message ${m.sender}-message`}>
//                 {m.text.split("\n").map((line, idx) => (
//                   <span key={idx}>
//                     {line}
//                     <br />
//                   </span>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div
//   className="chat-input"
//   style={{
//     display: "flex",
//     alignItems: "center",
//     padding: "10px",
//     borderTop: "1px solid #bafdf6",
//   }}
// >
//   <input
//     type="text"
//     placeholder="Ask me something..."
//     style={{
//       flex: 1,
//       padding: "8px",
//       borderRadius: "20px",
//       border: "none",
//       outline: "none",
//       backgroundColor: "#f5f5f5",
//     }}
//     onKeyDown={(e) => {
//       if (e.key === "Enter") {
//         const msg = e.target.value.trim();
//         if (msg) {
//           handleSend(msg);
//           e.target.value = "";
//         }
//       }
//     }}
//   />
//   <div className="bot-icon" style={{ marginLeft: "10px" }}>
//     <img
//       src="/well.png"
//       alt="Chatbot Logo"
//       style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "cover" }}
//     />
//   </div>
// </div>
//       <div
//         className="chatbot-icon"
//         onClick={() => setOpen((prev) => !prev)}   // toggles open/close
//         style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
//       >
//         <img
//           src="/well.png"
//           alt="Chatbot"
//           style={{ width: "60px", height: "60px", borderRadius: "50%" }}
//         />
//       </div>

//       </div>
//       )}
//     </>
//   );
// }

// export default Chatbot;


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
      {/* Floating Chatbot Icon (only one, toggle open/close) */}
      {!open && (
        <div
          className="chatbot-icon"
          onClick={() => setOpen(true)}
          style={{ position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
        >
          <img
            src="/well.png"
            alt="Chatbot"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </div>
      )}

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

          {/* Input Section */}
          <div
            className="chat-input"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderTop: "1px solid #bafdf6",
            }}
          >
            <input
              type="text"
              placeholder="Ask me something..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "20px",
                border: "none",
                outline: "none",
                backgroundColor: "#f5f5f5",
              }}
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
            <div className="bot-icon" style={{ marginLeft: "10px" }}>
              <img
                src="/well.png"
                alt="Chatbot Logo"
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
