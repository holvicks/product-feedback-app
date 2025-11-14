import type { FC } from "react";

type FeedbackItemProps = {
  title: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
  onUpvote?: () => void;
  onClick?: () => void;
  className?: string;
};

const FeedbackItem: FC<FeedbackItemProps> = ({
  title,
  description,
  category,
  upvotes,
  comments,
  onUpvote,
  onClick,
  className = "",
}) => {
  return (
    <article
      className={`flex flex-wrap items-center justify-between rounded-2xl bg-white p-6 shadow-sm cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Left: Upvote pill */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onUpvote?.();
        }}
        className="flex w-14 select-none flex-col items-center justify-center rounded-xl bg-[#F7F8FD] px-2 py-2 text-[#3A4374] hover:bg-[#E3E7FF]"
        aria-label="Upvote"
      >
        <svg
          aria-hidden="true"
          className="h-3 w-3 text-[#4661E6]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 5l6 6H4l6-6z" />
        </svg>
        <span className="mt-1 text-sm font-bold">{upvotes}</span>
      </button>

      {/* Middle: description */}
      <div className="mx-6 flex-1 min-w-0">
        <h3 className="truncate text-lg font-bold text-[#3A4374]">{title}</h3>
        <p className="mt-1 text-[#647196]">{description}</p>
        <span className="mt-3 inline-flex rounded-xl bg-[#F7F8FD] px-3 py-1 text-sm font-semibold text-[#4661E6]">
          {category}
        </span>
      </div>

      {/* Right: Comments count */}
      <div className="flex items-center gap-2 text-[#3A4374]">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-[#CDD2EE]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 5a3 3 0 013-3h10a3 3 0 013 3v9a3 3 0 01-3 3H9l-5 4V5z" />
        </svg>
        <span className="text-base font-bold">{comments}</span>
      </div>
    </article>
  );
};

export default FeedbackItem;
