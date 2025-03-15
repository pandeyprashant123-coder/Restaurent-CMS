"use client";
import React, { useEffect, useState } from "react";
import AllOrders from "../../../components/VendorDashboard/orders/AllOrders";
import useSWR from "swr";
import axios from "../../../axios";
import { useAuth } from "../../../context/AuthContext";
import { useSearchParams } from "next/navigation";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Orders = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { _id } = JSON.parse(user);
  const { data, error } = useSWR(`orders/restaurants/${_id}`, fetcher);
  const orders = data?.data;
  const filters = orders?.filter((order) => order.status === status);

  return (
    <div>
      {status ? (
        <AllOrders orders={filters} restroName={true} />
      ) : (
        <AllOrders orders={orders} restroName={true} />
      )}
    </div>
  );
};

export default Orders;
