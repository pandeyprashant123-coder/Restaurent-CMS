"use client";
import React, { useState, useEffect } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineClose, AiTwotoneSchedule } from "react-icons/ai";
import { BiDollarCircle } from "react-icons/bi";
import { RiUploadCloudFill } from "react-icons/ri";
import { TbBoxMultipleFilled } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";

import axios from "../../../../axios";
import { useFood } from "../../../../context/FoodContext";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../../../context/AuthContext";

const AddNew = () => {
  const { user } = useAuth();
  const { _id } = JSON.parse(user);
  console.log(_id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: null,
    subCategory: "",
    foodType: "",
    nutrition: "",
    allegren: "",
    isItHalal: false,
    addons: [],
    availableTimeStarts: "",
    availableTimeEnds: "",
    unitPrice: 0,
    discountType: "",
    discount: "Percent",
    purchaseLimit: "",
    stockType: "",
    variationRequired: false,
    variations: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [addons, setAddons] = useState([]);
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/addons");
        setAddons(res.data);
        const res1 = await axios.get("/categories");
        setCategories(res1?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const options = addons.map((addon) => ({
    value: addon._id,
    label: addon.name,
  }));
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setFormData((prev) => ({ ...prev, foodImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSelectChange = (selectedOptions) => {
    // Only store the IDs of the selected countries
    const selectedCountryIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prevState) => ({
      ...prevState,
      addons: selectedCountryIds, // Array of country IDs
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    try {
      const response = await axios.post(
        "foods",
        { ...formData, user: _id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.message);
      toast("form Submitted");
    } catch (error) {
      console.error("Error:", error);
      toast("unable to add food");
    }
    // } finally {
    //   setFormData({
    //     name: "",
    //     description: "",
    //     image: null,
    //     category: "",
    //     subCategory: "",
    //     foodType: "",
    //     nutrition: "",
    //     allegren: "",
    //     isItHalal: false,
    //     addon: "",
    //     availableTimeStarts: "",
    //     availableTimeEnds: "",
    //     unitPrice: 0,
    //     discountType: "",
    //     discount: "",
    //     purchaseLimit: "",
    //     stockType: "",
    //     variationRequired: false,
    //     variations: [],
    //   });

    //   setImage(null);
    //   setPreview(null);
    // }
    setIsLoading(false);
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      image: null,
      category: "",
      subCategory: "",
      foodType: "",
      nutrition: "",
      allegren: "",
      isItHalal: false,
      addon: "",
      availableTimeStarts: "",
      availableTimeEnds: "",
      unitPrice: 0,
      discountType: "",
      discount: "",
      purchaseLimit: "",
      stockType: "",
      variationRequired: false,
      variations: [],
    });
    setImage(null);
    setPreview(null);
  };

  const addVariation = () => {
    setFormData((prevState) => ({
      ...prevState,
      variations: [
        ...prevState.variations,
        {
          variationName: "",
          required: false,
          selectionType: "",
          options: [{ name: "", additionalPrice: "" }],
        },
      ],
    }));
  };

  const addOptionToVariation = (index) => {
    setFormData((prevState) => {
      const updatedVariations = [...prevState.variations];
      updatedVariations[index] = {
        ...updatedVariations[index],
        options: [
          ...updatedVariations[index].options,
          { name: "", additionalPrice: "" },
        ],
      };
      return { ...prevState, variations: updatedVariations };
    });
  };

  const deleteVariation = (index) => {
    setFormData((prevState) => {
      const updatedVariations = prevState.variations.filter(
        (_, i) => i !== index
      );
      return { ...prevState, variations: updatedVariations };
    });
  };

  const deleteOptionFromVariation = (variationIndex, optionIndex) => {
    setFormData((prevState) => {
      const updatedVariations = [...prevState.variations];
      updatedVariations[variationIndex].options = updatedVariations[
        variationIndex
      ].options.filter((_, i) => i !== optionIndex);
      return { ...prevState, variations: updatedVariations };
    });
  };

  const handleVariationChange = (index, field, value) => {
    setFormData((prevState) => {
      const updatedVariations = [...prevState.variations];
      updatedVariations[index][field] = value;
      return { ...prevState, variations: updatedVariations };
    });
  };

  const handleOptionChange = (variationIndex, optionIndex, field, value) => {
    setFormData((prevState) => {
      const updatedVariations = [...prevState.variations];
      updatedVariations[variationIndex].options[optionIndex][field] = value;
      return { ...prevState, variations: updatedVariations };
    });
  };
  console.log(formData);

  return (
    <div className="w-full flex flex-col bg-gray-50 p-3">
      <ToastContainer />
      <div className="flex items-center gap-2 p-6 font-bold text-xl">
        <FiPlusCircle />
        <h1>Add New Food</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="">
          <div className="flex gap-3 mx-3">
            <div className="mr-auto flex flex-col gap-2 w-1/2 p-6 bg-white shadow-sm rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Name (Default)
              </label>
              <input
                type="text"
                placeholder="New Food"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
              />
              <label className="block text-sm font-medium text-gray-700">
                Short Description (Default)
              </label>
              <textarea
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
              />
            </div>
            <div className="w-1/2 p-4 flex flex-col items-center justify-center rounded-md shadow-sm bg-white">
              <h4 className="text-gray-700 font-semibold text-lg mb-2">
                Food Image{" "}
                <span className="text-red-500 text-sm">(Ratio 200×200)</span>
              </h4>
              <div
                className="relative border-dashed border-2 border-gray-300 p-12 mt-16 rounded-md flex flex-col items-center"
                // onClick={() => document.getElementById("foodImg")?.click()}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md mb-4"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <AiOutlineClose />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <RiUploadCloudFill className="text-3xl" />
                    <input
                      type="file"
                      id="foodImg"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="foodImg"
                      className="rounded cursor-pointer absolute py-10 "
                    >
                      Upload Image
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-3 m-3 bg-white shadow-sm rounded-lg">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
              <MdOutlineDashboard />
              <h1>Restaurants & Category Info</h1>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex gap-2 justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value=""> ---Select Category---</option>
                    {categories?.map((category) => (
                      <option value={category.cName} key={category._id}>
                        {category.cName}
                      </option>
                    ))}
                    {/* <option value="Biryani">Biryani</option>
                    <option value="Asian">Asian</option>
                    <option value="Cake">Cake</option>
                    <option value="Coffee&Drinks">Coffee&Drinks</option> */}
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Sub Category &#x24D8;
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value=""> ---Select Sub Category---</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Food Type
                  </label>
                  <select
                    name="foodType"
                    required
                    value={formData.foodType}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value=""> Select Preferances</option>
                    <option value="Veg">Veg</option>
                    <option value="Non Veg">Non Veg</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 ">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Nutrition &#x24D8;
                  </label>
                  <input
                    type="text"
                    name="nutrition"
                    value={formData.nutrition}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Allegren Ingredients &#x24D8;
                  </label>
                  <input
                    type="text"
                    name="allegren"
                    value={formData.allegren}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="isItHalal"
                  value={formData.isItHalal}
                  checked={formData.isItHalal}
                  onChange={handleChange}
                  className="mt-1 block p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Is it Halal?
                </label>
              </div>
            </div>
          </div>
          <div className="flex m-3 gap-3">
            <div className="flex flex-col gap-3 bg-white shadow-sm rounded-lg w-1/2">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
                <MdOutlineDashboard />
                <h1>Addon</h1>
              </div>
              <div className="w-full p-6">
                <label className="block text-sm font-medium text-gray-700">
                  Select Addon
                </label>
                <Select
                  name="addons"
                  value={options?.filter((option) =>
                    formData.addons?.includes(option.value)
                  )}
                  onChange={handleSelectChange}
                  options={options}
                  isClearable
                  isMulti // Enables multiple selection
                  // getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => e.value}
                />
              </div>
            </div>
            <div className=" flex flex-col gap-3 bg-white shadow-sm rounded-lg w-1/2">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 border-b p-3">
                <AiTwotoneSchedule />
                <h1>Availability</h1>
              </div>
              <div className="flex gap-2 p-6">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Available time starts
                  </label>
                  <input
                    type="time"
                    name="availableTimeStarts"
                    required
                    value={formData.availableTimeStarts}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Available time Ends
                  </label>
                  <input
                    type="time"
                    required
                    name="availableTimeEnds"
                    value={formData.availableTimeEnds}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-5 m-3 bg-white shadow-sm rounded-lg">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-500 p-3 border-b">
              <BiDollarCircle />
              <h1>Price Information</h1>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit Price $
                  </label>
                  <input
                    type="numer"
                    required
                    name="unitPrice"
                    placeholder="Ex: 100"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    defaultValue="Percent"
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="Percent">Percent(%)</option>
                    <option value="Amount">Amount($)</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Discount
                  </label>
                  <input
                    type="numer"
                    name="discount"
                    placeholder="Ex: 100"
                    value={formData.discount}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Purchase Quantity Limit
                  </label>
                  <input
                    type="numer"
                    name="purchaseLimit"
                    placeholder="Ex: 10"
                    value={formData.purchaseLimit}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Type
                  </label>
                  <select
                    name="stockType"
                    value={formData.stockType}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value=""> </option>
                    <option value="Limited Stock">Limited Stock</option>
                    <option value="Unlimited Stock">Unlimited Stock</option>
                    <option value="Daily Stock">Daily Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 m-3 bg-white shadow-sm rounded-lg">
            <div className="flex items-center justify-between gap-2 text-lg font-semibold text-slate-500 p-3 border-b">
              <div className="flex items-center gap-2">
                <TbBoxMultipleFilled />
                <h1>Food Variations</h1>
              </div>
              <div
                className="text-orange-600 font-normal text-base cursor-pointer"
                onClick={addVariation}
              >
                Add New Variation +
              </div>
            </div>
            <div className="">
              {formData.variations?.map((variation, index) => (
                <div
                  className="p-6 rounded-md bg-slate-50 flex flex-col gap-3 m-3"
                  key={index}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        name="variationRequired"
                        checked={variation.required}
                        onChange={(e) =>
                          handleVariationChange(
                            index,
                            "required",
                            e.target.checked
                          )
                        }
                        className="mt-1 block p-3 border border-gray-300 text-orange-300 rounded-md shadow-sm"
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        Required
                      </label>
                    </div>
                    <MdDeleteForever
                      className="p-2 text-4xl bg-red-500 text-white rounded-md cursor-pointer"
                      onClick={() => deleteVariation(index)}
                    />
                  </div>
                  <div className="flex flex-col gap-3 ">
                    <div className="flex gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={variation.variationName}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "variationName",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                        />
                      </div>
                      <div>
                        <h1 className="block text-sm font-medium text-gray-700">
                          Variation Selection Type{" "}
                          <span className="text-red-500">*</span>
                        </h1>
                        <div>
                          <label className="block   text-gray-700">
                            <input
                              type="radio"
                              name="selectionType"
                              value="multiple"
                              className=" pl-2 "
                              checked={variation.selectionType === "multiple"}
                              onChange={(e) =>
                                handleVariationChange(
                                  index,
                                  "selectionType",
                                  e.target.value
                                )
                              }
                            />
                            Multiple Selection
                          </label>
                          <label className="block  text-gray-700">
                            <input
                              type="radio"
                              name="selectionType"
                              value="single"
                              checked={variation.selectionType === "single"}
                              onChange={(e) =>
                                handleVariationChange(
                                  index,
                                  "selectionType",
                                  e.target.value
                                )
                              }
                            />
                            Single Selection
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mr-auto flex flex-col gap-3 w-full p-6 bg-white shadow-sm rounded-lg">
                      {variation?.options?.map((option, optionIndex) => (
                        <div
                          className="flex gap-4 items-center"
                          key={optionIndex}
                        >
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">
                              Optional name{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Option Name"
                              value={option.name}
                              onChange={(e) =>
                                handleOptionChange(
                                  index,
                                  optionIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">
                              Additionla Price ($){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Additional Price"
                              value={option.additionalPrice}
                              onChange={(e) =>
                                handleOptionChange(
                                  index,
                                  optionIndex,
                                  "additionalPrice",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm "
                            />
                          </div>
                          {optionIndex > 0 && (
                            <MdDeleteForever
                              className="p-1 mt-6 text-3xl bg-red-500 text-white rounded-md cursor-pointer"
                              onClick={() =>
                                deleteOptionFromVariation(index, optionIndex)
                              }
                            />
                          )}
                        </div>
                      ))}
                      <div
                        className="w-1/5 mt-5 p-2 border border-blue-700 text-blue-700 rounded-md font-semibold"
                        onClick={() => addOptionToVariation(index)}
                      >
                        Add New Option
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 w-full justify-end p-3">
            <button
              type="button"
              className="bg-gray-300 py-1 font-semibold px-5 rounded-lg"
              onClick={handleReset}
            >
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
    </div>
  );
};

export default AddNew;
