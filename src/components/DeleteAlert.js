import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./DeleteAlert.css";

function DeleteAlert(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let fullUrl = props.obj.category
    ? `https://api.escuelajs.co/api/v1/products/${props.obj.id}`
    : `https://api.escuelajs.co/api/v1/categories/${props.obj.id}`;

  const handleDelete = () => {
    fetch(fullUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Deleted successfully:", data);
      })
      .finally(() => {
        setShow(false);
        window.location.reload();
      });
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Delete <i className="bi bi-trash"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(30, 30, 30, 0.65)" }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#ffccc0" }}>
          <Modal.Title>Delete!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#ffccc0" }}>
          Are you sure to delete {props.obj.title || props.obj.name} Category?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#ffccc0" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAlert;
