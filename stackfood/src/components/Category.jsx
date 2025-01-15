import React from 'react'
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";

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

const Category = () => {
  return (
    <div>
        <div className='p-4 py-6 bg-red-50 dark:bg-[#3d2f25] dark:text-white text-black font-sans font-semibold text-[14px] text-center justify-center'>
            Categories
        </div>
        <div className=' bg-slate-100 dark:bg-[#272727] '>
        <div className='mx-28 flex flex-wrap'>
        {imageData.map((item, index) => (
            <div
              key={index}
              className="h-[180px] w-[180px] flex-shrink-0 flex flex-col items-center justify-center p-8 mx-1.5 my-2 rounded-lg outline outline-2 outline-[#323232] bg-white dark:bg-[#141313] dark:hover:bg-[#272727] hover:bg-red-50 hover:cursor-pointer transition-colors duration-300"
            >
              {/* Dynamic Background Color */}
              <div className={`${item.bgColor} w-[55px] h-[55px] p-2 rounded-md overflow-hidden`}>
                <img
                  src={item.src}
                  alt={`Food ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              {/* Title */}
              <div className="text-black dark:text-white text-[12px] font-bold mt-2">
                <h3>{`Food ${index + 1}`}</h3>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>

  )
}

export default Category