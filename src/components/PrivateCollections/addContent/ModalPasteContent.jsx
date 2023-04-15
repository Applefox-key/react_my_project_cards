import React from "react";
import { useState } from "react";
import ModalPasteContentBody from "./ModalPasteContentBody";
import { usePopup } from "../../../hooks/usePopup";
import BaseAPI from "../../../API/BaseAPI";
import { contentFromText } from "../../../utils/texts";
import MyModal from "../../UI/MyModal";
import PasteBtns from "./PasteBtns";
import PasteOneList from "./PasteOneList";
import { Form } from "react-bootstrap";

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
      showmodal={true}
      setshowmodal={setVisible}
      fullscreen
      size="md"
      dialogClassName="h100"
      title={"Adding"}>
      <div className="flex-standart w-75 mt-5">
        {" "}
        <PasteBtns
          dataArray={dataArray}
          actions={{ read: read, add: add, back: back }}
        />{" "}
        <Form.Select
          size="lg"
          className="w-50 mb-4 fs-4"
          value={tab}
          onChange={(e) => setTab(e.target.value)}>
          <option value="tab1">From the list with a separator</option>
          <option value="tab2">
            From the two list (questions and answers)
          </option>
        </Form.Select>
      </div>{" "}
      {!dataArray && tab === "tab1" && (
        <PasteOneList
          options={{
            check: check,
            setCheck: setCheck,
          }}
          separator={separator}
          setSeparator={setSeparator}
        />
      )}
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
