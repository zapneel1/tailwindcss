import React from "react";
import { Heart, Users, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-[#f3f4f6] shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12 py-4">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <span role="img" aria-label="logo">🏠</span>
          <span>Mansio AI</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-8 text-sm font-medium text-gray-800">
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none outline-none focus:outline-none">
            <Search size={18} />
            <span>Discover</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none outline-none focus:outline-none">
            <Heart size={18} />
            <span>Likes</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200 bg-transparent border-none outline-none focus:outline-none">
            <Users size={18} />
            <span>Matches</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
