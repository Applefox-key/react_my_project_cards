import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import MySpinner from "../../UI/MySpinner";
import BaseAPI from "../../../API/BaseAPI";
import TableContent from "./TableContent";
import { usePopup } from "../../../hooks/usePopup";
import CardContent from "./CardContent";
import MenuOneCollection from "./MenuOneCollection";
import "../../../styles/oneCollection.scss";
const UserOneCollection = () => {
  const [content, setContent] = useState();
  const [collect, setCollect] = useState();
  const [mode, setMode] = useState(window.location.hash === "#1" ? 1 : 0);
  const [categories, setCategories] = useState([]);
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
  const getCategories = async () => {
    try {
      const cat = await BaseAPI.getCategoriesList();
      setCategories(cat);
    } catch (error) {}
  };
  useEffect(() => {
    console.log(pageParam);

    getCategories();
    getContent();
    if (error) setPopup.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name]);

  return (
    <div className="wrap_box tableContainer">
      {collect && (
        <>
          <MenuOneCollection
            getList={getCategories}
            setContent={setContent}
            mode={mode}
            setMode={modeChange}
            colObj={{
              collection: collect,
              content: content,
              categories: categories,
            }}
          />
        </>
      )}

      {collect && (
        <div className="string_submenu">
          {collect.note && (
            <div className="note"> {"About collection: " + collect.note} </div>
          )}
          {collect.category && <div className="cat"> {collect.category}</div>}
        </div>
      )}
      <div className="wrapRelative">
        {!isLoading && content ? (
          mode === 0 ? (
            <CardContent
              setContent={setContent}
              content={content}
              pageParam={pageParam}
            />
          ) : (
            <TableContent
              setContent={setContent}
              content={content}
              pageParam={pageParam}
            />
          )
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
};

export default UserOneCollection;
