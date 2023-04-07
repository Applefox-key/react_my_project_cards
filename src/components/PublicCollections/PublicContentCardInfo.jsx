import React, { useEffect } from "react";
import MyCardExtra from "../UI/CARDS/MyCardExtra";
import { useState } from "react";
import BaseAPI from "../../API/BaseAPI";
import { useQuery } from "../../hooks/useQuery";
import { useParams } from "react-router-dom";
import BackBtn from "../UI/BackBtn/BackBtn";
import cl from "../UI/CARDS/MyCard.module.scss";

const PublicContentCardInfo = () => {
  const [item, setitem] = useState();
  const pageParam = useParams();
  const [getContent, ,] = useQuery(async () => {
    const content = await BaseAPI.getPublicContentItem(pageParam.item);
    setitem(content);
  });

  useEffect(() => {
    getContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam]);

  return (
    <>
      <div className="text-center mx-5 my-5">
        {/* <div className={cl.container_gallery}> */}
        <BackBtn size="lg" variant="primary" />
      </div>
      <div className={cl.container_gallery + " m-auto"}>
        {item && <MyCardExtra item={item} />}
      </div>
    </>
  );
};

export default PublicContentCardInfo;
