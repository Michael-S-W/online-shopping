import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Card className="text-center mt-5">
      <Card.Header className="text-danger fw-bold bg-warning">
        Warning
      </Card.Header>
      <Card.Body className="bg-warning">
        <Card.Title
          className="text-danger"
          style={{ fontSize: "72px", color: "red" }}
        >
          404
        </Card.Title>
        <Card.Text>The requested page is not available</Card.Text>
        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
          Go Home
        </button>
      </Card.Body>
    </Card>
  );
};

export default NotFound;
