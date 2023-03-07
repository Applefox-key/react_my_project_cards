import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import OneCardG from "./OneCardG";
import MyInputGroup from "../../UI/MyInput/MyInputGroup";
const TimeCardBody = ({ items }) => {
  const [oneDelay, setOneDelay] = useState(2);
  const [num, setNum] = useState(0);
  const [flip, setFlip] = useState(false);
  const [anim, setShowAnim] = useState(false);

  const start = () => {
    items.forEach((_, i) => {
      setTimeout(() => {
        // setCard({ ...card, flip: true });
        setFlip(true);
      }, 1000 * oneDelay * (i * 2 + 1));

      if (i + 1 < items.length)
        setTimeout(() => {
          // setCard({ flip: false, num: i, anim: i });
          setShowAnim(i % 2 === 0);
          setFlip(false);
          setNum(i + 1);
        }, 1000 * oneDelay * (i * 2 + 2));
    });

    //
  };

  return (
    <div>
      <div className="center-div mt-2 d-flex">
        <MyInputGroup
          size="lg"
          label="DELAY IN SEC"
          value={oneDelay}
          type={"Number"}
          onChange={(e) => {
            setOneDelay(e.target.value);
          }}
        />{" "}
        <Button
          size="lg"
          onClick={start}
          disabled={num !== 0}
          className="mb-3 ">
          {"START"}
        </Button>
      </div>
      <div className="m-auto " style={{ textAlign: "-webkit-center" }}>
        <p>{items && num + 1 + "/" + items.length}</p>
        <OneCardG anim={anim} direction={true} item={items[num]} flip={flip} />
      </div>
    </div>
  );
};

export default TimeCardBody;
