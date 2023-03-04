import { useContext } from "react";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router/routes";

const getRoutes = (userAuth) => {
  if (!userAuth.isAuth) return publicRoutes;

  return privateRoutes;
};

export const useAuth = (returnAuthContext = false) => {
  const { userAuth, setUserAuth } = useContext(AuthContext);
  let userRoutes = getRoutes(userAuth);
  if (returnAuthContext) return [userRoutes, userAuth, setUserAuth];
  return userRoutes;
};
