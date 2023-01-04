import React from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import urls from "../../urls/urls.json";

const Chat = () => {
  const url = urls.url;
  const socket = io(`${url}`, {});
  const [roomId, setRoomId] = useState("");

  return <div className='chat-container height-100'></div>;
};

export default Chat;
