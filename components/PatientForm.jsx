"use client";

import Section from "./Section";

const inputCls =
  "w-full border border-border rounded px-2.5 py-1.5 text-sm bg-white focus:outline-teal focus:border-teal";
const labelCls = "block text-xs text-slate mt-2 mb-1";

export default function PatientForm({ patient, setPatient }) {
  const set = (field) => (e) => setPatient({ ...patient, [field]: e.target.value });

  return (
    <Section label="Patient">
      <label className={labelCls}>Patient name</label>
      <input className={inputCls} value={patient.name || ""} onChange={set("name")} placeholder="Full name" />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Age</label>
          <input type="number" min="0" className={inputCls} value={patient.age || ""} onChange={set("age")} />
        </div>
        <div>
          <label className={labelCls}>Gender</label>
          <select className={inputCls} value={patient.gender || ""} onChange={set("gender")}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <label className={labelCls}>Address</label>
      <input className={inputCls} value={patient.address || ""} onChange={set("address")} />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Phone</label>
          <input className={inputCls} value={patient.phone || ""} onChange={set("phone")} />
        </div>
        <div>
          <label className={labelCls}>Patient ID</label>
          <input className={inputCls} value={patient.patientId || ""} onChange={set("patientId")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Date</label>
          <input type="date" className={inputCls} value={patient.date || ""} onChange={set("date")} />
        </div>
        <div>
          <label className={labelCls}>Sample collection date</label>
          <input type="date" className={inputCls} value={patient.sampleDate || ""} onChange={set("sampleDate")} />
        </div>
      </div>
    </Section>
  );
}
