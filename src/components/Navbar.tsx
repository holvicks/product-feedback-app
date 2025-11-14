import React from "react";
import { useFeedbacks } from "../hooks/useFetchFeedback";

interface NavbarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterTags: string[] = [
  "All",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
  "Feature",
];

const roadmapItems = [
  { label: "Planned", color: "bg-[#F49F85]" },
  { label: "In-Progress", color: "bg-[#AD1FEA]" },
  { label: "Live", color: "bg-[#62BCFA]" },
];

const Navbar: React.FC<NavbarProps> = ({ activeFilter, onFilterChange }) => {
  const { feedbacks } = useFeedbacks();

  const statusCounts = {
    planned: feedbacks.filter((f) => f.status === "Planned").length,
    inProgress: feedbacks.filter((f) => f.status === "In-Progress").length,
    live: feedbacks.filter((f) => f.status === "Live").length,
  };

  return (
    <div className="flex flex-col lg:flex-col gap-6 md:contents">
    <div className="rounded-none md:rounded-xl bg-gradient-to-r from-[#AD1FEA] via-[#4661E6] to-[#37D5D6] p-6 text-white hidden md:block"> 
  <div className="mb-2 "> 
    <h2 className="text-lg font-bold">Frontend Mentor</h2>
    <p className="text-sm opacity-90">Feedback Board</p>
  </div> 
</div>

      {/* FILTER TAGS */}
      <div className="bg-white rounded-xl p-6 flex flex-wrap gap-2">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterChange(tag)}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer
                ${
                  activeFilter === tag
                    ? "bg-[#4661E6] text-white"
                    : "bg-[#F2F4FF] text-[#4661E6] hover:bg-[#CFD7FF]"
                }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ROADMAP */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Roadmap</h3>
          <button className="text-[#4661E6] text-sm font-semibold hover:underline">
            View
          </button>
        </div>

        <ul className="space-y-3">
          {roadmapItems.map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="text-gray-600">{item.label}</span>
              </div>
              <span className="font-bold text-gray-600">
                {item.label === "Planned" && statusCounts.planned}
                {item.label === "In-Progress" && statusCounts.inProgress}
                {item.label === "Live" && statusCounts.live}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
