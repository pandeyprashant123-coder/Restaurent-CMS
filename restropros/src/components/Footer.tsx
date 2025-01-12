import Logo from "../assets/logo.svg";
import { useState } from "react";

import { Link } from "react-router-dom";
import React from "react";
const Footer = () => {
  return (
    <div className="flex p-5 justify-between border relative bottom-0 w-full">
      <img src={Logo} alt="icon" className="w-[7rem]" />
      <ul className="flex gap-3">
        <Link
          to="/policy"
          state={{ content: "privacyPolicy" }}
          className="btnGrey cursor-pointer"
        >
          Privacy Policy
        </Link>
        <Link
          to="/policy"
          state={{ content: "refundPolicy" }}
          className="btnGrey cursor-pointer"
        >
          Refund Policy
        </Link>
        <Link
          to="/policy"
          state={{ content: "termsAndCondition" }}
          className="btnGrey cursor-pointer"
        >
          Terms & Condition
        </Link>
      </ul>
    </div>
  );
};

export default Footer;
