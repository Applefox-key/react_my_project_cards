import React from "react";
import GameCountBage from "./GameCountBage";

const GameCount = ({ count, all, result = 0 }) => {
  return (
    <div className={result ? "countResult" : "count"}>
      <GameCountBage value={count[0]} bg="success" />{" "}
      {!result && <GameCountBage value={all} bg="warning" text="dark" />}
      <GameCountBage value={count[1]} bg="danger" />
    </div>
  );
};

export default GameCount;
