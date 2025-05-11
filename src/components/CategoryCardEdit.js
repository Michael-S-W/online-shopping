import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteAlert from "./DeleteAlert";
import { useAuth } from "../hooks/AuthProvider";

function CategoryCardEdit(props) {
  const [show, setShow] = useState(false);
  const newObj = props.obj;
  const [itemObj, setItemObj] = useState(newObj);
  const [errorMessage, setErrorMessage] = useState(null);
  const checkingImageURL = useAuth().checkingImageURL;

  const handleClose = () => {
    setShow(false);
    setErrorMessage(null);
    setItemObj(props.obj);
  };
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    checkingImageURL(itemObj.image)
      ? fetch(`https://api.escuelajs.co/api/v1/categories/${props.obj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemObj),
        })
          .then((response) => {
            if (!response.ok) {
              // setErrorMessage
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Updated item:", data);
            setShow(false);
          })
          .catch((error) => {
            console.error("Error updating item:", error);
          })
          .finally(() => {
            setShow(false);
            window.location.reload();
          })
      : setErrorMessage("Please enter a valid image URL");
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
          borderRadius: "5px",
          padding: "1px 4px",
          zIndex: "9",
          boxShadow: "-1.5px 3px 3px #1c2833 ",
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        style={{
          left: "8px",
        }}
      >
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          {/* --- */}
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              value={itemObj.name}
              onChange={(e) => setItemObj({ ...itemObj, name: e.target.value })}
            ></Form.Control>
          </Form.Group>
          {/* --- */}
          <Form.Group className="mb-3">
            <Form.Label>
              Image Link:{" "}
              <span style={{ fontSize: "12px" }}>
                &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              value={itemObj.image}
              onChange={(e) => {
                setItemObj({ ...itemObj, image: e.target.value });
              }}
            ></Form.Control>
          </Form.Group>
          {/* --- */}
          <div
            style={{
              height: "14px",
              textAlign: "center",
              color: "red",
              fontWeight: "bolder",
            }}
          >
            {errorMessage && errorMessage}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-warning d-flex justify-content-between">
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

export default CategoryCardEdit;
