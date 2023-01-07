import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RiSendPlane2Fill, RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import urls from "../../urls/urls.json";
import { useMyCookies } from "../../hooks/useMyCookies";

const Chat = ({ userInfo, eventId }) => {
  const location = useNavigate();
  const [socket, setSocket] = useState();
  const [currentMessage, setCurrentMessage] = useState("");
  const [cookies, addCookie, removeCookie] = useMyCookies();

  const sendPackage = async (message) => {
    if (message !== "") {
      console.log(message);
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
      console.log(pkgData);
    });
  }, [socket]);

  // console.log("currentMessage: " + currentMessage);

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
        <div className='chat-body'></div>
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
