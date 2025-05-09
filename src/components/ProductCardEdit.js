import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteAlert from "./DeleteAlert";

function ProductCardEdit(props) {
  const [show, setShow] = useState(false);
  const [itemObj, setItemObj] = useState(props.obj);
  // console.log(itemObj);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    fetch(`https://api.escuelajs.co/api/v1/products/${props.obj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated item:", data);
        setShow(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      })
      .finally(() => {
        setShow(false);
        window.location.reload();
      });
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          borderRadius: "50%",
          padding: "2px 6px",
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          {/* --- */}
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={itemObj.title}
            onChange={(e) => setItemObj({ ...itemObj, title: e.target.value })}
          ></Form.Control>
          {/* --- */}
          <Form.Label>Product Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={itemObj.description}
            onChange={(e) =>
              setItemObj({ ...itemObj, description: e.target.value })
            }
          ></Form.Control>
          {/* --- */}
          <Form.Label>Image Link:</Form.Label>
          <Form.Control
            type="text"
            value={itemObj.images[0]}
            onChange={(e) =>
              setItemObj({ ...itemObj, images: [e.target.value] })
            }
          ></Form.Control>
          {/* --- */}
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            value={itemObj.price}
            onChange={(e) => setItemObj({ ...itemObj, price: e.target.value })}
          ></Form.Control>
          {/* --- */}
          <fieldset>
            <legend>Product Category</legend>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              type="text"
              value={itemObj.category.name}
              onChange={(e) =>
                setItemObj({
                  ...itemObj,
                  category: {
                    ...itemObj.category,
                    name: e.target.value,
                  },
                })
              }
            ></Form.Control>
          </fieldset>
        </Modal.Body>
        <Modal.Footer className="bg-warning d-flex justify-content-between">
          {/* <button
            id={props.obj.id}
            onClick={handleDelete}
            className="btn btn-danger ms-2 me-auto"
          >
            Delete <i className="bi bi-trash"></i>
          </button> */}
          <DeleteAlert obj={props.obj} />
          <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="outline-dark" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductCardEdit;
