import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Register.css";

function Register({ showRegister, setShowRegister }) {
  const [rePassword, setRePassword] = useState("");
  const [showRePassword, setShowRePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChecker, setPasswordChecker] = useState("");
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    address: {
      street: "",
      city: "",
    },
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== rePassword) {
      setPasswordChecker("Passwords didn't match");
    } else {
      setPasswordChecker("");
      setRePassword("");
      setSubmit(true);
      setFormData({
        address: {
          street: "",
          city: "",
        },
        email: "",
        username: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
        phone: "",
      });
    }
  };

  useEffect(() => {
    if (!submit) return;
    const postData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    setShowRegister(false);
    postData();
  }, [submit]);
  return (
    <>
      <Modal
        size="lg"
        show={showRegister}
        onHide={() => setShowRegister(false)}
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
            {/* Row contains USERNAME, FIRSTNAME and LASTNAME */}
            <Row className="mb-3">
              <Col>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
              </Col>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First name"
                  name="first-name"
                  value={formData.name.firstname}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: { ...formData.name, firstname: e.target.value },
                    })
                  }
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last name"
                  name="last-name"
                  value={formData.name.lastname}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: { ...formData.name, lastname: e.target.value },
                    })
                  }
                />
              </Col>
            </Row>
            {/* Row contains EMAIL and Mobile  */}
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
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
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Mobile Number"
                  name="mobile"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            {/* Row contains PASSWORD, Re-PASSWORD and SHOW/HIDE BUTTONS*/}
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Password
                    <span className="text-danger">
                      {passwordChecker && " ( " + passwordChecker + " ) "}
                    </span>
                  </Form.Label>
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
                    />
                    <label className="passwordChecker position-absolute ">
                      {showPassword ? "Hide" : "Show"}
                      <input
                        type="checkbox"
                        onChange={(e) => setShowPassword(!showPassword)}
                        hidden
                      />
                    </label>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Re-Password
                    <span className="text-danger">
                      {passwordChecker && " ( " + passwordChecker + " ) "}
                    </span>
                  </Form.Label>
                  <div className="d-flex justify-content-between align-items-center position-relative">
                    <Form.Control
                      type={showRePassword ? "text" : "password"}
                      onChange={(e) => setRePassword(e.target.value)}
                      value={rePassword}
                      placeholder="Re-Password"
                      name="repassword"
                    />
                    <label className="passwordChecker position-absolute">
                      {showRePassword ? "Hide" : "Show"}
                      <input
                        type="checkbox"
                        onChange={() => setShowRePassword(!showRePassword)}
                        hidden
                      />
                    </label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            {/* Row contains STREET and CITY*/}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  name="street"
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="City Name"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          {/* FOOTER contains REGISTER and CLOSE BUTTON */}
          <Modal.Footer className="bg-warning">
            <Button variant="secondary" onClick={() => setShowRegister(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleRegister}>
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Register;
