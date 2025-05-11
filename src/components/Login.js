import { useState, useEffect } from "react";
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
  // const [submitLogin, setSubmitLogin] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "john@mail.com",
    password: "changeme",
  });
  const authLogin = useAuth().loginAction;
  const userEmail = useAuth().user;

  const handleClose = () => {
    setShow(false);
    setCredentials({ email: "", password: "" });
    setShowPassword(false);
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
      // setSubmitLogin(true);
      authLogin(credentials);
    }
  };

  // useEffect(() => {
  //   if (!submitLogin) return;

  //   const loginData = async () => {
  //     try {
  //       const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(credentials),
  //       });
  //       if (!res.ok) throw new Error(`Error: ${res.status}`);
  //       const data = await res.json();
  //       console.log(data);
  //       // localStorage.setItem("access_token", data.access_token);
  //       // localStorage.setItem("refresh_token", data.access_refresh);
  //       // handleClose();
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   loginData();
  // }, [submitLogin]);

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Login
      </Button>

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
                Email address: ex.{" "}
                <span style={{ fontSize: "12px" }}>john@mail.com</span>
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
                Password: ex. <span style={{ fontSize: "12px" }}>changeme</span>
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
                <label className="loginPasswordChecker position-absolute ">
                  {showPassword ? "Hide" : "Show"}
                  <input
                    type="checkbox"
                    onChange={(e) => setShowPassword(!showPassword)}
                    hidden
                  />
                </label>
              </div>
            </Form.Group>
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
