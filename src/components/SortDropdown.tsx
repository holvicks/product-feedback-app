import { useState } from "react";

export type SortValue =
  | "upvotes_desc"
  | "upvotes_asc"
  | "comments_desc"
  | "comments_asc";

interface SortDropdownProps {
  value?: SortValue;
  onChange?: (value: SortValue) => void;
}

const options: { label: string; value: SortValue }[] = [
  { label: "Most Upvotes", value: "upvotes_desc" },
  { label: "Least Upvotes", value: "upvotes_asc" },
  { label: "Most Comments", value: "comments_desc" },
  { label: "Least Comments", value: "comments_asc" },
];

export default function SortDropdown({ value = "upvotes_desc", onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SortValue>(value);

  const currentLabel = options.find((o) => o.value === selected)?.label ?? "Most Upvotes";

  const select = (v: SortValue) => {
    setSelected(v);
    setOpen(false);
    onChange?.(v);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-[#3A4374] text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-[#2E3566] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="opacity-80">Sort by:</span>
        <span>{currentLabel}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.243a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-10"
        >
          <ul className="py-1">
            {options.map((opt) => {
              const active = selected === opt.value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => select(opt.value)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm ${
                      active ? "text-[#AD1FEA]" : "text-[#647196]"
                    } hover:bg-[#F7F8FD]`}
                  >
                    {opt.label}
                    {active && (
                      <svg className="h-4 w-4 text-[#AD1FEA]" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 00-1.408-1.414l-7.004 7.004-3.004-3.004a1 1 0 10-1.414 1.414l3.71 3.71a1 1 0 001.414 0l7.706-7.71z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}