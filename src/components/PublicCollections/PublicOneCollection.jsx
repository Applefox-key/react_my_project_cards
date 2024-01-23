import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import CardContent from "../PrivateCollections/OneCollection/CardContent";
import MenuPublicCollection from "./MenuPublicCollection";
import "../../styles/oneCollection.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import SideBarGameMenu from "../SideBar/SideBarGameMenu";
import { GO_TO } from "../../router/routes";
import { onePartLittle } from "../../utils/cardFragment";

const PublicOneCollection = () => {
  const PageParam = useParams();
  const [sideBar, setSideBar] = useState();
  const [content, setContent] = useState();
  const [mode, setMode] = useState(window.location.hash === "#1" ? 1 : 0);
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

  return (
    <div className="d-flex">
      {!isLoading ? (
        <div className="wrap_box width90">
          <p
            className="backBtnText"
            onClick={(e) => router(GO_TO.myCollect + window.location.hash)}>
            Public collections
          </p>{" "}
          <MenuPublicCollection
            collection={collection ? collection : PageParam}
            setMode={modeChange}
            addToMyCollection={addToMyCollection}
            sideBar={sideBar}
            setSideBar={setSideBar}
          />
          <div className="m-auto d-flex align-items-start">
            {" "}
            {sideBar && (
              <div className="sideBar-wide">
                <SideBarGameMenu />
              </div>
            )}{" "}
            {content &&
              (mode === 0 ? (
                <CardContent
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
                          {/* <div className="btn-box">
                            <button
                              title="view card"
                              onClick={() => openCard(el)}>
                              <BsSearch />
                            </button>
                          </div> */}
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
