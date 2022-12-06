import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";
import BaseAPI from "../../../API/BaseAPI";
import TableContent from "./TableContent";
import CollNameMenu from "./CollNameMenu";
import { usePopup } from "../../../hooks/usePopup";

const UserOneCollection = () => {
  const [content, setContent] = useState();
  const [collect, setCollect] = useState();
  const [categories, setCategories] = useState([]);
  const pageParam = useParams();
  const setPopup = usePopup();
  const [getContent, isLoading, error] = useQuery(async () => {
    const colContent = await BaseAPI.getCollectionsAndContent(pageParam.id);
    setCollect(colContent[0].collection);
    setContent(colContent[0].content);
  });
  const getCategories = async () => {
    try {
      const cat = await BaseAPI.getCategoriesList();
      setCategories(cat);
    } catch (error) {}
  };
  useEffect(() => {
    getCategories();
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  return (
    <div className="mt-2 tableContainer">
      {collect && (
        <div>
          <CollNameMenu
            getList={getCategories}
            setContent={setContent}
            setCollect={setCollect}
            colObj={{
              collection: collect,
              content: content,
              categories: categories,
            }}
          />{" "}
        </div>
      )}

      {collect && (
        <div className="string_submenu">
          {collect.note ? "About collection: " + collect.note : ""}
        </div>
      )}
      {!isLoading && content ? (
        <TableContent
          setContent={setContent}
          content={content}
          pageParam={pageParam}
        />
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default UserOneCollection;
