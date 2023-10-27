import React, { useEffect, useState } from "react";
import "./ChatSidebar.css";
import { Avatar, IconButton } from "@mui/material";
import { useStateValue } from "../context/StateProvider";
import avatar from "./man.png";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SidebarChat from "../sidebarChat/SidebarChat";
import axios from "axios";
import pusherJs from "pusher-js";

const ChatSidebar = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/all/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    var pusher = new pusherJs('03e663ec229c6ffbcfe7', {
      cluster: 'ap2'
    });
  
    var channel = pusher.subscribe('room');
    channel.bind('inserted', function(room) {
      setRooms((prevRooms)=>[...prevRooms,room]);
    });
    },[])

  return (
    <div className="chatsidebar">
      <div className="sidebar_header">
        <Avatar src={avatar} alt="profile" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
      <SidebarChat addNewChat/>
      {rooms && rooms.map((room) => (
  <SidebarChat key={room._id} _id={room._id} name={room.groupName}/>
))}
      </div>
    </div>
  );
};

export default ChatSidebar;
