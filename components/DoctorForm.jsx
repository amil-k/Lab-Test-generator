"use client";

import SavedPicker from "./SavedPicker";
import Section from "./Section";

const inputCls =
  "w-full border border-border rounded px-2.5 py-1.5 text-sm bg-white focus:outline-teal focus:border-teal";
const labelCls = "block text-xs text-slate mt-2 mb-1";

export default function DoctorForm({ doctor, setDoctor, saved }) {
  const set = (field) => (e) => setDoctor({ ...doctor, [field]: e.target.value });

  return (
    <Section label="Referring doctor">
      <SavedPicker label="Reuse a saved doctor" records={saved} onSelect={setDoctor} />

      <label className={labelCls}>Doctor's name</label>
      <input className={inputCls} value={doctor.name || ""} onChange={set("name")} placeholder="Dr. ..." />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Department / specialization</label>
          <input className={inputCls} value={doctor.department || ""} onChange={set("department")} />
        </div>
        <div>
          <label className={labelCls}>Registration no.</label>
          <input className={inputCls} value={doctor.registrationNumber || ""} onChange={set("registrationNumber")} />
        </div>
      </div>

      <label className={labelCls}>Contact</label>
      <input className={inputCls} value={doctor.contact || ""} onChange={set("contact")} placeholder="Phone or email" />
    </Section>
  );
}
