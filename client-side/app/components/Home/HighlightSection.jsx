"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const HighlightSection = () => {
  const { data, error } = useSWR(
    `${process.env.API_BASE_URL}/advertisement`,
    fetcher
  );
  const highlights = data?.filter((item) => item.status === "Approved");

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="mx-28 my-6 space-y-2 bg-[#e7f1fe] dark:bg-slate-500 px-4 py-8">
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
        {highlights?.map((highlight, index) => (
          <SwiperSlide key={highlight._id}>
            <div className="bg-white dark:bg-slate-800 outline outline-2 outline-slate-200 mt-4 p-1 h-full rounded-lg shadow-md transition-all duration-300">
              {/* Card Image with Hover Zoom */}
              <div className="overflow-hidden relative  rounded-t-md h-full">
                <img
                  src={highlight.coverImage}
                  alt={highlight.title}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-2 font-semibold right-4 text-white bg-orange-500 px-1 py-[0.1rem] rounded-full border-2 border-white">
                  <span>⭐4.7 </span> <span>(3+)</span>
                </div>
              </div>

              {/* Card Content */}
              <div className=" relative m-3 h-full">
                <div className="flex gap-3 justify-between items-center">
                  {/* image halnu xa not happenning why? */}
                  <div className="">
                    <img
                      src={highlight.profileImage}
                      alt={highlight.title}
                      className="bg-slate-400 h-[60px] w-[60px] rounded-full mr-4"
                    />
                  </div>

                  <div className="flex-col">
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
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dynamic Image Indicator */}
      <div className="flex justify-center mt-4 text-black text-[10px] font-medium ">
        {`${currentIndex + 1}/${highlights?.length}`}
      </div>
    </div>
  );
};

export default HighlightSection;
