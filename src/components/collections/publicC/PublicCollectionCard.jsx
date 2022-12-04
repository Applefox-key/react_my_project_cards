import React from "react";
import Card from "react-bootstrap/esm/Card";

import { useNavigate } from "react-router-dom";
import CollectionCardBody from "../CollectionCardBody";

const PublicCollectionCard = ({ list }) => {
  const router = useNavigate();
  return (
    <div
      className="mx-2 my-2 pointer"
      onClick={(e) => {
        router(
          `/collections/pub/${list.collection.id}/${list.collection.name}`
        );
      }}>
      <Card style={{ width: "18rem" }}>
        <Card.Header>{list.collection.name}</Card.Header>
        <CollectionCardBody content={list.content} />
      </Card>
    </div>
  );
};

export default PublicCollectionCard;
