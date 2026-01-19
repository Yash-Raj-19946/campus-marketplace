import { createContext, useEffect, useState } from "react";
import { getChats } from "../api/chat";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    getChats()
      .then((res) => setChats(res.data))
      .catch(() => {});
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        activeChat,
        setActiveChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
