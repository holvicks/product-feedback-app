import CategoryTags from "./sidebar/CategoryTags";
import Roadmap from "./sidebar/Roadmap";

type SidebarProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  roadmapCounts?: { planned: number; inProgress: number; live: number };
};

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  roadmapCounts,
}: Readonly<SidebarProps>) {
  return (
    <aside className="md:w-full px-2 flex md:flex-row md:items-stretch lg:flex-col lg:w-100 flex-row gap-6 md:gap-4 transition-all duration-300">
      {/* frontend mentor card */}
      <div className="pb-20 px-6 pt-24 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white sm:hidden">
        <h2 className="text-3xl font-bold">Frontend Mentor</h2>
        <h4>Feedback Board</h4>
      </div>

      {/* category tags card */}
      <div className=" bg-white rounded-xl p-6 md:w-80 md:pt-16">
        <CategoryTags
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      {/* roadmap */}
      <div className="bg-white rounded-xl p-6 md:p-4 md:w-80">
        <Roadmap
          plannedCount={roadmapCounts?.planned ?? 0}
          inProgressCount={roadmapCounts?.inProgress ?? 0}
          liveCount={roadmapCounts?.live ?? 0}
        />
      </div>
    </aside>
  );
}
