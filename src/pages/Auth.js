import React from "react";
import { useSelector } from "react-redux";
import { selectAllVariables } from "../store/store";
const Auth = () => {
  const vars = useSelector(selectAllVariables);
  console.log(vars.isSignIn);
  return (
    <div id='auth-page' className='height-100 center-flex'>
      <div className='form-container'>
        <form action=''></form>
      </div>
    </div>
  );
};

export default Auth;
