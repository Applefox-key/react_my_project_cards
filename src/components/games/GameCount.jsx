import React from "react";
import GameCountBage from "./GameCountBage";

const GameCount = ({ count, all, left = "", result = 0 }) => {
  return (
    <div className={result ? "countResult" : "count"}>
      {" "}
      <GameCountBage value={count[0]} bg="success" />
      <div className="countBtn">
        <h1>
          <GameCountBage value={all} bg="warning" text="dark" />
        </h1>
        <h4 className="contrastColor">{left}</h4>
      </div>{" "}
      <GameCountBage value={count[1]} bg="danger" />
      {/* <GameCountBage value={count[0]} lable="👍" bg="success" /> */}
      {/* <GameCountBage value={count[1]} lable="👎" bg="danger" /> */}
    </div>
  );
};

export default GameCount;
