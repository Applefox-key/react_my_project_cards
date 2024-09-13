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
import { CiFolderOff, CiShare2, CiSquarePlus } from "react-icons/ci";
import { favorite, share } from "../../../utils/contentRequests";
import { usePopup } from "../../../hooks/usePopup";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { RiArrowGoBackLine } from "react-icons/ri";
import SpinningBtn from "../SpinningBtn/SpinningBtn";

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
  const goBack = () => {
    if (window.history.length > 1) {
      router(-1);
    } else {
      router(GO_TO.myCollect);
    }
  };
  const buttonAdd = (
    <div className="spin-btn-child">
      <div data-title="Add card" onClick={addRow}>
        <span>
          <CiSquarePlus />
        </span>
        Add card
      </div>{" "}
      <div data-title="Add from the file" onClick={() => setMod("file")}>
        <span>
          <BsFiletypeTxt />
        </span>
        Add from the file
      </div>
      <div data-title="Add from the list" onClick={() => setMod("list")}>
        <span>
          <BiListPlus />
        </span>
        Add from the list
      </div>
    </div>
  );
  const buttonDel = (
    <div className="spin-btn-child">
      <div data-title="Add card" onClick={removeCollection}>
        <span>
          <CiFolderOff />
        </span>
        Remove collection
      </div>{" "}
      <div data-title="Add from the file" onClick={deleteAll}>
        <span>
          <BsFiletypeTxt />
        </span>
        Delete all content
      </div>
    </div>
  );
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
      <SpinningBtn
        child={buttonAdd}
        ico={<AiOutlinePlus />}
        elemId="idAddBtn"
      />{" "}
      <SpinningBtn child={buttonDel} ico={<IoMdRemove />} elemId="idDelBtn" />
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
      <button data-title="Back" className="viewBtn" onClick={goBack}>
        <span>
          <RiArrowGoBackLine />{" "}
        </span>
      </button>{" "}
    </>
  );
};

export default OneCollectionBtns;
