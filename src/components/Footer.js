import "./Footer.css";
const Footer = () => {
  const navButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    marginBottom: "8px",
  };
  const iconsStyle = {
    backgroundColor: "transparent",
    border: "none",
    margin: "0px",
    padding: "0",
    width: "40px",
    height: "40px",
  };
  return (
    <footer className=" text-center bg-warning rounded p-3 mt-auto">
      <div className="">
        <nav
          aria-label="Footer"
          className="d-flex justify-content-evenly flex-wrap"
          style={{ columnGap: "12px" }}
        >
          <button className="" style={navButtonStyle}>
            About
          </button>
          <button className="" style={navButtonStyle}>
            Blog
          </button>
          <button className="" style={navButtonStyle}>
            Jobs
          </button>
          <button className="" style={navButtonStyle}>
            Press
          </button>
          <button className="" style={navButtonStyle}>
            Accessibility
          </button>
          <button className="" style={navButtonStyle}>
            Partners
          </button>
        </nav>
        <div className="iconsDiv d-flex my-8 justify-content-evenly align-items-center">
          <button className="" style={iconsStyle}>
            <i className="bi bi-facebook fs-4"></i>
          </button>
          <button className="" style={iconsStyle}>
            <i className="bi bi-instagram fs-4"></i>
          </button>

          <button className="" style={iconsStyle}>
            <i className="bi bi-github fs-4"></i>
          </button>
          <button
            className=""
            style={{
              backgroundColor: "transparent",
              border: "none",
              margin: "8px 16px",
            }}
          >
            <i className="bi bi-youtube fs-4"></i>
          </button>
        </div>
        <div className="p-0" style={{ fontSize: "12px" }}>
          © 2024 Your Company, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
