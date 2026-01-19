const ChatList = ({ chats, setActive }) => {
  return (
    <ul>
      {chats.map((c) => (
        <li key={c._id} onClick={() => setActive(c)}>
          {c.product.title}
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
