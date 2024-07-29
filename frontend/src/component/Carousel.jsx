import React, { useState, useEffect } from "react";

import headerPic from "../../src/Images/headerPic.jpg";

import headerPic4 from "../../src/Images/header4.jpeg";
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/88a387d43cef39e5.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/e4bf2a96a311355e.jpg?q=20",
    headerPic,
    headerPic4,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="carousel mt-4">
      <div className="carousel-inner w-full px-[80px]  relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide w-full ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ position: "relative" }} // Add relative positioning to the slide container
          >
            {index === currentSlide && (
              <div style={{ position: "relative" }}>
                {" "}
                {/* Add relative positioning to contain the button */}
                <button
                  className="carousel-control prev absolute top-[100px] left-0 z-10 h-[66px] w-[50px] bg-gray-100 text-2xl text-gray-600"
                  onClick={goToPrevSlide}
                >
                  &lt;
                </button>
                <button
                  className="carousel-control next absolute top-[100px] right-0 z-10 h-[66px] w-[50px] bg-gray-100 text-2xl text-gray-600"
                  onClick={goToNextSlide}
                >
                  &gt;
                </button>
                <img
                  className="w-full h-[300px]"
                  src={slide}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
