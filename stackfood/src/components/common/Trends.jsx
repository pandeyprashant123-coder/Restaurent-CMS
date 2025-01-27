import React,{useState} from "react";
import Trendspopup from "../popup/Trendspopup";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaPlus } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

const trendsData = [
  {
    id: 1,
    title: "Pizza carnival",
    price: 540,
    oldPrice: 600,
    discount: "10% OFF",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2", // Replace with actual image URL
    restaurant: "Cheesy Restaurant",
    type: "veg"
  },
  {
    id: 2,
    title: "Cheese cake",
    price: 140,
    oldPrice: 200,
    discount: "10% OFF",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Mini Kebab",
    type: "non-veg"
  },
  {
    id: 3,
    title: "Beef Cheese Burger",
    price: 540,
    oldPrice: 600,
    discount: "10% OFF",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Cheese Burger",
    type: "non-veg"
  },
  {
    id: 4,
    title: "Cappuccino Coffee",
    price: 40,
    oldPrice: 60,
    discount: "$10 OFF",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Hungry Puppets",
    type: "veg"
  },
  {
    id: 5,
    title: "Cheese Burger",
    price: 120,
    oldPrice: 150,
    discount: "20% OFF",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Hungry Puppets",
    type: "non-veg"
  },
  {
    id: 6,
    title: "Spicy Crab",
    price: 290,
    oldPrice: 400,
    discount: "$110 OFF",
    image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    restaurant: "Hungry Puppets",
    type: "non-veg"
  },
];

const TodaysTrends = () => {
    const [popup, setPopup] = useState("false");
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = trendsData.length;
    const calculateProgress = () => ((currentIndex + 1) / totalSlides) * 100;
  return (
    <div className="py-2 pl-4 bg-[#f6e9e1] dark:bg-trendsdark mx-28">
      <h2 className="text-[18px] font-bold text-orange-500 mb-1">Today's Trends</h2>
      <p className="text-[14px] text-[#b68757] mb-6">Here's what you might like to taste</p>

      <Swiper
        spaceBetween={20}
        slidesPerView={5.5}
        centeredSlides={false}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4},
          1024: { slidesPerView: 5 },
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // Update current index
        className="mb-10"
      >
        {popup===true?<Trendspopup popup={popup} setPopup={setPopup}/>:""} 
        {trendsData.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            
            <div className="relative w-44 h-64 bg-white dark:bg-black max-w-xs overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:bg-red-50"  onClick={()=>setPopup(prevPopup=>!popup)}>
              <span className="absolute top-2 left-0 bg-orange-500 text-white text-xs font-bold py-1 px-2 rounded-full z-10">
                {item.discount}
              </span>
              <div className=" relative overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-36 object-cover transform transition-transform duration-300 hover:scale-125 z-0" />
              <FaPlus className="absolute bottom-2 right-4 text-red-400 bg-white rounded-full text-2xl p-1"/>
              </div>

              <div className="p-4">
                <p className="text-sm font-normal text-gray-400 mb-2">{item.restaurant}</p>
               <div className="flex relative items-center space-x-2">
               <h3 className="w-3/4 text-base font-semibold text-gray-800 dark:text-white truncate max-w-xs">{item.title}</h3>
               <FaCircle
                  className={`text-[10px] items-end ${
                    item.type === "veg" ? "text-green-500 outline outline-green outline-2 p-0.5" : "text-red-500 outline outline-red outline-2 p-0.5"
                  }`}
                />
               </div>
               
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-gray-400">${item.oldPrice}</span>
                  <span className="text-lg font-semibold dark:text-white">${item.price}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative w-[160px] h-1 bg-gray-300 rounded-full">
      <div
          className="absolute top-0 left-0 h-1 bg-orange-500 rounded-full"
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>
    </div>
  );
};

export default TodaysTrends;
