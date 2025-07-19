import React from "react";
import BackBtn from "../UI/BlackBtn/BackBtn";
import SwitchModeBtn from "../UI/BlackBtn/SwitchModeBtn";
import SwitchEndlessBtn from "../UI/BlackBtn/SwitchEndlessBtn";
import { useIsMobileMenu } from "../../hooks/useIsMobileMenu";
import { TbMenuOrder } from "react-icons/tb";

const GameMenuToggleField = (props) => {
  const {
    endless = null,
    setEndless = null,
    noSwitch = false,
    hideBtns = false,
    children = null,
  } = props;
  const [isMobile, menuOpen, toggleMenu] = useIsMobileMenu();
  return (
    <div className={"mobile-game-menu-box " + (menuOpen ? "opn" : "")}>
      {isMobile && (
        <button className="mobile-game-menu" onClick={toggleMenu}>
          <TbMenuOrder />
        </button>
      )}
      <BackBtn />
      {menuOpen && (
        <>
          {!hideBtns && (
            <>
              {!noSwitch && (
                <SwitchModeBtn modes={["WRITE ANSWER", " WRITE QUESTION"]} />
              )}
              {endless !== null && (
                <SwitchEndlessBtn endless={endless} setEndless={setEndless} />
              )}
            </>
          )}
          <>{children}</>
        </>
      )}
    </div>
  );
};

export default GameMenuToggleField;
