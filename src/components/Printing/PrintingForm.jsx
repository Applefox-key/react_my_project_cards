/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";

import PrintingMenu from "./PrintingMenu";
import CardVertical from "./CardVertical";
import CardColumn from "./CardColumn";
import CardHorizontal from "./CardHorizontal";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";

const PrintingForm = () => {
  const [content, setContent] = useState([]);

  const [contentPage, setContentPage] = useState([]);
  const [mode, setMode] = useState(2);
  const params = useParams();

  const [getContent, isLoading] = useQuery(async () => {
    const collectionContent =
      params.tab === "my"
        ? await BaseAPI.getContent(params.id)
        : await BaseAPI.getPublicContent(params.id);
    setContent(collectionContent);
    setContentPage(collectionContent);
  });
  const refresh = () => {
    setContentPage(content);
  };

  useEffect(() => {
    getContent();
  }, []);
  const del = (el) => {
    setContentPage(contentPage.filter((item) => el.id !== item.id));
  };
  const dragTo = useRef();
  const dragFrom = useRef();

  const drugDrop = (i) => {
    const move = (e) => {
      let temp = contentPage[dragTo.current];
      let arr = [...contentPage];
      arr[dragTo.current] = arr[dragFrom.current];
      arr[dragFrom.current] = temp;
      setContentPage(arr);
    };
    return {
      draggable: true,
      onDragStart: (e) => (dragFrom.current = i),
      onDragEnd: () => move(i),
      onDragEnter: (e) => (dragTo.current = i),
    };
  };

  const getCardFragment = (el, i, part = "") => {
    switch (mode) {
      case 0:
        return <CardVertical key={el.id} {...{ el, i, drugDrop, del, mode }} />;
      case 1:
        return <CardVertical key={el.id} {...{ el, i, drugDrop, del, mode }} />;
      case 2:
        return <CardHorizontal key={el.id} {...{ el, i, drugDrop, del }} />;
      case 3:
        return <CardColumn key={el.id} {...{ el, i, drugDrop, del, part }} />;

      default:
        break;
    }
  };
  return (
    <>
      {isLoading ? (
        <SpinnerLg />
      ) : (
        <div className="print_wrap">
          {mode}
          {mode === 0 && (
            <div className="print_cards_wrap">
              <div className="width800">
                {contentPage.length &&
                  contentPage.map((el, i) => getCardFragment(el, i))}
              </div>
            </div>
          )}
          {mode === 1 && (
            <>
              <div className="print_cards_wrap">
                {contentPage.length &&
                  contentPage.map(
                    (el, i) => i % 2 === 0 && getCardFragment(el, i)
                  )}
              </div>
              <div className="print_cards_wrap">
                {contentPage.length &&
                  contentPage.map(
                    (el, i) => i % 2 !== 0 && getCardFragment(el, i)
                  )}
              </div>
            </>
          )}
          {mode === 2 && (
            <div className="print_cards_wrap">
              {contentPage.length &&
                contentPage.map((el, i) => getCardFragment(el, i))}
            </div>
          )}
          {mode === 3 && (
            <div>
              <div className="print_cards_wrap break-after">
                {contentPage.length &&
                  contentPage.map((el, i) =>
                    getCardFragment(el, i, "question")
                  )}
              </div>
              <div className="print_cards_wrap">
                {contentPage.length &&
                  contentPage.map((el, i) => getCardFragment(el, i, "answer"))}
              </div>
            </div>
          )}
          <PrintingMenu {...{ refresh, mode, setMode }} />
        </div>
      )}
    </>
  );
};

export default PrintingForm;
