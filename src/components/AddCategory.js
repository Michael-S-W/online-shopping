import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../hooks/AuthProvider";
import DeleteAlert from "./DeleteAlert";

const AddCategory = (props) => {
  const [show, setShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const checkingImageURL = useAuth().checkingImageURL;
  const [categoryDetails, setCategoryDetails] = useState(
    props.obj
      ? { name: props.obj.name, image: props.obj.image }
      : { name: "", image: "" }
  );

  const handleClose = () => {
    setShow(false);
    setErrorMessage(null);
    setCategoryDetails(
      props.obj
        ? { name: props.obj.name, image: props.obj.image }
        : { name: "", image: "" }
    );
  };
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    checkingImageURL(categoryDetails.image)
      ? props.obj
        ? await fetch(
            `https://api.escuelajs.co/api/v1/categories/${props.obj.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...categoryDetails,
                name: [
                  [...categoryDetails.name][0].toUpperCase(),
                  [...categoryDetails.name.toLowerCase()].splice(1).join(""),
                ].join(""),
              }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                console.log(response.message);
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              setShow(false);
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error updating item:", error);
              setErrorMessage(`Error updating ${error}`);
            })
        : fetch(`https://api.escuelajs.co/api/v1/categories/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...categoryDetails,
              name: [
                [...categoryDetails.name][0].toUpperCase(),
                [...categoryDetails.name.toLowerCase()].splice(1).join(""),
              ].join(""),
            }),
          })
            .then((response) => {
              if (!response.ok) {
                console.log(response.message);
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              setShow(false);
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error updating item:", error);
              setErrorMessage(`Error updating ${error}`);
            })
      : setErrorMessage("Please enter a valid image URL");
  };

  return (
    <>
      {props.obj ? (
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
      ) : (
        <Button
          variant="outline-dark"
          onClick={handleShow}
          className=" text-center"
          style={{
            borderRadius: "5px",
            zIndex: "9",
          }}
        >
          <i className="bi bi-plus-square"> Add Category</i>
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="w-100">
                Category Name
                <Form.Control
                  type="text"
                  placeholder="ex Electronics"
                  autoFocus
                  value={categoryDetails.name}
                  onChange={(e) =>
                    setCategoryDetails({
                      ...categoryDetails,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="w-100">
                Image Link:{" "}
                <span style={{ fontSize: "12px" }}>
                  &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
                </span>
                <Form.Control
                  type="text"
                  placeholder="ex htt......jpg"
                  autoFocus
                  value={categoryDetails.image}
                  onChange={(e) =>
                    setCategoryDetails({
                      ...categoryDetails,
                      image: e.target.value,
                    })
                  }
                />
              </Form.Label>
            </Form.Group>
          </Form>
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
        <Modal.Footer
          className={
            props.obj
              ? "bg-warning d-flex justify-content-between"
              : "bg-warning d-flex justify-content-end"
          }
        >
          {props.obj && <DeleteAlert obj={props.obj} error={setErrorMessage} />}
          <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="outline-dark" onClick={handleSave}>
              {props.obj ? "Update" : "Add Category"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCategory;
