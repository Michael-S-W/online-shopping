import { useState } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useAuth } from "../hooks/AuthProvider";
import "./ProductCard.css";
import ProductCardEdit from "./ProductCardEdit";

const ProductCard = (props) => {
  const globalStore = useAuth();
  const globalCart = useAuth().cart;
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

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Description</Popover.Header>
      <Popover.Body>{props.obj.description}</Popover.Body>
    </Popover>
  );

  // const handleDelete = (e) => {
  //   console.log(e.target.id);
  //   fetch(`https://api.escuelajs.co/api/v1/products/${e.target.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json(); // or response.text() if no JSON response
  //     })
  //     .then((data) => {
  //       console.log("Deleted successfully:", data);
  //       window.location.reload();
  //     });
  // };
  return (
    <Card className="cardsContainder">
      {/* <button
        id={props.obj.id}
        onClick={handleDelete}
        className="btn btn-danger"
        style={{
          position: "absolute",
          zIndex: "999",
          right: "0",
          top: "0",
          padding: "2px 8px",
          borderRadius: "50%",
        }}
      >
        X
      </button> */}
      {globalStore.user && <ProductCardEdit obj={props.obj} />}
      <Card.Img
        className="productImage"
        variant="top"
        alt={props.obj.title}
        src={props.obj.images[0]}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "50%",
        }}
      >
        <div className="d-flex flex-column">
          <h6 className="text-center  text-center">{props.obj.title}</h6>
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="success">Description</Button>
          </OverlayTrigger>

          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <span className="fw-bold fs-3 ">${props.obj.price}</span>
            {globalStore.user ? (
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
            ) : (
              <div className="text-danger fw-bold">Login to buy</div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
