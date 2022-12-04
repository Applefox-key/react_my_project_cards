import { useState } from "react";
import { useParams } from "react-router-dom";

import BaseAPI from "../API/BaseAPI";

export const useGame = (setCallback = null, changeContent = null) => {
  const pageParam = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const querySrvCallback = async () => {
    const content =
      pageParam.tab === "pub"
        ? await BaseAPI.getPublicContent(pageParam.id)
        : await BaseAPI.getContent(pageParam.id);
    const newContent = changeContent ? changeContent(content) : content;
    if (setCallback) setCallback(newContent);
  };
  const getContent = async () => {
    try {
      setIsLoading(true);
      await querySrvCallback();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [getContent, isLoading, error];
};
