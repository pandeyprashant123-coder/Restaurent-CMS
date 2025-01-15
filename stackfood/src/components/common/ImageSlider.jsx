import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageSlider = () => {
  const images = [
    "https://www.shutterstock.com/image-photo/table-filled-dishes-food-set-260nw-2477073165.jpg",
    "https://www.shutterstock.com/image-photo/table-filled-dishes-food-set-260nw-2477073165.jpg",
    "https://th.bing.com/th?id=OIP.PeHh9K8zN-UZDIWvnNfFEQHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
    "https://th.bing.com/th?id=OIP.PeHh9K8zN-UZDIWvnNfFEQHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
    "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  ];

  const slidesPerGroup = 3; // Number of slides to move at a time
  const totalImages = images.length; // Total number of images
  const totalGroups = Math.ceil(totalImages / slidesPerGroup); // Total groups of slides
  const [currentGroup, setCurrentGroup] = useState(0);
  const swiperRef = useRef(null); // Ref to access Swiper instance

  const handleNext = () => {
    if (currentGroup < totalGroups - 1 && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (currentGroup > 0 && swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };


  // const handleDotClick = (groupIndex) => {
  //   if (swiperRef.current) {
  //     swiperRef.current.slideTo(groupIndex * slidesPerGroup);
  //     setCurrentGroup(groupIndex);
  //   }
  // };
  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index * slidesPerGroup); // Navigate to the group index
    }
  };
  return (
    <div className="flex-col bg-black items-center justify-center h-full">
      <div className="relative mx-32 py-6 overflow-hidden">
        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => (swiperRef.current = swiper)} // Attach Swiper instance to ref
          slidesPerView={3} // Show 3 images at a time
          slidesPerGroup={3} // Move 3 images at a time
          spaceBetween={20}
          grabCursor={true}
          speed={1500}
          onSlideChange={(swiper) =>
            setCurrentGroup(Math.floor(swiper.activeIndex / slidesPerGroup))
          }
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-[300px] h-[200px] rounded-sm overflow-hidden flex justify-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 rounded-sm hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Arrow */}
        {currentGroup > 0 && (
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg cursor-pointer z-50"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Right Arrow */}
        {currentGroup < totalGroups - 1 && (
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg cursor-pointer z-50"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        )}
      </div>
      
            {/* Pagination Section */}
            <div className="flex items-center justify-center mt-0 space-y-2">

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-4 mt-2 pb-2">
          {/* Pagination Dots with x/y for Active Group */}
          {Array.from({ length: totalGroups }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              {currentGroup === index ? (
                // Active Group Indicator with x/y
                <div className="text-white bg-orange-400 text-[13px] font-medium px-1 rounded-lg">
                  {`${Math.min((currentGroup + 1) * slidesPerGroup, totalImages)}/${totalImages}`}
                </div>
              ) : (
                // Inactive Dots
                <div
                  onClick={() => handleDotClick(index)} // Allow clicking to jump to the group
                  className="w-1.5 h-1 rounded-full bg-[#8b4a20] cursor-pointer hover:bg-orange-400 transition-transform duration-300"
                ></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ImageSlider;
