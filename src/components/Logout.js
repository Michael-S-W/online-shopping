import { useAuth } from "../hooks/AuthProvider";

const Logout = () => {
  const logout = useAuth().logOut;
  const handleLogout = () => {
    logout();
  };
  return (
    <div variant="outline-danger" onClick={handleLogout} className="w-100">
      <i className="bi bi-box-arrow-right"></i>
      <span style={{ textDecoration: "none" }}> Logout </span>
    </div>
  );
};

export default Logout;
