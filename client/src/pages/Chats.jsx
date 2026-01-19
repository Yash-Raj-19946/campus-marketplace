import { useEffect, useState, useContext } from "react";
import { getChats, renameChat } from "../api/chat";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [menuChat, setMenuChat] = useState(null);
  const [newName, setNewName] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await getChats();
      setChats(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Chats API error:", err);
      setChats([]);
    }
  };

  const getOtherUser = (chat) => {
    if (!chat?.sender || !chat?.receiver) return null;
    return chat.sender._id === user._id
      ? chat.receiver
      : chat.sender;
  };

  // 🔥 THIS FUNCTION WAS MISSING (CAUSE OF WHITE SCREEN)
  const getChatDisplayName = (chat, otherUser) => {
    if (chat.customNames && chat.customNames[user._id]) {
      return chat.customNames[user._id];
    }
    return otherUser.email;
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">My Chats</h1>

      {chats.length === 0 && (
        <p className="empty-text">No chats yet</p>
      )}

      {chats.length > 0 && (
        <div className="chat-list">
          {chats.map((chat) => {
            const otherUser = getOtherUser(chat);
            if (!otherUser) return null;

            return (
              <div key={chat._id} className="chat-list-item">
                {/* Chat name */}
                <span
                  className="chat-name"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                >
                  {getChatDisplayName(chat, otherUser)}
                </span>

                {/* 3-dot menu */}
                <button
                  className="chat-menu-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 critical
                    setMenuChat(chat);
                    setNewName("");
                  }}
                >
                  ⋮
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Rename Modal */}
      {menuChat && (
        <div className="rename-modal">
          <h4>Rename Chat</h4>

          <input
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <div className="rename-actions">
            <button
              onClick={async () => {
                try {
                  await renameChat(menuChat._id, newName);
                  setMenuChat(null);
                  setNewName("");
                  fetchChats();
                } catch {
                  alert("Rename failed");
                }
              }}
            >
              Save
            </button>

            <button onClick={() => setMenuChat(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
