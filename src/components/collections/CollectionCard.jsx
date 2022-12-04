import React from "react";
import Card from "react-bootstrap/esm/Card";
import { useNavigate } from "react-router-dom";
import CollectionCardBody from "./CollectionCardBody";

const CollectionCard = ({ collection }) => {
  const router = useNavigate();

  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(
          `/collections/my/${collection.collection.id}/${collection.collection.name}`
        );
      }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {collection.collection.name}{" "}
          {/* {countUnread ? <Badge bg="success">{countUnread}</Badge> : <></>} */}
        </Card.Header>
        <CollectionCardBody content={collection.content} />
      </Card>
    </div>
  );
};

export default CollectionCard;
//  <Badge bg="secondary">New</Badge>
