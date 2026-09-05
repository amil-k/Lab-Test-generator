"use client";

import SavedPicker from "./SavedPicker";
import Section from "./Section";

const inputCls =
  "w-full border border-border rounded px-2.5 py-1.5 text-sm bg-white focus:outline-teal focus:border-teal";
const labelCls = "block text-xs text-slate mt-2 mb-1";

export default function ClinicForm({ clinic, setClinic, saved }) {
  const set = (field) => (e) => setClinic({ ...clinic, [field]: e.target.value });

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setClinic({ ...clinic, logo: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <Section label="Clinic">
      <SavedPicker label="Reuse a saved clinic" records={saved} onSelect={setClinic} />

      <label className={labelCls}>Clinic name</label>
      <input className={inputCls} value={clinic.name || ""} onChange={set("name")} placeholder="ABC Clinic" />

      <label className={labelCls}>Clinic logo</label>
      <div className="flex items-center gap-3">
        {clinic.logo && (
          <img src={clinic.logo} alt="Clinic logo" className="h-10 w-10 object-contain border border-border rounded" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="text-xs text-slate file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-border file:bg-white file:text-xs file:font-semibold file:text-teal-dark"
        />
        {clinic.logo && (
          <button
            type="button"
            onClick={() => setClinic({ ...clinic, logo: undefined })}
            className="text-xs text-slate hover:text-red-600"
          >
            Remove
          </button>
        )}
      </div>

      <label className={labelCls}>Address</label>
      <input className={inputCls} value={clinic.address || ""} onChange={set("address")} placeholder="Street, City" />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Phone</label>
          <input className={inputCls} value={clinic.phone || ""} onChange={set("phone")} />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input className={inputCls} value={clinic.email || ""} onChange={set("email")} />
        </div>
      </div>
    </Section>
  );
}
