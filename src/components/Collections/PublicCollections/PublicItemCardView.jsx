import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import cl from "../../UI/CARDS/MyCard.module.scss";

import MyCard from "../../UI/CARDS/MyCard";
import BackBtn from "../../UI/BlackBtn/BackBtn";

import { useQuery } from "../../../hooks/useQuery";
import BaseAPI from "../../../API/BaseAPI";

const PublicItemCardView = () => {
  const [item, setitem] = useState();
  const pageParam = useParams();
  const [getContent, ,] = useQuery(async () => {
    const content = await BaseAPI.getPublicContentItem(pageParam.item);
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
        {/* <div className={cl.container_gallery}> */}
        <BackBtn size="lg" variant="dark" />
      </div>
      <div className={cl.container_gallery + " m-auto"}>
        {item && <MyCard item={item} />}
      </div>
    </>
  );
};

export default PublicItemCardView;
