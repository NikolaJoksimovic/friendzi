import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMyCookies } from "../hooks/useMyCookies";
import urls from "../urls/urls.json";

const DashboardNav = () => {
  const [cookies, setCookie, removeCookie] = useMyCookies();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const getData = async () => {
    const url = urls.url;
    try {
      const response = await axios.post(`${url}dashboard/finduser`, {
        userId: cookies.userId,
      });
      setUserInfo({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
      // console.log(response);
      setLoading(false);
    } catch (errro) {}
  };
  useEffect(() => {
    getData();
  }, [loading]);

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <header className='center-flex'>
      <div className='dashboard-header-body'>
        <div className='profile-img-container profile-img-container-dashboard'>
          <img
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            alt='default_profile_pic.png'
          />
        </div>
        <div className='user-name' style={{ color: "blue" }}>
          <span>
            {userInfo.firstName} {userInfo.lastName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
