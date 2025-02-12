"use client";
import React, { useState } from "react";
import Select from "react-select";

import { AiOutlineClose } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { HiRectangleGroup } from "react-icons/hi2";
import { RiUploadCloudFill } from "react-icons/ri";
import useSWR from "swr";
import axios from "../../../../axios";
import { toast, ToastContainer } from "react-toastify";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const AddRestaurant = () => {
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: "",
    ownerFirstName: "",
    ownerLastName: "",
    email: "",
    Address: "",
    Tax: 0,
    logo: null,
    coverPhoto: null,
    panCard: null,
    DeliveryTime: 0,
    zone: "",
    latitude: 0,
    longitude: 0,
    phone: "",
    categories: [],
    panNumber: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });

  const [panCard, setPanCard] = useState(null);
  // Image Handling
  const [imageProfile, setImageProfile] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: categories, error } = useSWR("categories", fetcher);

  const options = categories?.map((category) => ({
    value: category._id,
    label: category.cName,
  }));
  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageProfile(file);
      setRestaurantData((prev) => ({ ...prev, logo: file }));
      setPreviewProfile(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image for the profile.");
    }
  };
  const handleDocumentChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPanCard(file);
      setRestaurantData((prev) => ({ ...prev, panCard: file }));
    } else {
      alert("Please upload a valid image for the profile.");
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageCover(file);
      setRestaurantData((prev) => ({ ...prev, coverPhoto: file }));
      setPreviewCover(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image for the cover.");
    }
  };

  const handleRemoveProfileImage = () => {
    setImageProfile(null);
    setPreviewProfile(null);
  };

  const handleRemoveCoverImage = () => {
    setImageCover(null);
    setPreviewCover(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurantData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectChange = (selectedOptions) => {
    // Only store the IDs of the selected countries
    const selectedCountryIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setRestaurantData((prevState) => ({
      ...prevState,
      categories: selectedCountryIds, // Array of country IDs
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("restaurants", restaurantData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      toast("form Saved");
    } catch (error) {
      console.log(error);
      toast("unable to save form");
    } finally {
      setRestaurantData({
        restaurantName: "",
        ownerFirstName: "",
        ownerLastName: "",
        email: "",
        Address: "",
        Tax: 0,
        logo: null,
        coverPhoto: null,
        panCard: null,
        DeliveryTime: 0,
        zone: "",
        latitude: 0,
        longitude: 0,
        phone: "",
        categories: [],
        panNumber: "",
        date_of_birth: "",
        password: "",
        confirm_password: "",
      });

      setPanCard(null);
      setImageCover(null);
      setImageProfile(null);
      setPreviewCover(null);
      setPreviewProfile(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-5">
      <ToastContainer />
      <div className="flex flex-row items-center gap-2 mt-3 mb-3">
        <FaHome className="text-2xl" />
        <h2 className="text-lg font-semibold ">Add New Restaurant</h2>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-3 w-full mb-3 mt-3 mr-3">
          <div className="flex flex-col p-3 shadow-md rounded-md w-[50%]">
            <div className="flex flex-col mb-3">
              <label className="mb-2">Restaurant Name (Default)</label>
              <input
                type="text"
                placeholder="Ex:ABC Company"
                name="restaurantName"
                value={restaurantData.restaurantName}
                required
                onChange={handleChange}
                className="p-2 outline-none bg-transparent shadow-none border border-grey-200 rounded-md"
              />
            </div>
            <div className="flex flex-col ">
              <label className="mb-2">Restaurant Address (Default)</label>
              <textarea
                placeholder="Ex:House#94 Road#8 Abc City"
                name="Address"
                value={restaurantData.Address}
                required
                onChange={handleChange}
                className="p-3 outline-none bg-transparent shadow-none border border-grey-200 rounded-md"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col p-3 shadow-md rounded-md w-[50%] mr-3">
            <div className="flex flex-row items-center gap-2 mb-3">
              <HiRectangleGroup className="text-2xl" />
              <h2 className="text-lg font-semibold">
                Restaurant Logo & Covers
              </h2>
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="p-4 flex flex-col items-center">
                <h4 className="text-gray-700 text-center font-semibold mb-2">
                  Logo
                  <span className="text-red-500 text-sm">(Ratio - 1:1)</span>
                </h4>
                <div
                  className="border-dashed border-2 border-gray-300 p-3 mt-5 rounded-md flex flex-col items-center relative"
                  onClick={() =>
                    document.getElementById("profileInput")?.click()
                  }
                >
                  {previewProfile ? (
                    <>
                      <img
                        src={previewProfile}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-md mb-4"
                      />
                      <button
                        onClick={handleRemoveProfileImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <AiOutlineClose />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <RiUploadCloudFill className="text-xl mb-2" />
                      <label
                        htmlFor="profileInput"
                        className="cursor-pointer text-base"
                      >
                        Upload Profile Image
                      </label>
                      <input
                        id="profileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Cover Image */}
              <div className="p-4 flex flex-col items-center">
                <h4 className="text-gray-700 text-center font-semibold mb-2">
                  Cover Image{" "}
                  <span className="text-red-500 text-sm">(Ratio - 2:1)</span>
                </h4>
                <div
                  className="border-dashed border-2 border-gray-300 px-5 py-3 mt-5 rounded-md flex flex-col items-center relative"
                  onClick={() => document.getElementById("coverInput")?.click()}
                >
                  {previewCover ? (
                    <>
                      <img
                        src={previewCover}
                        alt="Preview"
                        className="w-64 h-32 object-cover rounded-md mb-4"
                      />
                      <button
                        onClick={handleRemoveCoverImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <AiOutlineClose />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 text-center">
                      <RiUploadCloudFill className="text-3xl mb-2" />
                      <label htmlFor="coverInput" className="cursor-pointer">
                        Upload Cover Image
                      </label>
                      <input
                        id="coverInput"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-3 mt-3 mr-3 p-3 shadow-md rounded-md">
          <div className="flex flex-row gap-2 mb-3">
            <HiRectangleGroup className="text-2xl" />
            <h2 className="text-lg font-semibold">Restaurant Info</h2>
          </div>
          <div className="flex flex-row gap-3 items-end justify-between w-full">
            <div className="flex flex-col">
              <label>Vat/Tax (%)</label>
              <input
                type="number"
                placeholder="Ex:100"
                name="Tax"
                value={restaurantData.Tax}
                required
                onChange={handleChange}
                className="outline-none bg-transparent shadow-none border border-grey-200 rounded-md p-2 w-[500px]"
              />
            </div>
            <div className="flex flex-col">
              <label>Estimated Delivery Time (Min & Maximum Time )</label>
              <input
                type="number"
                name="DeliveryTime"
                value={restaurantData.DeliveryTime}
                required
                onChange={handleChange}
                className="outline-none bg-transparent shadow-none border border-grey-200 rounded-md p-2 w-[500px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row p-3 shadow-md rounded-md gap-3 mt-3 mb-3 mr-3 items-center">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col mb-3">
              <label>Cuisine</label>
              <Select
                name="categories"
                value={options?.filter((option) =>
                  restaurantData.categories?.includes(option.value)
                )}
                onChange={handleSelectChange}
                options={options}
                isClearable
                isMulti // Enables multiple selection
                // getOptionLabel={(e) => e.label}
                getOptionValue={(e) => e.value}
              />
            </div>
            <div className="flex flex-col mb-3">
              <label>Zone</label>
              <select
                name="zone"
                value={restaurantData.zone}
                onChange={handleChange}
                className="p-2 outline-none bg-transparent shadow-none border border-grey-200 rounded-md"
              >
                <option value="all">All over the World</option>
              </select>
            </div>
            <div className="flex flex-col mb-3">
              <label>Latitude</label>
              <input
                type="number"
                placeholder="Ex: -94.22123"
                name="latitude"
                required
                value={restaurantData.latitude}
                onChange={handleChange}
                className="p-2 outline-none bg-transparent shadow-none border border-grey-200 rounded-md"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label>Longitude</label>
              <input
                type="number"
                placeholder="Ex: 102.22123"
                name="longitude"
                required
                value={restaurantData.longitude}
                onChange={handleChange}
                className="p-2 outline-none bg-transparent shadow-none border border-grey-200 rounded-md"
              />
            </div>
          </div>
          <div className="w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113965.13969483435!2d87.27611005!3d26.795051200000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef419fc7271c1d%3A0x1d1300367590c002!2sDharan!5e0!3m2!1sen!2snp!4v1737550577096!5m2!1sen!2snp"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="w-full h-96 rounded-lg border-none"
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col p-3 shadow-md rounded-md gap-3 mt-3 mb-3 mr-3  justify-between">
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/img/user.png" alt="image" className="h-4 w-4" />
            <h2 className="text-lg font-semibold">Owner Info</h2>
          </div>
          <div className="flex flex-row items-center gap-3 w-full">
            <div className="flex flex-col w-full">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Ex: Jhone"
                name="ownerFirstName"
                required
                value={restaurantData.ownerFirstName}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md  "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Ex: Jhone"
                name="ownerLastName"
                required
                value={restaurantData.ownerLastName}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={restaurantData.phone}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-3 shadow-md rounded-md gap-3 mt-3 mb-3 mr-3  justify-between">
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/img/user.png" alt="image" className="h-4 w-4" />
            <h2 className="text-lg font-semibold">Additional Data</h2>
          </div>
          <div className="flex flex-row items-center gap-3 w-full">
            <div className="flex flex-col w-full">
              <label>Enter your PAN number</label>
              <input
                type="text"
                placeholder="Enter PAN"
                name="panNumber"
                required
                value={restaurantData.panNumber}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md  "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Date</label>
              <input
                type="date"
                placeholder="Ex: Jhone"
                name="date_of_birth"
                required
                value={restaurantData.date_of_birth}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>License Document</label>
              <input
                id="liscenseInput"
                type="file"
                accept="image/*"
                onChange={handleDocumentChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md "
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-3 shadow-md rounded-md gap-3 mt-3 mb-3 mr-3  justify-between">
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/img/user.png" alt="image" className="h-4 w-4" />
            <h2 className="text-lg font-semibold">Account Info</h2>
          </div>
          <div className="flex flex-row items-center gap-3 w-full">
            <div className="flex flex-col w-full">
              <label>Email</label>
              <input
                type="email"
                placeholder="Ex: Jhone@company.com"
                name="email"
                required
                value={restaurantData.email}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md  "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Password</label>
              <input
                type="password"
                placeholder="8+ Characters"
                name="password"
                required
                value={restaurantData.password}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="8+ Characters"
                name="confirm_password"
                required
                value={restaurantData.confirm_password}
                onChange={handleChange}
                className="outline-none p-2 bg-transparent shadow-none border border-grey-200 rounded-md "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-3 mt-3 mb-3 mr-3">
          <button classname="bg-gray-600 rounded-md p-2 text-black font-semibold text-sm hover:bg-gray-700">
            Reset
          </button>
          <button
            type="submit"
            className="bg-indigo-700 text-white py-1 font-semibold px-5 rounded-lg "
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
