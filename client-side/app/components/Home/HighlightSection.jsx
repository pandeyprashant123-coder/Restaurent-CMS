"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HighlightSection = () => {
  const highlights = [
    {
      image:
        "https://img.freepik.com/free-photo/chicken-fajita-chicken-fillet-fried-with-bell-pepper-lavash-with-bread-slices-white-plate_114579-174.jpg?ga=GA1.1.1668910324.1734242616&semt=ais_tags_boosted",
      title: "Taste the Flavor! Food Festkdskcm dcdkc dkdls dkdslk cdkd",
      rating: 4.7,
      discount: "45% Off",
      description:
        "Indulge in culinary delights at our Food Fest Extravaganza!",
    },
    {
      image:
        "https://img.freepik.com/free-photo/chicken-skewers-with-slices-apples-chili_2829-19992.jpg?ga=GA1.1.1668910324.1734242616&semt=ais_tags_boosted",
      title: "Incredible Savings! Get 45% Off",
      rating: 4.7,
      discount: "UPTO 45% OFF",
      description: "Discover unbeatable deals with our 45% off sale!",
    },
    {
      image:
        "https://img.freepik.com/free-photo/sauteed-mushrooms-with-pumpkin-sweet-pepper_2829-10315.jpg?ga=GA1.1.1668910324.1734242616&semt=ais_tags_boosted",
      title: "Huge Savings Alert: 75% Off",
      rating: 0.0,
      discount: "75% Off",
      description: "Enjoy a massive 75% discount on all items!",
    },
    {
      image:
        "https://img.freepik.com/premium-photo/indian-hindu-veg-thali-food-platter-selective-focus_466689-35665.jpg?ga=GA1.1.1668910324.1734242616&semt=ais_tags_boosted",
      title: "Incredible Savings! Get 45% Off",
      rating: 4.7,
      discount: "UPTO 45% OFF",
      description: "Discover unbeatable deals with our 45% off sale!",
    },
    {
      image:
        "https://img.freepik.com/premium-photo/indian-hindu-veg-thali-food-platter-selective-focus_466689-35665.jpg?ga=GA1.1.1668910324.1734242616&semt=ais_tags_boosted",
      title: "Incredible Savings! Get 45% Off",
      rating: 4.7,
      discount: "UPTO 45% OFF",
      description: "Discover unbeatable deals with our 45% off sale!",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="mx-28 my-4 space-y-2 bg-[#eff3f8] dark:bg-slate-500 px-4 py-8">
      {/* Section Header */}
      <div className=" top-0 left-0">
        <h2 className="text-[16px] font-bold text-gray-800 dark:text-black">
          Highlights for you
        </h2>
        <p className="text-gray-500 text-[14px] dark:text-white">
          See our most popular restaurants and foods
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1500} // Transition duration in milliseconds
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // Update current index
        className="mySwiper"
      >
        {highlights.map((highlight, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-slate-800 outline outline-2 outline-slate-200 mt-4 h-full rounded-lg shadow-md transition-all duration-300">
              {/* Card Image with Hover Zoom */}
              <div className="overflow-hidden rounded-md h-full">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Card Content */}
              <div className=" relative mt-3 h-full">
                <div className="flex justify-between items-center">
                  {/* image halnu xa not happenning why? */}
                  <div className="mx-4">
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="bg-slate-400 h-[50px] w-[50px] rounded-full mr-4"
                    />
                  </div>

                  <div className="flex-col m-2">
                    <div className="flex relative">
                      <h3 className="w-3/4 text-lg font-bold text-gray-800 dark:text-white truncate max-w-xs">
                        {highlight.title}
                      </h3>
                      <span className="absolute right-1 ">💓</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 dark:text-white">
                      {highlight.description}
                    </p>
                  </div>
                  <span className="absolute -top-16 right-2 bg-orange-500 text-white text-lg px-2 py-1 mb-4 rounded-full outline outline-white outline-2">
                    ⭐{highlight.rating}
                    <span className="text-white text-lg ml-1">(3)</span>
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dynamic Image Indicator */}
      <div className="flex justify-center mt-4 text-black text-[10px] font-medium ">
        {`${currentIndex + 1}/${highlights.length}`}
      </div>
    </div>
  );
};

export default HighlightSection;
