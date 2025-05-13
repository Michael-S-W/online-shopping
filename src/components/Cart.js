import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Login.css";
import { useAuth } from "../hooks/AuthProvider";

function Cart() {
  const cart = useAuth().cart;
  const setCart = useAuth().removeItemsFromCart;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleCheckout = () => {};

  let newCart = [];

  const handleReduce = (e) => {
    cart.map((order) => {
      if (order.title === e.target.id) {
        let newQty = order.qty - 1;
        if (newQty >= 0) {
          return newCart.push({ ...order, qty: newQty });
        } else {
          return newCart.push({ ...order });
        }
      } else {
        return newCart.push({ ...order });
      }
    });
    let removeZeroQty = newCart.filter((order) => order.qty > 0);
    setCart(removeZeroQty);
  };

  let grandTotal = 0;
  cart.map((item) => (grandTotal += Number(item.qty) * Number(item.price)));

  const sum = cart.reduce((acc, num) => acc + num.qty, 0);

  return (
    <>
      <Button
        variant="outline-dark"
        onClick={handleShow}
        className="position-relative ms-2"
      >
        <i className="bi bi-basket2"></i>
        {cart.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length > 0 ? sum : ""}
          </span>
        )}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Cart Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <table className="w-100">
            <thead>
              <tr>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Product</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.qty} X </td>
                    <td>${item.price} </td>
                    <td>{item.title} </td>
                    <td>{item.qty * item.price} </td>
                    <td>
                      <Button
                        variant="outline-dark"
                        id={item.title}
                        onClick={handleReduce}
                      >
                        -1
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {cart.reduce((acc, item) => acc + item.price * item.qty, 0)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </Modal.Body>
        <Modal.Footer className="bg-warning">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            type="submit"
            onClick={handleCheckout}
            className="btn btn-outline-dark"
          >
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;
