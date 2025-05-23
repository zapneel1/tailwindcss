import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

function PropertyCard({ property }) {
  const [selectedTab, setSelectedTab] = useState("amenities");
  const controls = useAnimation();

  // For drag x-axis constraints (no limit)
  const handleDragEnd = (event, info) => {
    // You can add custom logic here if needed on drag end
  };

  return (
    <motion.div
      className="w-[66vw] max-w-[900px] bg-white rounded-3xl shadow-lg p-6 cursor-grab select-none mx-auto flex"
      drag="x"
      dragConstraints={false}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileTap={{ cursor: "grabbing" }}
      style={{ minHeight: "400px" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Image on left */}
      <div className="flex-shrink-0 w-1/3 rounded-xl overflow-hidden shadow-md mr-6">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
          style={{ maxHeight: "250px", minWidth: "180px" }}
        />
      </div>

      {/* Content on right */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">{property.title}</h2>
        <p className="text-gray-600 mb-3">{property.overview}</p>
        <p className="text-gray-700 mb-6">{property.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <div><strong>Address:</strong> {property.address}</div>
          <div><strong>Price:</strong> {property.price}</div>
          <div><strong>Bedrooms:</strong> {property.bedrooms}</div>
          <div><strong>Bathrooms:</strong> {property.bathrooms}</div>
          <div><strong>Size:</strong> {property.size}</div>
          <div><strong>Year Built:</strong> {property.yearBuilt}</div>
        </div>

        {/* Tabs for amenities and roommates */}
        <div>
          <div className="flex mb-4 space-x-4">
            <button
              className={`py-2 px-4 rounded-full font-semibold text-sm ${
                selectedTab === "amenities" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedTab("amenities")}
            >
              Amenities
            </button>
            <button
              className={`py-2 px-4 rounded-full font-semibold text-sm ${
                selectedTab === "roommates" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setSelectedTab("roommates")}
            >
              Roommates
            </button>
          </div>
          <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[80px]">
            {selectedTab === "amenities" ? (
              property.amenities.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {property.amenities.map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))}
                </ul>
              ) : (
                <p>No amenities listed.</p>
              )
            ) : property.roommates.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {property.roommates.map((roommate, idx) => (
                  <li key={idx}>{roommate}</li>
                ))}
              </ul>
            ) : (
              <p>No roommates listed.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PropertyCard;
