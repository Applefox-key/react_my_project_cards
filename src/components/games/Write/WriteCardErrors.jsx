import React, { useEffect, useState } from "react";

import cl from "../Games.module.scss";

import ModalCustom from "../../UI/ModalCustom/ModalCustom";

import { getDifferences } from "../../../utils/texts";

const WriteCardErrors = ({ setShowErrors, right, useranswer, quest }) => {
  const [dif, setDif] = useState(null);
  useEffect(() => {
    const res = getDifferences(right, useranswer);
    setDif(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ModalCustom setshowmodal={setShowErrors} title="Mismatched">
      {dif && (
        <div>
          <h2>{quest}</h2>
          <div className={cl.writeErr}>
            <div>
              <h3>CARD </h3>
              {dif.differences1.map((el, index) => (
                <span
                  key={index}
                  className={el.isDifferent ? cl.highlight : ""}>
                  {el.word}{" "}
                </span>
              ))}
            </div>
            <div>
              <h3>YOU ANSWER</h3>
              {dif.differences2.map((el, index) => (
                <span
                  key={index}
                  className={el.isDifferent ? cl.highlight2 : ""}>
                  {el.word}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </ModalCustom>
  );
};

export default WriteCardErrors;
