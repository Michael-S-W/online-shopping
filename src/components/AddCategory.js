import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../hooks/AuthProvider";

const AddCategory = () => {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    image: "",
  });

  const checkingImageURL = useAuth().checkingImageURL;

  const handleClose = () => {
    setShow(false);
    setErrorMessage(null);
    setCategoryDetails({
      name: "",
      image: "",
    });
  };
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (checkingImageURL(categoryDetails.image)) {
      setSubmit(!submit);
      setShow(false);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please enter a valid image URL");
    }
  };

  useEffect(() => {
    if (!submit) return;

    const creatingCategory = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryDetails),
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log(data);
        window.location.reload();
      } catch {}
    };
    creatingCategory();
  }, [categoryDetails, submit]);

  return (
    <>
      <Button
        variant="outline-dark"
        className=" text-center btn btn-outline-dark"
        style={{
          borderRadius: "5px",
          padding: "1px 4px",
          zIndex: "9",
        }}
        onClick={handleShow}
      >
        <i className="bi bi-plus-square"> Add Category</i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Image Link:{" "}
                <span style={{ fontSize: "12px" }}>
                  &#40;http:// or https:// ..... jpeg-jpg-png-gif &#41;
                </span>
              </Form.Label>
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
        <Modal.Footer className="bg-warning">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-dark" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCategory;
