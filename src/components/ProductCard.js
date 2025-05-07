import { useState } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useAuth } from "../hooks/AuthProvider";
import { Accordion } from "react-bootstrap";

const ProductCard = (props) => {
  const globalStore = useAuth();
  const globalCart = useAuth().cart; //----
  const [quantity, setQuantity] = useState(0);

  const handleQuantity = (e) => {
    if (e.target.innerText === "-" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
    if (e.target.innerText === "+") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleBuy = (e) => {
    let newItem = {
      qty: quantity,
      title: props.obj.title,
      price: props.obj.price,
    };
    if (
      globalCart.length === 0 ||
      !globalCart.some((item) => item.title === props.obj.title)
    ) {
      globalStore.updateCart(newItem);
    } else {
      let newCart = globalCart.map((item) =>
        item.title === e.target.id
          ? { ...item, qty: item.qty + quantity }
          : { ...item }
      );
      globalStore.resetCart(newCart);
    }
    setQuantity(0);
  };
  return (
    <Card
      style={{
        maxWidth: "600px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <Card.Img
        variant="top"
        alt={props.obj.title}
        src={props.obj.images[0]}
        style={{
          width: "50%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="text-center text-nowrap text-center">
          {props.obj.title}
        </h6>
        {/* ACCORDION */}
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Product Description</Accordion.Header>
            <Accordion.Body>{props.obj.description}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <p style={{ fontSize: "0.75em", flexGrow: "1" }}>
          {props.obj.description}
        </p> */}
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <span className="fw-bold fs-3 ">${props.obj.price}</span>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={handleQuantity}
              disabled={quantity === 0}
            >
              -
            </Button>
            <span className="fw-bold fs-5 px-2">{quantity}</span>
            <Button variant="outline-secondary" onClick={handleQuantity}>
              +
            </Button>
            <button
              className="btn btn-warning ms-2"
              onClick={handleBuy}
              id={props.obj.title}
              disabled={quantity === 0}
            >
              Buy
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
