import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css"; // We'll put all the CSS from your HTML index here

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatAreaRef = useRef(null);
  const API_BASE = "http://localhost:8080/chatbot"; // Spring Boot API

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const askQuestion = async () => {
    const question = input.trim();
    if (!question) return;

    setInput("");
    addMessage(question, "user");
    setTyping(true);

    try {
      const response = await fetch(`${API_BASE}/nlp/index/answer/1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question, limit: 3 }),
      });
      const data = await response.json();
      setTyping(false);

      let answer = data.answer || "Sorry, I couldn't find an answer.";
      if (answer.includes("Question:") && answer.includes("Answer:")) {
        answer = answer.split("Answer:")[1].trim();
      }

      addMessage(answer, "bot");
    } catch (error) {
      console.error("Error:", error);
      setTyping(false);
      addMessage(
        "⚠️ Error: Could not fetch AI response. Make sure the API server is running.",
        "bot"
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") askQuestion();
  };

  const askSampleQuestion = (question) => {
    setInput(question);
    setTimeout(() => askQuestion(), 100);
  };

  useEffect(() => scrollToBottom(), [messages, typing]);

  return (
    <div className="demo-container">
      <div className="header">
        <h1><i className="fas fa-robot"></i> AI-EGRONX Chatbot</h1>
        <p>Intelligent Q&A powered by RAG and Vector Search</p>
      </div>

      <div className="status-bar">
        <div className="status-item">
          <div className="status-dot"></div>
          <span>System Online</span>
        </div>
        <div className="status-item">
          <i className="fas fa-database"></i>
          <span>Vector DB: Connected</span>
        </div>
        <div className="status-item">
          <i className="fas fa-brain"></i>
          <span>Cohere AI: Active</span>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-area" ref={chatAreaRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <i className="fas fa-comments"></i>
              <h3>Welcome to AI-EGRONX!</h3>
              <p>Ask me anything about the college vision, AI programs, or academic information.</p>
              <div className="sample-questions">
                {[
                  "What is the college vision?",
                  "What is the AI program about?",
                  "Tell me about academic education",
                  "What research fields are covered?"
                ].map((q, idx) => (
                  <div key={idx} className="sample-question" onClick={() => askSampleQuestion(q)}>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <div className="message-avatar">
                <i className={`fas ${msg.sender === "user" ? "fa-user" : "fa-robot"}`}></i>
              </div>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}

          {typing && (
            <div className="typing-indicator">
              <i className="fas fa-robot"></i>
              <span>AI is thinking</span>
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="input-container">
            <input
              type="text"
              className="input-field"
              placeholder="Ask about college vision, AI programs, or academic information..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-button" onClick={askQuestion}>
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
