import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import pusherJs from "pusher-js";

const Chat = () => {
  const [{ user }] = useStateValue("");
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/room/${roomId}`
          );
          console.log(response);
          setRoomName(response.data.groupName);
          setUpdatedAt(response.data.updatedAt);
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      }
      axios.get(`http://localhost:3001/messages/${roomId}`).then((response) => {
        setMessages(response.data);
      });
    };

    fetchRoomData();
  }, [roomId]);
  console.log(messages);
  console.log(roomName);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

// add realtime messages using pusher
useEffect(() => {
  var pusher = new pusherJs('03e663ec229c6ffbcfe7', {
    cluster: 'ap2'
  });

  var channel = pusher.subscribe('messages');
  channel.bind('inserted', function(messages) {
    setMessages((prevMessages)=>[...prevMessages,messages]);
  });
  },[])






  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    await axios.post("http://localhost:3001/messages/new", {
      message: input,
      name: user.displayName,
      timestamp: new Date(),
      uid: user.id,
      roomId: roomId,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h3>{roomName ? roomName : "welcome to Chat App"}</h3>
          <p>
            {updatedAt
              ? `last updated at ${new Date(updatedAt).toString().slice(0, 25)}`
              : "Click on any group"}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
      {messages && messages.map((message, index) => (
  <p
  className={`chat_message ${
    message.name === user.displayName && "chat_receiver"
  }`} key={index}
  >
    <span className="chat_name">{message.name}</span>
   <span className="chat_message_main">{message.message}</span>
     {/* Display the message content here */}
    <br />
    <span className="chat_timestamp">
      {new Date(message.updatedAt).toString().slice(0, 25)}
    </span>
   
    
  </p>
))}

      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>send a message</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
