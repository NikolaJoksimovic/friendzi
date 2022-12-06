import React from "react";
import { useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import { invertAuthToken } from "../store/store";
import { useDispatch } from "react-redux";
import { useMyCookies } from "../hooks/useMyCookies";
import { useNavigate } from "react-router-dom";
import PageNotAuthorized from "../components/PageNotAuthorized";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useMyCookies();

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

  // handles
  const handleLogOutClick = () => {
    removeCookie("token");
    removeCookie("userId");
    dispatch(invertAuthToken(false));
    navigate("/");
  };
  const handleUserInfoClick = () => {
    navigate("/onboarding");
  };

  return !cookies.token ? (
    <PageNotAuthorized></PageNotAuthorized>
  ) : (
    <div id='dashboard-page' className='height-90 '>
      <DashboardNav></DashboardNav>
      <div className='dashboard-page-body'>
        <div className='buttons-container center-flex'>
          <div className='btn-container-secondary'>
            <button className='secondary-btn' onClick={handleUserInfoClick}>
              profile info
            </button>
          </div>
          <div className='btn-container-secondary'>
            <button className='secondary-btn' onClick={handleLogOutClick}>
              log out
            </button>
          </div>
        </div>
        <section id='activities' className='height-60 center-flex'>
          <h2>What are you up for?</h2>
          <div className='activities-opt'>
            <div className='btn-container-secondary'>
              <button className='secondary-btn'>bowling</button>
            </div>
            <div className='btn-container-secondary'>
              <button className='secondary-btn'>cocktails</button>
            </div>
            <div className='btn-container-secondary'>
              <button className='secondary-btn'>carting</button>
            </div>
            <div className='btn-container-secondary'>
              <button className='secondary-btn'>cineplex</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
