import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useAuth } from "../hooks/AuthProvider";
import "./ProductCard.css";
import AddProduct from "./AddProduct";

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

  return (
    <Card className="cardsContainder">
      {/* [ SHOW EDIT BUTTON IF USER ROLE IS ADMIN */}
      {globalStore.user && globalStore.user.role === "admin" && (
        <AddProduct obj={props.obj} />
      )}
      {/* [ SHOW EDIT BUTTON IF USER ROLE IS ADMIN ] */}

      {/* -------------------------------------------- */}

      <Carousel interval={null} className="imagesCarousel" data-bs-theme="dark">
        {props.obj.images.map((img, index) => {
          return (
            <Carousel.Item
              key={img}
              style={{ height: "100%", overflow: "hidden" }}
            >
              <img
                className="d-block w-100"
                src={
                  !globalStore.checkingImageURL(img)
                    ? "https://cdn11.bigcommerce.com/s-y76tsfzldy/images/stencil/original/products/5565/21311/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3__09968.1648304982.jpg"
                    : img
                }
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      {/* -------------------------------------------- */}
      <Card.Body
        className="productBody"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div className="d-flex flex-column">
          <h6 className="text-center">{props.obj.title}</h6>
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="outline-dark">Description</Button>
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
