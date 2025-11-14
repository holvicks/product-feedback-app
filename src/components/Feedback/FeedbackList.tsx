import { useState, type FC } from "react";
import FeedbackItem from "./FeedbackItem";
import EmptyPage from "./EmptyPage";
import { useFeedback } from "../../hooks";
import type { Comment } from "../../types";
import type { SortValue } from "../SortDropdown";
import FeedbackDetailModal from "./FeedbackDetailModal";

type FeedbackListProps = {
  selectedCategory?: string;
  sort?: SortValue;
};

const FeedbackList: FC<FeedbackListProps> = ({
  selectedCategory = "all",
  sort = "upvotes_desc",
}) => {
  const { data, isLoading, error } = useFeedback();
  const [selectedItem, setSelectedItem] = useState<Comment | null>(null);

  if (isLoading)
    return <div className="text-[#647196]">Loading feedback...</div>;
  if (error)
    return <div className="text-red-600">Failed to load feedback.</div>;

  const items: Comment[] = data ?? [];
  const selected = String(selectedCategory || "all").toLowerCase();
  const filtered =
    selected === "all"
      ? items
      : items.filter(
          (f: Comment) => String(f.category).toLowerCase() === selected
        );

  if (filtered.length === 0) return <EmptyPage />;

  const getCommentCount = (f: Comment): number => {
    return Array.isArray(f.comments)
      ? f.comments.length
      : Array.isArray((f as any).replies)
        ? (f as any).replies.length
        : typeof f.comments === "number"
          ? f.comments
          : 0;
  };

  const sorted = [...filtered].sort((a, b) => {
    const ua = typeof a.upvotes === "number" ? a.upvotes : 0;
    const ub = typeof b.upvotes === "number" ? b.upvotes : 0;
    const ca = getCommentCount(a);
    const cb = getCommentCount(b);
    switch (sort) {
      case "upvotes_asc":
        return ua - ub;
      case "comments_desc":
        return cb - ca;
      case "comments_asc":
        return ca - cb;
      case "upvotes_desc":
      default:
        return ub - ua;
    }
  });

  return (
    <div className="flex flex-col gap-4 flex-wrap">
      {sorted.map((f: Comment) => (
        <FeedbackItem
          key={(f.id as string) ?? f.title}
          title={f.title}
          description={f.content ?? f.detail ?? f.description ?? ""}
          category={f.category ?? ""}
          upvotes={typeof f.upvotes === "number" ? f.upvotes : 0}
          comments={getCommentCount(f)}
          onClick={() => setSelectedItem(f)}
        />
      ))}

      <FeedbackDetailModal
        open={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default FeedbackList;
