import React from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import GameScoreItem from "./GameScoreItem";

const GameScore = ({ score, result = false }) => {
  return (
    <div className={result ? "countResult" : "count"}>
      {!result && (
        <span>
          Cards:{" "}
          {score.hasOwnProperty("num")
            ? score.num
            : score.w + score.r + (score.w + score.r === score.t ? 0 : 1)}
          /{score.t}
        </span>
      )}
      {!!score.hasOwnProperty("r") && (
        <GameScoreItem value={score.r} bg="right" lable={<FaRegThumbsUp />} />
      )}
      {!!score.hasOwnProperty("w") && (
        <GameScoreItem value={score.w} bg="wrong" lable={<FaRegThumbsDown />} />
      )}
    </div>
  );
};

export default GameScore;
