import { useState } from "react";
import { useParams } from "react-router-dom";
import BaseAPI from "../API/BaseAPI";

export const useGame = (
  setCallback = null,
  changeContent = null,
  isFnAsync = false
) => {
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
    let newContent;
    if (changeContent) {
      const isAsync = changeContent.constructor.name === "AsyncFunction";

      if (isAsync || isFnAsync) newContent = await changeContent(content);
      else newContent = changeContent(content);
    } else newContent = content;

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
