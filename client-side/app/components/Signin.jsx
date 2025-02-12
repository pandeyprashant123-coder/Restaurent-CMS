import { useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

const SignIn = ({ setShowSignin, onClose }) => {
  const [formData, setFormData] = useState({
    password: "",
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
      const res = await axios.post(`login`, formData);
      toast(res.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setShowSignin(false);
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
            Login to Get Started!
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full px-6"
          >
            <div>
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

            <div>
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
            <div className="flex justify-center w-full">
              <button type="submit" className="btnOrange w-1/2 py-2 mt-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
