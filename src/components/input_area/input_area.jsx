import "./input_area.css";

const inputArea = ({ input, onInputChange, onSendMessage }) => 
  {
  return (
    <div className="input-area">
      <input
        type="text"
        className="input"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
      />
      <button className="send-button" onClick={onSendMessage}>
        Send
      </button>
    </div>
  )
}


export default inputArea;
