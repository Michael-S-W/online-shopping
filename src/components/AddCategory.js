import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddCategory = () => {
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    image: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    setShow(false);
    setSubmit(!submit);
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
  }, [submit]);

  return (
    <>
      <Button
        variant="outline-dark"
        className="mt-3 text-center my-auto btn btn-outline-dark"
        onClick={handleShow}
      >
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-warning">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image Link</Form.Label>
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
