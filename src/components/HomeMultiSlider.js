import React, { useEffect, useState } from "react";
import { default as MultiCarousel } from "react-multi-carousel";
import "../../node_modules/react-multi-carousel/lib/styles.css";
import HomeCards from "./HomeCards";
import { useAuth } from "../hooks/AuthProvider";
import CategoryCardEdit from "./CategoryCardEdit";

const HomeMultiSlider = () => {
  const user = useAuth().user;
  const categories = useAuth().categoriesList;

  const responsive = {
    superLargeDesktop: {
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

  return (
    <MultiCarousel
      partialVisible={true}
      responsive={responsive}
      className="mb-3"
    >
      {categories.map((obj, idx) => (
        <>
          {user && user.role === "admin" && <CategoryCardEdit obj={obj} />}

          <HomeCards key={idx} category={obj} />
        </>
      ))}
    </MultiCarousel>
  );
};

export default HomeMultiSlider;
