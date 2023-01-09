import { useMyCookies } from "../../hooks/useMyCookies";

const Message = ({ data }) => {
  const [cookies, setCookie, removeCookie] = useMyCookies();
  return (
    <div
      className={
        data.user_id === cookies.userId
          ? "chat-msg chat-msg-left"
          : "chat-msg chat-msg-left"
      }
    >
      <p>
        {data.msg} <span>{`${data.userInfo.firstName} ${data.time}`}</span>
        <span id='dummy-span'>{`${data.userInfo.firstName} ${data.time}`}</span>
      </p>
    </div>
  );
};

export default Message;
