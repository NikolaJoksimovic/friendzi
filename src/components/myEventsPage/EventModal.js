import { React, useEffect, useState } from "react";
import { useMyCookies } from "../../hooks/useMyCookies";
import axios from "axios";
import urls from "../../urls/urls.json";
import LoadingPage from "../LoadingPage";

const EventModal = ({ eventId, setEventModalId }) => {
  const [loading, setLoading] = useState(true);
  const [eventUsers, setEventUsers] = useState("");
  const [cookies, setCookie, removeCookie] = useMyCookies();
  const [eventUsersInfo, setEventUsersInfo] = useState([]);
  const url = urls.url;

  const getEventUsers = async () => {
    try {
      const response = await axios.post(
        `${url}dashboard/findevent`,
        { event_id: eventId },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setEventUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const getEventUsersInfo = async () => {
    try {
      const response = await axios.post(
        `${url}dashboard/event/users`,
        { users: eventUsers },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setEventUsersInfo(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEventUsers();
  }, []);

  useEffect(() => {
    if (eventUsers) {
      getEventUsersInfo();
    }
  }, [eventUsers]);

  return loading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <div className='event-modal height-100 center-flex'>
      <h2>{eventUsersInfo.length}/5 people</h2>

      <div className='user-list center-flex'>
        {Object.entries(eventUsersInfo).map((entrie) => {
          const user = entrie[1];
          console.log(user);
          const age =
            new Date(
              new Date().getTime() - new Date(user.dob).getTime()
            ).getYear() - 70;
          return (
            <div className='event-user' key={user.user_id}>
              <h3>
                {user.firstName} {user.lastName} {age}
              </h3>
              <p style={{ textAlign: "center" }}>({user.workingStatus})</p>
            </div>
          );
        })}
      </div>

      <div className='btn-container-secondary'>
        <button
          className='secondary-btn'
          onClick={() => setEventModalId(false)}
        >
          go back
        </button>
      </div>
    </div>
  );
};

export default EventModal;
