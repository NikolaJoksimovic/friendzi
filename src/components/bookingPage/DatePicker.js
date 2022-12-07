import { getAllByTestId, getElementError } from "@testing-library/react";
import { React, useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState([]);
  const [index, setIndex] = useState(0);
  const [chosenDate, setChosenDate] = useState(0);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const array = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        array.push({
          day: "Today",
          dayOfMonth: date.getDate() + i,
        });
      } else if (i === 1) {
        array.push({
          day: "Tomorrow",
          dayOfMonth: date.getDate() + i,
        });
      } else
        array.push({
          day: weekday[(i + date.getDay()) % 7],
          dayOfMonth: date.getDate() + i,
        });
    }
    setWeek(array);
    setChosenDate(date);
  }, [date]);

  useEffect(() => {
    setDate(new Date());
  }, []);
  useEffect(() => {
    setChosenDate(() => {
      return new Date(date.getTime() + index * 24 * 60 * 60 * 1000);
    });
  }, [index, date]);

  return (
    <div id='date-picker' className='center-flex'>
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
              if (currIndex < 6) {
                return currIndex + 1;
              }
              return 6;
            });
          }}
        >
          <AiOutlineRight></AiOutlineRight>
        </button>
      </div>

      {/********** TIME********* */}

      <div className='slider-btns center-flex'>
        <button className='slicer-btn slider-left'>
          <AiOutlineLeft></AiOutlineLeft>
        </button>
        <button className='slicer-btn slider-right'>
          <AiOutlineRight></AiOutlineRight>
        </button>
      </div>
      <div className='reservation-display center-flex'>
        <span style={{ fontWeight: "700" }}>book for: </span>
        {formatDateForDisplay(chosenDate)}
      </div>
    </div>
  );
};

function formatDateForDisplay(date) {
  if (date) {
    const day = date.getDate();
    const month = date.getMonth();
    return `${day < 10 ? "0" + day : day}. ${
      month < 10 ? "0" + month : month
    }. - 19:00h`;
  }
  return;
}
export default DatePicker;
