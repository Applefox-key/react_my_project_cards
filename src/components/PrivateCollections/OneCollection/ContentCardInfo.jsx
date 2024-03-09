import React, { useEffect } from "react";
import MyCard from "../../UI/CARDS/MyCard";
import { useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { useQuery } from "../../../hooks/useQuery";
import { useParams } from "react-router-dom";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import cl from "../../UI/CARDS/MyCard.module.scss";

const ContentCardInfo = () => {
  const [item, setitem] = useState();
  const pageParam = useParams();
  const [getContent, ,] = useQuery(async () => {
    const content = await BaseAPI.getContentItem(pageParam.item);
    setitem(content);
  });

  useEffect(() => {
    getContent();
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name, pageParam.item]);

  return (
    <>
      <div className="text-center mx-5 my-5">
        <BackBtn variant="dark" />
      </div>
      <div className={cl.container_gallery + " m-auto"}>
        {item && <MyCard item={item} />}
      </div>
    </>
  );
};

export default ContentCardInfo;
