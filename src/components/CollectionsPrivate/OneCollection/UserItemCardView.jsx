import React, { useEffect } from "react";
import MyCard from "../../UI/CARDS/MyCard";
import { useState } from "react";
import BaseAPI from "../../../API/BaseAPI";
import { useQuery } from "../../../hooks/useQuery";
import { useParams } from "react-router-dom";
import BackBtn from "../../UI/BlackBtn/BackBtn";
import cl from "../../UI/CARDS/MyCard.module.scss";
import Rate from "../../games/Rate";
import { addRates, updRates } from "../../../utils/gamesResults";

const UserItemCardView = () => {
  const [item, setitem] = useState();
  const pageParam = useParams();
  const [getContent, ,] = useQuery(async () => {
    const initVal = await BaseAPI.getContentItem(pageParam.item);
    let content = await addRates(initVal);
    setitem(content);
  });

  useEffect(() => {
    getContent();
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam.id, pageParam.name, pageParam.item]);

  return (
    <>
      <div className="text-center mx-5 my-5 flex-standart">
        {!!item && item.hasOwnProperty("rate") && (
          <div>
            <Rate
              initialValue={item.rate}
              isEditable
              action={(newRate) => updRates(item, newRate)}
            />
          </div>
        )}{" "}
        <BackBtn variant="dark" />
      </div>

      <div className={cl.container_gallery + " m-auto"}>
        {item && <MyCard item={item} />}
      </div>
    </>
  );
};

export default UserItemCardView;
