import Message from "../models/Message.js";

/**
 * GET ALL MESSAGES OF A CHAT
 * GET /api/messages/:chatId
 */
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("GET MESSAGES ERROR:", err);
    res.status(500).json({ msg: "Failed to load messages" });
  }
};

/**
 * SEND MESSAGE
 * POST /api/messages/:chatId
 */
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ msg: "Message content required" });
    }

    let message = await Message.create({
      chat: chatId,
      sender: req.user.id,
      content,
    });

    // populate sender before sending back
    message = await message.populate("sender", "email");

    res.status(201).json(message);
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);
    res.status(500).json({ msg: "Failed to send message" });
  }
};
