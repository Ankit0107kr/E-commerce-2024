// src/components/Carousel.js

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../../styles/Carousel.css';
import image1 from '../../images/c1.jpg';
import image2 from '../../images/c2.png';
import image3 from '../../images/c3.jpg';
import image4 from '../../images/c4.jpg';

const images = [image1, image2, image3, image4];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrevClick}>
        <FaArrowLeft />
      </button>
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image fade"
      />
      <button className="carousel-button next" onClick={handleNextClick}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
