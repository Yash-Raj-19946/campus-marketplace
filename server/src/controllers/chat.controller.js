import Chat from "../models/Chat.js";

/**
 * GET MY CHATS
 */
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "email")
      .populate("receiver", "email")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (err) {
    console.error("GET CHATS ERROR:", err);
    res.status(500).json({ msg: "Failed to get chats" });
  }
};

/**
 * ACCESS CHAT
 * ✅ CHAT DOES NOT MODIFY PRODUCT STATUS
 * ✅ ONE CHAT PER USER PAIR
 */
export const accessChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ msg: "receiverId required" });
    }

    // 🔒 FIND EXISTING CHAT (USER PAIR ONLY)
    let chat = await Chat.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    // ➕ CREATE ONLY IF NONE EXISTS
    if (!chat) {
      chat = await Chat.create({
        sender: senderId,
        receiver: receiverId,
      });
    }

    await chat.populate([
      { path: "sender", select: "email" },
      { path: "receiver", select: "email" },
    ]);

    res.json(chat);
  } catch (err) {
    console.error("ACCESS CHAT ERROR:", err);
    res.status(500).json({ msg: "Failed to access chat" });
  }
};

/**
 * RENAME CHAT (PER USER)
 */
export const renameChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ msg: "Name required" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    if (!chat.customNames) {
      chat.customNames = new Map();
    }

    chat.customNames.set(req.user._id.toString(), name.trim());
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error("RENAME CHAT ERROR:", err);
    res.status(500).json({ msg: "Rename failed" });
  }
};
