import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

const HomeCards = ({ category }) => {
  const navigate = useNavigate();
  // const handleDelete = (e) => {
  //   fetch(`https://api.escuelajs.co/api/v1/categories/${e.target.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       } else {
  //         navigate("/home");
  //       }
  //       window.location.reload();
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };
  return (
    <Card
      style={{
        width: "100%",
        padding: "10px",
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
        src={category.image}
        style={{ height: "70%", objectFit: "cover", objectPosition: "top" }}
      />
      <Card.Body>
        <Card.Title
          className="text-center text-nowrap"
          style={{ fontSize: "0.75rem" }}
        >
          {category.name}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default HomeCards;
