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

const Home = () => {
  return (
    <>
      <Carousel fade className="bg-warning rounded my-3">
        <Carousel.Item interval={3000}>
          <img
            src={cosmetics}
            alt="appliances"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h2>First slide label</h2>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={electronics}
            alt="appliances"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h2>Second slide label</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={fruitsVegetables}
            alt="appliances"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h2>Third slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={groceries}
            alt="appliances"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h2>Forth slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={homeAppliances}
            alt="appliances"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h2>Fifth slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={kitchenAppliances}
            alt="appliances"
            className="d-block w-100 rounded"
          />
          <Carousel.Caption>
            <h2>sixth slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <HomeMultiSlider />
      <div className="text-center">
        <AddCategory />
      </div>
    </>
  );
};

export default Home;
