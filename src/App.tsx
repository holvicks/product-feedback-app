import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import FeedbackList from "./components/FeedbackList";
import { IoIosArrowUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";

const App: React.FC = () => {
  const [sortOption, setSortOption] = useState("Most Upvotes");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FD] p-4 md:p-20">
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-6">

        <div
  className="
    hidden md:grid md:grid-cols-3 md:gap-4  
    lg:flex lg:flex-col lg:w-1/4 lg:gap-6   
  "
>
  <Navbar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
</div>

        {/* MOBILE NAV HEADER */}
        <div className="md:hidden bg-gradient-to-r from-[#AD1FEA] via-[#4661E6] to-[#37D5D6] text-white p-4 flex justify-between items-center rounded-xl">
          <div>
            <h2 className="font-bold text-lg">Frontend Mentor</h2>
            <p className="opacity-80 text-sm">Feedback Board</p>
          </div>

          <button onClick={() => setMobileMenuOpen(true)}  className="cursor-pointer">
            <GiHamburgerMenu />
          </button>
        </div>

        {/* MOBILE SLIDE MENU */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="flex-1 bg-black opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            ></div>

            {/* Slide Menu Panel */}
            <div className="w-64 bg-white p-6 h-full overflow-y-auto transition-all shadow-lg">
              <div className="flex justify-end mb-6 cursor-pointer">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <IoClose />
                </button>
              </div>

              <Navbar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-6">
          <div className="bg-[#373F68] text-white rounded-xl flex justify-between items-center p-4 md:p-6">
            <div className="flex items-center gap-4">
              <img src="src/assets/bulb.svg" alt="Light bulb" className="w-6 h-6" />

              <span className="hidden sm:inline font-bold text-sm md:text-base">
                6 Suggestions
              </span>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-sm opacity-80 flex items-center gap-2 cursor-pointer"
                >
                  <span className="hidden sm:inline">Sort by:</span>
                  <span className="font-semibold text-white">{sortOption}</span>
                  <IoIosArrowUp
                    className={`text-xs transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-8 left-0 mt-2 bg-white shadow-lg rounded-lg w-48 p-2 z-50">
                    {[
                      "Most Upvotes",
                      "Least Upvotes",
                      "Most Comments",
                      "Least Comments",
                    ].map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setDropdownOpen(false);
                        }}
                        className={`px-3 py-2 rounded-md cursor-pointer text-sm ${
                          sortOption === option
                            ? "text-[#AD1FEA] font-semibold"
                            : "text-gray-700"
                        } hover:bg-gray-100`}
                      >
                        {option}
                      </div>
                    ))}

                    <IoMdCheckmark className="" />
                  </div>
                )}
              </div>
            </div>

            <Link to="/addfeedback">
              <button className="bg-[#AD1FEA] hover:bg-[#C75AF6] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm">
                + Add Feedback
              </button>
            </Link>
          </div>

          <FeedbackList activeFilter={activeFilter} sortOption={sortOption} />
        </main>
      </div>
    </div>
  );
};

export default App;
