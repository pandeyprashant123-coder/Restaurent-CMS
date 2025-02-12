"use client";
import React, { useState } from "react";
import "./Home.css";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaAngleDown } from "react-icons/fa";

const Home = () => {
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedTime, setSelectedTime] = useState("Overall");

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const pieData = {
    labels: ["Customers", "Restaurants", "Delivery Men"],
    datasets: [
      {
        label: "User Statistics",
        data: [75, 15, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Admin Commission",
        data: [220, 300, 150, 400, 320, 280, 340, 410, 360, 300, 200, 220],
        backgroundColor: "#A294F9",
      },
      {
        label: "Total Sell",
        data: [298, 400, 350, 500, 420, 380, 450, 490, 430, 390, 290, 298],
        backgroundColor: "#5DB996",
      },
      {
        label: "Subscription",
        data: [
          2344, 2400, 2200, 2500, 2400, 2350, 2450, 2500, 2480, 2420, 2360,
          2344,
        ],
        backgroundColor: "orange",
      },
    ],
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable default legend (use custom one)
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "$(USD)",
        },
        min: 0,
        max: 2400,
        ticks: {
          stepSize: 600, // Set interval size
        },
      },
    },
  };

  return (
    <div className="home-container">
      <div className="home-sub-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-section-head">Welcome, Admin.</h2>
          <p>Hello here you can manage your orders by zone.</p>
        </div>
        {/* Zone Dropdown Section */}
        <div className="zone-head-section">
          <div className="zone-left">
            <select value={selectedZone} onChange={handleZoneChange}>
              <option value="All Zones">All Zones</option>
              <option value="All over the world">All over the world</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Statistics Section */}
      <div className="statistics-section">
        <div className="statistics-head">
          <div className="statistics-left">
            <h2>
              Order statistics:
              <span className="selected-zone"> {selectedZone}</span>
            </h2>
          </div>
          <div className="statistics-right">
            <select value={selectedTime} onChange={handleTimeChange}>
              <option value="Overall">Overall</option>
              <option value="This year">This year</option>
              <option value="This month">This month</option>
              <option value="This week">This week</option>
              <option value="Today">Today</option>
            </select>
          </div>
        </div>
        {/* Card Section */}

        <div className="card-container">
          <div className="card card-1">
            <img
              className="type-1-image"
              src="/assets/img/1.png"
              alt="burger"
            />
            <h3>45</h3>
            <p>Delivered Orders</p>
          </div>
          <div className="card card-2">
            <img
              className="type-1-image"
              src="/assets/img/2.png"
              alt="burger"
            />
            <h3>120</h3>
            <p>Pending Orders</p>
          </div>
          <div className="card card-3">
            <img
              className="type-1-image"
              src="/assets/img/3.png"
              alt="burger"
            />
            <h3>78</h3>
            <p>Refunded Orders</p>
          </div>
          <div className="card card-4">
            <img
              className="type-1-image"
              src="/assets/img/4.png"
              alt="burger"
            />
            <h3>200</h3>
            <p>In-Progress Orders</p>
          </div>
          <div className="card card-5">
            <div className="card-content">
              <img
                className="type-2-image
                "
                src="/assets/img/5.png"
                alt="burger"
              />
              <p>Returned Orders</p>
              <h3>150</h3>
            </div>
          </div>
          <div className="card card-6">
            <div className="card-content">
              <img
                className="type-2-image"
                src="/assets/img/6.png"
                alt="burger"
              />
              <p>Cancelled Orders</p>
              <h3>34</h3>
            </div>
          </div>
          <div className="card card-7">
            <div className="card-content">
              <img
                className="type-2-image"
                src="/assets/img/7.png"
                alt="burger"
              />
              <p>Completed Orders</p>
              <h3>99</h3>
            </div>
          </div>
          <div className="card card-8">
            <div className="card-content">
              <img
                className="type-2-image"
                src="/assets/img/8.png"
                alt="burger"
              />
              <p>Orders Shipped</p>
              <h3>60</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bar-diagram">
        <div className="bar-diagram-content">
          <p className="admin-dot">Admin commission:$ 182.00</p>
          <p className="sell-dot">Total sell:$2,399.99</p>
          <p className="subs-dot">Subscription:$ 2,398.00</p>
        </div>
        <div className="zone-section-container">
          <div className="zone-section">{selectedZone}</div>
        </div>
        <Bar id="bar-diagram-image" data={barData} options={barOptions} />
        <div className="bar-diagram-down-content">
          <p className="admin-down-dot">Admin commission</p>
          <p className="sell-down-dot">Total sell</p>
          <p className="subs-down-dot">Subscription</p>
        </div>
      </div>

      <div className="user-statistics-section">
        {/* Left Subsection: User Statistics */}
        <div className="statistics-left-section">
          <div className="section-header">
            <div className="statistics-sub-header">
              <h2>
                <img src="/assets/img/statistics.png" alt="User" /> User
                Statistics
              </h2>
            </div>
            <div className="statistics-zone-section">{selectedZone}</div>
          </div>
          <div className="statistics-line"></div>
          <div className="time-dropdown">
            <select value={selectedTime} onChange={handleTimeChange}>
              <option value="Overall">
                Overall <FaAngleDown />
              </option>
              <option value="This Year">This Year</option>
              <option value="This Month">This Month</option>
              <option value="This Week">This Week</option>
              <option value="Today">Today</option>
            </select>
          </div>
          <div className="piechart-container">
            <Pie data={pieData} />
          </div>
          <div className="pie-diagram-content">
            <p className="customer-dot">Customer</p>
            <p className="restaurant-dot">Restaurant</p>
            <p className="delivery-dot">Delivery man</p>
          </div>
        </div>
        <div className="popular-restaurants-section">
          <div className="popular-header">
            <div className="flex flex-row items-center gap-1">
              <img
                src="/assets/img/most-popular.png"
                alt="Popular-Restaurant"
              />{" "}
              <h2>
                Most Popular Restaurants <span>!</span>
              </h2>
            </div>
            <div className="popular-restaurant-zone">{selectedZone}</div>
          </div>
          <div className="popular-line"></div>
          <div className="restaurant-cards">
            {[
              {
                name: "Cafe Monarch",
                likes: 7,
                image: "/assets/img/restaurant1.png",
              },
              {
                name: "Hungry Puppets",
                likes: 6,
                image: "/assets/img/restaurant2.png",
              },
              {
                name: "Cheese Burger",
                likes: 5,
                image: "/assets/img/restaurant3.png",
              },
              {
                name: "Redcliff Cafe",
                likes: 3,
                image: "/assets/img/restaurant4.png",
              },
              {
                name: "Vintage Kitchen",
                likes: 2,
                image: "/assets/img/restaurant5.png",
              },
              {
                name: "The Capital Grill",
                likes: 2,
                image: "/assets/img/restaurant6.png",
              },
              {
                name: "Mini Kebab",
                likes: 2,
                image: "/assets/img/restaurant7.png",
              },
              {
                name: "Pizza restaurant",
                likes: 2,
                image: "/assets/img/restaurant8.png",
              },
              {
                name: "Cheesy Restaurant",
                likes: 1,
                image: "/assets/img/restaurant9.png",
              },
              {
                name: "Tasty Takeaways",
                likes: 1,
                image: "/assets/img/restaurant10.png",
              },
              {
                name: "The Great Impasta",
                likes: 1,
                image: "/assets/img/restaurant11.png",
              },
              {
                name: "Italian Fast Food",
                likes: 1,
                image: "/assets/img/restaurant12.png",
              },
            ].map((restaurant, index) => (
              <div key={index} className="restaurant-card">
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="restaurant-details">
                  <h3>{restaurant.name}</h3>
                  <p>
                    <i className="icon-heart"></i> {restaurant.likes} ❤️
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="delivery-restaurant-section">
        {/* Left Subsection */}
        <div className="top-deliveryman">
          <div className="top-header">
            <h2>
              <img src="/assets/img/top-deliveryman.png" alt="Deliveryman" />{" "}
              Top Deliverymen
            </h2>
            <div className="deliveryman-zone">{selectedZone}</div>
          </div>
          <div className="popular-line"></div>
          <div className="deliveryman-list">
            <div className="delivery-card">
              <img src="/assets/img/man1.png" alt="Deliveryman" />
              <h3>Jane</h3>
              <p>
                <span>4</span> Orders
              </p>
            </div>
            <div className="delivery-card">
              <img src="/assets/img/man2.png" alt="Deliveryman" />
              <h3>Esther</h3>
              <p>
                <span>3</span> Orders
              </p>
            </div>
            <div className="delivery-card">
              <img src="/assets/img/man3.png" alt="Deliveryman" />
              <h3>Kathryn</h3>
              <p>
                <span>3</span> Orders
              </p>
            </div>
            <div className="delivery-card">
              <img src="/assets/img/man4.png" alt="Deliveryman" />
              <h3>Robert</h3>
              <p>
                <span>2</span> Orders
              </p>
            </div>
            <div className="delivery-card">
              <img src="/assets/img/man5.png" alt="Deliveryman" />
              <h3>Jerome</h3>
              <p>
                <span>2</span> Orders
              </p>
            </div>
            <div className="delivery-card">
              <img src="/assets/img/man6.png" alt="Deliveryman" />
              <h3>Jhon</h3>
              <p>
                <span>2</span> Orders
              </p>
            </div>
          </div>
        </div>

        {/* Right Subsection */}
        <div className="top-restaurants">
          <div className="top-restaurant-header">
            <h2>
              <img src="/assets/img/top-resturant.png" alt="Restaurants" /> Top
              Restaurants
            </h2>
            <div className="top-restaurants-zone">{selectedZone}</div>
          </div>
          <div className="popular-line"></div>
          <div className="restaurant-list">
            <div className="top-restaurant-card">
              <img src="/assets/img/top-resturant-1.png" alt="Restaurant" />
              <div className="restaurant-info">
                <h3>Hungry Puppets</h3>
                <p>
                  <span>16</span> Orders
                </p>
              </div>
            </div>
            <div className="top-restaurant-card">
              <img src="/assets/img/top-resturant-2.png" alt="Restaurant" />
              <div className="restaurant-info">
                <h3>Cafe Monarch</h3>
                <p>
                  <span>5</span> Orders
                </p>
              </div>
            </div>
            <div className="top-restaurant-card">
              <img src="/assets/img/top-resturant-3.png" alt="Restaurant" />
              <div className="restaurant-info">
                <h3>The Capital Grill</h3>
                <p>
                  <span>2</span> Orders
                </p>
              </div>
            </div>
            <div className="top-restaurant-card">
              <img src="/assets/img/top-resturant-4.png" alt="Restaurant" />
              <div className="restaurant-info">
                <h3>Frying Nemo</h3>
                <p>
                  <span>2</span> Orders
                </p>
              </div>
            </div>
            <div className="top-restaurant-card">
              <img src="/assets/img/top-resturant-5.png" alt="Restaurant" />
              <div className="restaurant-info">
                <h3>Chesse Burger</h3>
                <p>
                  <span>2</span> Orders
                </p>
              </div>
            </div>
            <div className="top-restaurant-card">
              <img src="/assets/img/top-resturant-6.png" alt="Restaurant" />
              <div className="restaurant-info">
                <h3>Redcliff Cafe</h3>
                <p>
                  <span>1</span> Orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-food-section">
        {/* Left Subsection: Top Rated Foods */}
        <div className="food-subsection-top-rated">
          <div className="top-rated-header">
            <h2>
              <img
                className="toprated-image"
                src="/assets/img/most-rated.png"
                alt="Food"
              />{" "}
              Top Rated Foods
            </h2>
            <div className="home-food-section-zone">{selectedZone}</div>
          </div>
          <div className="popular-line"></div>
          <div className="food-cards">
            <div className="food-card">
              <img src="/assets/img/burger-combo.png" alt="Top Food" />
              <div className="food-details">
                <h3>Burger Combo</h3>
                <p>
                  <span className="rating-number">⭐5</span>
                  <span className="review-number">(1 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <img src="/assets/img/veggie-noodles.png" alt="Top Food" />
              <div className="food-details">
                <h3>Veggie noodles</h3>
                <p>
                  ⭐ <span className="rating-number">5</span>
                  <span className="review-number">(1 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <img src="/assets/img/veg-momo.png" alt="Top Food" />
              <div className="food-details">
                <h3> Veg Momons</h3>
                <p>
                  ⭐ <span className="rating-number">5</span>
                  <span className="review-number">(1 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <img src="/assets/img/pie.png" alt="Top Food" />
              <div className="food-details">
                <h3>Toll House Pie</h3>
                <p>
                  ⭐ <span className="rating-number">5</span>
                  <span className="review-number">(1 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <img src="/assets/img/brownie.png" alt="Top Food" />
              <div className="food-details">
                <h3>COOKIE DOUGH..</h3>
                <p>
                  ⭐ <span className="rating-number">5</span>
                  <span className="review-number">(1 reviews)</span>
                </p>
              </div>
            </div>
            <div className="food-card">
              <img src="/assets/img/meat-pizza.png" alt="Top Food" />
              <div className="food-details">
                <h3>Meat Pizza</h3>
                <p>
                  ⭐ <span className="rating-number">4.5</span>{" "}
                  <span className="review-number">(3 reviews)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Subsection: Top Selling Foods */}
        <div className="food-subsection-top-selling">
          <div className="top-selling-header">
            <h2>
              <img src="/assets/img/top-selling.png" alt="top-selling" /> Top
              Selling Foods
            </h2>
            <div className="top-selling-zone">{selectedZone}</div>
          </div>
          <div className="popular-line"></div>
          <div className="top-selling-cards">
            <div className="top-selling-card">
              <div className="image-container">
                <img src="/assets/img/medu-vada.png" alt="Top Food" />
                <button className="top-button">Sold: 800</button>
              </div>
              <h3>Pasta</h3>
            </div>
            <div className="top-selling-card">
              <div className="image-container">
                <img src="/assets/img/meat-pizza.png" alt="Top Food" />
                <button className="top-button">Sold: 800</button>
              </div>
              <h3>Ice Cream</h3>
            </div>
            <div className="top-selling-card">
              <div className="image-container">
                <img src="/assets/img/hazelnut.png" alt="Top Food" />
                <button className="top-button">Sold: 800</button>
              </div>
              <h3>Hazelnut semifreddo</h3>
            </div>
            <div className="top-selling-card">
              <div className="image-container">
                <img src="/assets/img/thai-noodles.png" alt="Top Food" />
                <button className="top-button">Sold: 800</button>
              </div>
              <h3>Thai Stir Fried Nood..</h3>
            </div>
            <div className="top-selling-card">
              <div className="image-container">
                <img src="/assets/img/vegan-chowmein.png" alt="Top Food" />
                <button className="top-button">Sold: 800</button>
              </div>
              <h3>Vegan ChowMein</h3>
            </div>
            <div className="top-selling-card">
              <div className="image-container">
                <img src="/assets/img/lemon-pastry.png" alt="Top Food" />
                <button className="top-button">Sold: 800</button>
              </div>
              <h3>Lemon Pastry</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
