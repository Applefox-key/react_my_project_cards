import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const CollectionCardBody = ({ content }) => {
  return (
    <ListGroup variant="flush">
      {!content ? (
        <ListGroup.Item>No content</ListGroup.Item>
      ) : (
        <>
          {content.slice(0, 5).map((item) => (
            <ListGroup.Item key={item.id}>
              {item.question.slice(0, 30)}{" "}
              {item.question.length > 30 ? "..." : " "}
            </ListGroup.Item>
          ))}

          {content.length > 5 ? (
            <ListGroup.Item variant="secondary" className="text-lg-end">
              {content.length}...({content.length - 5})
            </ListGroup.Item>
          ) : (
            <> </>
          )}
        </>
      )}
    </ListGroup>
  );
};

export default CollectionCardBody;
