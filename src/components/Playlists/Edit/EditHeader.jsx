import React, { useState } from "react";
import cl from "../PlayLists.module.scss";

import GamesMenu from "../../UI/GamesMenu/GamesMenu";
import { Button } from "react-bootstrap";

const EditHeader = ({ list, fns }) => {
  const [newName, setNewName] = useState(list.name ? list.name : "");
  const { saveChanges, clearSelection, setIsEdit } = fns;
  return (
    <div className={cl.titleWrap}>
      <div>
        <GamesMenu cardSet={list} isPlaylist />
      </div>
      <div className={["input_with_lable mb-0", cl.titleP].join(" ")}>
        <label htmlFor="i_name" className="lable">
          title
        </label>
        <input
          autoFocus
          id="i_name"
          placeholder="name: my playlist"
          value={newName ? newName : ""}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="edit_btn_menu ">
        <Button
          className="mb-0"
          size="lg"
          variant="light"
          onClick={clearSelection}>
          CLEAR PLAYLIST
        </Button>
        <Button
          className="mb-0"
          size="lg"
          variant="light"
          disabled={!newName && list.id === "new"}
          onClick={() => saveChanges(newName)}>
          SAVE CHANGES
        </Button>
        <Button
          className="mb-0"
          size="lg"
          variant="light"
          onClick={(e) => {
            setIsEdit(false);
          }}>
          CANCEL
        </Button>
      </div>
    </div>
  );
};

export default EditHeader;
