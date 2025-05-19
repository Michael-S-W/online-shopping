import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import "./Shop.css";
import ScrollToTop from "../components/ScrollToTop";
import AddProduct from "../components/AddProduct";
import { useAuth } from "../hooks/AuthProvider";
import DropdownCat from "../components/DropdownCat";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  let params = useParams();
  let fullURL;
  const baseURL = "https://api.escuelajs.co/api/v1/products";
  const user = useAuth().user;

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

  // Component to render search products
  const SearchResult = () => {
    const tempArr = products.filter((product) =>
      product.slug.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <>
        {tempArr.length ? (
          tempArr.map((item) => <ProductCard key={item.slug} obj={item} />)
        ) : (
          <h3>NO MATCHING PRODUCTS</h3>
        )}
      </>
    );
  };

  return (
    <div>
      {/* [ Search Bar */}

      <Form
        name="searchForm"
        className="d-flex text-center mx-auto my-3 flex-grow-1 px-3"
      >
        <Form.Control
          name="searchbar"
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button name="searchbarBtn" variant="outline-dark">
          Search
        </Button>
      </Form>
      {/* Searh Bar ] */}
      <div className="m-3 d-flex justify-content-between align-items-center">
        {/* <DropdownCat /> */}
        {isLoading ? <strong>Loading...</strong> : <DropdownCat />}

        {user && user.role === "admin" && (
          <span>
            <AddProduct />
          </span>
        )}
      </div>

      {/* [ Products Bar */}

      <div className="productCard ">
        {/* --------------------------------------- */}
        {search !== "" && <SearchResult />}
        {/* ---------------------------------------- */}
        {(search === "") & (products.length > 0)
          ? products.map((product, idx) => (
              <ProductCard key={product.title + idx} obj={product} />
            ))
          : !isLoading && (
              <div className="text-danger text-nowrap">
                <h4>THIS CATEGORY IS EMPTY</h4>
              </div>
            )}
      </div>
      <ScrollToTop />

      {/* Products Cards ] */}
    </div>
  );
};
export default Shop;
