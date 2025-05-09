import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  let params = useParams();
  let fullURL;
  const baseURL = "https://api.escuelajs.co/api/v1/products";

  if (isNaN(params.categoryId)) {
    fullURL = baseURL;
  } else {
    fullURL = baseURL + `/?categoryId=${params.categoryId}`;
  }
  useEffect(() => {
    const CatProducts = async () => {
      try {
        const response = await fetch(fullURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    CatProducts();
  }, []);

  return (
    <div>
      {/* [ Search Bar */}
      <Form className="d-flex text-center mx-auto my-3 flex-grow-1 px-3">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-dark">Search</Button>
      </Form>
      {/* Searh Bar ] */}

      {/* [ Products Bar */}
      <div className="productCard ">
        {products.map((product, idx) => (
          <ProductCard key={idx} obj={product} />
        ))}
      </div>
      {/* Products Cards ] */}
    </div>
  );
};
export default Shop;
