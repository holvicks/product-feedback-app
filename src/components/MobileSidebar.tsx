import { useEffect, useRef } from "react";
import CategoryTags from "./sidebar/CategoryTags";
import Roadmap from "./sidebar/Roadmap";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  roadmapCounts?: { planned: number; inProgress: number; live: number };
};

export default function MobileSidebar({
  open,
  onClose,
  selectedCategory,
  onCategoryChange,
  roadmapCounts,
}: Readonly<MobileSidebarProps>) {
  const panelRef = useRef<HTMLDivElement>(null);

  // accessibility: close with ESC and trap initial focus
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    el?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-sidebar-title"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* top gradient header */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-between px-6 flex-wrap">
        <div>
          <h2 id="mobile-sidebar-title" className="text-xl font-bold">
            Frontend Mentor
          </h2>
          <h4 className="text-sm opacity-90">Feedback Board</h4>
        </div>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-md bg-white/20 px-3 py-2 text-white hover:bg-white/30"
        >
          {/* X icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* sliding panel from right */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-80 max-w-[22rem] bg-[#F7F8FD] pt-24 pb-8 px-4 overflow-y-auto shadow-xl focus:outline-none transform transition-transform duration-300 translate-x-0"
      >
        {/* category tags card */}
        <div className="bg-white rounded-xl p-6 mb-4">
          <CategoryTags
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {/* roadmap card */}
        <div className="bg-white rounded-xl p-6">
          <Roadmap
            plannedCount={roadmapCounts?.planned ?? 0}
            inProgressCount={roadmapCounts?.inProgress ?? 0}
            liveCount={roadmapCounts?.live ?? 0}
          />
        </div>
      </div>
    </div>
  );
}