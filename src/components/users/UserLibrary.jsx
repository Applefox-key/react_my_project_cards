import React from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { BiLabel } from "react-icons/bi";

import { GO_TO } from "../../router/routes";
import { Image } from "react-bootstrap";

import p11 from "../../img/c1.png";
import p2 from "../../img/c2.png";
import p3 from "../../img/c3.png";

const UserLibrary = () => {
  const router = useNavigate();
  const toCollections = () => {
    router(GO_TO.myCollect);
  };
  const toCat = () => {
    router(GO_TO.categoriesManager);
  };
  const toPlaylists = () => {
    router(GO_TO.playlists);
  };
  return (
    <>
      <CSSTransition appear in timeout={1000} classNames="game" unmountOnExit>
        <div>
          <div className="string_menu sticky-top">
            <div className="menufind ">My library</div>
          </div>
          <div className="card-view ">
            <div className="ulb-box" onClick={toCollections}>
              <HiOutlineRectangleStack /> <Image src={p11} className="img1" />
              <span>COLLECTONS</span>
              <div>
                <Image src={p11} className="img2" />
                Discover your flashcard sets here! Every card features a
                question on one side and the answer on the other. Use them to
                practice and enhance your understanding of key concepts.
              </div>
            </div>
            <div className="ulb-box" onClick={toPlaylists}>
              <BsCollectionPlay />
              <Image src={p2} className="img1" />
              <span>PLAYLISTS</span>
              <div>
                <Image src={p2} className="img2" /> A playlist is a set of up to
                10 flashcard collections grouped together for comprehensive
                practice. You can use it to train across various topics or
                themes. Dive into your playlist and challenge yourself with
                questions from multiple sets at once!
              </div>
            </div>
            <div className="ulb-box" onClick={toCat}>
              <BiLabel />
              <Image src={p3} className="img1" /> <span>CATEGORIES</span>
              <div>
                {" "}
                <Image src={p3} className="img2" />
                Manage your list of tags for flashcards. Each collection can be
                labeled with a tag to help you organize and easily find relevant
                sets. Use tags to categorize your flashcards and streamline your
                study sessions.
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default UserLibrary;
