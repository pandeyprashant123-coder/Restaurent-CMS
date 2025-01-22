"use client";
import React from "react";
import EditFood from "../../../../../components/VendorDashboard/foods/FoodAddandUpdata";
import { useSearchParams } from "next/navigation";

const EditList = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  return (
    <div>
      <EditFood id={id} />
    </div>
  );
};

export default EditList;
