import React, { useCallback, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { getImgA, getImgQ } from "../../../utils/contentRequests";
import { TfiZoomIn } from "react-icons/tfi";
import { formatString } from "../../../utils/texts";
import { AiOutlineFontSize } from "react-icons/ai";

const EditCardPart = ({ item, setItem, fieldName, setTextRef }) => {
  const isQuestion = fieldName === "imgQ";
  const currentText = isQuestion ? item.question : item.answer;
  const currentImage = isQuestion ? getImgQ(item) : getImgA(item);
  const placeholderText = isQuestion
    ? "write a question....."
    : "write an answer.....";
  const spanText = isQuestion
    ? "write a question and click here"
    : "write an answer and click here";

  const fromFile = useCallback(
    (e) => {
      let img = e.target;
      let column = e.target.id;
      const [file] = img.files;

      if (file) {
        let urlim = URL.createObjectURL(file);
        let newval = { ...item };
        newval[column] = urlim;

        const reader = new FileReader();
        reader.onload = () => {
          let blob = file;
          newval[column + "file"] = blob;
        };
        reader.readAsArrayBuffer(file);

        setItem(newval);
      }
    },
    [item, setItem]
  );
  const onHandleChange = (e) => {
    if (fieldName === "imgQ") setItem({ ...item, question: e.target.value });
    else setItem({ ...item, answer: e.target.value });
  };
  const changeClass = (IsToAdd = true) => {
    if (IsToAdd) {
      ref.current.classList.add("plusTextArea");
      ref.current.focus();
    } else ref.current.classList.remove("plusTextArea");
  };
  const onHandleClick = useCallback(() => {
    if (fieldName === "imgQ") setItem({ ...item, imgQ: "", imgQFile: "" });
    else setItem({ ...item, imgA: "", imgAFile: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItem, fieldName]);
  const ref = useRef(null);
  const format = () => {
    if (ref) {
      const val = ref.current.value;
      let formattedStr = formatString(val);
      if (formattedStr || val) {
        ref.current.value = formattedStr;
      }
    }
  };
  return (
    <div className={isQuestion ? "questDiv" : "answtDiv"}>
      <div className="img_choice">
        {item[fieldName] ? (
          <div className="img">
            <button variant="outline-secondary" onClick={onHandleClick}>
              <IoMdClose />
            </button>
            <img src={currentImage} alt="" />
          </div>
        ) : (
          <>
            <input type="file" id={fieldName} onChange={fromFile} />
            <BiImageAdd className="imgEmpty" />
          </>
        )}
      </div>
      <textarea
        ref={ref}
        id={isQuestion ? "question" : "answer"}
        className={isQuestion ? "quest" : "answ"}
        type="text"
        onFocus={() => setTextRef(ref)}
        onBlur={() => changeClass(false)}
        placeholder={placeholderText}
        value={currentText}
        onChange={onHandleChange}
      />
      <span onClick={() => changeClass(false)}>{spanText}</span>{" "}
      <div className="txteditBtns">
        <button className="btnPlus" onClick={changeClass}>
          <TfiZoomIn />
        </button>{" "}
        <button className="btnPlus" onClick={format}>
          <AiOutlineFontSize />
        </button>
      </div>
    </div>
  );
};

export default EditCardPart;
