import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Helper function to darken a hex color
function darkenHexColor(hex, amount = 0.15) {
  let col = hex.replace("#", "");
  if (col.length === 3) col = col.split("").map(c => c + c).join(""); // e.g., #abc -> #aabbcc

  const num = parseInt(col, 16);
  const r = Math.max(0, (num >> 16) - 255 * amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - 255 * amount);
  const b = Math.max(0, (num & 0x0000ff) - 255 * amount);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

const bgColors = [
  "#818589", // gray
  "#230601", // dark red
  "#4D4D4D", // dark gray
  "#013220", // dark green
];

function PropertyCard({ property, index }) {
  const [selectedTab, setSelectedTab] = useState("amenities");
  const controls = useAnimation();

  const bgColor = bgColors[index % bgColors.length];
  const activeTabColor = darkenHexColor(bgColor, 0.1);
  const textColor = "white";
  const detailsBgColor = "rgba(255 255 255 / 0.15)";
  const infoGridBgColor = "rgba(255 255 255 / 0.15)";

  return (
    <motion.div
      className="w-[66vw] max-w-[900px] rounded-3xl shadow-lg p-2.5 cursor-grab select-none mx-auto"
      drag="x"
      dragConstraints={false}
      dragElastic={0.2}
      animate={controls}
      whileTap={{ cursor: "grabbing" }}
      style={{
        height: "400px",
        display: "flex",
        gap: "0.25rem",
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: "1.75rem",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          height: "100%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={property.image}
          alt={property.title}
          style={{
            height: "100%",
            width: "auto",
            borderRadius: "1rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          overflow: "hidden",
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <h2
          className="font-semibold"
          style={{ fontSize: "1.5rem", lineHeight: 1.3 }}
        >
          {property.title}
        </h2>

        <p
          className="flex-shrink-0"
          style={{
            color: "rgba(255 255 255 / 0.8)",
            fontSize: "0.9rem",
            lineHeight: 1.4,
          }}
        >
          {property.overview}
        </p>

        <div
          className="grid grid-cols-2 gap-2"
          style={{
            backgroundColor: infoGridBgColor,
            borderRadius: "1rem",
            padding: "0.5rem",
            boxShadow: "0 2px 6px rgba(255 255 255 / 0.2)",
            fontSize: "0.85rem",
          }}
        >
          <div><strong>Address:</strong> {property.address}</div>
          <div><strong>Price:</strong> {property.price}</div>
          <div><strong>Bedrooms:</strong> {property.bedrooms}</div>
          <div><strong>Bathrooms:</strong> {property.bathrooms}</div>
          <div><strong>Size:</strong> {property.size}</div>
          <div><strong>Year Built:</strong> {property.yearBuilt}</div>
        </div>

        <div
          className="flex flex-col flex-grow overflow-auto"
          style={{
            backgroundColor: detailsBgColor,
            borderRadius: "1rem",
            padding: "0.5rem",
            boxShadow: "0 2px 6px rgba(255 255 255 / 0.2)",
            marginTop: "0.25rem",
            fontSize: "0.85rem",
          }}
        >
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => setSelectedTab("amenities")}
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "0.75rem",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                backgroundColor:
                  selectedTab === "amenities" ? activeTabColor : "#e5e7eb",
                color: selectedTab === "amenities" ? "white" : "#374151",
              }}
            >
              Amenities
            </button>
            <button
              onClick={() => setSelectedTab("roommates")}
              style={{
                padding: "0.25rem 0.5rem",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "0.75rem",
                border: "none",
                fontFamily: "'Inter', sans-serif",
                backgroundColor:
                  selectedTab === "roommates" ? activeTabColor : "#e5e7eb",
                color: selectedTab === "roommates" ? "white" : "#374151",
              }}
            >
              Roommates
            </button>
          </div>

          <div
            className="p-1 rounded-xl min-h-[60px]"
            style={{
              backgroundColor: "rgba(255 255 255 / 0.35)",
              borderRadius: "1rem",
            }}
          >
            {selectedTab === "amenities" ? (
              property.amenities.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {property.amenities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              ) : (
                <p>No amenities listed.</p>
              )
            ) : property.roommates.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {property.roommates.map((r, i) => (
                  <li key={i}>{r}</li>
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
