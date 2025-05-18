import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router";
import shoppingCard from "../assets/shop-logo.png";
import "./Navbar.css";
import Login from "./Login";
import Cart from "./Cart";
import { useAuth } from "../hooks/AuthProvider";
import Logout from "./Logout";

const MainNavbar = () => {
  const user = useAuth().user;
  return (
    <Navbar expand="sm" className="bg-warning rounded">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={shoppingCard} alt="brand-logo" style={{ width: "100px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
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
            {user ? (
              <div className="d-flex justify-centent-center align-items-center gap-2">
                <div className="text-danger fw-bold">Welcome, {user.name}</div>
                <Logout />
              </div>
            ) : (
              <Login />
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
