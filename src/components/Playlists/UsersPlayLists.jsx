import React, { useEffect, useState } from "react";

import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import { useQuery } from "../../hooks/useQuery";
import cl from "./PlayLists.module.scss";
import { FaMinus } from "react-icons/fa";
import { editPlaylistHlp } from "../../utils/editCollectionHlp";
import PlaylistBtns from "./PlaylistBtns";
import PlayMenu from "../UI/PlayMenu/PlayMenu";
import { useTextFilter } from "../../hooks/useCollectSelection";
import { useNavigate } from "react-router-dom";

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
            ? "remove the collection from playlist?"
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
  console.log(list);

  return (
    <>
      {isLoading ? (
        <SpinnerLg className="span_wrap" />
      ) : (
        <div
          className={window.location.hash !== "#1" ? cl.wrapCard : cl.wrapTbl}>
          {filtredList.map((el) => (
            <div key={el.id} className={cl["onePlaylist-wrap"]}>
              {window.location.hash !== "#1" && (
                <div className={cl.listHeader}> {el.name}</div>
              )}
              <div className={cl.listBody}>
                {el.collections.map((col) => (
                  <div
                    className={cl.listItem}
                    key={col.id}
                    onClick={(e) => {
                      e.preventDefault();
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
                          e.preventDefault();
                          listFn.delColl(el, col.id);
                        }}>
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={window.location.hash === "#1" ? cl.tbl : ""}>
                {window.location.hash === "#1" && (
                  <div className={cl.listHeader}> {el.name}</div>
                )}
                {/* <div className={"oneCollect-wrap " + cl.listFooter}> */}
                <div className={cl.listFooter}>
                  <div className={cl["list-btns"]}>
                    <PlaylistBtns el={el} listFn={listFn} />{" "}
                    {!!el.collections.length && (
                      <div className={"playlist"}>
                        play
                        <PlayMenu
                          collection={{ id: el.id, name: el.name }}
                          playlist={true}
                          verticals={window.location.hash !== "#1"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UsersPlayLists;
