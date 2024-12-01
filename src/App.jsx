import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState(""); 
  const [activeChatId, setActiveChatId] = useState(null); 

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { text: input, sender: "user" };
    const botResponse = getBotResponse(input);

    if (activeChatId === null) {
      const newChat = {
        chatId: chatHistory.length + 1,
        messages: [newMessage, { text: botResponse, sender: "bot" }],
      };
      setChatHistory([...chatHistory, newChat]);
      setActiveChatId(newChat.chatId);
      setMessages(newChat.messages);
    } else {
    
      const newMessages = [...messages, newMessage, { text: botResponse, sender: "bot" }];
      setMessages(newMessages);

      setChatHistory((prevHistory) =>
        prevHistory.map((chat) =>
          chat.chatId === activeChatId
            ? { ...chat, messages: newMessages }
            : chat
        )
      );
    }

    setInput(""); 
  };


  const handleStartNewChat = () => {
    const newChat = {
      chatId: chatHistory.length + 1 ,
      messages: [], 
    };
    setChatHistory([...chatHistory, newChat]);
    setActiveChatId(newChat.chatId); 
    setMessages([]); 
  };


  const getBotResponse = (input) => {
    const responses = {
      hello: "Hi there! How can I help you?",
      bye: "Goodbye! Have a great day!",
      thanks: "You're welcome!",
    };

    const normalizedInput = input.toLowerCase();
    return responses[normalizedInput] || "I am sorry, I don't understand that.";
  };

  return (
    <div className="app">
      {/* sidebar */}
      <div className="sidebar">
        <h2>Human Rights RAG Bot</h2>
        <button className="clearHistoryButton" onClick={() => setChatHistory([])}>
          Clear History
        </button>
        <button className="newChatButton" onClick={handleStartNewChat}>
          Start New Chat
        </button>
        <div className="historySection">
          <h3>Chat History</h3>
          {chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <div
                key={chat.chatId}
                className={`historyItem ${activeChatId === chat.chatId ? "active" : ""}`}
                onClick={() => {
                  setActiveChatId(chat.chatId);
                  setMessages(chat.messages);
                }}
              >
                Chat {chat.chatId}
              </div>
            ))
          ) : (
            <p>No chat history available</p>
          )}
        </div>
      </div>

      {/* main content */}
      <div className="mainContent">
        <div className="chatWindow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "userMessage" : "botMessage"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="inputArea">
          <input
            type="text"
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="sendButton" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
