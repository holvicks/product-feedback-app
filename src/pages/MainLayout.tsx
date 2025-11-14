import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import FeedbackList from "../components/Feedback/FeedbackList";
import { useFeedback } from "../hooks";
import type { Comment } from "../types";
import type { SortValue } from "../components/SortDropdown";
import MobileSidebar from "../components/MobileSidebar";

export default function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data } = useFeedback();
  const [sort, setSort] = useState<SortValue>("upvotes_desc");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

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
    <div className="mx-10 min-h-screen mt-6 flex lg:flex-row md:flex-col gap-4">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-between px-6">
        <div>
          <h2 className="text-xl font-bold">Frontend Mentor</h2>
          <h4 className="text-sm opacity-90">Feedback Board</h4>
        </div>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-md bg-white/20 px-3 py-2 text-white hover:bg-white/30"
        >
          {mobileOpen ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Sidebar overlay */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={(c) => {
          setSelectedCategory(c);
          setMobileOpen(false);
        }}
        roadmapCounts={roadmapCounts}
      />
      {/* Sidebar (hidden on small screens) */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={(c) => {
          setSelectedCategory(c);
          console.log("Selected category:", c);
        }}
        roadmapCounts={roadmapCounts}
      />
      {/* Main Content Area */}
      <div className=" flex flex-col mx-auto w-full">
        {/* Navbar */}
        <header className=" text-white p-4 mt-20 md:mt-0 flex-wrap ">
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
