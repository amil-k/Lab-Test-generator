"use client";

import { useMemo, useState } from "react";
import { TEST_CATALOG } from "@/lib/testCatalog";
import Section from "./Section";

export default function TestSelector({ selectedTests, setSelectedTests, customTests, setCustomTests }) {
  const [query, setQuery] = useState("");
  const [customInput, setCustomInput] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const entries = Object.entries(TEST_CATALOG);
    if (!q) return entries;
    return entries
      .map(([cat, tests]) => [cat, tests.filter((t) => t.toLowerCase().includes(q))])
      .filter(([, tests]) => tests.length > 0);
  }, [query]);

  const toggleTest = (test) => {
    const next = new Set(selectedTests);
    next.has(test) ? next.delete(test) : next.add(test);
    setSelectedTests(next);
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (!val) return;
    setCustomTests([...customTests, val]);
    setCustomInput("");
  };

  return (
    <Section label="Tests">
      <input
        className="w-full border border-border rounded px-2.5 py-1.5 text-sm bg-white mb-2 focus:outline-teal focus:border-teal"
        placeholder="Search tests (e.g. thyroid, blood)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="max-h-72 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <p className="text-sm italic text-stone-400">No tests match &quot;{query}&quot;</p>
        )}
        {filtered.map(([category, tests]) => (
          <div key={category} className="mb-1.5">
            <div className="text-xs font-semibold flex justify-between py-1">
              <span>{category}</span>
              <span className="text-slate font-normal">{tests.length}</span>
            </div>
            <div>
              {tests.map((test) => (
                <label
                  key={test}
                  className="flex items-center gap-2 text-sm px-1.5 py-1 rounded hover:bg-stone-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-teal"
                    checked={selectedTests.has(test)}
                    onChange={() => toggleTest(test)}
                  />
                  {test}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 mt-2">
        <input
          className="flex-1 border border-border rounded px-2.5 py-1.5 text-sm bg-white focus:outline-teal focus:border-teal"
          placeholder="Add a custom test..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustom()}
        />
        <button
          type="button"
          onClick={addCustom}
          className="text-xs font-semibold text-teal-dark border border-border rounded px-3 hover:border-teal"
        >
          Add
        </button>
      </div>

      {customTests.length > 0 && (
        <ul className="mt-2 text-sm space-y-1">
          {customTests.map((t, i) => (
            <li key={i} className="flex justify-between items-center">
              <span>☑ {t} (custom)</span>
              <button
                type="button"
                onClick={() => setCustomTests(customTests.filter((_, idx) => idx !== i))}
                className="text-xs text-slate hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
