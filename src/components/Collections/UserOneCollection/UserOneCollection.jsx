import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../../../styles/oneCollection.scss";

import ContentCards from "./ContentCards";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";
import OneCollectionMenu from "./OneCollectionMenu";
import ContentList from "./ContentList";
import Reorganizer from "./Reorganizer";

import { useTextContentFilter } from "../../../hooks/useCollectSelection";
import { useLastScroll } from "../../../hooks/useLastScroll";
import { useLastMode } from "../../../hooks/useLastMode";
import { usePopup } from "../../../hooks/usePopup";
import { useQuery } from "../../../hooks/useQuery";
import { useAuth } from "../../../hooks/useAuth";
import { addRates } from "../../../utils/gamesResults";
import BaseAPI from "../../../API/BaseAPI";

const UserOneCollection = () => {
  const [content, setContent] = useState();
  const [collect, setCollect] = useState();
  const [reorgMode, setReorgMode] = useState(false);
  const { updateFilterG, userAuth } = useAuth(true);
  const pageParam = useParams();
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useQuery(async () => {
    const result = await BaseAPI.getCollectionsAndContent(pageParam.id);

    const colContent = await addRates(result);
    setCollect(colContent[0].collection);
    setContent(colContent[0].content);
  });

  useEffect(() => {
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name]);

  useLastScroll(content);
  const [mode, modeChange] = useLastMode(userAuth);
  const filtredList = useTextContentFilter(content, userAuth.filterG);

  return (
    <div className="">
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
                content,
                setContent,
                setCollect,
              }}
            />
            {!!userAuth.filterG && (
              <div className="search_result_box">
                <span className="searchResult">results for... </span>{" "}
                <button className="btn-x" onClick={() => updateFilterG("")}>
                  text....
                  <span> {userAuth.filterG.toString()}</span>
                </button>
              </div>
            )}
            <div className="m-auto d-flex mt-4">
              {!isLoading && content ? (
                mode === 0 ? (
                  <ContentCards
                    setContent={setContent}
                    content={filtredList}
                    pageParam={pageParam}
                  />
                ) : (
                  <ContentList
                    setContent={setContent}
                    content={filtredList}
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
