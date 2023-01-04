import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";
import urls from "../../urls/urls.json";

const Chat = ({ userInfo, eventId }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const url = urls.url;
    setSocket(io(`${url}`, {}));
  }, []);
  useEffect(() => {
    socket?.emit("join_chat", { room_id: eventId });
  }, [socket]);
  return (
    <div className='chat-container height-100'>
      <div className='chat-header'></div>
      <div className='chat-body'></div>
      <div className='chat-footer'></div>
    </div>
  );
};

export default Chat;
