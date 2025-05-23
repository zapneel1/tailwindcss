import React, { useState } from "react";

export default function SubcardTabs({ property }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabStyle = (tab) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      activeTab === tab
        ? "bg-blue-600 text-white shadow"
        : "bg-gray-100 text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div>
      <div className="flex mb-5 space-x-3 overflow-x-auto">
        {["overview", "description", "amenities", "roommates"].map((tab) => (
          <button key={tab} className={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px]">
        {activeTab === "overview" && (
          <>
            <p className="text-base leading-relaxed mb-2">{property.overview}</p>
            <ul className="text-sm space-y-1">
              <li><strong>Address:</strong> {property.address}</li>
              <li><strong>Price:</strong> {property.price}</li>
              <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
              <li><strong>Bathrooms:</strong> {property.bathrooms}</li>
              <li><strong>Size:</strong> {property.size}</li>
              <li><strong>Year Built:</strong> {property.yearBuilt}</li>
            </ul>
          </>
        )}

        {activeTab === "description" && (
          <>
            <p className="text-base leading-relaxed mb-4">{property.description}</p>
            {property.image && (
              <img
                src={property.image}
                alt={`${property.title} image`}
                className="w-full max-w-md h-auto object-cover rounded-lg shadow mx-auto"
              />
            )}
          </>
        )}

        {activeTab === "amenities" && (
          <ul className="list-disc list-inside space-y-1">
            {property.amenities.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        )}

        {activeTab === "roommates" && (
          <ul className="list-disc list-inside space-y-1">
            {property.roommates.map((roommate, index) => (
              <li key={index} className="text-sm">{roommate}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
