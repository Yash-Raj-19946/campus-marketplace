import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage, getChats } from "../api/chat";
import { AuthContext } from "../context/AuthContext";
import "../styles/chat.css";

const Chat = () => {
  const { id: chatId } = useParams();
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [headerName, setHeaderName] = useState("Chat");

  const bottomRef = useRef(null);

  /* FORMAT TIME (10:42 AM) */
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* LOAD CHAT HEADER */
  const loadChatHeader = async () => {
    try {
      const res = await getChats();
      const chat = res.data.find((c) => c._id === chatId);
      if (!chat) return;

      if (chat.customNames && chat.customNames[user._id]) {
        setHeaderName(chat.customNames[user._id]);
        return;
      }

      const otherUser =
        chat.sender._id === user._id ? chat.receiver : chat.sender;

      setHeaderName(otherUser.email);
    } catch {
      console.error("Header load failed");
    }
  };

  /* LOAD MESSAGES */
  const loadMessages = async () => {
    try {
      const res = await getMessages(chatId);
      setMessages(res.data);
    } catch {
      console.error("Message load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChatHeader();
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* SEND MESSAGE */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await sendMessage(chatId, content);
      setMessages((prev) => [...prev, res.data]);
      setContent("");
    } catch {
      alert("Failed to send message");
    }
  };

  return (
    <div className="chat-page">
      {/* HEADER */}
      <div className="chat-header">
        <span>{headerName}</span>
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">
        {loading ? (
          <p className="empty-text">Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="empty-text">No messages yet. Say hi 👋</p>
        ) : (
          messages.map((msg) => {
            const isMine = msg.sender._id === user._id;

            return (
              <div
                key={msg._id}
                className={`message-wrapper ${isMine ? "me" : "other"}`}
              >
                <div className={`chat-bubble ${isMine ? "me" : "other"}`}>
                  {msg.content}
                </div>

                {/* ✅ MESSAGE TIMESTAMP */}
                <div className="message-time">
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <form className="chat-input-bar" onSubmit={handleSend}>
        <input
          placeholder="Type a message…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
