import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "../axios";

const FoodContext = createContext();

export function useFood() {
  return useContext(FoodContext);
}

export function FoodProvider({ children }) {
  const [foodData, setFoodData] = useState([
    {
      name: "",
      description: "",
      category: "",
      image: null,
      subCategory: "",
      foodType: "",
      nutrition: "",
      allegren: "",
      isItHalal: false,
      addons: [],
      availableTimeStarts: "",
      availableTimeEnds: "",
      unitPrice: 0,
      discountType: "",
      discount: "",
      purchaseLimit: "",
      stockType: "",
      variationRequired: false,
      variations: [],
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/foods");
        setFoodData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
}
