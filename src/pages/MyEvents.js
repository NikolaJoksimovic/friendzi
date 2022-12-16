import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import EventCard from "../components/myEventsPage/EventCard";
import { useMyCookies } from "../hooks/useMyCookies";
import urls from "../urls/urls.json";

const MyEvents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const url = urls.url;
  const [cookies, setCookie, removeCookie] = useMyCookies();
  const [backendData, setBackendData] = useState([]);
  const getEvents = async () => {
    try {
      const response = await axios.post(`${url}dashboard/myevents`, {
        user_id: cookies.userId,
      });
      if (response) {
        setBackendData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return loading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <div id='my-events-page' className='height-100 center-flex'>
      <header>
        <h1 style={{ textAlign: "center" }}>events</h1>
      </header>
      <div id='event-list-container'>
        {Object.entries(backendData).map((entrie) => {
          const eventId = entrie[1].event_id;
          const users = entrie[1].users;
          return (
            <EventCard
              key={eventId}
              eventId={eventId}
              users={users}
            ></EventCard>
          );
        })}
      </div>
      <div className='btn-container-secondary'>
        <button
          type='submit'
          className='secondary-btn'
          onClick={() => navigate(-1)}
        >
          go back
        </button>
      </div>
    </div>
  );
};

export default MyEvents;
