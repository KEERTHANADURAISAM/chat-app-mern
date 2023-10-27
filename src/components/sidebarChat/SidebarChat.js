import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";


const SidebarChat = ({ addNewChat,name,_id }) => {
  const [seed, setSeed] = useState();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please Enter the Group name");
    if (roomName) {
      try {
        await axios.post("http://localhost:3001/group/create", {
          groupName: roomName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };







  return !addNewChat ? (
    <Link to={`/room/${_id}`}>
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
      </div>
    </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
