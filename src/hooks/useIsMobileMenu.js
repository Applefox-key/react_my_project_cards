import { useEffect, useState } from "react";

export const useIsMobileMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  useEffect(() => {
    const checkScreenSize = () => {
      const mini = window.innerWidth < 900;
      setIsMobile(mini);
      setMenuOpen(!mini);
    };

    checkScreenSize();
    // setMenuOpen(!(window.innerWidth < 900));
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return [isMobile, menuOpen, toggleMenu];
};
