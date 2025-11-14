import { useEffect, useMemo, useRef, memo } from "react";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductComments } from "../../utils/api";
import type { Comment } from "../../types";

type StringRecord = Record<string, string | number | null | undefined>;

export interface Reply extends StringRecord {
  id?: string;
  content?: string;
}

interface FeedbackDetailModalProps {
  open: boolean;
  item: Comment | null;
  onClose: () => void;
  productId?: string;
}

// Helper to extract replies from the API response structure
const extractReplies = (
  comments: any[] | undefined,
  item: Comment | null
): Reply[] => {
  if (!Array.isArray(comments)) return [];
  // Try to match the selected item by id or title
  const match = comments.find((c) => {
    const idMatch = item?.id && c?.id && String(c.id) === String(item.id);
    const titleMatch =
      item?.title && c?.title && String(c.title) === String(item.title);
    return idMatch || titleMatch;
  });
  const r = (match?.replies ?? match?.comments ?? []) as any[];
  return Array.isArray(r) ? (r as Reply[]) : [];
};

const ReplyItem = memo(({ reply }: { reply: Reply }) => {
  const otherStringFields = useMemo(() => {
    const entries = Object.entries(reply ?? {});
    return entries
      .filter(
        ([k, v]) => k !== "id" && k !== "content" && typeof v === "string"
      )
      .map(([k, v]) => ({ key: k, value: String(v) }));
  }, [reply]);

  return (
    <div className="rounded-xl bg-[#F7F8FD] p-4">
      <p className="text-[#3A4374] text-sm">
        {reply?.content && String(reply.content).trim().length > 0
          ? String(reply.content)
          : "No reply content provided."}
      </p>
      {otherStringFields.length > 0 && (
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#647196]">
          {otherStringFields.map((f) => (
            <div key={f.key} className="flex gap-1">
              <dt className="font-semibold capitalize">{f.key}:</dt>
              <dd className="truncate">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
});

const FeedbackDetailModal: FC<FeedbackDetailModalProps> = ({
  open,
  item,
  onClose,
  productId,
}) => {
  const DEFAULT_PRODUCT_ID =
    import.meta.env.VITE_DEFAULT_PRODUCT_ID ??
    "679e3f91-3440-4b63-9685-45ba8bf17efc";
  const pid = productId ?? DEFAULT_PRODUCT_ID;

  // fetch comments to compute replies for the selected item
  const { data, isLoading, error } = useQuery<any[]>({
    queryKey: ["comments", pid, "modal"],
    queryFn: () => fetchProductComments(String(pid)),
    enabled: open && !!pid,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  const replies: Reply[] = useMemo(
    () => extractReplies(data, item),
    [data, item]
  );

  // accessibility: focus trap and ESC to close
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const el = modalRef.current;
    if (el) {
      // focus first focusable element
      const focusables = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusables[0]?.focus();
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const el = modalRef.current;
        if (!el) return;
        const nodes = el.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-detail-title"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl focus:outline-none"
        tabIndex={-1}
      >
        <div className="flex items-start justify-between">
          <h2
            id="feedback-detail-title"
            className="text-2xl font-bold text-[#3A4374]"
          >
            {item?.title ?? "Feedback"}
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="inline-flex items-center justify-center rounded-lg bg-[#3A4374] px-3 py-2 text-sm font-semibold text-white hover:bg-[#4C5A97]"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* description */}
        <p className="mt-3 text-[#647196]">
          {item?.content || item?.detail || item?.description
            ? String(item?.content ?? item?.detail ?? item?.description)
            : "No description provided."}
        </p>

        {/* category & upvotes */}
        <div className="mt-4 flex items-center gap-4">
          <span className="inline-flex rounded-xl bg-[#F7F8FD] px-3 py-1 text-sm font-semibold text-[#4661E6]">
            {item?.category ?? "Uncategorized"}
          </span>
          <div className="flex items-center gap-1 text-[#3A4374]">
            <svg
              aria-hidden="true"
              className="h-3 w-3 text-[#4661E6]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 5l6 6H4l6-6z" />
            </svg>
            <span className="text-sm font-bold">
              {typeof item?.upvotes === "number" ? item?.upvotes : 0}
            </span>
          </div>
        </div>

        {/* replies section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-[#3A4374]">Replies</h3>
          {isLoading && (
            <div className="mt-3 text-[#647196]">Loading replies...</div>
          )}
          {error && (
            <div className="mt-3 text-red-600">Failed to load replies.</div>
          )}
          {!isLoading && !error && replies.length === 0 && (
            <div className="mt-3 text-[#647196]">No replies found.</div>
          )}
          {!isLoading && !error && replies.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {replies.map((r, idx) => (
                <ReplyItem key={r.id ?? idx} reply={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailModal;
