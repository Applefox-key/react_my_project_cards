import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import MyTable from "../UI/table/MyTable";
import BaseAPI from "../../API/BaseAPI";
import { usePopup } from "../../hooks/usePopup";
import CardContent from "../PrivateCollections/OneCollection/CardContent";
import MenuPublicCollection from "./MenuPublicCollection";
import "../../styles/oneCollection.scss";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";

const PublicOneCollection = () => {
  const PageParam = useParams();
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
    <>
      {!isLoading ? (
        <div className="wrap_box width90">
          <MenuPublicCollection
            collection={collection ? collection : PageParam}
            addToMyCollection={addToMyCollection}
            mode={mode}
            setMode={modeChange}
          />
          {collection && (
            <div className="string_submenu">
              {collection.note ? "About collection: " + collection.note : ""}
            </div>
          )}
          <div className="wrapRelative">
            {content &&
              (mode === 0 ? (
                <CardContent
                  setContent={setContent}
                  content={content}
                  pageParam={PageParam}
                />
              ) : (
                <MyTable
                  classtbl="tblContent lavanderBack"
                  onRowClick={openCard}
                  dataArray={content}
                  namesArray={["question", "answer", "note"]}
                />
              ))}
          </div>
        </div>
      ) : (
        <SpinnerLg className="span_wrap" />
      )}
    </>
  );
};

export default PublicOneCollection;
