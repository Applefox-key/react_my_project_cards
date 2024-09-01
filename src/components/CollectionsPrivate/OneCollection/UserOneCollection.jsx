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
import { addRates } from "../../../utils/gamesResults";
import Reorganizer from "./Reorganizer";

const UserOneCollection = () => {
  const [content, setContent] = useState();
  const [collect, setCollect] = useState();
  const [reorgMode, setReorgMode] = useState(false);
  const [mode, setMode] = useState(window.location.hash === "#1" ? 1 : 0);
  const pageParam = useParams();
  const setPopup = usePopup();
  const router = useNavigate();
  const [getContent, isLoading, error] = useQuery(async () => {
    const result = await BaseAPI.getCollectionsAndContent(pageParam.id);
    const colContent = await addRates(result);
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

  return (
    <div className="d-flex">
      <div className="wrap_box tableContainer">
        {reorgMode && (
          <div>
            <Reorganizer
              setReorgMode={setReorgMode}
              content={content}
              setContent={setContent}
            />
          </div>
        )}

        {collect && !reorgMode && (
          <>
            <OneCollectionMenu
              modes={{
                setMode: modeChange,
                setReorgMode,
              }}
              collectionData={{
                collection: collect,
                content: content,
                setContent,
              }}
            />

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
          </>
        )}
      </div>
    </div>
  );
};

export default UserOneCollection;
