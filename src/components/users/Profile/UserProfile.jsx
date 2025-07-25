import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

import cl from "./users.module.scss";

import ProfileImg from "./ProfileImg";
import ProfileText from "./ProfileText";

import { DEFAUL_USER_DATA } from "../../../constants/defaultSettings";
// import { updateStyles } from "../../../utils/userSettings";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [visible, setVisible] = useState(false);
  const [userDataForm, setUserDataForm] = useState(DEFAUL_USER_DATA);
  // const updateSettings = (e) => {
  //   updateStyles(e, userDataForm, setUserDataForm);
  // };

  useEffect(() => {
    if (!userData) return;
    setUserDataForm({ ...userData });
  }, [userData]);

  return (
    <Form
      className={cl.userForm}
      onSubmit={(event) => {
        event.preventDefault();
        onClick(userDataForm);
      }}>
      <div className="d-flex justify-content-center px-1 flex-wrap">
        <div>
          <ProfileImg
            userDataForm={userDataForm}
            setUserDataForm={setUserDataForm}
            visible={visible}
            setVisible={setVisible}
          />
        </div>
        <div className={cl.textDiv}>
          <ProfileText
            userDataForm={userDataForm}
            setUserDataForm={setUserDataForm}
            passRequired={btnName === "Sign up"}
          />{" "}
          <Button
            as="input"
            type="submit"
            value={btnName}
            className={cl.BtnSubmit}
          />
        </div>
      </div>
    </Form>
  );
};

export default UserProfile;
