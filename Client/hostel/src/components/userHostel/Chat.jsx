import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from 'axios';

function Chat({ socket, username, room, onClose }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chatMessages_${room}`);
    if (storedMessages) {
      setMessageList(JSON.parse(storedMessages));
    }
  }, [room]);

  useEffect(() => {
    localStorage.setItem(`chatMessages_${room}`, JSON.stringify(messageList));
  }, [messageList, room]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      // Add the message to the list immediately for display
      setMessageList(prevMessages => [...prevMessages, messageData]);

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    axios.post('/fetch_messages', { room })
      .then(response => {
        setMessageList(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    socket.on("receive_message", (data) => {
      setMessageList(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, room]);

  const handleCloseChat = () => {
    onClose();
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>
          Live Chat
          <button onClick={handleCloseChat} style={{ border: "none", background: "none", cursor: "pointer" }}>
            <RiCloseCircleLine style={{ height: "30px", width: "30px", color: "red", marginTop: "0", marginLeft: "500%" }} />
          </button>
        </p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
              key={index} // Use index as key
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
