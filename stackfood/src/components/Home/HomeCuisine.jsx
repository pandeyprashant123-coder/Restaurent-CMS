import React from 'react'
import { Link } from "react-router-dom";
// import cuisinebg from "../../assets/images/image1.jpg";
import { GrLinkNext } from "react-icons/gr";
const cuisines = [
    { name: "Bengali", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { name: "Chinese", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { name: "Japanese", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { name: "Italian", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { name: "Indian", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { name: "Fast Food", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
    { name: "Fast Food", image: "https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  ];

const HomeCuisine = () => {
  return (
    <div className='relative mx-28 '>
    <div 
        className="
        absolute w-full h-52 bg-cover bg-center bg-no-repeat z-0
        bg-[url('https://th.bing.com/th/id/OIP.TSqloHFczVmig6MJ7Qe82wHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7')]
        dark:bg-[url('https://th.bing.com/th/id/OIP.AlternateImageHere')]
      "
    >
    </div>
        <div className='flex-col space-y-4 mt-4 '>
            <h2 className='relative mt-4 p-4 text-black dark:text-white text-[18px] font-bold z-10'>Cuisines</h2>

        <div className="items-center justify-center gap-8 py-4 pb-8 my-4 flex flex-wrap dark:bg-[#272727]">
          {cuisines.map((cuisine, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center rounded-lg "
            >
              {/* Circular Image */}
              {/* <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg -z-10 items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 ">
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div> */}
              <div className={` w-[90px] h-[90px] rounded-full overflow-hidden z-20`}>
                        <img
                          src={cuisine.image}
                          alt={cuisine.name}
                          className="w-full h-full rounded-full object-cover transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        />
                </div>

              {/* Bottom Label */}
              <div className="relative bg-white dark:bg-[#141313]  rounded-b-lg shadow-md -mt-4 w-fit cursor-pointer border-[1px] border-red-300 flex items-center justify-center ">
                {/* Triangle */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[59px] border-r-[59px] border-b-[40px] border-l-transparent border-r-transparent border-b-orange-500 -mt-8 z-10"
                ></div>

                {/* Text Container */}
                <div className=" text-black dark:text-white text-[12px] font-semibold w-[132px] px-2 py-3 -m-2 text-center z-30">
                  <p >
                    {cuisine.name}
                  </p>
                </div>
               
              </div>  
            </div>  
          ))}
          <div className="relative flex flex-shrink-0 items-center justify-end p-4">
            <Link to="/categories">
            <div className="border-2 border-red-500 flex items-center p-2 rounded-full hover:cursor-pointer">
            <GrLinkNext
            style={{ color: "red", stroke: "red" }}
            />
            </div>
            </Link>
          </div>
        </div>
            </div>
        </div>
  )
}

export default HomeCuisine