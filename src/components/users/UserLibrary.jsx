import React from "react";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../router/routes";
import { CSSTransition } from "react-transition-group";

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
    <CSSTransition
      appear={true}
      in={true}
      timeout={1000}
      classNames="game"
      unmountOnExit>
      <div className="tbl_view">
        <h1 className="mt-4">MY LIBRARY</h1>
        <div className="oneCollect-wrap">
          <h1 className="pointer oneCollect" onClick={toCollections}>
            Collections
          </h1>
        </div>
        <div className="oneCollect-wrap">
          <h1 className="pointer oneCollect" onClick={toPlaylists}>
            Playlists
          </h1>
        </div>
        <div className="oneCollect-wrap">
          <h1 className="pointer oneCollect" onClick={toCat}>
            Categories
          </h1>
        </div>
      </div>
    </CSSTransition>
  );
};

export default UserLibrary;
