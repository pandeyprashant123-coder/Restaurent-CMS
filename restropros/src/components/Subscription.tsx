import React, { useState } from "react";
import SubscriptionPlansData from "../data/planDetails.json";
import { MdEdit } from "react-icons/md";

interface Plan {
  id: string;
  name: string;
  prices: {
    Monthly: string;
    Annually: string;
  };
  features: string[];
}

const availableFeatures = [
  "Dashboard",
  "POS",
  "Orders",
  "Kitchen",
  "Reservations",
  "Customers",
  "Invoices",
  "Reports",
  "Menu items",
  "Tables",
  "Tax setup",
  "Generate QR menu",
  "Generate digital menu",
];

const Subscription = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(SubscriptionPlansData);
  const [formData, setFormData] = useState<Plan | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddNew = () => {
    setFormData({
      id: "",
      name: "",
      prices: { Monthly: "", Annually: "" },
      features: [],
    });
    setEditingIndex(null);
    setShowPopup(true);
  };

  const handleEdit = (index: number) => {
    setFormData(plans[index]);
    setEditingIndex(index);
    setShowPopup(true);
  };

  const handleSave = () => {
    if (formData) {
      const updatedPlans = [...plans];
      if (editingIndex !== null) {
        // Edit existing plan
        updatedPlans[editingIndex] = formData;
      } else {
        // Add new plan
        updatedPlans.push(formData);
      }
      setPlans(updatedPlans);
      setShowPopup(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData(null);
    setEditingIndex(null);
  };

  const handleFeatureSelect = (feature: string) => {
    if (formData && !formData.features.includes(feature)) {
      setFormData({ ...formData, features: [...formData.features, feature] });
    }
  };

  const removeFeature = (index: number) => {
    if (formData) {
      const updatedFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: updatedFeatures });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <h1 className="text-xl font-bold">Subscriptions</h1>
        <button
          onClick={handleAddNew}
          className="bg-gray-50 rounded-full p-2 border text-center flex flex-row justify-center items-center gap-2 shadow-md hover:shadow-lg translate-y-1 duration-75"
        >
          <span className="text-xl"> + </span>
          <p>Add New Offer</p>
        </button>
      </div>
      <div className="flex gap-20 py-5">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border rounded-lg p-5"
          >
            <h1 className="text-center font-bold text-green-400 text-lg ">
              {plan.name}
            </h1>
            <div>
              <h1 className="font-bold text-lg">Price</h1>
              <div className="flex flex-col gap-2 mt-2">
                <h1>Monthly(x1): ${plan.prices.Monthly}</h1>
                <h1>Annually(x12): ${plan.prices.Annually}</h1>
              </div>
              <h1 className="font-bold text-lg mt-4">Features</h1>
              <ul className="list-disc ml-5">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleEdit(index)}
              className="flex items-center gap-2 btnGrey w-20"
            >
              <MdEdit />
              <span>Edit</span>
            </button>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingIndex !== null ? "Edit Plan" : "Add New Plan"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={formData?.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData!, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Price
                </label>
                <input
                  type="number"
                  value={formData?.prices.Monthly || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      prices: { ...formData!.prices, Monthly: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Annually Price
                </label>
                <input
                  type="number"
                  value={formData?.prices.Annually || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      prices: { ...formData!.prices, Annually: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                <div className="flex flex-col gap-2">
                  <select
                    onChange={(e) => handleFeatureSelect(e.target.value)}
                    className="px-3 py-2 border rounded"
                  >
                    <option value="">Select a feature</option>
                    {availableFeatures.map((feature) => (
                      <option key={feature} value={feature}>
                        {feature}
                      </option>
                    ))}
                  </select>
                  <ul className="list-disc ml-5">
                    {formData?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
