/* eslint-disable no-unused-vars */
import React from "react";
import BaseAPI from "../../../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../../router/routes";
import { generateAvatarLink } from "../../../utils/userRequest";

const UserAvatar = (props) => {
  const [av, setAv] = useState();
  const router = useNavigate();
  const [getData, isLoading] = useQuery(async () => {
    let userData = await BaseAPI.getUser();

    if (userData) setAv(generateAvatarLink(userData.img));
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <MySpinner />
  ) : (
    <Image
      onClick={() => router(GO_TO.profile)}
      rounded
      src={av}
      style={{ width: "8%", height: "8%" }}
      {...props}
    />
  );
};

export default UserAvatar;
