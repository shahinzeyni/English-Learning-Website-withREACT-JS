import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(
    () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    },
    [pathname]
  );

  return children || null;
};
