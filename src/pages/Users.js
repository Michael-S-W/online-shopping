import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../hooks/AuthProvider";
import unavailableImage from "../assets/unavailable-image.png";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const loggedUser = useAuth().user;
  const checkingImageURL = useAuth().checkingImageURL;

  useEffect(() => {
    const fetchingUsers = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/users/");
        if (!response.ok) {
          console.log("error fetching users", response.status);
          throw new Error("Error Fetching Users", response);
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchingUsers();
  }, []);
  if (!loggedUser) return;
  return (
    <Table style={{ fontSize: "12px" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          {loggedUser.role === "admin" && <th>Password</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => {
          return (
            <tr key={user.name + idx}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={
                    checkingImageURL(user.avatar)
                      ? user.avatar
                      : unavailableImage
                  }
                  alt={user.name}
                  style={{ width: "30px" }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              {loggedUser.role === "admin" && <td>{user.password}</td>}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Users;
