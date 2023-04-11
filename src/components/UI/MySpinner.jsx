import React from "react";
import Spinner from "react-bootstrap/Spinner";
const MySpinner = () => {
  return (
    <Spinner animation="grow" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default MySpinner;
