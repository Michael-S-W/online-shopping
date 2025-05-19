import { useAuth } from "../hooks/AuthProvider";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const DropdownCat = () => {
  const [category, setCategory] = useState(0);

  const categoriesList = useAuth().categoriesList;
  const navigate = useNavigate();
  let params = useParams().categoryId;
  useEffect(() => {
    if (params) {
      setCategory(params);
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
      name="categorySelect"
      aria-label="Default select example"
      value={category}
      onChange={handleChange}
      style={{ maxWidth: "fit-content" }}
    >
      <option value={0}>All Categories</option>

      {categoriesList.map((cat, idx) => {
        return (
          <option key={idx + cat.name} value={cat.id}>
            {cat.name}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default DropdownCat;
