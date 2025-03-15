import { useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import { GoPersonFill } from "react-icons/go";
const SignUp = ({ setShowSignup, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`register`, formData);
      toast(res.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setShowSignup(false);
  };
  return (
    <div className="w-screen h-screen fixed top-0 flex items-center justify-center bg-[#07070767] z-[1000]">
      <div className="w-2/5 h-4/5  shadow rounded-lg bg-white p-10">
        <h1
          className="float-end -translate-y-9 translate-x-4 text-xl font-semibold cursor-pointer"
          onClick={onClose}
        >
          x
        </h1>
        <div className="flex flex-col gap-5 items-center">
          <img src="/assets/img/foodidelivery.png" alt="" className="h-28" />
          <p className="text-gray-500 text-center font-semibold">
            Just one Step away! This will help make your profile more
            personalized
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex gap-2 w-full">
              <div className="flex w-1/2 items-center border rounded-md  bg-white">
                <GoPersonFill className=" m-0 p-3 h-10 w-10 text-gray-500 rounded-e-md cursor-pointer hover:bg-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="m-2 text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <div className="flex w-1/2 items-center border rounded-md  bg-white">
                <h1>+977</h1>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Phone No"
                  required
                  className="m-2 text-sm text-gray-700"
                />
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Date of birth
                </label>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  name="date_of_birth"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  name="confirm_password"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button type="submit" className="btnOrange w-1/2 py-2 mt-2">
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
