import { useState } from "react";

export const useQuery = (queryCallback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const resultCallback = async (...arg) => {
    try {
      setIsLoading(true);
      await queryCallback(arg);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [resultCallback, isLoading, error];
};
