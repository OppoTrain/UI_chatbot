import "./chat_history.css";

const chatHistory = ({ chatHistory, activeChatId, onSelectChat }) => {
  return (
    <div className="chat-history">
      <h3>Chat History</h3>
      {chatHistory.length > 0 ? (
        chatHistory.map((chat) => (
          <div
            key={chat.chatId}
            className={`history-item ${activeChatId === chat.chatId ? "active" : ""}`}
            onClick={() => onSelectChat(chat.chatId, chat.messages)}
          >
            Chat {chat.chatId}
          </div>
        ))
      ) : (
        <p>No chat history available</p>
      )}
    </div>
  );
};

export default chatHistory;
