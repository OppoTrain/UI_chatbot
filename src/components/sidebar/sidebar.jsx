import ChatHistory from "../chat_history/chat_history";
import "./sidebar.css";

const sidebar = ({ chatHistory, activeChatId, onStartNewChat, onClearHistory, onSelectChat }) => {
  return (
    <div className="sidebar">
      <h2>Human Rights RAG Bot</h2>
      <button className="clear-history-button" onClick={onClearHistory}>
        Clear History
      </button>
      <button className="new-chat-button" onClick={onStartNewChat}>
        Start New Chat
      </button>
      <ChatHistory
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
      />
    </div>
  );
};

export default sidebar;
