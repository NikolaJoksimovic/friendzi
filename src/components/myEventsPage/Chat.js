import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RiSendPlane2Fill, RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useMyCookies } from "../../hooks/useMyCookies";
import { nanoid } from "@reduxjs/toolkit";
import Message from "./Message";
import urls from "../../urls/urls.json";

const Chat = ({ userInfo, eventId }) => {
  const location = useNavigate();
  const [socket, setSocket] = useState();
  const [cookies, addCookie, removeCookie] = useMyCookies();
  const [currentMessage, setCurrentMessage] = useState("");
  const [msgLog, setMsgLog] = useState([]);

  const sendPackage = async (message) => {
    if (message !== "") {
      setCurrentMessage("");
      const pkgData = {
        user_id: cookies.userId,
        room_id: eventId,
        userInfo: userInfo,
        msg: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("client_pkg", pkgData);
      setMsgLog((prevMsgLog) => [...prevMsgLog, pkgData]);
      // Every time you or anyone else sends a message, you should update the conversation in database for that event..
    }
  };

  // handles
  const handleInpuChange = (e) => {
    setCurrentMessage(e.target.value);
  };
  const handleSendMessageClick = (e) => {
    sendPackage(currentMessage);
  };
  const handleKeyDownEvent = (e) => {
    if (e.key === "Enter") {
      sendPackage(currentMessage);
    }
  };
  // useEffects
  useEffect(() => {
    const url = urls.url;
    setSocket(io(`${url}`, {}));
  }, []);

  useEffect(() => {
    socket?.emit("join_chat", { room_id: eventId });
    socket?.on("server_pkg", (pkgData) => {
      setMsgLog((prevMsgLog) => [...prevMsgLog, pkgData]);
    });
  }, [socket]);

  return (
    <div className='chat-wrapper'>
      <div className='chat-container'>
        <div className='chat-header'>
          <button
            className='center-flex'
            onClick={(e) => {
              socket.emit("exit_chat");
              location(-1);
            }}
          >
            <RiArrowGoBackFill></RiArrowGoBackFill>
          </button>
        </div>
        <div className='chat-body'>
          {Object.entries(msgLog).map((data) => {
            const userId = data[1].user_id;
            return <Message data={data[1]} key={nanoid()}></Message>;
          })}
        </div>
        <div className='chat-footer center-flex'>
          <input
            type='text'
            placeholder='Type something'
            onChange={handleInpuChange}
            onKeyDown={handleKeyDownEvent}
            value={currentMessage}
          />
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
