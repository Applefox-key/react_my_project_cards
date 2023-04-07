/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import UserProfile from "./UserProfile";
import MySpinner from "../../UI/MySpinner";
import { useQuery } from "../../../hooks/useQuery";
import { usePopup } from "../../../hooks/usePopup";
import { useAuth } from "../../../hooks/useAuth";

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
    <div className="mt-4">
      {isLoading || !userData ? (
        <MySpinner />
      ) : (
        <UserProfile
          userData={userData}
          btnName="Save changes"
          onClick={updateUser}
        />
      )}
    </div>
  );
};

export default Profile;
