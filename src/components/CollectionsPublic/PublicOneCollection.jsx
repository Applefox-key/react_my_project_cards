import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import ContentCards from "../CollectionsPrivate/OneCollection/ContentCards";
import PublicCollectionMenu from "./PublicCollectionMenu";
import "../../styles/oneCollection.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import { onePartLittle } from "../../utils/cardFragment";
import { sortByField } from "../../utils/arraysFunc";
// import { useAuth } from "../../hooks/useAuth";

const PublicOneCollection = () => {
  const PageParam = useParams();
  const [content, setContent] = useState();
  const [mode, setMode] = useState(0);
  const [collection, setCollection] = useState(PageParam);
  const setPopup = usePopup();
  const [getContent, isLoading] = useQuery(async () => {
    const cont = await BaseAPI.getPublicCollectionsAndContent(PageParam.id);
    setContent(cont[0].content);
    setCollection(cont[0].collection);
  });
  const router = useNavigate();

  const modeChange = () => {
    let newVal = 1 - mode;
    setMode(newVal);
    router(window.location.pathname + "#" + newVal);
  };
  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PageParam.id, PageParam.name]);

  const addToMyCollection = async () => {
    if (!content) return;
    if (!collection) return;
    let res = await BaseAPI.copySharedCollection(collection);
    setPopup.success(res.message);
  };
  const openCard = (item) => {
    router(`/collections/pub/${collection.id}/${collection.name}/${item.id}`);
  };
  const sortContent = (val, isDec) => {
    const newVal = sortByField([...content], val, isDec);
    setContent(newVal);
  };
  return (
    <div className="d-flex">
      {!isLoading ? (
        <div className="wrap_box width90">
          <PublicCollectionMenu
            collection={collection ? collection : PageParam}
            viewMode={mode}
            setMode={modeChange}
            addToMyCollection={addToMyCollection}
            sortContent={sortContent}
          />
          <div className="m-auto d-flex align-items-start">
            {content &&
              (mode === 0 ? (
                <ContentCards
                  setContent={setContent}
                  content={content}
                  pageParam={PageParam}
                />
              ) : (
                <div className="listContent-wrap">
                  {content && (
                    <div className="listContent">
                      {content.map((el, i) => (
                        <div className="one-row" onClick={() => openCard(el)}>
                          {onePartLittle(el, "question")}
                          {onePartLittle(el, "answer")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default PublicOneCollection;
