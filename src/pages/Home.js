import React, { useEffect, useState } from "react";
import logoImage from "../assets/images/friendzi_homepage_logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invertIsSignIn, selectAllVariables } from "../store/store";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authToken = useSelector(selectAllVariables).authToken;

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
    setLoading(true);
  }, []);
  useEffect(() => {
    if (loading) setLoading(false);
  }, [loading]);

  return loading ? (
    <div className='loading-container center-flex'>
      <h1>loading...</h1>
    </div>
  ) : (
    <div id='home-page' className='height-100 center-flex'>
      <div className='logo-container center-flex'>
        <img src={logoImage} alt='logo.png' />
        <p id='friendzi-title'>FriendZi</p>
      </div>
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, nihil.
      </h1>
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
