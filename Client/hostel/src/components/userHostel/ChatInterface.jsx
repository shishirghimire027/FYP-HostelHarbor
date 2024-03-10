import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import io from "socket.io-client";
import Chat from "../userHostel/Chat";
import "../userHostel/Chat.css";

const socket = io.connect("http://localhost:3001");

function ChatInterface() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      console.error("Username or room is empty.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:3001/ResidentLists`, config)
      .then((result) => {
        const userId = jwtDecode(token).id;
        const filteredUserHostel = result.data.filter(
          (resident) => resident.User_id === userId
        );
        if (filteredUserHostel.length > 0) {
          setUsername(filteredUserHostel[0].userName);
          setRoom(filteredUserHostel[0].HostelID);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <button
            onClick={joinRoom}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="#007bff"
              className="bi bi-chat"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
            </svg>
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} onClose={handleCloseChat} />
      )}
    </div>
  );
}

export default ChatInterface;
