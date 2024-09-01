import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdRemove } from "react-icons/io";
import { BiListPlus } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFiletypeTxt } from "react-icons/bs";
import BaseAPI from "../../../API/BaseAPI";
import { GO_TO } from "../../../router/routes";
import { HiPrinter, HiShare } from "react-icons/hi";
import ModalCommand from "../../CollectionsPrivate/OneCollectionActions/ModalCommand";
import { VscClearAll } from "react-icons/vsc";
import { CiFolderOff, CiShare2, CiSquarePlus } from "react-icons/ci";
import { favorite, share } from "../../../utils/contentRequests";
import { usePopup } from "../../../hooks/usePopup";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { RiArrowGoBackLine } from "react-icons/ri";

const OneCollectionBtns = ({ colObj, setContent }) => {
  const [mod, setMod] = useState(false);
  const [collPar, setCollPar] = useState(colObj.collection);
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
  const setPopup = usePopup();
  const addRow = () => {
    router(`${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/new`);
  };
  const shareColl = async () => {
    try {
      const newVal = { ...collPar, isPublic: !collPar.isPublic };
      await share(collPar, setPopup);
      setCollPar(newVal);
    } catch (error) {
      setPopup.error("something goes wrong");
    }
  };
  const favColl = async () => {
    const newVal = { ...collPar, isFavorite: !collPar.isFavorite };
    await favorite(collPar, setPopup);
    setCollPar(newVal);
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
      <button
        data-title={collPar.isFavorite ? "unfavorite" : "to favorite"}
        className={collPar.isFavorite ? "viewBtn checked" : "viewBtn"}
        onClick={favColl}>
        <span>{collPar.isFavorite ? <HiHeart /> : <HiOutlineHeart />}</span>
      </button>{" "}
      <button
        data-title={collPar.isPublic ? "Unshare" : "Share"}
        className={collPar.isPublic ? "viewBtn checked" : "viewBtn"}
        onClick={shareColl}>
        <span>{collPar.isPublic ? <HiShare /> : <CiShare2 />}</span>
      </button>
      <div data-title="Add" className="drop-down-menuBtn">
        <span className="iconDr">
          <AiOutlinePlus />
        </span>
        <div className="buttonBox">
          {" "}
          <button data-title="Add card" className="viewBtn" onClick={addRow}>
            <span>
              <CiSquarePlus />
            </span>
          </button>{" "}
          <button
            data-title="Add from the file"
            className="viewBtn"
            onClick={() => setMod("file")}>
            <span>
              <BsFiletypeTxt />
            </span>
          </button>
          <button
            data-title="Add from the list"
            className="viewBtn"
            onClick={() => setMod("list")}>
            <span>
              <BiListPlus />
            </span>
          </button>{" "}
        </div>
      </div>
      <div data-title="Delete" className="drop-down-menuBtn">
        <span className="iconDrRot">
          <IoMdRemove />
        </span>
        <div className="buttonBox">
          <button
            data-title="Remove collection"
            className="viewBtn"
            onClick={removeCollection}>
            <span>
              <CiFolderOff />
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
        </div>
      </div>
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
      </button>
      <button
        data-title="Back"
        className="viewBtn"
        onClick={() => router(GO_TO.myCollect)}>
        <span>
          <RiArrowGoBackLine />{" "}
        </span>
      </button>{" "}
    </>
  );
};

export default OneCollectionBtns;
