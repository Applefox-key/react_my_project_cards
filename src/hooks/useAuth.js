import { useContext } from "react";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router/routes";
import { applyUserSettings } from "../utils/userSettings";

const getRoutes = (userAuth) => {
  if (!userAuth.isAuth) return publicRoutes;
  return privateRoutes;
};

export const useAuth = (returnAuthContext = false) => {
  const { userAuth, setUserAuth } = useContext(AuthContext);
  let userRoutes = getRoutes(userAuth);
  const updateSettings = (set) => {
    setUserAuth({ ...userAuth, settings: set });
    applyUserSettings(set);
  };
  const updateFilterG = (value) => {
    setUserAuth({ ...userAuth, filterG: value });
  };
  if (returnAuthContext)
    return { userRoutes, userAuth, setUserAuth, updateSettings, updateFilterG };
  return userRoutes;
};
