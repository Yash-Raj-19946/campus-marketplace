import API from "./auth";

// GET USER CHAT LIST
export const getChats = () => {
  return API.get("/chats");
};

// GET MESSAGES
export const getMessages = (chatId) => {
  return API.get(`/messages/${chatId}`);
};

// SEND MESSAGE
export const sendMessage = (chatId, content) => {
  return API.post(`/messages/${chatId}`, { content });
};

// ACCESS CHAT (SAFE)
export const accessChat = (receiverId, productId = null) => {
  if (!receiverId) {
    throw new Error("receiverId missing");
  }

  return API.post("/chats/access", {
    receiverId,
    ...(productId && { productId }),
  });
};

// RENAME CHAT
export const renameChat = (chatId, name) => {
  return API.patch(`/chats/${chatId}/rename`, { name });
};
