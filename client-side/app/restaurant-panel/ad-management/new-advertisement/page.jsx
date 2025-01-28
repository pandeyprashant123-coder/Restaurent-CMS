"use client";
import React, { useState } from "react";

import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

import { RiUploadCloudFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

// interface DateRangeType {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// }

const NewAd = () => {
  const [formData, setFormData] = useState({
    adTitle: "",
    adDescription: "",
    adType: "",
    review: true,
    rating: true,
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleApply = () => {
    setShowCalendar(false);
  };

  const handleClear = () => {
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  const handleDateChange = (ranges) => {
    const updatedRange = ranges.selection;
    setDateRange([
      {
        startDate: updatedRange.startDate,
        endDate: updatedRange.endDate,
        key: "selection",
      },
    ]);
  };

  // Image Handling
  const [imageProfile, setImageProfile] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageProfile(file);
      setPreviewProfile(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image for the profile.");
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageCover(file);
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 p-6 font-semibold text-xl">
        <h1>Create Advertisement</h1>
      </div>
      <div className="p-6 flex gap-5 border rounded-md m-6">
        <div className="w-1/2 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Advertisement Title
            </label>
            <input
              type="text"
              name="adTitle"
              placeholder="Enter title"
              value={formData.adTitle}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              name="adDescription"
              value={formData.adDescription}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Advertisement Type
            </label>
            <select
              name="adType"
              value={formData.adType}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Type</option>
              <option value="Restaurant Promotion">Restaurant Promotion</option>
              <option value="Video Promotion">Video Promotion</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Select date"
              className="border rounded-md p-2 w-full cursor-pointer"
              value={`${dateRange[0].startDate?.toLocaleDateString()} - ${dateRange[0].endDate?.toLocaleDateString()}`}
              onFocus={() => setShowCalendar(true)}
              readOnly
            />
            {showCalendar && (
              <div className="absolute z-10 bg-white shadow-lg border rounded-md">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
                <div className="flex justify-between p-2 border-t">
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <h1>Show Reviews And Ratings</h1>
            <div className="flex items-center gap-5 bg-gray-100 p-3 my-2 rounded-md">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="review"
                  checked={formData.review}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium text-gray-700">
                  Review
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="rating"
                  checked={formData.rating}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium text-gray-700">
                  Rating
                </label>
              </div>
            </div>
          </div>
          <div className="w-full m-2">
            <h1 className="font-semibold">Upload Related Files</h1>
            <div className="w-full rounded-md shadow-sm bg-white">
              {/* Profile Image */}
              <div className="p-4 flex flex-col items-center">
                <h4 className="text-gray-700 text-center font-semibold mb-2">
                  Profile Image{" "}
                  <span className="text-red-500 text-sm">(Ratio - 1:1)</span>
                </h4>
                <div
                  className="border-dashed border-2 border-gray-300 p-8 mt-5 rounded-md flex flex-col items-center relative"
                  onClick={() =>
                    document.getElementById("profileInput")?.click()
                  }
                >
                  {previewProfile ? (
                    <>
                      <img
                        src={previewProfile}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md mb-4"
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
                      <RiUploadCloudFill className="text-3xl mb-2" />
                      <label htmlFor="profileInput" className="cursor-pointer">
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
                  className="border-dashed border-2 border-gray-300 py-12 w-2/3 mt-5 rounded-md flex flex-col items-center relative"
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
        {/* card */}
        <div className="w-1/2">
          <div className=" flex flex-col gap-2 bg-gray-100 p-6 rounded-md  sticky top-20">
            <h1 className="font-semibold text-base">Advertisement Preview</h1>
            <div>
              <div className="h-40 flex rounded-t-md relative bg-gray-200">
                <img
                  src={previewCover}
                  alt=""
                  className="h-full w-full object-cover rounded-t-md"
                />
                {(formData.rating || formData.review) && (
                  <div className="absolute bottom-2 font-semibold right-4 text-xs text-white bg-orange-500 px-1 py-[0.1rem] rounded-full border-2 border-white">
                    {formData.rating && <span>⭐4.7 </span>}{" "}
                    {formData.review && <span>(3+)</span>}
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center bg-white p-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full">
                  <img
                    src={previewProfile}
                    alt=""
                    className="h-full w-full object-cover rounded-full "
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold ">{formData.adTitle}</h1>
                  <h1 className="text-gray-600">{formData.adDescription}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAd;
