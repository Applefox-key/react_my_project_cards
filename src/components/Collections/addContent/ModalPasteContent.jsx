import React, { useState } from "react";

import ModalPasteContentBody from "./ModalPasteContentBody";
import PasteOneList from "./PasteOneList";
import MyModal from "../../UI/MyModal";
import PasteBtns from "./PasteBtns";

import { Form } from "react-bootstrap";

import { usePopup } from "../../../hooks/usePopup";
import { contentFromText } from "../../../utils/texts";
import BaseAPI from "../../../API/BaseAPI";

const ModalPasteContent = ({ setVisible, setContent, pageParam }) => {
  const [dataArray, setDataArray] = useState();
  const [tab, setTab] = useState("tab1");
  const [check, setCheck] = useState(false);
  const [dataString, setDataString] = useState({ one: "", two: "" });
  const [separator, setSeparator] = useState(";");
  const setPopup = usePopup();
  const read = () => {
    contentFromText(
      dataString,
      setDataArray,
      setPopup.advice,
      check,
      separator,
      tab
    );
  };

  const back = () => {
    setDataArray();
  };

  const add = async () => {
    if (!dataArray) return;
    try {
      await BaseAPI.createContentFromArray(dataArray, pageParam.collection.id);
      setDataString({ one: "", two: "" });
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
      showmodal
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Adding"}>
      <div className="addcontent-wrap">
        <PasteBtns
          dataArray={dataArray}
          actions={{ read: read, add: add, back: back }}
        />{" "}
        {!dataArray && tab === "tab1" && (
          <>
            <PasteOneList
              options={{
                check: check,
                setCheck: setCheck,
              }}
              separator={separator}
              setSeparator={setSeparator}
            />
          </>
        )}{" "}
        {!dataArray && (
          <Form.Select
            size="lg"
            className="w-auto fs-4"
            value={tab}
            onChange={(e) => setTab(e.target.value)}>
            <option value="tab1">From the list with a separator</option>
            <option value="tab2">
              From the two list (questions and answers)
            </option>
            <option value="tab3">
              From the row-list (questions upon the answers)
            </option>
          </Form.Select>
        )}
      </div>
      <div className="modal-h50 mt-2">
        <ModalPasteContentBody
          dataArr={dataArray}
          dataStr={dataString}
          setDataStr={setDataString}
          setDataArr={setDataArray}
          tab={tab}
        />
      </div>
    </MyModal>
  );
};

export default ModalPasteContent;
