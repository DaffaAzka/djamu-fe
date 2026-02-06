import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CAROUSEL_IMAGES = [
    "/assets/jamu-assets1.jpeg",
    "/assets/jamu-assets2.jpg",
    "/assets/jamu-assets3.jpg",
    "/assets/jamu-assets4.jpg",
  ];

  const [CurrentSlide, setCurrentSlide] = useState(CAROUSEL_IMAGES[0]);

  const getNextIndex = () => {
    return (currentIndex + 1) % CAROUSEL_IMAGES.length;
  };
  const getPrevIndex = () => {
    return (currentIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
  };
  const goToNextSlide = () => {
    const nextIndex = getNextIndex();
    setCurrentIndex(nextIndex);
    setCurrentSlide(CAROUSEL_IMAGES[nextIndex]);
  };
  const goToPrevSlide = () => {
    const prevIndex = getPrevIndex();
    setCurrentIndex(prevIndex);
    setCurrentSlide(CAROUSEL_IMAGES[prevIndex]);
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setCurrentSlide(CAROUSEL_IMAGES[index]);
  };

  const slides = CAROUSEL_IMAGES.map((image, index) => (
    <div
      key={index}
      className={`${
        index === currentIndex ? "block" : "hidden"
      } w-full h-64 md:h-96 transition-transform duration-500`}
    >
      <img
        src={image}
        alt={`Slide ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  ));

  return (
    <section className="relative w-full max-w-7xl mx-auto mt-20 mb-10">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={CurrentSlide}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 md:h-96 object-cover transition-transform duration-500"
        />
        <button
          onClick={goToPrevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2 focus:outline-none"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full p-2 focus:outline-none"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
