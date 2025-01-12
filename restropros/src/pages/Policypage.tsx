import React, { useState, useEffect } from "react";
import TermsAndConditions from "../components/TermsAndConditions";
import RefundPolicy from "../components/Refundpolicy";
import PrivacyPolicy from "../components/PrivacyPolicy";
import { useLocation } from "react-router-dom";

const Policypage = () => {
  const location = useLocation();
  const [activeContent, setActiveContent] = useState<string>(
    location.state?.content
  );
  const handleClick = (content: string) => {
    setActiveContent(content);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className=" flex justify-start w-full mt-20">
      <div className="flex flex-col gap-7 border rounded w-1/4 m-5 p-5 h-1/2">
        <button
          className=" btnGreen"
          onClick={() => handleClick("privacyPolicy")}
        >
          Privacy Policy
        </button>
        <button
          className=" btnGreen"
          onClick={() => handleClick("refundPolicy")}
        >
          Refund Policy
        </button>
        <button
          className=" btnGreen"
          onClick={() => handleClick("termsAndCondition")}
        >
          Terms & Condition
        </button>
      </div>
      <div className="">
        {activeContent === "termsAndCondition" && <TermsAndConditions />}
        {activeContent === "refundPolicy" && <RefundPolicy />}
        {activeContent === "privacyPolicy" && <PrivacyPolicy />}
      </div>
    </div>
  );
};

export default Policypage;
