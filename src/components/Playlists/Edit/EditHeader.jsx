import React, { useCallback, useMemo, useState } from "react";

import GamesMenu from "../../UI/GamesMenu/GamesMenu";
import { Button } from "react-bootstrap";
import CollectionPagePath from "../../UI/CollectionPagePath";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../../router/routes";

const EditHeader = ({ list, selectedNum, fns }) => {
  const [newName, setNewName] = useState(list.name ? list.name : "");
  const { saveChanges, clearSelection, setIsEdit } = fns;
  const router = useNavigate();
  const toPlaylists = useCallback(() => {
    router(GO_TO.playlists);
  }, [router]);
  console.log(list);

  const toLibrary = useCallback(() => {
    router(GO_TO.library);
  }, [router]);

  const arrPath = useMemo(() => {
    const res = [
      { name: "My library", action: toLibrary },
      { name: "Playlists", action: toPlaylists },
    ];

    return res;
  }, [toLibrary, toPlaylists]);
  return (
    <>
      <div className="sticky-top">
        <div className="string_menu string_menu_play string-bread">
          <div className="name-collect">
            <CollectionPagePath list={arrPath} addEndSepar />
            <span className="colname">({selectedNum})</span>
            <input
              autoFocus
              id="ip_name"
              placeholder="name: my playlist"
              value={newName ? newName : ""}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <div className="string_menu string_edit_play  ">
          <div className="edit_btn_menu ">
            <Button
              className="mb-0"
              size="lg"
              variant="light"
              onClick={(e) => {
                setIsEdit(false);
              }}>
              CANCEL
            </Button>{" "}
            <Button
              className="mb-0"
              size="lg"
              variant="light"
              disabled={!newName && list.id === "new"}
              onClick={() => saveChanges(newName)}>
              SAVE CHANGES
            </Button>{" "}
            <Button
              className="mb-0"
              size="lg"
              variant="light"
              onClick={clearSelection}>
              CLEAR PLAYLIST
            </Button>
          </div>
          <GamesMenu cardSet={list} isPlaylist />
        </div>
      </div>
    </>
  );
};

export default EditHeader;
