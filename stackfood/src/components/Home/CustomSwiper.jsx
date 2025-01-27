import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const cards = [
  {
    id: 1,
    title: "Chiffon Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$130",
    originalPrice: "$160",
    discount: "$30 OFF",
    restaurant: "Redcliff Cafe",
  },
  {
    id: 2,
    title: "Chocolate Cupcake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$18",
    originalPrice: "",
    discount: "",
    restaurant: "Redcliff Cafe",
  },
  {
    id: 3,
    title: "Spicy Crab",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$344",
    originalPrice: "$430",
    discount: "20% OFF",
    restaurant: "Vintage Kitchen",
  },
  {
    id: 4,
    title: "Molten Chocolate Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$21.56",
    originalPrice: "$22",
    discount: "2% OFF",
    restaurant: "Redcliff Cafe",
  },
  {
    id: 5,
    title: "Creamy Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$130",
    originalPrice: "",
    discount: "10% OFF",
    restaurant: "Mini Kebab",
  },
  {
    id: 5,
    title: "Creamy Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$130",
    originalPrice: "",
    discount: "10% OFF",
    restaurant: "Mini Kebab",
  },
  {
    id: 5,
    title: "Creamy Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$130",
    originalPrice: "",
    discount: "10% OFF",
    restaurant: "Mini Kebab",
  },
  {
    id: 5,
    title: "Creamy Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$130",
    originalPrice: "",
    discount: "10% OFF",
    restaurant: "Mini Kebab",
  },
  {
    id: 5,
    title: "Creamy Cake",
    image: "https://th.bing.com/th/id/OIP.ZIykMLOckbvSf46At0t_JgHaGN?pid=ImgDet&w=200&h=167&c=7&dpr=1.5",
    price: "$130",
    originalPrice: "",
    discount: "10% OFF",
    restaurant: "Mini Kebab",
  },
];

const CustomSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      effect="coverflow"
      centeredSlides={false}
      initialSlide={3}
      slidesPerView={5}
      autoplay={{ delay: 2000 }}
      spaceBetween={20}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      style={{ width: "90%", height: "250px" }}
    >
      {cards.map((card) => (
        <SwiperSlide key={card.id} style={{ width: "200px", margin: "10px 20px", height: "100%" }}>
          <div className="swiper-card" style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#fff" }}>
            {card.discount && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "#FF5722",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  top: "10px",
                  left: "10px",
                }}
              >
                {card.discount}
              </div>
            )}
            <img
              src={card.image}
              alt={card.title}
              style={{ width: "100%", height: "140px", borderRadius: "10px", objectFit: "cover" }}
            />
            <h3 style={{ margin: "10px 0", fontSize: "1.2rem" }}>{card.title}</h3>
            <p style={{ color: "#757575" }}>{card.restaurant}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {card.originalPrice && (
                <span style={{ textDecoration: "line-through", color: "#999" }}>{card.originalPrice}</span>
              )}
              <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{card.price}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
