import React from "react";
import { useState } from "react";
import ModalPasteContentBtns from "./ModalPasteContentBtns";
import ModalPasteContentBody from "./ModalPasteContentBody";
import MyModal from "../../../UI/MyModal";
import { contentFromText } from "../../../../utils/texts";
import Popup from "../../../UI/popup/Popup";
import BaseAPI from "../../../../API/BaseAPI";
import { usePopup } from "../../../../hooks/usePopup";

const ModalPasteContent = ({ setVisible, setContent, pageParam }) => {
  const [dataArray, setDataArray] = useState();
  const [check, setCheck] = useState(false);
  const [dataString, setDataString] = useState("");

  const setPopup = usePopup();
  const read = (sep) => {
    contentFromText(dataString, setDataArray, setPopup.advice, check, sep);
  };

  const back = () => {
    setDataArray();
  };

  const add = async () => {
    if (!dataArray) return;
    try {
      await BaseAPI.createContentFromArray(dataArray, pageParam.collection.id);
      setDataString("");
      setDataArray(null);
      setVisible(false);
      setContent(await BaseAPI.getContent(pageParam.collection.id));
    } catch (error) {
      setPopup.error(error.message);
      return;
    }
  };

  return (
    <MyModal
      showmodal={true}
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Adding"}>
      <ModalPasteContentBtns
        dataArray={dataArray}
        actions={{ read: read, add: add, back: back }}
        options={{
          check: check,
          setCheck: setCheck,
        }}
      />
      <div className="modal-h50">
        <div>
          <Popup />{" "}
        </div>

        <ModalPasteContentBody
          dataArr={dataArray}
          dataStr={dataString}
          setDataStr={setDataString}
          setDataArr={setDataArray}
        />
      </div>
    </MyModal>
  );
};

export default ModalPasteContent;
