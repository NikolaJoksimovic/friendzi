import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/images/friendzi_homepage_logo.png";
const Home = () => {
  const navigate = useNavigate();

  // *****************************************
  // Ako imas token onda redirect na Dashboard
  let authToken = false;
  if (authToken) {
    navigate("/dashboard");
  }
  // *****************************************

  return renderPage();
};

// render page
const renderPage = function () {
  return (
    <div id='home-page' className='height-100 center-flex'>
      <div className='logo-container center-flex'>
        <img src={logoImage} alt='logo.png' />
        <p id='friendzi-title'>FriendZi</p>
      </div>
      <h1>The weekend is coming and you just wanna have fun!</h1>
      <div className='btn-container'>
        <button className='primary-btn'>make new friends</button>
      </div>
    </div>
  );
};

export default Home;
