"use client";

function fmtDate(v) {
  if (!v) return "";
  const d = new Date(v + "T00:00:00");
  if (isNaN(d)) return v;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Preview({ clinic, patient, doctor, selectedTests, customTests, notes }) {
  const allTests = [...selectedTests, ...customTests.map((t) => `${t} (custom)`)];

  return (
    <div
      id="a4-preview"
      className="bg-white shadow-[0_6px_24px_rgba(28,42,57,0.16)] font-doc text-[#161f29]"
      style={{ width: "210mm", minHeight: "297mm", padding: "16mm" }}
    >
      <div className="flex justify-between items-start border-b-2 border-teal-dark pb-2.5 mb-4">
        <div className="flex items-start gap-3">
          {clinic.logo && (
            <img src={clinic.logo} alt="" className="h-14 w-14 object-contain" />
          )}
          <div>
            <div className="text-xl font-bold">{clinic.name || "Clinic name"}</div>
            <div className="text-[11.5px] text-[#4a5560] mt-1 leading-relaxed">
              {clinic.address && <div>{clinic.address}</div>}
              {[clinic.phone, clinic.email].filter(Boolean).join("  |  ")}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm font-sans font-bold tracking-wide text-teal-dark my-4">
        LABORATORY TEST REQUISITION FORM
      </div>

      <div className="grid grid-cols-2 gap-x-6 mb-3">
        <div>
          <div className="doc-field"><span className="l">Patient name</span><span className="v">{patient.name || "—"}</span></div>
          <div className="doc-field"><span className="l">Age / Gender</span><span className="v">{patient.age || "—"} / {patient.gender || "—"}</span></div>
          <div className="doc-field"><span className="l">Address</span><span className="v">{patient.address || "—"}</span></div>
          <div className="doc-field"><span className="l">Phone</span><span className="v">{patient.phone || "—"}</span></div>
          <div className="doc-field"><span className="l">Patient ID</span><span className="v">{patient.patientId || "—"}</span></div>
        </div>
        <div>
          <div className="doc-field"><span className="l">Date</span><span className="v">{fmtDate(patient.date) || "—"}</span></div>
          <div className="doc-field"><span className="l">Sample collected</span><span className="v">{fmtDate(patient.sampleDate) || "—"}</span></div>
          <div className="doc-field"><span className="l">Referring doctor</span><span className="v">{doctor.name || "—"}</span></div>
        </div>
      </div>

      <div className="text-[11.5px] font-sans font-bold tracking-wide text-teal-dark mt-4 mb-1.5">
        TESTS REQUESTED
      </div>
      {allTests.length ? (
        <div className="doc-tests">
          {allTests.map((t) => (
            <div key={t} className="doc-test">☑ {t}</div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-stone-400">No tests selected yet</p>
      )}

      <div className="text-[11.5px] font-sans font-bold tracking-wide text-teal-dark mt-4 mb-1.5">
        CLINICAL NOTES
      </div>
      <div className="text-[12.5px] min-h-[40px] border border-border rounded p-2 whitespace-pre-wrap">
        {notes || <span className="italic text-stone-400">None provided</span>}
      </div>
    </div>
  );
}
