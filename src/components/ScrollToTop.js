import React, { useState, useEffect } from "react";
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
        bottom: "30px",
        right: "0px",
        padding: "8px",
        fontSize: "30px",
        fontWeight: "bold",
        cursor: "pointer",
        borderRadius: "5px 0 0 5px",
        border: "none",
        backgroundColor: "#0d6efd",
        color: "#fff",
        zIndex: 1000,
        width: "40px",
        transition: "all 0.5s ease",
      }}
      aria-label="Go to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
