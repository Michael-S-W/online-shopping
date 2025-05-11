import React from "react";
import { Carousel } from "react-bootstrap";
import cosmetics from "../assets/images/cosmetics.jpg";
import electronics from "../assets/images/electronics.jpg";
import fruitsVegetables from "../assets/images/fruits-vegetables.jpg";
import groceries from "../assets/images/groceries.jpg";
import homeAppliances from "../assets/images/home-appliances.jpg";
import kitchenAppliances from "../assets/images/kitchen-appliances.jpg";
import HomeMultiSlider from "./HomeMultiSlider";
import AddCategory from "./AddCategory";
import { useAuth } from "../hooks/AuthProvider";
import { TypeAnimation } from "react-type-animation";
import Footer from "./Footer";
const Home = () => {
  const user = useAuth().user;

  return (
    <>
      <TypeAnimation
        sequence={[
          "Your favourite place for CLOTHES.",
          2000,
          "Your favourite place for ELECTRONICS.",
          2000,
          "Your favourite place for SHOES.",
          2000,
          "Your favourite place for DECORE.",
          2000,
          "Your favourite place for PET.",
          2000,
          "Your favourite place for GROCERIES.",
          2000,
        ]}
        wrapper="div"
        speed={30}
        style={{
          fontSize: "3.5vw",
          color: "white",
          display: "inline-block",
          lineHeight: "2",
        }}
        repeat={Infinity}
        className="mx-auto fw-bold"
      />

      <Carousel className="bg-warning rounded mb-3" pause={false}>
        <Carousel.Item interval={2000}>
          <img
            src={cosmetics}
            alt="appliances"
            className="d-block w-100 rounded"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={electronics}
            alt="appliances"
            className="d-block w-100 rounded"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={fruitsVegetables}
            alt="appliances"
            className="d-block w-100 rounded"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={groceries}
            alt="appliances"
            className="d-block w-100 rounded"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={homeAppliances}
            alt="appliances"
            className="d-block w-100 rounded"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            src={kitchenAppliances}
            alt="appliances"
            className="d-block w-100 rounded"
          />
        </Carousel.Item>
      </Carousel>
      <HomeMultiSlider />
      <div className="text-center">
        {user ? (
          <AddCategory />
        ) : (
          <div className="text-danger fw-bold my-3 fs-3">
            Login to add categories
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
