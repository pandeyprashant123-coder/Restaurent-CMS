"use client";
import React, { useEffect, useState } from "react";
import AllOrders from "../../../components/VendorDashboard/orders/AllOrders";
import useSWR from "swr";
import axios from "../../../axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Orders = () => {
  const { data, error } = useSWR(`orders`, fetcher);
  const orders = data?.data;
  console.log(data);

  return (
    <div>
      <AllOrders orders={orders} />
    </div>
  );
};

export default Orders;
