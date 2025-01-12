import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import { Link } from "react-router-dom";

import heroImage from "../assets/hero.webp";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="">
        <div className="h-screen flex flex-col items-center justify-center gap-9 pt-10 text-center">
          <div className="text-5xl text-center font-bold">
            All-in-One POS <br />{" "}
            <span className="text-[#70b56a]">for Your Food & Beverage</span>{" "}
            Business.
          </div>
          <p className="text-gray-500 ">
            Effortless POS. Unparalleled Growth. RestroPRO POS empowers you with
            the tools you need to streamline operations, increase staff
            productivity, and gain valuable customer insights. Make data-driven
            decisions, optimize your menu, and watch your foodservice business
            flourish.
          </p>
          <div className="flex text-lg gap-5">
            <button
              className="btnGreen py-3 px-5"
              onClick={(e) => {
                e.preventDefault();
                (
                  document.getElementById("feature") as HTMLElement
                ).scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Get Started
            </button>
            <button
              className="btnGrey py-3 px-5"
              onClick={(e) => {
                e.preventDefault();
                (
                  document.getElementById("pricing") as HTMLElement
                ).scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              View Pricing
            </button>
          </div>
        </div>
        <img src={heroImage} alt="bgm" />
      </div>
      <Feature />
      <Pricing />
      <div
        className="w-full flex justify-between p-16 bg-[#243922] rounded-xl my-28 shadow-lg shadow-green-800/50"
        id="contact"
      >
        <h1 className="text-white text-3xl font-bold">Have any queries?</h1>
        <Link to="/contact">
          <button className="btnGrey bg-white px-5 py-3 text-lg text-[#243922]">
            Contact us
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
