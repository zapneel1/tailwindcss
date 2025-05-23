import React, { useState } from "react";
import PropertyCard from "./components/ui/PropertyCard";
import properties from "./data/properties";
import Navbar from "./components/ui/navbar";
import { motion, AnimatePresence } from "framer-motion";


export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [isAnimating, setIsAnimating] = useState(false); // prevent multi triggers

  const next = (dir = 1) => {
    if (isAnimating) return; // block if animating
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setIndex((i) => {
        let nextIndex = i + dir;
        if (nextIndex < 0) nextIndex = properties.length - 1;
        else if (nextIndex >= properties.length) nextIndex = 0;
        return nextIndex;
      });
      setIsAnimating(false);
    }, 500); // animation duration matches transition
  };

  const variants = {
    enter: {
      x: 0,
      y: 300, // Enter from below
      opacity: 0,
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      position: "relative",
      width: "100%",
      height: "100%",
    },
    exit: (dir) => ({
      x: dir > 0 ? 300 : -300, // Swipe off horizontally based on direction
      y: 0,
      opacity: 0,
      position: "absolute",
      width: "100%",
      height: "100%",
    }),
  };

  const swipeConfidenceThreshold = 100;

  const handleDragEnd = (event, info) => {
    if (isAnimating) return;
    const offsetX = info.offset.x;

    if (offsetX < -swipeConfidenceThreshold) {
      next(-1);
    } else if (offsetX > swipeConfidenceThreshold) {
      next(1);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans text-gray-800 w-full flex flex-col">
      <Navbar />

      <section className="text-center py-12 px-6 sm:px-12 lg:px-24 mx-auto max-w-6xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Find Your Perfect Place
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
          Swipe through listings to discover your next home powered by AI.
        </p>
      </section>

      {/* Swipeable cards container */}
      <section
        className="relative px-6 sm:px-12 lg:px-24 max-w-full mx-auto flex-grow overflow-hidden"
        style={{ paddingBottom: "60px", position: "relative", height: "calc(100% - 180px)" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={properties[index].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full cursor-grab h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            style={{ width: "100%", height: "100%" }}
          >
            <PropertyCard property={properties[index]} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Like and Dislike Buttons */}
      <div
        style={{
          marginBottom: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => next(-1)}
          className="
            px-6 py-3 bg-white text-red-600 font-semibold rounded-xl
            shadow-md border border-red-600
            hover:bg-red-50 transition duration-300
            focus:outline-none focus:ring-2 focus:ring-red-400
          "
        >
          Dislike
        </button>
        <button
          onClick={() => next(1)}
          className="
            px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl
            shadow-md border border-indigo-600
            hover:bg-indigo-50 transition duration-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400
          "
        >
          Like
        </button>
      </div>
    </div>
  );
}
