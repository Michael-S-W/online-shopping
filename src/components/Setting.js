import { Dropdown, DropdownButton } from "react-bootstrap";
import Logout from "./Logout";
import Login from "./Login";
import { useAuth } from "../hooks/AuthProvider";

const Setting = (props) => {
  const user = useAuth().user;
  return (
    <div>
      <DropdownButton
        drop={props.drop}
        variant="outline-dark"
        title={<i className="bi bi-gear"></i>}
      >
        <Dropdown.Item>
          {user ? (
            <>
              <img
                src={user.avatar}
                alt="user avatar"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />{" "}
              {user.name + "'s Profile"}
            </>
          ) : (
            <>
              <i className="bi bi-person-circle"></i> Profile
            </>
          )}
        </Dropdown.Item>
        <Dropdown.Item>{user ? <Logout /> : <Login />}</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Setting;
