import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router";
import shoppingCard from "../assets/shopping-cart.png";
import "./Navbar.css";
import Login from "./Login";
import Cart from "./Cart";

const MainNavbar = () => {
  return (
    <Navbar expand="sm" className="bg-warning rounded">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={shoppingCard} alt="brand-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "80px" }}
            navbarScroll
          >
            <NavLink to="/" className="btn btn-outline-dark">
              Home
            </NavLink>
            <NavLink to="/shop" className="btn btn-outline-dark">
              Shop
            </NavLink>
            {/* <NavLink to="/cart" className="btn btn-outline-dark">
              Cart
            </NavLink> */}
            <div className="d-flex me-2" id="loginButton">
              <Cart />
            </div>
          </Nav>

          <div className="d-flex me-2" id="loginButton">
            <Login />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
