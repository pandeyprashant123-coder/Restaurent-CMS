import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions container mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to RestroProcs! These terms and conditions outline the rules and
        regulations for the use of RestroProcs' services. By accessing or using
        our services, you accept these terms and conditions in full. Do not
        continue to use RestroProcs if you do not agree to all of the terms and
        conditions stated on this page.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Definitions</h2>
      <p className="mb-4">
        - "Service" refers to the RestroProcs platform, including its website
        and mobile application.
        <br />- "User" refers to any individual or entity accessing or using the
        Service.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
      <p className="mb-4">
        By using RestroProcs, you warrant that you are at least 18 years old or
        accessing the Service under the supervision of a parent or legal
        guardian.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
      <p className="mb-4">
        Users agree to:
        <ul className="list-disc list-inside">
          <li>
            Provide accurate and up-to-date information during registration and
            use of the Service.
          </li>
          <li>
            Maintain the confidentiality of login credentials and notify
            RestroProcs immediately in case of unauthorized access.
          </li>
          <li>
            Use the Service in compliance with applicable laws and not for any
            unlawful activities.
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
      <p className="mb-4">
        Users must not:
        <ul className="list-disc list-inside">
          <li>
            Attempt to gain unauthorized access to any part of the Service.
          </li>
          <li>
            Engage in any activity that disrupts the functionality of the
            Service.
          </li>
          <li>
            Use the Service to distribute harmful, offensive, or illegal
            content.
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
      <p className="mb-4">
        All content, including but not limited to text, graphics, logos, and
        software, is the property of RestroProcs and protected by applicable
        copyright and trademark laws. Users may not reproduce, distribute, or
        create derivative works without prior written consent.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
      <p className="mb-4">
        RestroProcs is not liable for any indirect, incidental, or consequential
        damages arising out of your use or inability to use the Service. The
        Service is provided "as is" without warranties of any kind.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
      <p className="mb-4">
        RestroProcs reserves the right to terminate or suspend access to the
        Service at any time, without prior notice, for conduct that violates
        these terms or is harmful to other users or the Service.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
      <p className="mb-4">
        RestroProcs may revise these terms and conditions at any time. Continued
        use of the Service following any changes indicates acceptance of the new
        terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
      <p className="mb-4">
        These terms and conditions are governed by and construed in accordance
        with the laws of [Your Country/State].
      </p>

      <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about these terms and conditions,
        please contact us at support@restroprocs.com.
      </p>
    </div>
  );
};

export default TermsAndConditions;
