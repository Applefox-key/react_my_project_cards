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
import { VscClearAll } from "react-icons/vsc";

const OneCollectionBtns = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const router = useNavigate();
  const pageParam = useParams();
  const removeCollection = async () => {
    if (!window.confirm("Remove this collection?")) return;
    await BaseAPI.deleteColection(colObj.collection.id);
    router(GO_TO.myCollect);
  };
  const deleteAll = async () => {
    if (!window.confirm("Delete all?")) return;
    await BaseAPI.deleteColContent(pageParam.id);
    setContent([]);
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
      <button data-title="Add card" className="viewBtn" onClick={addRow}>
        <span>
          <AiOutlinePlus />
        </span>
      </button>{" "}
      <button
        data-title="Remove collection"
        className="viewBtn"
        onClick={removeCollection}>
        <span>
          <IoMdRemove />{" "}
        </span>
      </button>{" "}
      <button
        data-title="Delete all content"
        className="viewBtn"
        onClick={deleteAll}>
        <span>
          <VscClearAll />
        </span>
      </button>{" "}
      <button
        data-title="Add from the file"
        className="viewBtn"
        onClick={() => setMod("file")}>
        <span>
          <BsFiletypeTxt />
        </span>
      </button>{" "}
      <button
        data-title="Add from the list"
        className="viewBtn"
        onClick={() => setMod("list")}>
        <span>
          <BiListPlus />
        </span>
      </button>{" "}
      <button
        data-title="Print"
        className="viewBtn"
        onClick={() =>
          router(
            `${GO_TO.myCollect}${GO_TO.print}/${pageParam.id}/${pageParam.name}`
          )
        }>
        <span>
          <HiPrinter />
        </span>
      </button>{" "}
      <button
        data-title="Download"
        className="viewBtn"
        onClick={() => setMod("share")}>
        <span>
          <MdOutlineFileDownload />
        </span>
      </button>{" "}
      <button
        data-title="Back"
        className="viewBtn"
        onClick={() => router(GO_TO.myCollect)}>
        <span>
          {" "}
          <AiOutlineRollback />{" "}
        </span>
      </button>{" "}
    </>
  );
};

export default OneCollectionBtns;
