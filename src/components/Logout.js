// import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router";

const Logout = () => {
  const logout = useAuth().logOut;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div variant="outline-danger" onClick={handleLogout} className="w-100">
      <i className="bi bi-box-arrow-right"></i>
      <span style={{ textDecoration: "none" }}> Logout </span>
    </div>
  );
};

export default Logout;
