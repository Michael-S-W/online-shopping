import { useAuth } from "../hooks/AuthProvider";
const Profile = () => {
  const user = useAuth().user;
  const userCreation = user && new Date(user.creationAt);
  if (!user) return;
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "calc(100vh - 60px)",
        width: "100%",
      }}
    >
      <div className="bg-warning rounded mt-2 text-center ">
        <img
          src={user.avatar}
          alt="your avatar"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            objectPosition: "top",
            position: "absolute",
            borderRadius: "50%",
            top: "-75px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid #dc3545",
          }}
        />
        <div className="text-start">
          <div>
            <b>Name: </b>
            <p>{user.name}</p>
          </div>
          <div>
            <b>Role: </b>
            <p>{user.role}</p>
          </div>
          <div>
            <b>Email: </b>
            <p>{user.email}</p>
          </div>
          <div>
            <b>Password: </b>
            <p>{user.password}</p>
          </div>
          <div>
            <b>Member since: </b>
            <p>
              {userCreation.getFullYear() +
                "-" +
                String(userCreation.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(userCreation.getDate()).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
