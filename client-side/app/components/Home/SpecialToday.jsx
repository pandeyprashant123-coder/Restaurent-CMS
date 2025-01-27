import React from "react";
const image = "/assets/img/ss.png";

const SpecialToday = () => {
  return (
    <div className="">
      <div className="w-fit h-[40px] mb-40 mt-4 px-20 p-4 items-center justify-center ">
        <div className="overflow-hidden">
          <img
            src={image}
            alt=""
            className="transform transition-transform duration-300 hover:scale-125 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialToday;
