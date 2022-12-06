import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMyCookies } from "../hooks/useMyCookies";
import { formatErrorMessages } from "../functions/formatErrorMessage";
import PageNotAuthorized from "../components/PageNotAuthorized";
import urls from "../urls/urls.json";

const Onboarding = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
    workingStatus: "",
  });
  const [checkBoxes, setCheckBoxes] = useState(null);
  const [cookies, setCookie, removeCookie] = useMyCookies("user-cookies");
  const [errMsg, setErrMsg] = useState("");
  const url = urls.url;

  const getUserInfo = async (url, userId) => {
    try {
      const userInfo = await axios.post(`${url}onboarding/getuserinfo`, {
        userId,
      });
      console.log(userInfo.data);
      setInput({
        firstName: userInfo.data.firstName || "",
        lastName: userInfo.data.lastName || "",
        dob: userInfo.data.dob || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffects
  useEffect(() => {
    setCheckBoxes(document.querySelectorAll(".checkbox-input"));
    getUserInfo(url, cookies.userId);
  }, []);

  // handles
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${url}onboarding/updateuser`, {
        userId: cookies.userId,
        ...input,
      });
      if (response) navigate("/dashboard");
    } catch (error) {
      setErrMsg(error.response.data.msg);
    }
  };
  const removeChecks = function () {
    checkBoxes.forEach((box) => {
      box.checked = false;
    });
  };
  const handleCheckBoxClick = (e) => {
    removeChecks();
    e.target.checked = true;
    setInput({ ...input, ["sex"]: e.target.value });
  };
  const handleStatusChange = (e) => {
    setInput({ ...input, ["workingStatus"]: e.target.value });
  };
  const handleGoBackClick = () => {
    navigate("/dashboard");
  };

  // return
  if (!cookies.token)
    return (
      <div>
        <PageNotAuthorized></PageNotAuthorized>
      </div>
    );
  return (
    <div id='onboarding-page' className='height-100 center-flex'>
      <h1>Profile Info</h1>
      <div className='form-container'>
        <form id='onboarding-form' className='center-flex'>
          {/* name */}
          <div className='input-box'>
            <input
              required={true}
              type='text'
              id='firstName'
              name='firstName'
              autoComplete='false'
              onChange={handleInputChange}
              value={input.firstName}
            />
            <div className='input-span center-flex'>first name</div>
          </div>
          <div className='input-box'>
            <input
              required={true}
              type='text'
              id='lastName'
              name='lastName'
              autoComplete='false'
              onChange={handleInputChange}
              value={input.lastName}
            />
            <div className='input-span center-flex'>last name</div>
          </div>
          {/* date of birth */}
          <label htmlFor='' className='center-flex'>
            date of birth
          </label>
          <div className='input-box center-flex'>
            <input
              id='dob'
              name='dob'
              className='dob-input'
              type='date'
              min='1900-01-01'
              max='2020-01-01'
              onChange={handleInputChange}
              value={input.dob}
            />
          </div>
          {/* sex */}
          <div className='input-box center-flex'>
            <div className='checkbox-container center-flex'>
              <div className='center-flex'>
                <label htmlFor='sex-male'>male</label>
                <input
                  className='checkbox-input'
                  id='sex-male'
                  name='sex-male'
                  type='checkbox'
                  value='sex-male'
                  onClick={handleCheckBoxClick}
                />
              </div>
              <div className='center-flex'>
                <label htmlFor='sex-male'>female</label>
                <input
                  className='checkbox-input'
                  id='sex-female'
                  name='sex-female'
                  type='checkbox'
                  value='sex-female'
                  onClick={handleCheckBoxClick}
                />
              </div>
              <div className='center-flex'>
                <label htmlFor='sex-male'>other</label>
                <input
                  className='checkbox-input'
                  id='sex-other'
                  name='sex-other'
                  type='checkbox'
                  value='sex-other'
                  onClick={handleCheckBoxClick}
                />
              </div>
            </div>
          </div>
          {/* status */}
          <div className='input-box'>
            <select
              name='status-opt'
              id='status-opt'
              className='center-flex'
              onClick={handleStatusChange}
            >
              <option hidden defaultValue=''>
                working status
              </option>
              <option value='student'>student</option>
              <option value='working'>working</option>
              <option value='unemployed'>unemployed</option>
            </select>
          </div>
          <div className='profile-img-container'>
            <img
              src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              alt='default_profile_pic.png'
            />
            <div className='upload-img-btn'>
              <AiOutlineUpload></AiOutlineUpload>
            </div>
          </div>
          <div className='err-msg-container'>
            <p>{errMsg && formatErrorMessages(errMsg)}</p>
          </div>
          <div className='btn-container'>
            <button
              type='submit'
              className='primary-btn'
              onClick={handleSubmit}
            >
              update profile
            </button>
          </div>
          <div className='btn-container-secondary'>
            <button
              type='submit'
              className='secondary-btn'
              onClick={handleGoBackClick}
            >
              go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
