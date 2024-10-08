import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";

import cl from "./users.module.scss";

import ProfileImg from "./ProfileImg";
import ProfileText from "./ProfileText";

import { DEFAUL_USER_DATA } from "../../../constants/defaultSettings";
import { updateStyles } from "../../../utils/userSettings";

const UserProfile = ({ userData, onClick, btnName }) => {
  const [visible, setVisible] = useState(false);
  const [userDataForm, setUserDataForm] = useState(DEFAUL_USER_DATA);
  const updateSettings = (e) => {
    updateStyles(e, userDataForm, setUserDataForm);
  };

  useEffect(() => {
    if (!userData) return;
    setUserDataForm({ ...userData });
  }, [userData]);

  const change = (val) => {
    const newSet =
      typeof userDataForm.settings === "object"
        ? {
            ...userDataForm.settings,
            listView: val,
          }
        : { listView: val };
    setUserDataForm({ ...userDataForm, settings: newSet });
  };
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
          <div className={cl.wrap_opacity}>
            <div className={cl.wrap_listview}>
              default view:
              <InputGroup
                className=" ms-2 align-items-center justify-content-center w-50 flex-nowrap"
                id="view">
                <Form.Check
                  inline
                  label="cards"
                  name="group1"
                  type={"radio"}
                  id={"ch1"}
                  checked={!userDataForm.settings.listView}
                  onChange={() => change(false)}
                />
                <Form.Check
                  inline
                  label="list"
                  name="group1"
                  type={"radio"}
                  checked={userDataForm.settings.listView}
                  id={"ch2"}
                  onChange={() => change(true)}
                />
              </InputGroup>
            </div>
            <div className={cl.backColorBox}>
              <input
                type="color"
                id="colorBack"
                onChange={updateSettings}
                value={userDataForm.settings.colorBack}
                title="Choose your background color"
              />
              <button
                onClick={updateSettings}
                id="toDefault"
                title="turn back to the default style">
                ↻
              </button>
            </div>
            <Form.Range
              onChange={updateSettings}
              title="Choose main wrap opacity"
              id="wrapOpacity"
              value={
                userDataForm.settings.wrapOpacity
                  ? userDataForm.settings.wrapOpacity
                  : 100
              }
            />
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
