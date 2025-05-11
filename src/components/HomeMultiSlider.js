import React, { useEffect, useState } from "react";
import { default as MultiCarousel } from "react-multi-carousel";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import HomeCards from "./HomeCards";
import { useAuth } from "../hooks/AuthProvider";
import CategoryCardEdit from "./CategoryCardEdit";

const HomeMultiSlider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuth().user;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MultiCarousel partialVisible={true} responsive={responsive}>
      {categories.map((obj, idx) => (
        <>
          {user && <CategoryCardEdit obj={obj} />}

          <HomeCards key={idx} category={obj} />
        </>
      ))}
    </MultiCarousel>
  );
};

export default HomeMultiSlider;
