import { useContext } from "react";
import { AuthContext } from "../context";

export const useFilter = () => {
  const { userAuth, setUserAuth } = useContext(AuthContext);

  const setFilterG = (value) => {
    setUserAuth({ ...userAuth, filterG: value });
  };

  return { filterG: userAuth.filterG, setFilterG };
};
