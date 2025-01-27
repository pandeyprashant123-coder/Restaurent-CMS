import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import Trendspopup from "../popup/Trendspopup";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaHeart} from "react-icons/fa";

const trendsData = [
  {
    id: 1,
    title: "The Capital Grill",
    distance: "747.48 km",
    deliveryTime: "30-40 min",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    id: 2,
    title: "Redcliff Cafe",
    distance: "678.23 km",
    deliveryTime: "30-40 min",
    rating: 4.7,
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    id: 3,
    title: "The Great Impasta",
    distance: "2212.70 km",
    deliveryTime: "30-40 min",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    id: 4,
    title: "Tasty Takeaways",
    distance: "811.94 km",
    deliveryTime: "30-40 min",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    id: 5,
    title: "Cheesy Restaurant",
    distance: "Free",
    deliveryTime: "30-40 min",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    id: 5,
    title: "Cheesy Restaurant",
    distance: "Free",
    deliveryTime: "30-40 min",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    id: 5,
    title: "Cheesy Restaurant",
    distance: "Free",
    deliveryTime: "30-40 min",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
];

const PopularRestaurent = () => {
    const [popup, setPopup] = useState("false");
  return (
    <div className="mx-20 py-6 px-8 bg-gray-100 dark:bg-background">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-lg font-bold text-black dark:text-white">Popular Restaurants</h2>
        <Link to="/restaurents">
          <div className="border-2 border-orange-500 flex items-center p-2 rounded-full hover:cursor-pointer">
            <GrLinkNext style={{ color: "orange", stroke: "orange" }} />
          </div>
        </Link>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={4.7}
        centeredSlides={false}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="my-10"
      >
        {popup===true?<Trendspopup popup={popup} setPopup={setPopup}/>:""} 
        {trendsData.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden cursor-pointer">
              <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-20 object-cover transform transition-transform duration-300 hover:scale-125 "
              />
              <FaHeart className="absolute top-2 right-2 text-gray-400 cursor-pointer" />
              <p className="absolute bottom-0 px-2 right-4 text-sm font-semibold text-orange-500 bg-white rounded-lg z-10">{item.distance}</p>
              </div>

              <div className="relative mt-3 h-full">
              <div className="flex p-2 transform transition-transform duration-300 hover:bg-orange-50">
                    <img src={item.image} alt={item.title}
                    className="absolute bottom-14 left-4 bg-slate-400 h-[50px] w-[50px] rounded-sm outline outline-2 outline-slate-100 mr-4 object-cover transform transition-transform duration-300 hover:scale-125"/>
                <div className="ml-20 mt-0 h-14 flex-col m-2 w-50% items-end ">
                    <h3 className="font-bold mb-2 text-gray-800 text-sm items-center justify-center">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.deliveryTime}</p>
                </div>
              </div>
              </div>



            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularRestaurent;






