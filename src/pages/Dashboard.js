import { React, useEffect } from "react";
import { invertAuthToken } from "../store/store";
import { useDispatch } from "react-redux";
import { useMyCookies } from "../hooks/useMyCookies";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardNav from "../components/DashboardNav";
import LoadingPage from "../components/LoadingPage";
import axios from "axios";
import urls from "../urls/urls.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useMyCookies();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");

  // Got to work on these more...It has to be a better way to code this section ****
  useEffect(() => {
    const windowHeight = window.outerHeight;
    const btnsContainerEL = document.querySelector(".buttons-container");
    const activitiesEl = document.querySelector("#activities");
    if (windowHeight > 550 && activitiesEl) {
      document.getElementById("activities").style.height = `${
        windowHeight - btnsContainerEL.offsetTop - 150
      }px`;
    }
  }, []); //initial height
  useEffect(() => {
    const resizeListener = window.addEventListener("resize", function () {
      const windowHeight = this.window.outerHeight;
      const btnsContainerEL = this.document.querySelector(".buttons-container");
      const activitiesEl = document.querySelector("#activities");
      if (windowHeight > 550 && activitiesEl) {
        document.getElementById("activities").style.height = `${
          windowHeight - btnsContainerEL.offsetTop - 150
        }px`;
      }
    });
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []); //height on resize
  // ***********************************************************************************

  const getData = async () => {
    const url = urls.url;
    try {
      const response = await axios.post(
        `${url}dashboard/finduser`,
        {},
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }
      );
      setUserInfo({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  // handles
  const handleLogOutClick = (e) => {
    e.preventDefault();
    console.log("click");
    removeCookie("token");
    removeCookie("userId");
    dispatch(invertAuthToken(false));
    navigate("/");
  };
  const handleUserInfoClick = () => {
    navigate("/onboarding");
  };
  const handleBookingClick = (activity) => {
    navigate("/dashboard/booking", {
      state: {
        activity: activity,
      },
    });
  };
  const token = cookies.token;
  // return
  return loading ? (
    <LoadingPage></LoadingPage>
  ) : (
    <div id='dashboard-page' className='height-100 '>
      <DashboardNav userInfo={userInfo}></DashboardNav>
      <div className='dashboard-page-body'>
        <div className='buttons-container center-flex'>
          <div className='btns-left center-flex'>
            <div className='btn-container-secondary'>
              <button className='secondary-btn' onClick={handleUserInfoClick}>
                profile info
              </button>
            </div>
            <div className='btn-container-secondary'>
              <button
                className='secondary-btn'
                onClick={() =>
                  navigate("/dashboard/myevents", {
                    state: { userInfo: userInfo },
                  })
                }
              >
                my events
              </button>
            </div>
          </div>
          <div className='btns-right'>
            <div className='btn-container-secondary'>
              <button className='secondary-btn' onClick={handleLogOutClick}>
                log out
              </button>
            </div>
          </div>
        </div>
        <section id='activities' className='height-60 center-flex'>
          <h2>What are you up for?</h2>
          <div className='activities-opt'>
            <div className='btn-container-secondary'>
              <button
                className='secondary-btn'
                onClick={() => handleBookingClick("bowling")}
              >
                bowling
              </button>
            </div>
            <div className='btn-container-secondary'>
              <button
                className='secondary-btn'
                onClick={() => handleBookingClick("cocktails")}
              >
                cocktails
              </button>
            </div>
            <div className='btn-container-secondary'>
              <button
                className='secondary-btn'
                onClick={() => handleBookingClick("carting")}
              >
                carting
              </button>
            </div>
            <div className='btn-container-secondary'>
              <button
                className='secondary-btn'
                onClick={() => handleBookingClick("movies")}
              >
                movies
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
