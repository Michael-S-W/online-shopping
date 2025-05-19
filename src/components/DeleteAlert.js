import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteAlert(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let fullUrl = props.obj.category
    ? `https://api.escuelajs.co/api/v1/products/${props.obj.id}`
    : `https://api.escuelajs.co/api/v1/categories/${props.obj.id}`;

  const handleDelete = async () => {
    try {
      const response = await fetch(fullUrl, {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        //   "Content-Type": "application/json",
        // },
      });
      if (response.ok) {
        console.log("Resource deleted successfully");
        setShow(false);
        window.location.reload();
      } else {
        console.error("CATEGORY ISN'T EMPTY", response.status);
        props.error("CATEGORY ISN'T EMPTY", response.status);
        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }
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
