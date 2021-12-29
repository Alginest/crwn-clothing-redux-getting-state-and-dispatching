import React from "react";
import SignIn from "../../components/signIn/signIn";
import SignUp from "../../components/signup/signUp";
import "./SignInandSignUp.scss";
const SignInandSignUp = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInandSignUp;
