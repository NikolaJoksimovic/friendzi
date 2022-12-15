import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../components/bookingPage/DatePicker";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(location.state.activity);

  return (
    <div id='booking-page' className='height-100 center-flex'>
      <h1 id='h1-activity'>{activity}</h1>
      <div className='btn-container-secondary'>
        <button className='secondary-btn' onClick={() => navigate(-1)}>
          go back
        </button>
      </div>
      <p>
        You can pick 1 day a week and you can pick only one activity per day.
        This is so that the experience for other people is just as good as it is
        for you! Reservations are made maximum 7 days ahead.
      </p>
      <DatePicker activity={activity}></DatePicker>
    </div>
  );
};

export default Booking;
