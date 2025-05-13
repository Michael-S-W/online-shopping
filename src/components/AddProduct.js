import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router";

const AddProduct = () => {
  const categoryId = useParams().categoryId;

  const [show, setShow] = useState(false);
  const [productObj, setProductObj] = useState({
    title: "New Product",
    price: 10,
    description: "A description",
    categoryId: Number(categoryId),
    images: ["", "", ""],
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const checkingImageURL = useAuth().checkingImageURL;

  const handleClose = () => {
    setShow(false);
    setErrorMessage(null);
  };
  const handleShow = () => setShow(true);

  const handleAddProduct = async () => {
    checkingImageURL(productObj.images)
      ? fetch(`https://api.escuelajs.co/api/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productObj),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Added item:", data);
            setShow(false);
            // window.location.reload();
          })
          .catch((error) => {
            console.error("Error updating item:", error);
          })
          .finally(() => {
            setShow(false);
            // window.location.reload();
          })
      : setErrorMessage("Please enter a valid image URL");
  };
  return (
    <>
      <Button
        variant="outline-dark"
        onClick={handleShow}
        style={{
          borderRadius: "5px",
          padding: "1px 4px",
          zIndex: "9",
          // boxShadow: "1.5px 3px 3px #1c2833 ",
        }}
      >
        <i className="bi bi-plus-square"> Add Product</i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          {/* [ TITLE */}
          <Form.Group className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={productObj.title}
              onChange={(e) =>
                setProductObj({ ...productObj, title: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          {/* TITLE ] */}

          {/* [ DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Product Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={productObj.description}
              onChange={(e) =>
                setProductObj({ ...productObj, description: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          {/* DESCRIPTION ]*/}

          {/* [ IMAGE */}
          <Form.Group className="mb-3">
            <Form.Label>
              Image Link 1:{" "}
              <span style={{ fontSize: "12px" }}>
                &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              value={productObj.images[0]}
              onChange={(e) =>
                setProductObj((prev) => ({
                  ...prev,
                  images: prev.images.map((img, index) =>
                    index === 0 ? e.target.value : img
                  ),
                }))
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Image Link 2:{" "}
              <span style={{ fontSize: "12px" }}>
                &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              value={productObj.images[1]}
              onChange={(e) =>
                setProductObj((prev) => ({
                  ...prev,
                  images: prev.images.map((img, index) =>
                    index === 1 ? e.target.value : img
                  ),
                }))
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Image Link 3:{" "}
              <span style={{ fontSize: "12px" }}>
                &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              value={productObj.images[2]}
              onChange={(e) =>
                setProductObj((prev) => ({
                  ...prev,
                  images: prev.images.map((img, index) =>
                    index === 2 ? e.target.value : img
                  ),
                }))
              }
            ></Form.Control>
          </Form.Group>
          {/* IMAGES UP TO 3 ] */}

          {/* [ PRICE */}
          <Form.Group className="mb-3">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={productObj.price}
              onChange={(e) =>
                setProductObj({ ...productObj, price: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          {/* PRICE ] */}

          {/* {categoryId && (
            <fieldset>
              <legend>Product Category</legend>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                value={categoryId}
                // onChange={(e) =>
                //   setProductObj({
                //     ...productObj,
                //     category: {
                //       ...productObj.category,
                //       name: e.target.value,
                //     },
                //   })
                // }
                disabled
              ></Form.Control>
            </fieldset>
          )} */}
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
        <Modal.Footer className="bg-warning d-flex justify-content-end">
          <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="outline-dark" onClick={handleAddProduct}>
              Add Product
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
