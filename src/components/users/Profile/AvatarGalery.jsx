/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import MyModal from "../../UI/MyModal";
import Button from "react-bootstrap/esm/Button";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import MySpinner from "../../UI/MySpinner";
import Form from "react-bootstrap/Form";
import ProfileImg from "../../../img/profile.ico";
import cl from "./users.module.css";

const AvatarGalery = ({ visible, setVisible, fileChange }) => {
  const [avatarUrlList, setAvatarUrlList] = useState([]);
  const [choice, setChoice] = useState(ProfileImg);
  const [getAvatarList, isLoading] = useQuery(async () => {
    setAvatarUrlList(await BaseAPI.getAvatarUrlList());
  });

  useEffect(() => {
    getAvatarList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultImg = () => {
    setChoice(ProfileImg);
  };

  const fromFile = (e) => {
    let img = e.target;
    const [file] = img.files;
    if (file) {
      setChoice(URL.createObjectURL(file));
    }
  };

  const fromGallery = () => {
    fileChange(choice);
    setVisible(false);
  };

  return (
    <MyModal
      title={"Import from file"}
      subtitle={"Сlick on the picture or choose your own"}
      showmodal={visible}
      setshowmodal={setVisible}>
      <div className="d-flex mt-3">
        <Form.Control type="file" onChange={fromFile} size="lg" />
      </div>

      <div className="d-flex p-2 flex-wrap justify-content-between">
        <div className={cl.previewBlock}>
          <Image rounded src={choice} className={cl.imgPreview} />
          <div className={cl.btn}>
            <Button variant="secondary" onClick={defaultImg}>
              CLEAR
            </Button>{" "}
            <Button onClick={fromGallery}>SELECT</Button>
          </div>
        </div>

        {isLoading ? (
          <MySpinner />
        ) : (
          <>
            {avatarUrlList.map((elem) => (
              <Image
                key={elem.name}
                className={cl.imgGallary}
                src={elem.url}
                onClick={(e) => {
                  setChoice(elem.url);
                }}
              />
            ))}
          </>
        )}
      </div>
    </MyModal>
  );
};

export default AvatarGalery;
