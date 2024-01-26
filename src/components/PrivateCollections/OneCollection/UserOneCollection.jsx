import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import CardContent from "./CardContent";
import "../../../styles/oneCollection.scss";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import OneCollectionMenu from "./OneCollectionMenu";
import SideBarGameMenu from "../../SideBar/SideBarGameMenu";
import CardContentList from "./CardContentList";
import { GO_TO } from "../../../router/routes";
import { Form } from "react-bootstrap";
import { sortByField } from "../../../utils/arraysFunc";

const UserOneCollection = () => {
  const [content, setContent] = useState();
  const [collect, setCollect] = useState();
  const [sideBar, setSideBar] = useState();
  const [mode, setMode] = useState(window.location.hash === "#1" ? 1 : 0);
  const pageParam = useParams();
  const setPopup = usePopup();
  const router = useNavigate();
  const [getContent, isLoading, error] = useQuery(async () => {
    const colContent = await BaseAPI.getCollectionsAndContent(pageParam.id);
    setCollect(colContent[0].collection);
    setContent(colContent[0].content);
  });

  const modeChange = () => {
    let newVal = 1 - mode;
    setMode(newVal);
    router(window.location.pathname + "#" + newVal);
  };

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name]);
  const sortContent = (val) => {
    const newVal = sortByField(
      [...content],
      val < 3 ? "question" : "answer",
      !(val % 2)
    );
    setContent(newVal);
  };
  return (
    <div className="d-flex">
      <div className="wrap_box tableContainer">
        {collect && (
          <div className="d-flex">
            <OneCollectionMenu
              setContent={setContent}
              mode={mode}
              setMode={modeChange}
              sideBar={sideBar}
              setSideBar={setSideBar}
              colObj={{
                collection: collect,
                content: content,
              }}
            />{" "}
            <p
              className="backBtnText"
              onClick={(e) => router(GO_TO.myCollect + window.location.hash)}>
              My library
            </p>{" "}
          </div>
        )}{" "}
        <Form.Select
          size="sm"
          onChange={(e) => sortContent(parseInt(e.target.value))}
          aria-label="Default select example"
          className="wsort m-auto">
          <option>Sort</option>
          <option value="1">A-Z questions</option>
          <option value="2">Z-A questions</option>
          <option value="3">A-Z answers</option>
          <option value="2">Z-A answers</option>
        </Form.Select>
        <div className="m-auto d-flex">
          {sideBar && (
            <div className="sideBar-wide">
              <SideBarGameMenu />
            </div>
          )}

          {!isLoading && content ? (
            mode === 0 ? (
              <CardContent
                setContent={setContent}
                content={content}
                pageParam={pageParam}
              />
            ) : (
              <CardContentList
                setContent={setContent}
                content={content}
                pageParam={pageParam}
              />
            )
          ) : (
            <SpinnerLg className="span_wrap" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOneCollection;
