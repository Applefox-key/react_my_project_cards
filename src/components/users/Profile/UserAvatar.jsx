/* eslint-disable no-unused-vars */
import React from "react";
import BaseAPI from "../../../API/BaseAPI";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";

const UserAvatar = (props) => {
  const [av, setAv] = useState();
  const [getData, isLoading] = useQuery(async () => {
    let userData = await BaseAPI.getUser();
    if (userData) setAv(userData.img);
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <MySpinner />
  ) : (
    <Image rounded src={av} style={{ width: "8%", height: "8%" }} {...props} />
  );
};

export default UserAvatar;
