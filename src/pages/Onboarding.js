import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import urls from "../urls/urls.json";

const Onboarding = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    dd: "",
    mm: "",
    yy: "",
    sex: "",
    workingStatus: "",
  });
  const [checkBoxes, setCheckBoxes] = useState(null);

  // handles
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const url = urls.url;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("/onboarding", input);
      if (response) navigate("/dashboard");
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    setCheckBoxes(document.querySelectorAll(".checkbox-input"));
  }, []);

  // console.log(input);

  return (
    <div id='onboarding-page' className='height-100 center-flex'>
      <h1>Profile Info</h1>
      <div className='form-container'>
        <form id='onboarding-form' className='center-flex'>
          {/* name */}
          <div className='input-box'>
            <input
              type='text'
              id='firstName'
              name='firstName'
              required={true}
              autoComplete='false'
              onChange={handleInputChange}
              value={input.firstName}
            />
            <div className='input-span center-flex'>first name</div>
          </div>
          <div className='input-box'>
            <input
              type='text'
              id='lastName'
              name='lastName'
              required={true}
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
              id='dd'
              name='dd'
              className='dob-input'
              type='number'
              placeholder='DD'
              onChange={handleInputChange}
              value={input.dd}
            />
            <input
              id='mm'
              name='mm'
              className='dob-input'
              type='number'
              placeholder='MM'
              onChange={handleInputChange}
              value={input.mm}
            />
            <input
              id='yy'
              name='yy'
              className='dob-input center-flex'
              type='number'
              placeholder='YY'
              onChange={handleInputChange}
              value={input.yy}
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
              <option hidden disabled defaultValue=''>
                working status
              </option>
              <option value='student'>student</option>
              <option value='working'>working</option>
              <option value='unemployed'>unemployed</option>
            </select>
          </div>
        </form>
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
      <div className='btn-container'>
        <button type='submit' className='primary-btn' onClick={handleSubmit}>
          update profile
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
