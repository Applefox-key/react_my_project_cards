import React, { useEffect, useState } from "react";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import { useQuery } from "../../hooks/useQuery";
import cl from "./PlayLists.module.scss";
import { editPlaylistHlp } from "../../utils/editCollectionHlp";
import { useTextFilter } from "../../hooks/useCollectSelection";
import OnePlaylist from "./OnePlaylist";

const Playlists = ({ commonSettings, setSettingsCommon }) => {
  const [list, setList] = useState([]);
  const [getCollections, isLoading, error] = useQuery(async () => {
    setList(await BaseAPI.getPlaylists());
  });
  const setPopup = usePopup();
  const listFn = {
    delColl: async (element, colid = "") => {
      if (
        !window.confirm(
          colid
            ? "remove this collection from playlist?"
            : "clear this playlist?"
        )
      )
        return;
      try {
        let newCol = colid
          ? element.collections.filter((elem) => elem.id !== colid)
          : [];
        await editPlaylistHlp(
          "",
          colid ? newCol.map((el) => el.id) : [],
          element.id
        );
        setList(
          list.map((elem) =>
            elem.id !== element.id ? elem : { ...elem, collections: newCol }
          )
        );
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    delPlaylist: async (element) => {
      if (!window.confirm("remove the playlist?")) return;
      try {
        await BaseAPI.deletePlaylist(element.id);
        setList(list.filter((elem) => elem.id !== element.id));
      } catch (error) {
        setPopup.error("something goes wrong");
      }
    },
    editMode: async (el) => {
      setSettingsCommon("editEl", el);
    },
  };

  useEffect(() => {
    if (commonSettings.editEl) return;
    getCollections();

    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonSettings.editEl, commonSettings.filter]);
  const filtredList = useTextFilter(list, commonSettings.filter);

  return (
    <>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <div
          className={window.location.hash !== "#1" ? cl.wrapCard : cl.wrapTbl}>
          {filtredList.map((el) => (
            <OnePlaylist playlist={el} listFn={listFn} />
          ))}
        </div>
      )}
    </>
  );
};

export default Playlists;
