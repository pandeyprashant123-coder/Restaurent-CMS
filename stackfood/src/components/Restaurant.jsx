import React from 'react'
import CircularImageLayout from './CircularImageLayout';
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
const Restaurant = () => {
  return (
    <div>
        <div className='p-4 py-6 bg-red-50 dark:bg-[#3d2f25] dark:text-white text-black font-sans font-semibold text-[14px] text-center justify-center'>
            Restaurants
        </div>
        {/* main card div */}
        <div className='bg-slate-200 '>
          <div className='bg-slate-200 dark:bg-[#272727]'>
            <div>
              {/* image */}
              <div className='mx-28 flex flex-wrap'>
                <div className='flex flex-wrap'>
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
                    <div className='text-[15px] font-semibold flex-col ml-4 pr-12 dark:text-white'>
                      <h2>Hungry Puppets</h2>
                      <h2>⭐4.7<span className='text-[14px] text-slate-400'>(3)</span></h2>
                      <p><span className='text-[12px] text-slate-400'>Start From </span>$0</p>
                      <div><CircularImageLayout/></div>
                    </div>

                    <div className='absolute top-2 right-6'>💓</div>
                  </div>
                ))}
                </div>
              </div>
            </div>


          </div>

        </div>
    </div>
  )
}

export default Restaurant