import ShoppingLogo from "../assets/shop-logo.png";
const About = () => {
  return (
    <div className="bg-warning mt-3 p-5 rounded position-relative">
      <img
        src={ShoppingLogo}
        alt="logo"
        className="w-100 mb-3 position-relative"
      />
      <h1>About Us</h1>
      <p>
        Welcome to <b>Online Shopping Market</b>, your ultimate online shopping
        destination. Founded in 2025, we are passionate about providing our
        customers with a seamless, enjoyable, and convenient shopping
        experience.
      </p>
      <h3>Our Mission</h3>
      <p>
        To offer a wide selection of quality products at competitive prices,
        backed by excellent customer service. We aim to make shopping easy, fun,
        and accessible for everyone.
      </p>
      <h3>What We Offer</h3>
      <ul>
        <li>
          A diverse range of products across various categories like fashion,
          electronics, home essentials, and more.
        </li>
        <li>Secure and fast checkout process.</li>
        <li>Reliable shipping and easy returns.</li>
        <li>Regular deals and exclusive discounts.</li>
      </ul>
      <h3>Our Values</h3>
      <p>
        Customer satisfaction, trust, and integrity are at the heart of
        everything we do. We are committed to continuously improving our
        platform for your convenience. Thank you for choosing{" "}
        <b>Online Shopping Market!</b> Happy shopping!
      </p>
    </div>
  );
};

export default About;
