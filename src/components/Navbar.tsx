import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onSortChange: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSortChange }) => {
  return (
    <nav className="bg-[#373F68] text-white flex items-center justify-between px-6 py-4 rounded-xl">
      <div className="flex items-center gap-6">
        <h2 className="font-bold text-lg">3 Suggestions</h2>

        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Sort by:</span>
          <select
            className="bg-transparent text-white font-medium focus:outline-none"
            defaultValue="most-updates"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="most-updates">Most Updates</option>
            <option value="least-updates">Least Updates</option>
            <option value="most-comments">Most Comments</option>
            <option value="least-comments">Least Comments</option>
          </select>
        </div>
      </div>
     <Link to="/new-feedback">
      <button className="bg-[#AD1FEA] hover:bg-[#C75AF6] transition text-white font-semibold py-2 px-4 rounded-lg text-sm">
        + Add Feedback
      </button>
      </Link>
    </nav>
  );

};

export default Navbar;
