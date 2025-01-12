import React from "react";

const RefundPolicy = () => {
  return (
    <div className="refund-policy container mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
      <p className="mb-4">
        At RestroProcs, we strive to ensure customer satisfaction. This refund
        policy explains the circumstances under which refunds may be issued and
        the process for requesting them.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Eligibility for Refunds</h2>
      <p className="mb-4">
        Refunds may be issued in the following cases:
        <ul className="list-disc list-inside">
          <li>If the service provided was not as described or agreed upon.</li>
          <li>
            Technical issues prevented the successful completion of the service.
          </li>
          <li>
            Other circumstances as determined on a case-by-case basis by our
            support team.
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Non-Refundable Cases</h2>
      <p className="mb-4">
        Refunds will not be issued in the following scenarios:
        <ul className="list-disc list-inside">
          <li>Change of mind after the service has been provided.</li>
          <li>Failure to follow instructions or terms of use.</li>
          <li>Unauthorized use of the service.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Refund Request Process</h2>
      <p className="mb-4">
        To request a refund:
        <ul className="list-disc list-inside">
          <li>
            Contact our support team at support@restroprocs.com within 14 days
            of the issue.
          </li>
          <li>
            Provide detailed information about the issue, including any
            supporting documentation.
          </li>
          <li>
            Allow up to 7 business days for the review and response to your
            request.
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Refund Methods</h2>
      <p className="mb-4">
        Approved refunds will be processed using the original payment method.
        Please allow up to 10 business days for the refund to reflect in your
        account, depending on your payment provider.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        5. Changes to Refund Policy
      </h2>
      <p className="mb-4">
        RestroProcs reserves the right to update or modify this refund policy at
        any time. Changes will be communicated through our website or
        application.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
      <p className="mb-4">
        For any questions or assistance regarding our refund policy, please
        contact us at support@restroprocs.com.
      </p>
    </div>
  );
};

export default RefundPolicy;
