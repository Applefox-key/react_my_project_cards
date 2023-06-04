import React from "react";
import { AiOutlineClear, AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
const PlaylistBtns = ({ el, listFn }) => {
  return (
    <div>
      <button onClick={() => listFn.editMode(el)}>
        <FiEdit2 />
      </button>
      <button onClick={() => listFn.delColl(el)}>
        <AiOutlineClear />
      </button>
      <button onClick={() => listFn.delPlaylist(el)}>
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default PlaylistBtns;
