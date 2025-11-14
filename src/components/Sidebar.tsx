import React from "react";

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <aside className="w-full md:w-64  flex flex-col gap-6 md:flex-row">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 pt-20 rounded-xl">
        <h2 className="font-bold text-lg leading-tight">Frontend Mentor</h2>
        <p className="text-sm opacity-80">Feedback Board</p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="bg-white p-4 rounded-xl flex flex-wrap gap-2">
        {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedCategory(tag)}
            className={`px-3 py-1 text-sm font-semibold rounded-lg ${
              selectedCategory === tag
                ? "bg-[#4661E6] text-white"
                : "bg-gray-100 text-[#4661E6] hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ROADMAP */}
      <div className="bg-white p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-[#3A4374]">Roadmap</h3>
          <button className="text-[#4661E6] text-sm font-semibold hover:underline">
            View
          </button>
        </div>

        <ul className="text-sm text-[#647196] space-y-2">
          <li className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#F49F85] rounded-full"></span>
              Planned
            </span>
            <span className="font-bold text-[#3A4374]">2</span>
          </li>

          <li className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#AD1FEA] rounded-full"></span>
              In-Progress
            </span>
            <span className="font-bold text-[#3A4374]">3</span>
          </li>

          <li className="flex justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#62BCFA] rounded-full"></span>
              Live
            </span>
            <span className="font-bold text-[#3A4374]">1</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
