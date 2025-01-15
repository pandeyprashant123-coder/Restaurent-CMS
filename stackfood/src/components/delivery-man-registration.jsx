import React from 'react';
import Footer from './common/Footer';

const DeliveryManRegistration = () => {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <div className="bg-white mx-10 px-10 py-10 h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Left Section - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 lg:col-span-2">
            <input
            type="text"
            placeholder="First name *"
            className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
            type="text"
            placeholder="Last name *"
            className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <div className="flex gap-2">
            <select className="p-3 border border-gray-300 rounded-lg">
                <option value="+977">+977</option>
            </select>
            <input
                type="text"
                placeholder="Phone *"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            </div>
            <input
            type="email"
            placeholder="E-mail *"
            className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
            type="password"
            placeholder="Password *"
            className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
            type="password"
            placeholder="Confirm Password *"
            className="p-3 border border-gray-300 rounded-lg w-full"
            />
        </div>

        {/* Right Section - Upload Image */}
            <div className="mt-4 md:mt-0">
                <label className="block mb-2 font-semibold">Identity Image</label>
                <div className="border-dashed border-2 border-orange-400 rounded-lg p-4 flex items-center justify-center h-full">
                <p className="text-gray-400 text-center">Upload Profile Picture (jpg, png, gif - max 2MB)</p>
                </div>
            </div>
        </div>
        <Footer className="mt-20"/>
    </div>


    // <div>
    // <div className="bg-gray-50 min-h-screen py-8 px-4">
    //   <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
    //     <div className="px-8 py-6">
    //       <h1 className="text-xl font-semibold text-center mb-4">Delivery Man Registration</h1>
    //       <p className="text-gray-600 text-center mb-6">
    //         Complete registration process to serve as delivery man on this platform
    //       </p>

    //       {/* Delivery Man Information Section */}
    //       <div className="mb-6">
    //         <h2 className="font-semibold text-lg mb-4">Delivery Man Information</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //           <input
    //             type="text"
    //             placeholder="First name *"
    //             className="p-3 border border-gray-300 rounded-lg w-full"
    //           />
    //           <input
    //             type="text"
    //             placeholder="Last name *"
    //             className="p-3 border border-gray-300 rounded-lg w-full"
    //           />
    //           <div className="flex gap-2">
    //             <select className="p-3 border border-gray-300 rounded-lg">
    //               <option value="+977">+977</option>
    //             </select>
    //             <input
    //               type="text"
    //               placeholder="Phone *"
    //               className="flex-1 p-3 border border-gray-300 rounded-lg"
    //             />
    //           </div>
    //           <input
    //             type="email"
    //             placeholder="E-mail *"
    //             className="p-3 border border-gray-300 rounded-lg w-full"
    //           />
    //           <input
    //             type="password"
    //             placeholder="Password *"
    //             className="p-3 border border-gray-300 rounded-lg w-full"
    //           />
    //           <input
    //             type="password"
    //             placeholder="Confirm Password *"
    //             className="p-3 border border-gray-300 rounded-lg w-full"
    //           />
    //         </div>
    //         <div className="mt-4">
    //           <label className="block mb-2">Identity Image</label>
    //           <div className="border-dashed border-2 border-orange-400 rounded-lg p-4 flex items-center justify-center">
    //             <p className="text-gray-400">Upload Profile Picture (jpg, png, gif - max 2MB)</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Required Info Section */}
    //       <div className="mb-6">
    //         <h2 className="font-semibold text-lg mb-4">Required Info</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //           <select className="p-3 border border-gray-300 rounded-lg w-full">
    //             <option value="">Deliveryman type</option>
    //             <option value="fulltime">Full-Time</option>
    //             <option value="parttime">Part-Time</option>
    //           </select>
    //           <select className="p-3 border border-gray-300 rounded-lg w-full">
    //             <option value="">Select zone</option>
    //             <option value="zone1">Zone 1</option>
    //             <option value="zone2">Zone 2</option>
    //           </select>
    //           <select className="p-3 border border-gray-300 rounded-lg w-full">
    //             <option value="">Select Vehicle Type</option>
    //             <option value="bike">Bike</option>
    //             <option value="car">Car</option>
    //           </select>
    //           <select className="p-3 border border-gray-300 rounded-lg w-full">
    //             <option value="">Select identity type</option>
    //             <option value="passport">Passport</option>
    //             <option value="license">License</option>
    //           </select>
    //           <input
    //             type="text"
    //             placeholder="Identity Number *"
    //             className="p-3 border border-gray-300 rounded-lg w-full"
    //           />
    //         </div>
    //         <div className="mt-4">
    //           <label className="block mb-2">Upload Identity Image</label>
    //           <div className="border-dashed border-2 border-orange-400 rounded-lg p-4 flex items-center justify-center">
    //             <p className="text-gray-400">Upload Identity Image (jpg, png, gif - max 2MB)</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Additional Information Section */}
    //       <div className="mb-6">
    //         <h2 className="font-semibold text-lg mb-4">Additional Information</h2>
    //         <input
    //           type="number"
    //           placeholder="Enter Age *"
    //           className="p-3 border border-gray-300 rounded-lg w-full mb-4"
    //         />
    //         <div>
    //           <label className="block mb-2">Driving License</label>
    //           <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center">
    //             <p className="text-gray-400">Select a file (jpg, png, pdf - max 2MB)</p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Terms and Submit */}
    //       <div className="flex items-center mb-6">
    //         <input type="checkbox" id="terms" className="mr-2" />
    //         <label htmlFor="terms" className="text-gray-600">
    //           I agree with all the <span className="text-orange-500">Terms & Conditions</span>
    //         </label>
    //       </div>
    //       <div className="flex justify-end gap-4">
    //         <button className="px-6 py-2 border border-gray-300 rounded-lg">Reset</button>
    //         <button className="px-6 py-2 bg-orange-500 text-white rounded-lg">Submit</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <Footer/>
    // </div>
  );
};

export default DeliveryManRegistration;
