import React from "react";

// Cuisine data array
const cuisines = [
  {
    name: "Bengali",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Chinese",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Japanese",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Italian",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Indian",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Fast Food",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Spanish",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    name: "Sea Food",
    image:
      "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
];

// Cuisines Component
const Cuisines = () => {
  return (
    <div className="dark:bg-[#272727]">
      {/* Title */}
      <div className="p-4 py-6 bg-red-50 dark:bg-[#3d2f25] dark:text-white text-black font-sans font-semibold text-[14px] text-center justify-center">
        Cuisines
      </div>

      {/* Cuisine Grid */}
      <div className=" ml-28 items-center justify-center gap-8 py-2 pb-80 flex flex-wrap dark:bg-[#272727]">
        {cuisines.map((cuisine, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center rounded-lg dark:bg-[#272727] "
          >
            {/* Circular Image */}
            {/* <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg -z-10 items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 ">
        <img
          src={cuisine.image}
          alt={cuisine.name}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div> */}
            <div
              className={` w-[90px] h-[90px] rounded-full overflow-hidden dark:z-10`}
            >
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-full rounded-full object-cover transform transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            </div>

            {/* Bottom Label */}
            <div className="relative bg-white dark:bg-[#141313]  rounded-b-lg shadow-md -mt-4 w-fit cursor-pointer border-[1px] border-red-300 flex items-center justify-center">
              {/* Triangle */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[59px] border-r-[59px] border-b-[40px] border-l-transparent border-r-transparent border-b-orange-500 -mt-8 -z-20 dark:z-0"></div>

              {/* Text Container */}
              <div></div>
              <p className="text-black dark:text-white text-[12px] font-semibold z-10 w-[132px] px-2 py-3 -m-2 text-center">
                {cuisine.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuisines;
