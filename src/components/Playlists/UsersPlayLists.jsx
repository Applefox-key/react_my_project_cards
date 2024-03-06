import React, { useEffect, useState } from "react";

import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import { useQuery } from "../../hooks/useQuery";
import cl from "./PlayLists.module.scss";
import { FaMinus } from "react-icons/fa";
import { editPlaylistHlp } from "../../utils/editCollectionHlp";
import { useTextFilter } from "../../hooks/useCollectSelection";
import { useNavigate } from "react-router-dom";
import BtnPlayMenu from "../UI/PlayMenu/BtnPlayMenu";

const UsersPlayLists = ({ commonSettings, setSettingsCommon }) => {
  const [list, setList] = useState([]);
  const [getCollections, isLoading, error] = useQuery(async () => {
    setList(await BaseAPI.getPlaylists());
  });
  const setPopup = usePopup();
  const route = useNavigate();
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
            <div
              key={el.id}
              className={cl["onePlaylist-wrap"]}
              onClick={() => listFn.editMode(el)}>
              <div className={cl.firstRow}>
                {window.location.hash !== "#1" && (
                  <div className={cl.btnGames}>
                    <BtnPlayMenu
                      collection={el}
                      playlist={true}
                      small={window.location.hash !== "#1"}
                      verticals={window.location.hash !== "#1"}
                    />
                  </div>
                )}
                <div
                  className={cl.listHeader}
                  onClick={() => listFn.editMode(el)}>
                  {el.name}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    listFn.delPlaylist(el);
                  }}
                  className={cl.btn}>
                  ❌
                </button>
              </div>
              <div className={cl.listBody}>
                {el.collections.map((col) => (
                  <div
                    className={cl.listItem}
                    key={col.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      route(
                        `/collections/${col.isMy ? "my" : "pub"}/${col.id}/${
                          col.name
                        }`
                      );
                    }}>
                    {col.name}
                    <div className={cl["item-btns"]}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          listFn.delColl(el, col.id);
                        }}>
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersPlayLists;
