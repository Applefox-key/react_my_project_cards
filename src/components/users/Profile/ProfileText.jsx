import React from "react";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
import cl from "./users.module.scss";

const ProfileText = ({ userDataForm, setUserDataForm, passRequired }) => {
  return (
    <div>
      <h1 className="display-2 contrastColor mb-5">Your data</h1>
      <MyInputGroup
        classgroup={cl.inputGr}
        required
        size="lg"
        label="Name"
        placeholder="Name"
        value={userDataForm.name}
        onChange={(e) =>
          setUserDataForm({ ...userDataForm, name: e.target.value })
        }></MyInputGroup>
      <MyInputGroup
        classgroup={cl.inputGr}
        size="lg"
        required
        label="email"
        type="email"
        placeholder="name@example.com"
        value={userDataForm.email}
        onChange={(e) =>
          setUserDataForm({ ...userDataForm, email: e.target.value })
        }></MyInputGroup>{" "}
      <MyInputGroup
        classgroup={cl.inputGr}
        required={passRequired}
        size="lg"
        label="password"
        type="password"
        placeholder="password"
        value={userDataForm.password}
        onChange={(e) =>
          setUserDataForm({ ...userDataForm, password: e.target.value })
        }></MyInputGroup>{" "}
    </div>
  );
};

export default ProfileText;
