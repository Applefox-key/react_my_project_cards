/* eslint-disable no-unused-vars */
import React from "react";

import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import cl from "./mainNavbar.module.scss";
import BaseAPI from "../../API/BaseAPI";
import { useQuery } from "../../hooks/useQuery";
import { GO_TO } from "../../router/routes";
import { generateAvatarLink } from "../../utils/userRequest";
import MySpinner from "../UI/MySpinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { useOutsideClick } from "../../hooks/useOutSideClick";

const MyNavUserImg = ({ logout, ...props }) => {
  const [show, setShow] = useState(false);
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

  useOutsideClick("pronav", () => setShow(false));

  const handleClick = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  return isLoading ? (
    <MySpinner />
  ) : (
    <div
      id="pronav"
      className={[cl.dropdown, "ms-4"].join(" ")}
      onClick={handleClick}>
      <Image src={av} {...props} /> <IoMdArrowDropdown />
      {show && (
        <div className={cl.subboxOnBtn}>
          <Link to={GO_TO.profile} id={"pathProfile"}>
            PROFILE
          </Link>
          <Link
            onClick={(e) => {
              e.stopPropagation();
              logout();
            }}
            id={"LOGOUT"}>
            LOGOUT
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyNavUserImg;
