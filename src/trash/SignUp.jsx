import React from "react";
import BaseAPI from "../API/BaseAPI";
import UserProfile from "../components/users/UserProfile";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const router = useNavigate();

  const newUser = (data) => {
    let ok = BaseAPI.createUser(data);
    if (!ok.error) {
      router("/login/" + data.email);
    }
  };
  return (
    <div>
      <UserProfile onClick={newUser} btnName="Sign up"></UserProfile>
    </div>
  );
};

export default SignUp;
