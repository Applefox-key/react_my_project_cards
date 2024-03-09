import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OneCardG from "./OneCardG";
import MyInputGroup from "../UI/MyInput/MyInputGroup";
import cl from "./Games.module.scss";
import BackBtn from "../UI/BlackBtn/BackBtn";
import GameCountBage from "./GameCountBage";
const TimeCardBody = ({ items }) => {
  const [oneDelay, setOneDelay] = useState(2);
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);

  const start = () => {
    items.forEach((_, i) => {
      setTimeout(() => {
        setFlip(true);
      }, 1100 * oneDelay * (i * 2 + 1));

      if (i + 1 < items.length)
        setTimeout(() => {
          setShowAnim(i % 2 === 0);
          setFlip(false);
          setNum(i + 1);
        }, 1100 * oneDelay * (i * 2 + 2));
    });
  };

  return (
    <>
      <div className="menuField d-flex w-100 justify-content-between">
        <BackBtn />
        {/* <p className={cl.time_p}>{items && num + 1 + "/" + items.length}</p>2 */}

        <GameCountBage
          value={items && num + 1 + "/" + items.length}
          bg="warning"
          text="dark"
        />

        <div className={cl.timemenu}>
          <MyInputGroup
            size="lg"
            label="DELAY IN SEC"
            value={oneDelay}
            type={"Number"}
            classgroup="mb-0"
            onChange={(e) => {
              setOneDelay(e.target.value);
            }}
          />{" "}
          <Button
            size="lg"
            onClick={start}
            disabled={num !== 0}
            variant="success">
            {"START"}
          </Button>
        </div>
      </div>
      <div className="m-auto ">
        <OneCardG anim={anim} item={items[num]} flip={flip} />
      </div>
    </>
  );
};

export default TimeCardBody;
