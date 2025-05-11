import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/AuthProvider";

const HomeCards = ({ category }) => {
  const navigate = useNavigate();
  const checkingImageURL = useAuth().checkingImageURL;
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: "3",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/shop/${category.id}`)}
    >
      <Card.Img
        variant="top"
        alt={category.name}
        src={
          !checkingImageURL(category.image)
            ? "https://cdn11.bigcommerce.com/s-y76tsfzldy/images/stencil/original/products/5565/21311/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3__09968.1648304982.jpg"
            : category.image
        }
        style={{ height: "70%", objectFit: "cover", objectPosition: "top" }}
      />
      <Card.Body>
        <Card.Title
          className="text-center text-nowrap"
          style={{ fontSize: "1rem" }}
        >
          {category.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default HomeCards;
