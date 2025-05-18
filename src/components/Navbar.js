import shoppingLogo from "../assets/shop-logo.png";
import { NavLink } from "react-router";
import Cart from "./Cart";
import "./Navbar.css";
import Setting from "./Setting";

function Navbar() {
  return (
    <>
      <div id="navbar-container" className="bg-warning container">
        <div id="navbar-navlinks">
          <div>
            <img
              src={shoppingLogo}
              alt="Shop Logo"
              style={{ width: "100px", marginRight: "10px" }}
            />
          </div>
          <NavLink to="/" className="btn btn-outline-dark">
            Home
          </NavLink>
          <NavLink to="/Shop" className="btn btn-outline-dark">
            Shop
          </NavLink>
          <NavLink to="/About" className="btn btn-outline-dark">
            About
          </NavLink>
        </div>
        <div className="d-flex gap-1">
          <Cart />
          {/* <div className="d-flex me-2" id="loginButton">
          {user ? <Logout /> : <Login />}
          </div> */}
          <Setting drop={"down"} />
        </div>
      </div>

      <div id="navbar-container-sm" className="bg-warning">
        <NavLink
          to="/"
          className="btn btn-outline-dark"
          style={{ border: "1px solid black", padding: "7px 11px" }}
        >
          <i className="bi bi-house"> Home</i>
        </NavLink>
        <NavLink
          to="/Shop"
          className="btn btn-outline-dark"
          style={{ border: "1px solid black", padding: "7px 11px" }}
        >
          <i className="bi bi-bag"> Shop</i>
        </NavLink>
        <NavLink
          to="/About"
          className="btn btn-outline-dark"
          style={{ border: "1px solid black", padding: "7px 11px" }}
        >
          <i className="bi bi-info-circle"> About</i>
        </NavLink>
        <Cart />

        {/* <div className="d-flex me-2">{user ? <Logout /> : <Login />}</div> */}
        <Setting drop={"up"} />
      </div>
    </>
  );
}

export default Navbar;
