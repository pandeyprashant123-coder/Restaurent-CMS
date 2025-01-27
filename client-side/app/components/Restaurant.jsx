import React from "react";
const image1 = "/assets/img/image1.jpg";
const image2 = "/assets/img/image2.jpg";

const imageData = [
  { src: image1, bgColor: "bg-red-500" },
  { src: image2, bgColor: "bg-blue-500" },
  { src: image1, bgColor: "bg-green-500" },
  { src: image2, bgColor: "bg-yellow-500" },
  { src: image1, bgColor: "bg-purple-500" },
  { src: image2, bgColor: "bg-pink-500" },
  { src: image1, bgColor: "bg-gray-500" },
  { src: image2, bgColor: "bg-orange-500" },
  { src: image1, bgColor: "bg-red-500" },
  { src: image2, bgColor: "bg-blue-500" },
  { src: image1, bgColor: "bg-green-500" },
  { src: image2, bgColor: "bg-yellow-500" },
  { src: image1, bgColor: "bg-purple-500" },
  { src: image2, bgColor: "bg-pink-500" },
  { src: image1, bgColor: "bg-gray-500" },
  { src: image2, bgColor: "bg-orange-500" },
];
const Restaurant = () => {
  return (
    <div>
      <div className="p-4 py-6 bg-red-50 dark:bg-[#3d2f25] dark:text-white text-black font-sans font-semibold text-[14px] text-center justify-center">
        Restaurants
      </div>
      {/* main card div */}
      <div className="bg-slate-200 ">
        <div className="bg-slate-200 dark:bg-[#272727]">
          <div>
            {/* image */}
            <div className="mx-28 flex flex-wrap">
              <div className="flex flex-wrap">
                {imageData.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-fit w-fit flex-shrink-0 flex items-center justify-center p-3 mx-2 my-2 rounded-lg bg-white dark:bg-[#141313] hover:bg-red-50 hover:cursor-pointer transition-colors duration-300"
                  >
                    <div className="w-[100px] h-[100px] m-2 rounded-md overflow-hidden">
                      <img
                        src={item.src}
                        alt={`Food ${index + 1}`}
                        className="w-[200px] h-[200px] object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="text-[15px] font-semibold flex-col ml-4 pr-12 dark:text-white">
                      <h2>Hungry Puppets</h2>
                      <h2>
                        ⭐4.7
                        <span className="text-[14px] text-slate-400">(3)</span>
                      </h2>
                      <p>
                        <span className="text-[12px] text-slate-400">
                          Start From{" "}
                        </span>
                        $0
                      </p>
                      <div>
                        <CircularImageLayout />
                      </div>
                    </div>

                    <div className="absolute top-2 right-6">💓</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;

const CircularImageLayout = () => {
  return (
    <div className="flex items-center justify-between -px-10 mr-10">
      {/* Circular Image 1 */}
      <div className="w-6 h-6 -mx-2 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img
          src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt="1"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Circular Image 2 */}
      <div className="w-6 h-6 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img
          src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt="2"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Circular Image 3 */}
      <div className="w-6 h-6 -mx-2 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img
          src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt=" 3"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Circular Image 4 */}
      <div className="w-6 h-6 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img
          src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt=" 4"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Div */}
      <div className="flex-1 p-1.5 -mx-2 rounded-full bg-[#fff1e7] dark:bg-[#2c1d13] dark:border-black">
        <p className="text-orange-500">+12 items</p>
      </div>
    </div>
  );
};
