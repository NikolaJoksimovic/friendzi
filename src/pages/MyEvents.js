import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMyCookies } from "../hooks/useMyCookies";
import LoadingPage from "../components/LoadingPage";
import EventCard from "../components/myEventsPage/EventCard";
import EventModal from "../components/myEventsPage/EventModal";
import axios from "axios";
import urls from "../urls/urls.json";

const MyEvents = () => {
  const navigate = useNavigate();
  const url = urls.url;
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useMyCookies();
  const [backendData, setBackendData] = useState([]);
  const [eventModalId, setEventModalId] = useState(null);
  const getEvents = async () => {
    try {
      const response = await axios.post(
        `${url}dashboard/myevents`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
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

  // handles
  const handleEventCardClick = (eventId) => {
    setEventModalId(eventId);
  };

  // return
  return loading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <div id='my-events-page' className='height-100 center-flex'>
      <header>
        <h1 style={{ textAlign: "center" }}>events</h1>
      </header>
      <div id='event-list-container'>
        {backendData.map((entrie) => {
          const eventId = entrie;
          return (
            <div key={eventId} onClick={() => handleEventCardClick(eventId)}>
              <EventCard eventId={eventId}></EventCard>
            </div>
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
      {eventModalId && (
        <EventModal
          eventId={eventModalId}
          setEventModalId={setEventModalId}
        ></EventModal>
      )}
    </div>
  );
};

export default MyEvents;
