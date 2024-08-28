/* eslint-disable no-unused-vars */
import React from "react";

import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import cl from "./mainNavbar.module.scss";
import BaseAPI from "../../API/BaseAPI";
import { useQuery } from "../../hooks/useQuery";
import { GO_TO } from "../../router/routes";
import { generateAvatarLink } from "../../utils/userRequest";
import MySpinner from "../UI/MySpinner";
import { IoMdArrowDropdown } from "react-icons/io";

const MyNavUserImg = ({ logout, ...props }) => {
  // const [show, setShow] = useState(false);
  const [av, setAv] = useState();

  // const router = useNavigate();
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
    <div className={[cl.dropdown, "ms-4"].join(" ")}>
      <Image src={av} {...props} /> <IoMdArrowDropdown />
      {
        <div className={cl.subbox}>
          <Link to={GO_TO.profile} id={"pathProfile"}>
            PROFILE
          </Link>
          <Link onClick={() => logout()} id={"LOGOUT"}>
            LOGOUT
          </Link>
        </div>
      }
    </div>
  );
};

export default MyNavUserImg;
