"use client";

export default function Section({ label, children }) {
  return (
    <div className="relative rounded-lg p-4 pt-5 bg-white mb-4 shadow-[0_1px_2px_rgba(28,42,57,0.06),0_1px_8px_rgba(28,42,57,0.04)] border border-[#EAEBEC]">
      <span className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] font-semibold uppercase tracking-wide text-teal-dark">
        {label}
      </span>
      {children}
    </div>
  );
}
