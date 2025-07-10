/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import cl from "./mainNavbar.module.scss";

import MySpinner from "../UI/MySpinner";
import { IoMdArrowDropdown } from "react-icons/io";
import Image from "react-bootstrap/Image";

import { useOutsideClick } from "../../hooks/useOutSideClick";
import { useQuery } from "../../hooks/useQuery";
import { generateAvatarLink } from "../../utils/userRequest";
import { GO_TO } from "../../router/routes";
import BaseAPI from "../../API/BaseAPI";

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
  const wrapRef = useRef(null);
  useOutsideClick(wrapRef, () => setShow(false));

  const handleClick = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  return isLoading ? (
    <MySpinner />
  ) : (
    <div
      id="pronav"
      ref={wrapRef}
      className={[cl.dropdown, "ms-4"].join(" ")}
      onClick={handleClick}>
      <Image src={av} {...props} />
      {/* <IoMdArrowDropdown /> */}
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
