import React from "react";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../router/routes";

const UserLibrary = () => {
  const router = useNavigate();
  const toCollections = () => {
    router(GO_TO.myCollect);
  };
  const toCat = () => {
    router(GO_TO.myCollect);
  };
  const toPlaylists = () => {
    router(GO_TO.playlists);
  };
  return (
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
  );
};

export default UserLibrary;
