import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/animation.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, PopupContext } from "./context";
import BaseAPI from "./API/BaseAPI";
import AppRouter from "./components/AppRouter";

function App() {
  const [userAuth, setUserAuth] = useState({ isAuth: false, role: null });
  const [popupSettings, setPopupSettings] = useState([false, "", "success"]);

  // useEffect(() => {
  //   BaseAPI.createDB();
  // }, []);
  console.log(userAuth);

  const checkUserAuth = async () => {
    try {
      const user = await BaseAPI.getUser();
      if (user) setUserAuth({ isAuth: true, role: user.role });
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
