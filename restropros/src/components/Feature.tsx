import React from "react";

import { TbLayout } from "react-icons/tb";
import { TbDeviceIpadHorizontal } from "react-icons/tb";
import { LuChefHat } from "react-icons/lu";

const Feature = () => {
  return (
    <div
      className="h-screen text-center flex flex-col justify-evenly"
      id="feature"
    >
      <h1 className="text-4xl font-bold">Features</h1>
      <div className="flex justify-between gap-9 ">
        <div className="flex flex-col gap-3 justify-center items-center rounded-lg p-7 w-1/3 border">
          <TbLayout className="text-[#70b56a] text-5xl bg-green-100 p-3 rounded-full" />
          <h1 className="font-bold text-xl">Minimal UI</h1>
          <p>
            Effortless Interface, RestroPRO POS boasts a clean and intuitive
            design. No cluttered screens, just the essentials you need to manage
            your business with ease.
          </p>
        </div>
        <div className="flex flex-col  gap-3 justify-center items-center rounded-lg p-9 w-1/3 border">
          <TbDeviceIpadHorizontal className="text-[#70b56a] text-5xl bg-green-100 p-3 rounded-full" />
          <h1 className="font-bold text-xl">POS</h1>
          <p>
            RestroPRO POS simplifies sales. Manage orders, categories & variants
            with ease. Send to kitchen instantly & accept payments securely.
            All-in-one for a smooth flow.
          </p>
        </div>
        <div className="flex flex-col gap-3  justify-center items-center rounded-lg p-5 w-1/3 border">
          <LuChefHat className="text-[#70b56a] text-5xl bg-green-100 p-3 rounded-full" />
          <h1 className="font-bold text-xl">Live Updates</h1>
          <p>
            Kitchen in Sync, Never miss a beat. Live order updates send details
            directly to your kitchen, ensuring accuracy and minimizing prep time
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
