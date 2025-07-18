import React, { useState } from "react";
import { setVerticalCardFonrSize } from "../../utils/userSettings";

const BtnFontSize = () => {
  const [font, setFont] = useState(1.8);
  const setSize = (val) => {
    const newValue = Math.min(Math.max(font + val, 1.2), 2.8);
    setFont(newValue);
    // debugger;
    setVerticalCardFonrSize(newValue);
  };
  return (
    <div className="input-wrap">
      <button
        className="btnUp"
        disabled={font === 2.8}
        onClick={() => setSize(0.1)}>
        ︿
      </button>
      <span>font size</span>
      <button
        disabled={font === 1.2}
        className="btnDown"
        onClick={() => setSize(-0.1)}>
        ﹀
      </button>
    </div>
  );
};

export default BtnFontSize;
