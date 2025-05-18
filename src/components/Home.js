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
  // const categoriesList = useAuth().categoriesList;
  // const checkingImageURL = useAuth().checkingImageURL;

  // const handleCreateCat = async () => {
  //   const obj = [
  //     {
  //       name: "Clothes",
  //       image: "https://i.imgur.com/QkIa5tT.jpeg",
  //     },
  //     {
  //       name: "Devices",
  //       image: "https://i.imgur.com/ZANVnHE.jpeg",
  //     },
  //     {
  //       name: "Furniture",
  //       image: "https://i.imgur.com/Qphac99.jpeg",
  //     },
  //     {
  //       name: "Shoes",
  //       image: "https://i.imgur.com/qNOjJje.jpeg",
  //     },
  //     {
  //       name: "Miscellaneous",
  //       image: "https://i.imgur.com/BG8J0Fj.jpg",
  //     },
  //     {
  //       name: "Vegetables",
  //       image:
  //         "https://static6.depositphotos.com/1063437/539/i/450/depositphotos_5392006-stock-photo-vegetables-in-wicker-basket.jpg",
  //     },
  //     {
  //       name: "Bakery",
  //       image:
  //         "https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg",
  //     },
  //     {
  //       name: "Fruits",
  //       image:
  //         "https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg",
  //     },
  //     {
  //       name: "Frozen foods",
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Frozen_Food.jpg/1280px-Frozen_Food.jpg",
  //     },
  //     {
  //       name: "Beverages",
  //       image:
  //         "https://st3.depositphotos.com/1063437/15487/i/450/depositphotos_154879324-stock-photo-bottles-of-assorted-global-soft.jpg",
  //     },
  //     {
  //       name: "Snacks",
  //       image:
  //         "https://img.freepik.com/free-photo/flat-lay-pretzels-doodles-arrangement_23-2148582652.jpg",
  //     },
  //     {
  //       name: "Dairy",
  //       image:
  //         "https://thumbs.dreamstime.com/b/cheese-milk-dairy-products-eggs-rustic-white-wood-backg-background-119865527.jpg",
  //     },
  //     {
  //       name: "Beauty products",
  //       image:
  //         "https://thumbs.dreamstime.com/b/make-up-bag-cosmetic-beauty-products-make-up-bag-cosmetic-beauty-products-women-s-secrets-cosmetics-perfume-brushes-143303525.jpg",
  //     },
  //     {
  //       name: "Household",
  //       image:
  //         "https://thumbs.dreamstime.com/b/house-cleaning-products-pile-white-background-household-chore-concept-39104697.jpg",
  //     },
  //     {
  //       name: "Electronics",
  //       image:
  //         "https://t3.ftcdn.net/jpg/01/76/97/56/360_F_176975606_NENcObythCwyPxA6n5vSKxwc8lVLa3In.jpg",
  //     },
  //   ];
  //   obj.forEach(async (cat) => {
  //     if (checkingImageURL(cat.image)) {
  //       // console.log(`SUCCESS: category ${cat.id} pass`);
  //       // } else {
  //       await fetch(`https://api.escuelajs.co/api/v1/categories/`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(cat),
  //         // headers: {
  //         //   Authorization:
  //         //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTc0NzMwMDMwNCwiZXhwIjoxNzQ5MDI4MzA0fQ.MbRh75uO6AX2_M8lfDC3hq9vWtamnsu3yNDnbpAiq3M",
  //         //   refresh_token:
  //         //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImlhdCI6MTc0NzMwMDMwNCwiZXhwIjoxNzQ3MzM2MzA0fQ.v8F7HekI0VIs4rNkgmfi4PqT6oxKb3ZNhYR6MxRZpa8", // If needed
  //         //   "Content-Type": "application/json",
  //         // },
  //       })
  //         .then((response) => {
  //           if (response.ok) {
  //             console.log("Resource created successfully", response);
  //           } else {
  //             console.log("Failed to delete", response);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log("Error:", error);
  //         });
  //     }
  //   });
  // };

  // const handleDeleteCat = async () => {
  //   categoriesList.forEach((category) => {
  //     if (!checkingImageURL(category.image)) {
  //       try {
  //         fetch(`https://api.escuelajs.co/api/v1/categories/${category.id}`, {
  //           method: "DELETE",
  //         });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   });
  // };
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
          display: "inline-block",
          lineHeight: "2",
          color: "white",
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
      <div className="w-100 text-end mb-3">
        {user ? (
          user.role === "admin" ? (
            <AddCategory />
          ) : user.role === "customer" ? (
            <div className="text-danger text-center fw-bold mb-3 fs-3">
              Welcome
            </div>
          ) : (
            <div className="text-danger text-center fw-bold mb-3 fs-3">
              Login to buy
            </div>
          )
        ) : (
          <div className="text-danger text-center fw-bold mb-3 fs-3">
            Login to buy
          </div>
        )}
      </div>
      <HomeMultiSlider />
      {/* Add Categories */}
      {/* <button className="btn btn-danger" onClick={handleCreateCat}>
        Add Cat
      </button> */}
      {/* <button className="btn btn-danger" onClick={handleDeleteCat}>
        Delete No Pic Cat
      </button> */}
      <Footer />
    </>
  );
};

export default Home;
