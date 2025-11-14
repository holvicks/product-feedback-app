import React from "react";

interface CategoryTagsProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const categories = [
  { name: "All", value: "all" },
  { name: "UI", value: "ui" },
  { name: "UX", value: "ux" },
  { name: "Enhancement", value: "enhancement" },
  { name: "Bug", value: "bug" },
  { name: "Feature", value: "feature" },
];

const CategoryTags: React.FC<CategoryTagsProps> = ({
  selectedCategory = "all",
  onCategoryChange,
}) => {
  const handleCategoryClick = (categoryValue: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryValue);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          type="button"
          key={category.value}
          className={`inline-flex items-center justify-center h-10 px-5 rounded-full text-base font-semibold leading-none cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4661E6]/30 ${
            selectedCategory === category.value
              ? "bg-[#4661E6] text-white"
              : "bg-[#F2F4FF] text-[#4461E6] hover:bg-[#DFE3FF]"
          }`}
          onClick={() => handleCategoryClick(category.value)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTags;
