import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import imgProfile from "../../../img/profile.ico";
import Form from "react-bootstrap/Form";
import ProfileImg from "./ProfileImg";
import ProfileText from "./ProfileText";
import cl from "./users.module.scss";
import { defaultSettings } from "../../../constants/defaultSettings";
import { applyUserSettings } from "../../../utils/userSettings";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [visible, setVisible] = useState(false);
  const [userDataForm, setUserDataForm] = useState({
    name: "",
    email: "",
    img: imgProfile,
    password: "",
    settings: defaultSettings,
  });

  const setColor = (e) => {
    const newSet = {
      ...userDataForm.settings,
      colorBack: e.target.value,
    };
    setUserDataForm({ ...userDataForm, settings: newSet });
    applyUserSettings(newSet);
  };
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
          />{" "}
          <div className={cl.backColorBox}>
            <input
              type="color"
              id="colorInput"
              onChange={setColor}
              // defaultValue={userDataForm.settings.colorBack}
              value={userDataForm.settings.colorBack}
              title="Choose your background color"
            />{" "}
          </div>
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
