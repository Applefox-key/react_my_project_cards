import React from "react";
import cl from "./PlayLists.module.scss";
import GamesMenu from "../UI/GamesMenu/GamesMenu";
import { BsCollectionPlay } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CgSearchLoading } from "react-icons/cg";

const OnePlaylist = ({ playlist, listFn }) => {
  const route = useNavigate();
  return (
    <div
      key={playlist.id}
      className={cl["onePlaylist-wrap"]}
      onClick={() => listFn.editMode(playlist)}>
      <div className={cl.firstRow}>
        {window.location.hash !== "#1" && (
          <div className={cl.playmenu}>
            <GamesMenu cardSet={playlist} isPlaylist />
          </div>
        )}

        <div
          className={cl.listHeader}
          onClick={() => listFn.editMode(playlist)}>
          {" "}
          <button className={cl.editBtn}>Edit</button>
          <BsCollectionPlay />
          <span>{playlist.name}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            listFn.delPlaylist(playlist);
          }}
          className={cl.btn}>
          <IoMdClose />
        </button>
      </div>
      <div className={cl.listBody}>
        {playlist.collections.map((col) => (
          <div className={cl.listItem} key={col.id}>
            <CgSearchLoading
              onClick={(e) => {
                e.stopPropagation();
                route(
                  `/collections/${col.isMy ? "my" : "pub"}/${col.id}/${
                    col.name
                  }`
                );
              }}
            />
            {col.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnePlaylist;
