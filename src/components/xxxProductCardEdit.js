import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteAlert from "./DeleteAlert";
import { useAuth } from "../hooks/AuthProvider";

function ProductCardEdit(props) {
  const [show, setShow] = useState(false);
  let newObj = props.obj;
  const [itemObj, setItemObj] = useState(newObj);
  // to maintain array of 3 values for 3 inputs
  const [itemObjImages, setItemObjImages] = useState([
    ...newObj.images,
    newObj.images.length < 3 && Array(3 - newObj.images.length).fill(""),
  ]);
  // to maintain array of 3 values for 3 inputs

  const [errorMessage, setErrorMessage] = useState(null);
  const checkingImageURL = useAuth().checkingImageURL;

  const handleClose = () => {
    setShow(false);
    setItemObj(props.obj);
    setErrorMessage(null);
  };

  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    // filtering images array from invalid links
    const validImagesArr = itemObjImages.filter((image) =>
      checkingImageURL(image)
    );
    // filtering images array from invalid link

    // checking if validImagesArr have valid image link
    validImagesArr.every((image) => checkingImageURL(image)) &&
    validImagesArr.length >= 1
      ? fetch(`https://api.escuelajs.co/api/v1/products/${props.obj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...itemObj, images: validImagesArr }),
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          {/* [ TITLE */}
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={itemObj.title}
            onChange={(e) => setItemObj({ ...itemObj, title: e.target.value })}
          ></Form.Control>
          {/* TITLE ] */}

          {/* [ DESECRIPTION */}
          <Form.Label>Product Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={itemObj.description}
            onChange={(e) =>
              setItemObj({ ...itemObj, description: e.target.value })
            }
          ></Form.Control>
          {/* DESCRIPTION ] */}

          {/* [ IMAGES */}
          <Form.Label>
            Image Link 1:{" "}
            <span style={{ fontSize: "12px" }}>
              &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
            </span>
          </Form.Label>
          <Form.Control
            type="text"
            value={itemObjImages[0]}
            onChange={(e) =>
              setItemObjImages((prev) =>
                prev.map((image, index) =>
                  index === 0 ? e.target.value : image
                )
              )
            }
          ></Form.Control>
          <Form.Label>
            Image Link 2:{" "}
            <span style={{ fontSize: "12px" }}>
              &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
            </span>
          </Form.Label>
          <Form.Control
            type="text"
            value={itemObjImages[1]}
            onChange={(e) =>
              setItemObjImages((prev) =>
                prev.map((image, index) =>
                  index === 1 ? e.target.value : image
                )
              )
            }
          ></Form.Control>
          <Form.Label>
            Image Link 3:{" "}
            <span style={{ fontSize: "12px" }}>
              &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
            </span>
          </Form.Label>
          <Form.Control
            type="text"
            value={itemObjImages[2]}
            onChange={(e) =>
              setItemObjImages((prev) =>
                prev.map((image, index) =>
                  index === 0 ? e.target.value : image
                )
              )
            }
          ></Form.Control>
          {/* IMAGES ] */}

          {/* [ PRICE */}
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            value={itemObj.price}
            min={1}
            onChange={(e) => setItemObj({ ...itemObj, price: e.target.value })}
          ></Form.Control>
          {/* PRICE ] */}

          {/* [ CATEGOREY */}
          {/* {params.categoryId && (
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
          )} */}
          {/* CATEGORY ] */}

          {/* [ ERROR MESSAGE */}
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
          {/* ERROR MESSAGE ] */}
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

export default ProductCardEdit;
