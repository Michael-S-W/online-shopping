import { useState, useEffect } from "react";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 100px from top
  const toggleVisibility = () => {
    if (window.pageYOffset > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null; // Don't render button when not visible

  return (
    <button
      onClick={handleScrollTop}
      id="scrollToTop"
      style={{
        position: "fixed",
        bottom: "55px",
        right: "5px",
        padding: "0px",
        fontSize: "26px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        backgroundColor: "#dc3545",
        color: "#fff",
        zIndex: 1000,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        transition: "all 0.5s ease",
      }}
      aria-label="Go to top"
    >
      <i className="bi bi-arrow-up-circle"></i>
    </button>
  );
};

export default ScrollToTop;
