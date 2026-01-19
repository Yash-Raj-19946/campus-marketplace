import { sendMessage } from "../api/chat";
import { useState } from "react";

const ChatWindow = ({ chat, messages }) => {
  const [msg, setMsg] = useState("");

  const submit = async () => {
    await sendMessage(chat._id, msg);
    setMsg("");
  };

  return (
    <div>
      {messages.map((m) => (
        <p key={m._id}>{m.content}</p>
      ))}
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={submit}>Send</button>
    </div>
  );
};

export default ChatWindow;
