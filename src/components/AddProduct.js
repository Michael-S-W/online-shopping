import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router";

const AddProduct = (props) => {
  const urlCategoryId = useParams().categoryId;
  console.log(typeof urlCategoryId);
  const [show, setShow] = useState(false);
  // const [productObj, setProductObj] = useState({
  //   title: "",
  //   price: 0,
  //   description: "",
  //   categoryId: 0,
  //   images: [""],
  // });
  const [productObj, setProductObj] = useState(
    props.obj
      ? {
          ...props.obj,
          categoryId: props.obj.category.id,
        }
      : {
          title: "",
          price: 0,
          description: "",
          categoryId: Number(urlCategoryId) || 0,
          images: [""],
        }
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const checkingImageURL = useAuth().checkingImageURL;
  const categoriesList = useAuth().categoriesList;

  const handleClose = () => {
    setShow(false);
    setErrorMessage(null);
    setProductObj(
      props.obj
        ? {
            ...props.obj,
            categoryId: props.obj.category.id,
          }
        : {
            title: "",
            price: 0,
            description: "",
            categoryId: Number(urlCategoryId) || 0,
            images: [""],
          }
    );
  };
  const handleShow = () => setShow(true);

  const handleAddProduct = async () => {
    const tempImagesArray = [...productObj.images].filter((e) => e !== "");
    if (!tempImagesArray.every((e) => checkingImageURL(e))) {
      return setErrorMessage("Please check images URL");
    }
    if (productObj.categoryId < 1) {
      return setErrorMessage("Please select category");
    }
    props.obj
      ? tempImagesArray.length > 0
        ? await fetch(
            `https://api.escuelajs.co/api/v1/products/${props.obj.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...productObj,
                images: tempImagesArray,
                title: [
                  [...productObj.title][0].toUpperCase(),
                  [...productObj.title].splice(1).join(""),
                ].join(""),
              }),
            }
          )
            .then((response) => {
              if (!response.ok) {
                setErrorMessage(
                  `HTTP error! Status: ${response.status}, ${response.message}`
                );
                // throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              setShow(false);
              setProductObj({
                title: "",
                price: 0,
                description: "",
                categoryId: 0,
                images: [""],
              });
              // window.location.reload();
            })
            .catch((err) => {
              console.log(err.message);
            })
        : setErrorMessage("Please enter a valid image URL")
      : tempImagesArray.length > 0
      ? await fetch(`https://api.escuelajs.co/api/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...productObj,
            images: tempImagesArray,
            title: [
              [...productObj.title][0].toUpperCase(),
              [...productObj.title].splice(1).join(""),
            ].join(""),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              setErrorMessage(
                `HTTP error! Status: ${response.status}, ${response.message}`
              );
              // throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setShow(false);
            setProductObj({
              title: "",
              price: 0,
              description: "",
              categoryId: 0,
              images: [""],
            });
            // window.location.reload();
          })
          .catch((err) => {
            console.log(err.message);
          })
      : setErrorMessage("Please enter a valid image URL");
  };

  const addMoreImages = () => {
    setProductObj((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleDeleteImage = (e) => {
    let tempArr = [...productObj.images].filter(
      (img, index) =>
        index !== Number(e.target.attributes["data-number"].nodeValue)
    );
    console.log(tempArr);
    setProductObj({
      ...productObj,
      images: tempArr,
    });
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
          style={{
            borderRadius: "5px",
            padding: "1px 4px",
            zIndex: "9",
            // boxShadow: "1.5px 3px 3px #1c2833 ",
          }}
        >
          <i className="bi bi-plus-square"> Add Product</i>
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>{props.obj ? "Edit Prodct" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <Form>
            {/* [ TITLE */}
            <Form.Label className="w-100">
              Title:
              <Form.Control
                name="title"
                type="text"
                required
                value={productObj.title}
                onChange={(e) =>
                  setProductObj({ ...productObj, title: e.target.value })
                }
              ></Form.Control>
            </Form.Label>
            {/* TITLE ] */}

            {/* [ DESCRIPTION */}
            <Form.Label className="w-100">
              Product Description:
              <Form.Control
                name="description"
                as="textarea"
                required
                rows={2}
                value={productObj.description}
                onChange={(e) =>
                  setProductObj({ ...productObj, description: e.target.value })
                }
              ></Form.Control>
            </Form.Label>
            {/* DESCRIPTION ]*/}

            {/* [ IMAGES */}
            <div
              className="border p-2 rounded"
              style={{ height: "250px", overflowY: "auto" }}
            >
              {/* [ BUTTON TO ADD MORE IMAGES */}
              <div className="d-flex justify-content-between align-items-center">
                <h5>Product Images:</h5>
                <Button
                  variant="outline-dark"
                  onClick={addMoreImages}
                  style={{
                    borderRadius: "5px",
                    padding: "1px 4px",
                    zIndex: "9",
                  }}
                >
                  <i className="bi bi-plus-square"> Add Image</i>
                </Button>
              </div>
              {/* BUTTON TO ADD MORE IMAGES ] */}

              {productObj.images.map((image, index) => (
                <Form.Group
                  className="mb-2"
                  key={index}
                  style={{ position: "relative" }}
                >
                  {productObj.images.length > 1 && (
                    <button
                      data-number={index}
                      className="btn btn-danger "
                      style={{
                        padding: "0",
                        width: "24px",
                        height: "24px",
                        fontSize: "12px",
                        marginRight: "5px",
                        position: "absolute",
                        right: "0",
                        top: "18px",
                      }}
                      onClick={handleDeleteImage}
                    >
                      X
                    </button>
                  )}
                  <Form.Label className="w-100">
                    Image Link {index + 1}:{" "}
                    <div
                      style={{ fontSize: "12px" }}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {" "}
                      <span>
                        &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
                      </span>
                    </div>
                    <Form.Control
                      name={"imageInput" + index}
                      type="search"
                      required
                      value={productObj.images[index]}
                      onChange={(e) => {
                        const newImages = [...productObj.images];
                        newImages[index] = e.target.value;
                        setProductObj((prev) => ({
                          ...prev,
                          images: newImages,
                        }));
                      }}
                    ></Form.Control>
                  </Form.Label>
                </Form.Group>
              ))}
            </div>
            {/* IMAGES ]*/}

            {/* [ PRICE */}
            <Form.Label className="w-100">
              Price:
              <Form.Control
                name="productPrice"
                type="number"
                min={1}
                value={productObj.price}
                onChange={(e) =>
                  setProductObj({ ...productObj, price: e.target.value })
                }
              ></Form.Control>
            </Form.Label>
            {/* PRICE ] */}

            {/* [ CATEGORY */}

            <Form.Label className="w-100">
              Category:
              {(props.obj || urlCategoryId) && (
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  current product's category can't be changed
                </span>
              )}
              <Form.Select
                name="selectCategory"
                aria-label="Default select example"
                value={productObj.categoryId}
                disabled={props.obj || urlCategoryId}
                onChange={(e) =>
                  setProductObj({
                    ...productObj,
                    categoryId: Number(e.target.value),
                  })
                }
              >
                <option value={0}>-- Select Category --</option>
                {categoriesList.map((cat) => (
                  <option value={cat.id} key={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Label>
            {/* [ CATEGORY */}

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
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-warning d-flex justify-content-end">
          <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button
              variant="outline-dark"
              type="submit"
              // form="addEditProduct"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
