import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllVariables } from "../store/store";
import urls from "../urls/urls.json";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const vars = useSelector(selectAllVariables);
  const isSignIn = vars.isSignIn; //check if it's a sign in and not a log in...
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handles
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignIn ? `${urls.url}auth/register` : `${urls.url}auth/login`;
    try {
      const response = await axios.post(url, input);
      isSignIn ? navigate("/onboarding") : navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id='auth-page' className='height-100 center-flex'>
      <p id='friendzi-title'>FriendZi</p>
      <div className='form-container'>
        <form id='register-form' className='center-flex'>
          <div className='input-box'>
            <input
              type='text'
              id='email'
              name='email'
              required={true}
              autoComplete='false'
              onChange={handleInputChange}
              value={input.email}
            />
            <div className='input-span center-flex'>email</div>
          </div>
          <div className='input-box'>
            <input
              type='password'
              id='password'
              name='password'
              required={true}
              onChange={handleInputChange}
              value={input.password}
            />
            <div className='input-span center-flex'>password</div>
          </div>
          {isSignIn && (
            <>
              <div className='input-box'>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  required={true}
                  onChange={handleInputChange}
                  value={input.confirmPassword}
                />
                <div className='input-span center-flex'>confirm password</div>
              </div>
            </>
          )}
          <div className='btn-container'>
            <button
              type='submit'
              className='primary-btn'
              onClick={handleSubmit}
            >
              {isSignIn ? "sign in" : "log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
