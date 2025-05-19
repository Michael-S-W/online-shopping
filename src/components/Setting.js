import { Dropdown, DropdownButton } from "react-bootstrap";
import Logout from "./Logout";
import Login from "./Login";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router";

const Setting = (props) => {
  const navigate = useNavigate();
  const user = useAuth().user;
  return (
    <div>
      <DropdownButton
        drop={props.drop}
        variant="outline-dark"
        title={<i className="bi bi-gear"></i>}
      >
        {user && (
          <>
            {/* [ USER PROFILE */}
            <Dropdown.Item>
              <div onClick={() => navigate("/profile")}>
                <img
                  src={user.avatar}
                  alt="user avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />{" "}
                {user.name + "'s Profile"}
              </div>
            </Dropdown.Item>
            {/* USER PROFILE ] */}

            {/* [ ALL USERS PAGE */}
            <Dropdown.Item>
              <div onClick={() => navigate("/users")}>
                <i className="bi bi-people"></i>
                <span> All users</span>
              </div>
            </Dropdown.Item>
            {/* ALL USERS PAGE ] */}
          </>
        )}
        <Dropdown.Item>{user ? <Logout /> : <Login />}</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Setting;
