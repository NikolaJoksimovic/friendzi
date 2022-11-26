import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/images/friendzi_homepage_logo.png";
import { useDispatch } from "react-redux";
import { invertIsSignIn } from "../store/store";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // *****************************************
  // Ako imas token onda redirect na Dashboard
  let authToken = false;
  // *****************************************
  // handles
  const handleRegisterClick = () => {
    dispatch(invertIsSignIn(true));
    navigate("/auth");
  };
  const handleLoginClick = () => {
    dispatch(invertIsSignIn(false));
    navigate("/auth");
  };

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div id='home-page' className='height-100 center-flex'>
      <div className='logo-container center-flex'>
        <img src={logoImage} alt='logo.png' />
        <p id='friendzi-title'>FriendZi</p>
      </div>
      <h1>The weekend is coming and you just wanna have fun!</h1>
      <div className='btn-container'>
        <button className='primary-btn' onClick={handleRegisterClick}>
          get started
        </button>
      </div>
      <h2>
        Already have an account?
        <span id='login-span' onClick={handleLoginClick}>
          Log in
        </span>
      </h2>
    </div>
  );
};

export default Home;
