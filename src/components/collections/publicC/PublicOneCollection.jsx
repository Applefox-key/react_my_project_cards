import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MyTable from "../../UI/table/MyTable";
import MySpinner from "../../UI/MySpinner";
import PublicCollectionMenu from "./PublicCollectionMenu";
import BaseAPI from "../../../API/BaseAPI";
import { usePopup } from "../../../hooks/usePopup";

const PublicCollectionsView = () => {
  const PageParam = useParams();
  const [content, setContent] = useState();
  const [collection, setCollection] = useState(PageParam);
  const setPopup = usePopup();
  const [getContent, isLoading] = useQuery(async () => {
    const cont = await BaseAPI.getPublicCollectionsAndContent(PageParam.id);
    setContent(cont[0].content);
    setCollection(cont[0].collection);
  });
  const route = useNavigate();
  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PageParam]);

  const addToMyCollection = async () => {
    if (!content) return;
    if (!collection) return;
    await BaseAPI.CreateCollectionWithContent(collection, content, true);
    setPopup.success("the collection has been added to your list");
  };
  const openCard = (item) => {
    route(`/collections/pub/${collection.id}/${collection.name}/${item.id}`);
  };
  return (
    <>
      {!isLoading ? (
        <div className="m-auto" style={{ width: "90%" }}>
          <PublicCollectionMenu
            collection={collection ? collection : PageParam}
            addToMyCollection={addToMyCollection}
          />
          {collection && (
            <div className="string_submenu">
              {collection.note ? "About collection: " + collection.note : ""}
            </div>
          )}
          <MyTable
            onRowClick={openCard}
            dataArray={content}
            namesArray={["question", "answer", "note"]}
          />
        </div>
      ) : (
        <MySpinner />
      )}
    </>
  );
};

export default PublicCollectionsView;
