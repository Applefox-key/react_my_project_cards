import React from "react";
import { Button } from "react-bootstrap";

import MyTable from "../../UI/table/MyTable";

const ContentFromFile = ({ fileContent, addToColection, cancel }) => {
  return (
    <div className="modal-h50">
      {fileContent && (
        <>
          <Button
            size="lg"
            className="mt-1"
            variant="outline-secondary"
            onClick={addToColection}>
            Add the content
          </Button>{" "}
          <Button
            size="lg"
            className="mt-1"
            variant="outline-secondary"
            onClick={cancel}>
            Cancel
          </Button>
          <MyTable
            dataArray={fileContent}
            namesArray={["question", "answer", "note"]}
          />
        </>
      )}
    </div>
  );
};

export default ContentFromFile;
