import React, { useState } from "react";

const CategoryNameInput = ({ el, edit, isInput, setIsInput }) => {
  const [name, setName] = useState(el.name);
  const cancel = (e) => {
    e.stopPropagation();
    edit(el.id === "new" ? "newCancel" : null);
  };
  return (
    <>
      {isInput ? (
        <>
          <input
            value={name}
            autoFocus
            onKeyUp={(e) => {
              if (e.key === "Escape") cancel(e);
            }}
            onBlur={(e) => {
              //   setIsInput(null);
            }}
            onChange={(e) => {
              e.stopPropagation();
              setName(e.target.value);
            }}></input>
          <button
            onClick={(e) => {
              e.stopPropagation();
              edit({ ...el, name: name });
              setIsInput(el);
            }}>
            ok
          </button>
          <button onClick={cancel}>cancel</button>
        </>
      ) : (
        <>
          <div>{name.toUpperCase()}</div>
        </>
      )}
    </>
  );
};

export default CategoryNameInput;
