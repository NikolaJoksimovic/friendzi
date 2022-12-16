import { React, useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useMyCookies } from "../../hooks/useMyCookies";
import axios from "axios";
import urls from "../../urls/urls.json";
import { useNavigate } from "react-router-dom";

const DatePicker = ({ activity }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [index, setIndex] = useState(0);
  const [timeSpan, setTimeSpan] = useState([]);
  const [timeIndex, setTimeIndex] = useState(0);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenTime, setChosenTime] = useState(0);
  const [startingTime, setStartingTime] = useState(12);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const url = urls.url;
  const [cookies, setCookie, removeCookie] = useMyCookies();
  const [errorMsg, setErrorMsg] = useState("");

  // useEffects
  useEffect(() => {
    const array = [];
    for (let i = 0; i < 7; i++) {
      const day = (date.getDay() + i) % 7;
      if (day === 0 || day === 6)
        array.push({
          day: weekday[day],
          dayOfMonth: date.getDate() + i,
        });
    }
    setWeek(array);
    setChosenDate(date.setDate(array[0].dayOfMonth));
  }, [date]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    setChosenDate(() => {
      return new Date(date.getTime() + index * 24 * 60 * 60 * 1000);
    });
  }, [index, date]);

  useEffect(() => {
    const currDate = new Date();
    if (date && chosenDate) {
      if (chosenDate.getDate() === currDate.getDate()) {
        setStartingTime(chosenDate.getHours() + 1);
      } else {
        setStartingTime(12);
      }
    }
  }, [chosenDate]);
  useEffect(() => {
    setChosenTime(startingTime);
    const array = [];
    for (let i = startingTime; i <= 22; i++) {
      array.push(i);
    }
    setTimeSpan(array);
  }, [startingTime]);
  useEffect(() => {
    setChosenTime(timeSpan[timeIndex]);
  }, [timeIndex]);

  // handles
  const handleBookingClick = async () => {
    const eventId = `${formatTime(chosenDate.getDate())}${formatTime(
      chosenDate.getMonth() + 1
    )}${chosenTime}00${activity}`;
    const userId = cookies.userId;
    try {
      const response = await axios.post(`${url}dashboard/bookevent`, {
        user_id: userId,
        event_id: eventId,
      });
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(error.response.data.msg);
    }
  };

  // return
  return (
    <div id='date-picker' className='center-flex'>
      {/********** DATE********* */}
      <div className='days-display-container center-flex'>
        {week.map((dayObj, dayObjIndex) => {
          let position;
          if (dayObjIndex === index) {
            position = "activeSlide";
          } else if (dayObjIndex === index + 1) {
            position = "nextSlide";
          } else if (dayObjIndex === index - 1) {
            position = "lastSlide";
          }
          return (
            <div className={"day-display " + position} key={dayObj.dayOfMonth}>
              {dayObj.day}
            </div>
          );
        })}
      </div>
      <div className='slider-btns center-flex'>
        <button
          className='slicer-btn slider-left'
          onClick={() => {
            setIndex((currIndex) => {
              if (currIndex > 0) {
                return currIndex - 1;
              }
              return 0;
            });
          }}
        >
          <AiOutlineLeft></AiOutlineLeft>
        </button>
        <button
          className='slicer-btn slider-right'
          onClick={() => {
            setIndex((currIndex) => {
              if (currIndex < 1) {
                return currIndex + 1;
              }
              return 1;
            });
          }}
        >
          <AiOutlineRight></AiOutlineRight>
        </button>
      </div>
      {/********** TIME********* */}
      <div className='times-display-container'>
        {timeSpan.map((hour, hourIndex) => {
          let position;
          if (hourIndex === timeIndex) position = "activeSlide";
          else if (hourIndex === timeIndex - 1) position = "lastSlide";
          else if (hourIndex === timeIndex + 1) position = "nextSlide";
          return (
            <div key={hour} className={"time-display " + position}>
              {hour}:00
            </div>
          );
        })}
      </div>
      <div className='slider-btns center-flex'>
        <button
          className='slicer-btn slider-left'
          onClick={() => {
            setTimeIndex((currIndex) => {
              if (currIndex > 0) {
                return currIndex - 1;
              }
              return 0;
            });
          }}
        >
          <AiOutlineLeft></AiOutlineLeft>
        </button>
        <button
          className='slicer-btn slider-right'
          onClick={() => {
            setTimeIndex((currIndex) => {
              if (currIndex < timeSpan.length - 1) {
                return currIndex + 1;
              }
              return timeSpan.length - 1;
            });
          }}
        >
          <AiOutlineRight></AiOutlineRight>
        </button>
      </div>
      <div className='reservation-display center-flex'>
        <span style={{ fontWeight: "700" }}>book for: </span>
        {formatDateForDisplay(chosenDate, chosenTime)}
      </div>
      <div className='err-msg-container'>
        <p>{errorMsg}</p>
      </div>
      <div className='btn-container-secondary'>
        <button className='secondary-btn' onClick={handleBookingClick}>
          book it
        </button>
      </div>
    </div>
  );
};

function formatTime(time) {
  return `${time < 10 ? "0" + time : time}`;
}

function formatDateForDisplay(date, time) {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth();
    return `${day < 10 ? "0" + day : day}. ${
      month < 10 ? "0" + month + 1 : month + 1
    }. - ${time}:00h`;
  }
  return;
}
export default DatePicker;
