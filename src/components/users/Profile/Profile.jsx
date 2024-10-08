/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import UserProfile from "./UserProfile";

import { useQuery } from "../../../hooks/useQuery";
import { usePopup } from "../../../hooks/usePopup";
import { useAuth } from "../../../hooks/useAuth";
import BaseAPI from "../../../API/BaseAPI";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const setPopup = usePopup();
  const { updateSettings } = useAuth(true);
  const [getUserData, isLoading, error] = useQuery(async () => {
    const userData = await BaseAPI.getUser();
    if (userData) setUserData(userData);
  });

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (data) => {
    let result = await BaseAPI.updateUser(data);
    if (error) {
      setPopup.error(error);
      return;
    }
    updateSettings(data.settings);
    setPopup.success("The changes have been saved");
    setUserData({ ...userData, ...data });
  };

  return (
    <>
      <CSSTransition appear in timeout={1000} classNames="game" unmountOnExit>
        <div className="mt-4">
          {isLoading || !userData ? (
            <SpinnerLg className="span_wrap" />
          ) : (
            <UserProfile
              userData={userData}
              btnName="Save changes"
              onClick={updateUser}
            />
          )}
        </div>
      </CSSTransition>
    </>
  );
};

export default Profile;
