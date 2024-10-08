import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import "../../../styles/oneCollection.scss";

import ContentCards from "../UserOneCollection/ContentCards";
import PublicCollectionMenu from "./PublicCollectionMenu";
import SpinnerLg from "../../UI/SpinnerLg/SpinnerLg";

import { useLastScroll } from "../../../hooks/useLastScroll";
import { useLastMode } from "../../../hooks/useLastMode";
import { useQuery } from "../../../hooks/useQuery";
import { usePopup } from "../../../hooks/usePopup";
import { useAuth } from "../../../hooks/useAuth";

import { saveModeAndScroll } from "../../../utils/scrollFn";
import { onePartLittle } from "../../../utils/cardFragment";
import { sortByField } from "../../../utils/arraysFunc";
import BaseAPI from "../../../API/BaseAPI";

const PublicOneCollection = () => {
  const PageParam = useParams();
  const [content, setContent] = useState();
  const { userAuth } = useAuth(true);
  const [mode, modeChange] = useLastMode(userAuth);
  const [collection, setCollection] = useState(PageParam);
  const setPopup = usePopup();
  const [getContent, isLoading] = useQuery(async () => {
    const cont = await BaseAPI.getPublicCollectionsAndContent(PageParam.id);
    setContent(cont[0].content);
    setCollection(cont[0].collection);
  });
  const router = useNavigate();
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
    saveModeAndScroll();
    router(
      `/collections/pub/card/${collection.id}/${collection.name}/${item.id}`
    );
  };
  const sortContent = (val, isDec) => {
    const newVal = sortByField([...content], val, isDec);
    setContent(newVal);
  };
  useLastScroll(content);
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
          <CSSTransition
            appear
            in
            timeout={1000}
            classNames="game"
            unmountOnExit>
            <div className="m-auto d-flex align-items-start mt-4">
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
                          <div
                            key={el.id}
                            className="one-row"
                            onClick={() => {
                              openCard(el);
                            }}>
                            {onePartLittle(el, "question")}
                            {onePartLittle(el, "answer")}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CSSTransition>
        </div>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </div>
  );
};

export default PublicOneCollection;
