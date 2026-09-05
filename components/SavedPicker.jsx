"use client";

export default function SavedPicker({ label, records, onSelect }) {
  if (!records || records.length === 0) return null;
  return (
    <div className="mb-2">
      <label className="block text-xs text-slate mb-1">{label}</label>
      <select
        className="w-full border border-border rounded px-2 py-1.5 text-sm bg-white"
        defaultValue=""
        onChange={(e) => {
          const rec = records.find((r) => r.id === e.target.value);
          if (rec) onSelect(rec);
          e.target.value = "";
        }}
      >
        <option value="" disabled>
          Load saved…
        </option>
        {records.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}
