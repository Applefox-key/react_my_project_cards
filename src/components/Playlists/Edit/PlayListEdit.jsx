import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/collectMenu.scss";
import { usePopup } from "../../../hooks/usePopup";
import EditBody from "./EditBody";
import { editPlaylistHlp } from "../../../utils/editCollectionHlp";
import EditHeader from "./EditHeader";
import cl from "../PlayLists.module.scss";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import { GO_TO } from "../../../router/routes";

const PlayListEdit = () => {
  const [playlist, setPlaylist] = useState(null);
  const [selectedItems, setSelectedItems] = useState();
  const [selectedIds, setSelectedIds] = useState();
  const route = useNavigate();
  const pageParam = useParams();
  // eslint-disable-next-line no-unused-vars
  const [getPlaylist, isLoading, error] = useQuery(async () => {
    const list = await BaseAPI.getPlaylists(pageParam.id);
    if (list?.length) {
      setPlaylist(list[0]);
      setSelectedIds(
        list[0].collections ? list[0].collections.map((el) => el.id) : []
      );
      setSelectedItems(list[0].collections ? [...list[0].collections] : []);
    }
  });
  useEffect(() => {
    getPlaylist();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name]);
  console.log(playlist);
  const setPopup = usePopup();

  const saveChanges = async (newName) => {
    try {
      await editPlaylistHlp(newName, selectedIds, playlist.id);
      route(`/playlist/`);
    } catch (error) {
      setPopup.error(error.message);
    }
  };
  const setIsEdit = () => {
    route(GO_TO.playlists);
  };
  const clearSelection = () => {
    setSelectedIds([]);
    setSelectedItems([]);
  };

  return (
    <div className={cl["edit-list-wrap"]}>
      {playlist !== null && (
        <>
          <EditHeader
            selectedNum={selectedIds?.length}
            list={playlist}
            fns={{ clearSelection, saveChanges, setIsEdit }}
          />
          <EditBody
            items={{ selectedItems, setSelectedItems }}
            ids={{ selectedIds, setSelectedIds }}
          />
        </>
      )}
    </div>
  );
};

export default PlayListEdit;
