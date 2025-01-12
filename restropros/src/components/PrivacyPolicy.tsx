import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="refund-policy container mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="text-gray-700 mb-2">
        At RestroProcs, we value your privacy and are committed to protecting
        your personal information. This Privacy Policy explains how we collect,
        use, and share your information.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>
            Personal Identification Information (Name, email address, etc.)
          </li>
          <li>Usage data (IP address, browser type, operating system, etc.)</li>
          <li>Cookies and similar technologies</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>To provide and improve our services</li>
          <li>To communicate with you</li>
          <li>To monitor usage and prevent fraud</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Sharing Your Information</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>With service providers who help us operate our business</li>
          <li>
            For legal purposes (e.g., to comply with a subpoena or similar legal
            process)
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Your Choices</h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Opt-out of promotional emails</li>
          <li>Adjust cookie settings in your browser</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Security</h2>
        <p className="text-gray-700 mb-4">
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p className="text-gray-700">Email: support@restroprocs.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
