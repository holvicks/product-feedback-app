import SortDropdown from "./SortDropdown";
import type { SortValue } from "./SortDropdown";
import AddFeedback from "./Feedback/AddFeedback";

type NavBarProps = {
  suggestionCount?: number;
  sortValue?: SortValue;
  onSortChange?: (value: SortValue) => void;
};

const NavBar = ({
  suggestionCount = 0,
  sortValue = "upvotes_desc",
  onSortChange,
}: NavBarProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#3A4374] text-white px-6 py-4">
      <div className="flex items-center gap-6">
        <div className="h-6 w-6 rounded-full bg-white/20" aria-hidden="true" />
        <h2 className="text-lg font-bold">{suggestionCount} Suggestions</h2>
        <SortDropdown value={sortValue} onChange={onSortChange} />
      </div>
      <AddFeedback />
    </div>
  );
};

export default NavBar;
