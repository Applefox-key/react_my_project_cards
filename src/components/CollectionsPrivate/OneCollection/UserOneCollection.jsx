import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";
import ContentCards from "./ContentCards";
import "../../../styles/oneCollection.scss";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import OneCollectionMenu from "./OneCollectionMenu";
import ContentList from "./ContentList";

const UserOneCollection = () => {
  const [content, setContent] = useState();
  const [collect, setCollect] = useState();
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
  // useEffect(() => {
  //   debugger;
  //   if (collect.hasOwnProperty("collection")) setCollect(collect.collecttion);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // });
  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name]);

  return (
    <div className="d-flex">
      <div className="wrap_box tableContainer">
        {collect && (
          <div className="d-flex">
            <OneCollectionMenu
              setContent={setContent}
              setCollect={setCollect}
              mode={mode}
              setMode={modeChange}
              colObj={{
                collection: collect,
                content: content,
              }}
            />{" "}
            {/* <p
              className="backBtnText"
              onClick={(e) => router(GO_TO.myCollect + window.location.hash)}>
              My library
            </p>{" "} */}
          </div>
        )}

        <div className="m-auto d-flex">
          {!isLoading && content ? (
            mode === 0 ? (
              <ContentCards
                setContent={setContent}
                content={content}
                pageParam={pageParam}
              />
            ) : (
              <ContentList
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
