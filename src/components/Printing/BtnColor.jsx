import React, { useState } from "react";
import { setCardColor } from "../../utils/userSettings";

const BtnColor = () => {
  const [color, setColor] = useState("#fffff0");
  const setNewColor = (e) => {
    setColor(e.target.value);

    setCardColor(e.target.value);
  };
  return (
    <div className="input-wrap ">
      <div className="limiter">
        <input
          type="color"
          id="colorBack"
          onChange={setNewColor}
          value={color}
          title="Choose your background color"
        />
      </div>

      <span>card color</span>
    </div>
  );
};

export default BtnColor;
