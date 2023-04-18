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
    <div className={cl.avatarDiv}>
      {props.visible && (
        <AvatarGalery
          setVisible={props.setVisible}
          fileChange={changeAvatar}
          initialImg={
            props.userDataForm.img ? props.userDataForm.img : defaultAvatar
          }
        />
      )}
      <Image
        rounded
        src={generateAvatarLink(props.userDataForm.img)}
        className={cl.avatarProfile}
        onClick={() => {
          props.setVisible(true);
        }}
      />
    </div>
  );
};

export default ProfileImg;
