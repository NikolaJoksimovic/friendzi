import React from "react";
import { useSelector } from "react-redux";
import { selectAllVariables } from "../store/store";
const Auth = () => {
  const vars = useSelector(selectAllVariables);
  const isSignIn = vars.isSignIn; //check if it's a sign in and not a log in...
  return (
    <div id='auth-page' className='height-100 center-flex'>
      <p id='friendzi-title'>FriendZi</p>
      <div className='form-container'>
        <form id='register-form' className='center-flex'>
          <div className='input-box'>
            <input type='text' id='email' name='email' required={true} />
            <div className='input-span center-flex'>email</div>
          </div>
          <div className='input-box'>
            <input
              type='password'
              id='password'
              name='password'
              required={true}
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
                />
                <div className='input-span center-flex'>confirm password</div>
              </div>
            </>
          )}
          <div className='btn-container'>
            <button className='primary-btn'>
              {isSignIn ? "sign in" : "log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
