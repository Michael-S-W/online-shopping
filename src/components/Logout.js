import React from "react";
import { Button } from "react-bootstrap";
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
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
