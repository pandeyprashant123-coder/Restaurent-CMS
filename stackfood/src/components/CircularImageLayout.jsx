import React from 'react';

const CircularImageLayout = () => {
  return (
    <div className="flex items-center justify-between -px-10 mr-10">
      {/* Circular Image 1 */}
      <div className="w-6 h-6 -mx-2 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="1" className="w-full h-full object-cover" />
      </div>
      
      {/* Circular Image 2 */}
      <div className="w-6 h-6 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="2" className="w-full h-full object-cover" />
      </div>

      {/* Circular Image 3 */}
      <div className="w-6 h-6 -mx-2 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt=" 3" className="w-full h-full object-cover" />
      </div>

      {/* Circular Image 4 */}
      <div className="w-6 h-6 z-0 rounded-full overflow-hidden border-2 border-gray-300 dark:border-black">
        <img src="https://th.bing.com/th?id=OIP.maQpFJiRuDMauaTZ3N7KiQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt=" 4" className="w-full h-full object-cover" />
      </div>

      {/* Text Div */}
      <div className="flex-1 p-1.5 -mx-2 rounded-full bg-[#fff1e7] dark:bg-[#2c1d13] dark:border-black">
        <p className="text-orange-500">+12 items</p>
      </div>
    </div>
  );
};

export default CircularImageLayout;
