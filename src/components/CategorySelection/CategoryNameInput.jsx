import React, { useState } from "react";

const CategoryNameInput = ({ el, edit, isInput, setIsInput }) => {
  //   const [isInput, setIsInput] = useState(editOn);
  const [name, setName] = useState(el.name);

  return (
    <>
      {isInput ? (
        <>
          <input
            value={name}
            autoFocus
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              edit(el.id === "new" ? "newCancel" : null);
            }}>
            cancel
          </button>
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
