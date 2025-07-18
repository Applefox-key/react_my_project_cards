import React from "react";
import { useState } from "react";
import { TbSettingsAutomation } from "react-icons/tb";
import BtnFontSize from "./BtnFontSize";
import BtnColor from "./BtnColor";
import {
  BsCardHeading,
  BsPhoneFlip,
  BsPostcard,
  BsPrinter,
  BsWindowStack,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
const PrintingMenu = ({ refresh, mode, setMode }) => {
  const [viewOptions, setViewOptions] = useState(false);
  const router = useNavigate();
  const actionBtnName = () => {
    switch (mode) {
      case 0:
        return "1";
      case 1:
        return "2";
      case 2:
        return <BsPostcard />;
      case 3:
        return <BsWindowStack />;
      default:
        break;
    }
  };
  return (
    <div className="print_menu">
      <div className="printBtns_wrap">
        <button className="printBtn" title="refresh" onClick={refresh}>
          ⟳
        </button>{" "}
        {/* <button
          className="printBtn"
          title={mode ? "print mode horizontal" : "print mode: vertikal"}
          onClick={() => setMode(mode < 2 ? 2 : 1)}>
          {mode > 1 ? "☰" : "☷"}
        </button>{" "} */}
        <div className="settingBox">
          <button
            className="printBtn"
            title={"options"}
            onClick={() => setViewOptions(!viewOptions)}>
            <TbSettingsAutomation className={viewOptions ? "rotate" : ""} />
          </button>
          {viewOptions && (
            <div className="options-wrap">
              <BtnColor />
              <button
                className="printBtnMode"
                title={"print mode two-sides card or one-side card"}
                onClick={() => setMode(mode < 2 ? 2 : 1)}>
                {mode > 1 ? (
                  <BsPhoneFlip className="rotate" />
                ) : (
                  <BsCardHeading />
                )}
              </button>{" "}
              <div className="print-submenu">
                <div
                  className="input-wrap"
                  title={mode > 1 ? "side position" : "column count"}
                  onClick={
                    mode > 1
                      ? () => setMode(mode === 2 ? 3 : 2)
                      : () => setMode(mode ? 0 : 1)
                  }>
                  <button>{actionBtnName()}</button>
                  <span>{mode > 1 ? "variant" : "column"}</span>
                </div>
                {mode < 2 && <BtnFontSize />}
              </div>
            </div>
          )}
        </div>
        <button
          className="printBtn"
          title="print"
          onClick={() => window.print()}>
          <BsPrinter />
        </button>{" "}
        <button className="backBtn" title="back" onClick={() => router(-1)}>
          <RiArrowGoBackLine />
        </button>
      </div>
    </div>
  );
};

export default PrintingMenu;
