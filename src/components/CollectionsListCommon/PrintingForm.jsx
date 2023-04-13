import React, { useEffect, useRef, useState } from "react";
import { getImgA, getImgQ } from "../../utils/contentRequests";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";

const PrintingForm = () => {
  const [content, setContent] = useState([]);
  const [contentPage, setContentPage] = useState([]);

  const params = useParams();
  const elementsRef = useRef([]);

  const [getContent, isLoading, error] = useQuery(async () => {
    const collectionContent =
      params.tab === "my"
        ? await BaseAPI.getContent(params.id)
        : BaseAPI.getPublicContent(params.id);
    setContent(collectionContent);
    setContentPage(collectionContent);
  });

  useEffect(() => {
    getContent();
  }, []);

  const [height, setHeight] = useState({});

  useEffect(() => {
    if (!elementsRef.current.length || Object.keys(height).length) return;
    if (elementsRef.current.length && !Object.keys(height).length) {
      setHeight(
        elementsRef.current.reduce((h, el) => {
          h[el.id] = el.getBoundingClientRect().height;
          return h;
        }, {})
      );
    }
  }, [content]);

  // useEffect(() => {
  //   let newC = [...content].sort((a, b) => {
  //     return height[a.id] - height[b.id];
  //   });
  //   setContent(newC);
  // }, [height]);

  const del = (el) => {
    setContentPage(contentPage.filter((item) => el.id !== item.id));
  };
  const dragTo = useRef();
  const dragFrom = useRef();

  const drugDropProp = (i) => {
    const move = () => {
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
  const oneCard = (el, i) => (
    <div
      key={el.id}
      id={el.id}
      ref={(el) => (elementsRef.current[i] = el)}
      className="print_card"
      {...drugDropProp(i)}>
      <button onClick={() => del(el)}>❌</button>
      <div className="print_part question">
        {el.imgQ && <img src={getImgQ(el)} alt="" />}
        {el.question}
      </div>
      <div className="print_part answer">
        {el.imgA && <img src={getImgA(el)} alt="" />}
        {el.answer}
      </div>{" "}
      <div className="print-name">
        {params.name} <span>{i + 1}</span>
      </div>
    </div>
  );
  const selectSize = () => {
    let newC = [...contentPage].sort((a, b) => {
      return height[b.id] - height[a.id];
    });
    setContentPage(newC);
  };

  console.log(height);
  console.log(contentPage);
  return (
    <div className="print_wrap">
      <div className="print_cards_wrap">
        {contentPage.length &&
          contentPage.map((el, i) => i % 2 === 0 && oneCard(el, i))}
      </div>{" "}
      <div className="print_cards_wrap">
        {contentPage.length &&
          contentPage.map((el, i) => i % 2 !== 0 && oneCard(el, i))}{" "}
      </div>{" "}
      <div className="print_menu">
        <div className="printBtns_wrap">
          <button
            className="printBtn"
            title="refresh"
            onClick={() => setContentPage(content)}>
            🔄
          </button>{" "}
          <button
            className="printBtn"
            title="pick up by height"
            onClick={selectSize}>
            ↕️
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default PrintingForm;
