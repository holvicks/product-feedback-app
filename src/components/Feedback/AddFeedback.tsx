import { useState } from "react";
import { useCreateComment } from "../../hooks";

type AddFeedbackProps = {
  onSubmit?: (data: {
    title: string;
    category: string;
    detail: string;
  }) => void;
  // Optional productId to enable creating a comment via API
  productId?: string;
};

export default function AddFeedback({ onSubmit, productId }: AddFeedbackProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Feature");
  const [detail, setDetail] = useState("");
  const DEFAULT_PRODUCT_ID =
    import.meta.env.VITE_DEFAULT_PRODUCT_ID ??
    "679e3f91-3440-4b63-9685-45ba8bf17efc";
  const createCommentMutation = useCreateComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ title, category, detail });
    const pid = productId ?? DEFAULT_PRODUCT_ID;
    if (pid && detail.trim()) {
      createCommentMutation.mutate({
        productId: pid,
        description: detail,
        title,
        category,
      });
    }
    setOpen(false);
  };

  return (
    <>
      <button
        className="inline-flex items-center justify-center rounded-lg bg-[#AD1FEA] px-4 py-2 text-sm font-semibold text-white hover:bg-[#C75AF6]"
        onClick={() => setOpen(true)}
      >
        + Add Feedback
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          aria-labelledby="add-feedback-title"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* modal card */}
          <div className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <h2
              id="add-feedback-title"
              className="text-2xl font-bold text-[#3A4374] mb-6"
            >
              Create New Feedback
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 text-[#3A4374]">
              <div>
                <label className="block text-sm font-semibold text-[#3A4374] mb-2">
                  Feedback Title
                </label>
                <p className="text-sm text-[#647196] mb-3">
                  Add a short, descriptive headline
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md bg-[#F7F8FD] px-3 py-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3A4374] mb-2">
                  Category
                </label>
                <p className="text-sm text-[#1c2232] mb-3">
                  Choose a category for your feedback
                </p>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-md bg-[#F7F8FD] px-3 py-3 pr-10 text-[#3A4374] outline-none focus:ring-2 focus:ring-[#AD1FEA] overflow-x-hidden
                    "
                  >
                    <option>Feature</option>
                    <option>UI</option>
                    <option>UX</option>
                    <option>Enhancement</option>
                    <option>Bug</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4661E6]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3A4374] mb-2">
                  Feedback Detail
                </label>
                <p className="text-sm text-[#647196] mb-3">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  rows={3}
                  className="w-full rounded-md bg-[#F7F8FD] px-3 py-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-[#3A4374] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4C5A97]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-[#AD1FEA] px-4 py-2 text-sm font-semibold text-white hover:bg-[#C75AF6]"
                >
                  Add Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
