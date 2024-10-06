import { useState } from "react";
import { useParams } from "react-router-dom";
import BaseAPI from "../API/BaseAPI";

export const useGame = (callback, isFnAsync = false) => {
  const pageParam = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const querySrvCallback = async () => {
    const content =
      pageParam.tab === "pub"
        ? await BaseAPI.getPublicContent(pageParam.id)
        : pageParam.tab === "my"
        ? await BaseAPI.getContent(pageParam.id)
        : await BaseAPI.getContentPlaylist(pageParam.id); //playlist
    if (callback) {
      const isAsync = callback.constructor.name === "AsyncFunction";
      if (isAsync || isFnAsync) await callback(content);
      else callback(content);
    }
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
