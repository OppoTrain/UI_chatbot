import "./chat_window.css";

const chatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default chatWindow;
