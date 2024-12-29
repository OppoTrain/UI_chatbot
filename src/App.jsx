import React, { useState } from "react";
import Sidebar from "./components/sidebar/sidebar.jsx";
import ChatWindow from "./components/chat_window/chat_window.jsx";
import InputArea from "./components/input_area/input_area.jsx";
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
    const newChat = { chatId: chatHistory.length + 1, messages: [] };
    setChatHistory([...chatHistory, newChat]);
    setActiveChatId(newChat.chatId);
    setMessages([]);
  };

  const getBotResponse = (input) => {
    const responses = {
      hello: "Hi there! How can I help you?",
    };

    return responses[input.toLowerCase()] || "I am sorry, I don't understand that.";
  };

  return (
    <div className="app">
      <Sidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onStartNewChat={handleStartNewChat}
        onClearHistory={() => setChatHistory([])}
        onSelectChat={(chatId, messages) => {
          setActiveChatId(chatId);
          setMessages(messages);
        }}
      />
      <div className="main-content">
        <ChatWindow messages={messages} />
        <InputArea input={input} onInputChange={setInput} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
