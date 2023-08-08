import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdRemove } from "react-icons/io";
import { BiListPlus } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlinePlus, AiOutlineRollback } from "react-icons/ai";
import { BsFiletypeTxt } from "react-icons/bs";
import BaseAPI from "../../../API/BaseAPI";
import { GO_TO } from "../../../router/routes";
import { HiPrinter } from "react-icons/hi";
import ModalCommand from "../../PrivateCollections/OneCollectionActions/ModalCommand";

const SideBarIconsSet = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const router = useNavigate();
  const pageParam = useParams();
  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseAPI.deleteColection(colObj.collection.id);
    router(GO_TO.myCollect);
  };

  const addRow = () => {
    router(`${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/new`);
  };

  return (
    <>
      {mod && (
        <ModalCommand
          mod={mod}
          setMod={setMod}
          setContent={setContent}
          colObj={colObj}
        />
      )}
      <button data-title="Add card" onClick={addRow}>
        <span>
          <AiOutlinePlus />
        </span>
      </button>{" "}
      <button data-title="Remove" onClick={removeCollection}>
        <span>
          <IoMdRemove />{" "}
        </span>
      </button>{" "}
      <button data-title="Add from the file" onClick={() => setMod("file")}>
        <span>
          <BsFiletypeTxt />
        </span>
      </button>{" "}
      <button data-title="Add from the list" onClick={() => setMod("list")}>
        <span>
          <BiListPlus />
        </span>
      </button>{" "}
      <button
        data-title="Print"
        onClick={() =>
          router(
            `${GO_TO.myCollect}${GO_TO.print}/${pageParam.id}/${pageParam.name}`
          )
        }>
        <span>
          <HiPrinter />
        </span>
      </button>{" "}
      <button data-title="Download" onClick={() => setMod("share")}>
        <span>
          <MdOutlineFileDownload />
        </span>
      </button>{" "}
      <button data-title="Back" onClick={() => router(GO_TO.myCollect)}>
        <span>
          {" "}
          <AiOutlineRollback />{" "}
        </span>
      </button>{" "}
    </>
  );
};

export default SideBarIconsSet;
