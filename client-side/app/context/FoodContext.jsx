import React, { useContext, createContext, useState } from "react";

const FoodContext = createContext();

export function useFood() {
  return useContext(FoodContext);
}

export function FoodProvider({ children }) {
  const [foodData, setFoodData] = useState({
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
  });
  console.log(foodData);
  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
}
