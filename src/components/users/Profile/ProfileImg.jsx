import React from "react";
import AvatarGalery from "./AvatarGalery";
import Image from "react-bootstrap/Image";
import cl from "./users.module.scss";
import { defaultAvatar } from "../../../constants/defaultSettings";
import { generateAvatarLink } from "../../../utils/userRequest";

const ProfileImg = (props) => {
  const changeAvatar = (url) => {
    props.setUserDataForm({ ...props.userDataForm, ...url });
  };

  return (
    // <div className="d-flex justify-content-center mt-2 px-5">
    <div className={cl.avatarDiv}>
      <AvatarGalery
        visible={props.visible}
        setVisible={props.setVisible}
        fileChange={changeAvatar}
        initialImg={
          props.userDataForm.img ? props.userDataForm.img : defaultAvatar
        }
      />
      <Image
        rounded
        src={generateAvatarLink(props.userDataForm.img)}
        className={cl.avatarProfile}
        onClick={() => {
          props.setVisible(true);
        }}
      />{" "}
      {/* <Button
          onClick={() => {
            props.setVisible(true);
          }}>
          Choose an avatar
        </Button> */}
    </div>
    // </div>
  );
};

export default ProfileImg;
