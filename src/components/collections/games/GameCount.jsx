import React from "react";
import GameCountBage from "./GameCountBage";
const GameCount = ({ count, all, left = "" }) => {
  return (
    <div className="d-flex justify-content-center ">
      <GameCountBage value={count[0]} lable="👍" bg="success" />

      <div className="countBtn">
        <h1>
          <GameCountBage value={all} bg="warning" text="dark" />
        </h1>
        <h4>{left}</h4>
      </div>
      <GameCountBage value={count[1]} lable="👎" bg="danger" />
    </div>
  );
};

export default GameCount;
// {" POSITIVE: " + count[0]}
