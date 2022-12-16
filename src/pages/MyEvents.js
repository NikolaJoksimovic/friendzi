import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import EventCard from "../components/myEventsPage/EventCard";
import urls from "../urls/urls.json";

const MyEvents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const url = urls.url;
  const getEvents = async () => {
    try {
      const response = await axios.post(`${url}dashboard/myevents`);
      setLoading(false);
    } catch (error) {}
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
        <EventCard></EventCard>
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
