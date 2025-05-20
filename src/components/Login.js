import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./Login.css";
import Register from "./Register";
import { useAuth } from "../hooks/AuthProvider";

function Login() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "admin@mail.com",
    password: "admin123",
  });
  const authLogin = useAuth().loginAction;
  const userEmail = useAuth().user;
  const loginError = useAuth().loginError;
  const setLoginError = useAuth().setLoginError;

  const handleClose = () => {
    setShow(false);
    setCredentials({ email: "", password: "" });
    setShowPassword(false);
    setLoginError(null);
  };
  const handleShow = () => setShow(true);

  const handleRegister = async () => {
    setShow(false);
    setTimeout(() => setShowRegister(true), 250);
  };
  if (userEmail) {
    handleClose();
  }
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      authLogin(credentials);
    }
  };

  return (
    <>
      <div
        variant="outline-danger"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span> Login</span>
      </div>

      <Register showRegister={showRegister} setShowRegister={setShowRegister} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <p className="text-center my-1 fs-5 bg-light">
          you can{" "}
          <button className="btn btn-outline-success" onClick={handleRegister}>
            Register
          </button>{" "}
          if you don't have an account
        </p>
        <Form>
          <Modal.Body className="bg-warning">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Email address:
                <div style={{ fontSize: "12px" }}>
                  {/* use john@mail.com as customer or admin@mail.com as admin */}
                  register or fetch all users credentials from{" "}
                  <a
                    href="https://api.escuelajs.co/api/v1/users"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>{" "}
                  as admin or customer
                </div>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Password:{" "}
                <div style={{ fontSize: "12px" }}>
                  changeme for john@mail.com or admin123 for admin@mail.com
                </div>
              </Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  value={credentials.password}
                  placeholder="password"
                  required
                />
                <label
                  className="loginPasswordChecker position-absolute "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                  {/* <input
                    type="checkbox"
                    onClick={() => setShowPassword(!showPassword)}
                    hidden
                  /> */}
                </label>
              </div>
            </Form.Group>
            <div className="text-danger fw-bold">{loginError}</div>
          </Modal.Body>
          <Modal.Footer className="bg-warning">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button
              type="submit"
              onClick={handleLogin}
              className="btn btn-outline-dark"
            >
              Login
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
