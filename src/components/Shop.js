import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import "./Shop.css";
import ScrollToTop from "./ScrollToTop";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let params = useParams();
  let fullURL;
  const baseURL = "https://api.escuelajs.co/api/v1/products";

  if (isNaN(params.categoryId)) {
    fullURL = baseURL;
  } else {
    fullURL = baseURL + `/?categoryId=${params.categoryId}`;
  }
  useEffect(() => {
    setIsLoading(true);
    const CatProducts = async () => {
      try {
        const response = await fetch(fullURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    CatProducts();
  }, [fullURL]);

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
      {isLoading ? (
        <div className="text-center">
          <strong>Loading...</strong>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center">
          <strong>No Products</strong>
        </div>
      ) : !isNaN(params.categoryId) ? (
        <div className="text-center">
          <strong>{products[0].category.name}</strong>
        </div>
      ) : (
        <div className="text-center">
          <strong>All Products</strong>
        </div>
      )}
      {/* [ Products Bar */}

      <div className="productCard ">
        {products.map((product, idx) => (
          <ProductCard key={idx} obj={product} />
        ))}
      </div>
      <ScrollToTop />
      {/* Products Cards ] */}
    </div>
  );
};
export default Shop;
