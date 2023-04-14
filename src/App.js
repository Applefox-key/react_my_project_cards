import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";
import "./styles/animation.scss";
import "./styles/fonts.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, PopupContext } from "./context";
import BaseAPI from "./API/BaseAPI";
import AppRouter from "./router/AppRouter";
import { defaultSettings } from "./constants/defaultSettings";
import { applyUserSettings } from "./utils/userSettings";

function App({ props }) {
  const [userAuth, setUserAuth] = useState({
    isAuth: false,
    role: null,
    token: "",
    settings: defaultSettings,
  });
  const [popupSettings, setPopupSettings] = useState([false, "", "success"]);

  const checkUserAuth = async () => {
    try {
      const user = await BaseAPI.getUser();
      const token = await BaseAPI.getToken();

      if (user) {
        setUserAuth({
          isAuth: true,
          role: user.role,
          token: token,
          settings: user.settings,
        });
        applyUserSettings(user.settings);
      }
    } catch (error) {}
  };

  useEffect(() => {
    BaseAPI.createDB();
    checkUserAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      <PopupContext.Provider value={{ popupSettings, setPopupSettings }}>
        <div className="App">
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </div>
      </PopupContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
