import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";
import urls from "../../urls/urls.json";
import { RiSendPlane2Fill, RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Chat = ({ userInfo, eventId }) => {
  const location = useNavigate();
  const [socket, setSocket] = useState();

  const handleSendMessageClick = () => {};

  useEffect(() => {
    const url = urls.url;
    setSocket(io(`${url}`, {}));
  }, []);
  useEffect(() => {
    socket?.emit("join_chat", { room_id: eventId });
  }, [socket]);
  return (
    <div className='chat-wrapper'>
      <div className='chat-container'>
        <div className='chat-header'>
          <button
            className='center-flex'
            onClick={(e) => {
              socket.emit("disconnect");
              location(-1);
            }}
          >
            <RiArrowGoBackFill></RiArrowGoBackFill>
          </button>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer center-flex'>
          <input type='text' placeholder='Type something' />
          <div className='send-icon center-flex'>
            <RiSendPlane2Fill
              style={{ cursor: "pointer" }}
              onClick={handleSendMessageClick}
            ></RiSendPlane2Fill>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
