import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col mt-16 justify-center items-center bg-white w-11/12 max-w-xl p-10 rounded-lg shadow-md animate-fadeIn">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-3">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 text-sm mb-6">
        Got questions or comments? Use the form below to get in touch.
      </p>
      <form className="space-y-6">
        {/* First Row */}
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[250px]">
            <label htmlFor="name" className="block text-sm text-gray-800 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition"
              required
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label htmlFor="email" className="block text-sm text-gray-800 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition"
              required
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[250px]">
            <label
              htmlFor="contact"
              className="block text-sm text-gray-800 mb-1"
            >
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              placeholder="Your phone number"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition"
              required
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <label
              htmlFor="subject"
              className="block text-sm text-gray-800 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition"
              required
            />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label htmlFor="issue" className="block text-sm text-gray-800 mb-1">
            Describe your issue
          </label>
          <textarea
            id="issue"
            placeholder="Describe your issue"
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition resize-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btnGreen w-full py-3 bg-gradient-to-r">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
