import React from "react";
import "../../../styles/oneCollection.scss";
import { Button } from "react-bootstrap";
import BaseAPI from "../../../API/BaseAPI";
import { useNavigate } from "react-router-dom";
import { GO_TO } from "../../../router/routes";
import { onePartLittle } from "../../../utils/cardFragment";

const CardContent = ({ content, setContent, pageParam }) => {
  const route = useNavigate();
  const viewCard = (item) => {
    let mainRoute = window.location.pathname.includes("pub")
      ? GO_TO.pubCollect
      : GO_TO.myCollect;
    route(`${mainRoute}/${pageParam.id}/${pageParam.name}/${item.id}`);
  };
  const btns = [
    {
      private: true,
      symb: "🖊",
      // symb: "🖊🖉🖊✐🖋️",
      callback: (item) => {
        route(`${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/${item.id}`);
      },
    },
    {
      private: false,
      symb: "🔎",
      callback: viewCard,
    },
    {
      private: true,
      symb: "❌",
      callback: async (element) => {
        if (!window.confirm("Delete?")) return;
        await BaseAPI.deleteContent(element.id);
        let arr = content.filter((elem) => elem.id !== element.id);
        setContent(arr);
      },
    },
  ];

  return (
    <div className="little_card_wrap">
      {content.map((el) => (
        <div
          key={el.id}
          className="little_card"
          onClick={(e) => {
            if (window.location.pathname.includes("pub")) viewCard(el);
            else
              route(
                `${GO_TO.editCard}/${pageParam.id}/${pageParam.name}/${el.id}`
              );
          }}>
          <div className="menuPart">
            {btns.map(
              (btn, i) =>
                !(window.location.pathname.includes("pub") && btn.private) && (
                  <Button
                    key={i}
                    variant="light"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      btn.callback(el);
                    }}>
                    {btn.symb}
                  </Button>
                )
            )}
          </div>
          {onePartLittle(el, "question")}
          {onePartLittle(el, "answer")}
        </div>
      ))}
    </div>
  );
};

export default CardContent;
