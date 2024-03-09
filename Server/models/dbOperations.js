const Message = require('./messageModel');

async function saveMessage(data) {
  try {
    const newMessage = new Message(data);
    await newMessage.save();
    return true;
  } catch (error) {
    console.error('Error saving message:', error);
    return false;
  }
}

async function fetchMessages(room) {
  try {
    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

module.exports = { saveMessage, fetchMessages };
