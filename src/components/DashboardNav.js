import { React, useState } from "react";
import { useMyCookies } from "../hooks/useMyCookies";

const DashboardNav = ({ userInfo }) => {
  const [cookies, setCookie, removeCookie] = useMyCookies();
  return (
    <header className='center-flex'>
      <div className='dashboard-header-body'>
        <div className='profile-img-container profile-img-container-dashboard'>
          <img
            src={
              cookies.profileImg
                ? cookies.profileImg
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
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
