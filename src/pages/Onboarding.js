import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMyCookies } from "../hooks/useMyCookies";
import { formatErrorMessages } from "../functions/formatErrorMessage";
import PageNotAuthorized from "../components/commonPages/PageNotAuthorized";
import urls from "../urls/urls.json";

const Onboarding = () => {
  const url = urls.url;
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
    img_url: "",
    ig_at: "",
  });
  const [checkBoxes, setCheckBoxes] = useState(null);
  const [cookies, setCookie, removeCookie] = useMyCookies("user-cookies");
  const [errMsg, setErrMsg] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const getUserInfo = async (url, userId) => {
    try {
      const userInfo = await axios.post(`${url}onboarding/getuserinfo`, {
        userId,
      });

      setInput({
        firstName: userInfo.data.firstName || "",
        lastName: userInfo.data.lastName || "",
        dob: userInfo.data.dob || "",
        ig_at: userInfo.data.ig_at || "",
      });
      userInfo.data.img_url && setProfileImg(userInfo.data.img_url);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffects
  useEffect(() => {
    setCheckBoxes(document.querySelectorAll(".checkbox-input"));
    getUserInfo(url, cookies.userId);
  }, []);

  useEffect(() => {
    setInput({ ...input, ["img_url"]: profileImg });
  }, [profileImg]);

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
  const handleGoBackClick = () => {
    navigate("/dashboard");
  };
  // img upload
  const convertToBase64 = (file) => {
    return new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        res(fileReader.result);
      };
      fileReader.onerror = (error) => {
        rej(error);
      };
    });
  };
  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const base64File = await convertToBase64(file);
    // setLoading(true)
    try {
      const response = await axios.post(`${url}onboarding/uploadimg`, {
        user_id: cookies.userId,
        image: base64File,
      });
      setProfileImg(response.data.img_url);
    } catch (error) {
      console.log(error.response);
    }
  };

  // RETURN
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
          <div className='input-box'>{/* empty div, change later */}</div>
          <div className='profile-img-container'>
            <img
              src={
                profileImg
                  ? profileImg
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt='default_profile_pic.png'
            />
            <div className='upload-img-btn'>
              <label htmlFor='upload-img-input'>
                <AiOutlineUpload></AiOutlineUpload>
                <input
                  type='file'
                  name='upload-img-input'
                  id='upload-img-input'
                  onChange={(e) => {
                    handleImgUpload(e);
                  }}
                />
              </label>
            </div>
          </div>
          <div className='input-box'>{/* empty div, change later */}</div>
          {/* instagram profile */}
          <div className='input-box'>
            <input
              type='text'
              id='ig_at'
              name='ig_at'
              autoComplete='false'
              onChange={handleInputChange}
              value={input.ig_at}
              style={{ width: "100%" }}
              placeholder='@instagram'
            />
            <div className='input-span center-flex'>instagram profile</div>
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
