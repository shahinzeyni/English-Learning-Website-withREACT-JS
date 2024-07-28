import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { useRoutes } from "react-router-dom";
import AuthContext from "./context/authContext";
import routes from "./routes";

import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const [userShopBag, setUserShopBag] = useState([]);

  const router = useRoutes(routes);



  const login = (userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
    localStorage.removeItem("shopList");
  });

  useEffect(
    () => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      if (localStorageData) {
        fetch(`http://localhost:4000/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        })
          .then(res => res.json())
          .then(userData => {
            setIsLoggedIn(true);
            setUserInfos(userData);
          });
      } else {
        
        setIsLoggedIn(false);
      }
    },
    [login, logout]
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
        userShopBag,
        setUserShopBag
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}
