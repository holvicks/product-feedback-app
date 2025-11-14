import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import FeedbackList from "../components/Feedback/FeedbackList";
import { useFeedback } from "../hooks";
import type { Comment } from "../types";
import type { SortValue } from "../components/SortDropdown";

export default function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data } = useFeedback();
  const [sort, setSort] = useState<SortValue>("upvotes_desc");

  const roadmapCounts = useMemo(() => {
    const feedback: Comment[] = data ?? [];
    const acc: { planned: number; inProgress: number; live: number } = {
      planned: 0,
      inProgress: 0,
      live: 0,
    };
    for (const item of feedback) {
      const status = String(item.status || "").toLowerCase();
      if (status === "planned") acc.planned += 1;
      else if (status === "in-progress") acc.inProgress += 1;
      else if (status === "live") acc.live += 1;
    }
    return acc;
  }, [data]);

  const suggestionCount = useMemo(() => {
    const feedback: Comment[] = data ?? [];
    const selected = String(selectedCategory || "all").toLowerCase();
    const filtered =
      selected === "all"
        ? feedback
        : feedback.filter((f) => String(f.category).toLowerCase() === selected);
    return filtered.length;
  }, [data, selectedCategory]);

  return (
    <div className="mx-10 h-screen mt-16 flex lg:flex-row md:flex-col gap-4">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={(c) => {
          setSelectedCategory(c);
          console.log("Selected category:", c);
        }}
        roadmapCounts={roadmapCounts}
      />
      {/* Main Content Area */}
      <div className=" flex flex-col">
        {/* Navbar */}
        <header className=" text-white p-4">
          <NavBar
            suggestionCount={suggestionCount}
            sortValue={sort}
            onSortChange={setSort}
          />
        </header>

        {/* Main Body */}
        <main className="flex-1 p-6 bg-gray-100">
          <FeedbackList selectedCategory={selectedCategory} sort={sort} />
        </main>
      </div>
    </div>
  );
}
