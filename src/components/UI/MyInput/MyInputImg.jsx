import React from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";

const MyInputImg = ({
  name,
  content,
  callback = null,
  onblur,
  onEnter = "",
}) => {
  // const [value, setValue] = useState(content === null ? "" : content);
  const [choice, setChoice] = useState({ img: content });
  const fromFile = (e) => {
    let img = e.target;
    const [file] = img.files;
    if (file) {
      let urlim = URL.createObjectURL(file);
      setChoice({ img: urlim, file: file });
    }
  };
  return (
    <div>
      {/* <div className="d-flex mt-3">
        <Form.Control type="file" onChange={fromFile} size="lg" />
      </div> */}

      <Image rounded src={choice.img} className="imgTbl" onClick={fromFile} />
    </div>
  );
};

export default MyInputImg;
