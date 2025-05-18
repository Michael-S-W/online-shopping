import { useAuth } from "../hooks/AuthProvider";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const DropdownCat = () => {
  const [category, setCategory] = useState(0);

  const categoriesList = useAuth().categoriesList;
  const navigate = useNavigate();
  let params = window.location.pathname;
  useEffect(() => {
    if (params.split("/")[2]) {
      setCategory(Number(params.split("/")[2]));
    } else {
      setCategory(0);
    }
  }, [params]);

  const handleChange = (e) => {
    if (Number(e.target.value) === 0) {
      navigate(`/shop`);
    } else {
      navigate(`/shop/` + e.target.value);
    }
    setCategory(e.target.value);
  };

  return (
    <Form.Select
      aria-label="Default select example"
      value={category}
      onChange={handleChange}
      style={{ maxWidth: "fit-content" }}
    >
      <option value={0}>All Categories</option>

      {categoriesList.map((cat, idx) => {
        return (
          <option key={idx + cat.name} value={idx + 1}>
            {cat.name}
          </option>
        );
      })}
      {/* <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option> */}
    </Form.Select>

    // <NavDropdown title="Category" id={`offcanvasNavbarDropdown-expand-sm`}>
    //   {categoriesList.map((cat, idx) => {
    //     return (
    //       <NavDropdown.Item key={idx + cat.name} href={`/shop/` + idx + 1}>
    //         {cat.name}
    //       </NavDropdown.Item>
    //     );
    //   })}
    // </NavDropdown>
  );
};

export default DropdownCat;
