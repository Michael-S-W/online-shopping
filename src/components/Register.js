import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./Register.css";
import { useAuth } from "../hooks/AuthProvider";

function Register({ showRegister, setShowRegister }) {
  const [rePassword, setRePassword] = useState("");
  const [showRePassword, setShowRePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    role: "",
  });
  const checkingImageURL = useAuth().checkingImageURL;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.name === "") {
      setErrorMessage("Check your Name");
      return;
    }
    if (formData.email === "") {
      setErrorMessage("Check your Email");

      return;
    }
    if (formData.password !== rePassword) {
      setErrorMessage("Passwords didn't match");

      return;
    }
    if (!checkingImageURL(formData.avatar)) {
      setErrorMessage("Check avatar link");
      return;
    }
    setErrorMessage("");
    await fetch(`https://api.escuelajs.co/api/v1/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        name: [
          [...formData.name][0].toUpperCase(),
          [...formData.name.toLowerCase()].splice(1).join(""),
        ].join(""),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(
            `HTTP error! Status: ${response.status}, ${response.message}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setErrorMessage("Registered Successfully, you can login");
        setTimeout(() => {
          setShowRegister(false);
          setFormData({
            name: "",
            email: "",
            password: "",
            avatar: "",
            role: "",
          });
          window.location.reload();
          setErrorMessage("");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setShowRegister(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      avatar: "",
    });
    setErrorMessage("");
  };
  return (
    <>
      <Modal
        size="lg"
        show={showRegister}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title id="example-modal-sizes-title-lg">
            Registeration Form
          </Modal.Title>
        </Modal.Header>
        {/* form contains all input elements and footer section with 2 buttons */}
        <Form>
          <Modal.Body className="bg-warning">
            {/* [ Name */}
            <Row className="mb-2">
              <Form.Label className="w-100">
                Name:
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </Form.Label>
            </Row>
            {/* Name ] */}

            {/* [ Role */}
            <Row className="mb-2">
              <Form.Label className="w-100">
                Role:{" "}
                <span style={{ fontSize: "12px" }}>
                  --Select admin to use all featurs--
                </span>
                <Form.Select
                  type="select"
                  placeholder="Select Role"
                  name="Select"
                  required
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ ...formData, role: e.target.value });
                  }}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Label>
            </Row>
            {/* Role ] */}

            {/* [ EMAIL */}
            <Row className="mb-2">
              <Form.Label className="w-100">
                Email:
                <Form.Control
                  type="email"
                  required
                  placeholder=" Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Label>
            </Row>
            {/* EMAIL ] */}

            {/* [ PASSWORS */}
            <Row className="mb-2">
              <Form.Label className="w-100">
                Password
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <label
                    className="passwordChecker position-absolute "
                    onClick={(e) => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                    {/* <input
                      type="checkbox"
                      onClick={(e) => setShowPassword(!showPassword)}
                      hidden
                    /> */}
                  </label>
                </div>
              </Form.Label>
            </Row>

            <Row className="mb-2">
              <Form.Label className="w-100">
                Re-Password
                <div className="d-flex justify-content-between align-items-center position-relative">
                  <Form.Control
                    type={showRePassword ? "text" : "password"}
                    onChange={(e) => setRePassword(e.target.value)}
                    value={rePassword}
                    placeholder="Re-Password"
                    name="repassword"
                    required
                  />
                  <label
                    className="passwordChecker position-absolute"
                    onClick={() => setShowRePassword(!showRePassword)}
                  >
                    {showRePassword ? "Hide" : "Show"}
                    {/* <input
                      type="checkbox"
                      onClick={() => setShowRePassword(!showRePassword)}
                      hidden
                    /> */}
                  </label>
                </div>
              </Form.Label>
            </Row>
            {/* PASSWORS ] */}

            {/* [ AVATAR */}
            <Row className="mb-2">
              <Form.Label className="w-100">
                Image:
                <Form.Control
                  type="search"
                  placeholder="ex: http:// or https:// .... .jpeg - .jpg - .png - .gif"
                  name="street"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      avatar: e.target.value,
                    })
                  }
                />
              </Form.Label>
            </Row>
            {/* AVATAR ] */}
          </Modal.Body>
          <Modal.Footer className="bg-warning">
            {errorMessage && (
              <span className="text-danger fw-bold  me-auto">
                {errorMessage}
              </span>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="outline-dark"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Register;
