"use client";

import { useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ClinicForm from "@/components/ClinicForm";
import DoctorForm from "@/components/DoctorForm";
import PatientForm from "@/components/PatientForm";
import TestSelector from "@/components/TestSelector";
import Preview from "@/components/Preview";
import RequisitionDocument from "@/components/RequisitionDocument";
import Section from "@/components/Section";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Home() {
  const [clinic, setClinic] = useState({});
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState(() => ({ date: todayISO() }));
  const [selectedTests, setSelectedTests] = useState(new Set());
  const [customTests, setCustomTests] = useState([]);
  const [notes, setNotes] = useState("");

  const [savedClinics, setSavedClinics] = useState([]);
  const [savedDoctors, setSavedDoctors] = useState([]);

  const lastSavedClinic = useRef("");
  const lastSavedDoctor = useRef("");

  useEffect(() => {
    fetch("/api/clinics").then((r) => r.json()).then(setSavedClinics);
    fetch("/api/doctors").then((r) => r.json()).then(setSavedDoctors);
  }, []);

  async function saveClinic(record) {
    const res = await fetch("/api/clinics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    const saved = await res.json();
    setClinic(saved);
    setSavedClinics((prev) => {
      const idx = prev.findIndex((r) => r.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [...prev, saved];
    });
  }

  async function saveDoctor(record) {
    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    const saved = await res.json();
    setDoctor(saved);
    setSavedDoctors((prev) => {
      const idx = prev.findIndex((r) => r.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [...prev, saved];
    });
  }

  // Auto-save clinic details a moment after typing stops — no button needed.
  useEffect(() => {
    if (!clinic.name) return;
    const payload = JSON.stringify(clinic);
    if (payload === lastSavedClinic.current) return;
    const t = setTimeout(() => {
      lastSavedClinic.current = payload;
      saveClinic(clinic);
    }, 800);
    return () => clearTimeout(t);
  }, [clinic]);

  // Auto-save doctor details a moment after typing stops — no button needed.
  useEffect(() => {
    if (!doctor.name) return;
    const payload = JSON.stringify(doctor);
    if (payload === lastSavedDoctor.current) return;
    const t = setTimeout(() => {
      lastSavedDoctor.current = payload;
      saveDoctor(doctor);
    }, 800);
    return () => clearTimeout(t);
  }, [doctor]);

  async function downloadPdf() {
    const doc = (
      <RequisitionDocument
        clinic={clinic}
        patient={patient}
        doctor={doctor}
        selectedTests={selectedTests}
        customTests={customTests}
        notes={notes}
      />
    );
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const namePart = (patient.name || "requisition").trim().replace(/\s+/g, "_");
    a.download = `${namePart}_lab_requisition.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <header className="no-print px-7 py-4 border-b border-[#E4E5E7] bg-white flex items-baseline gap-2.5">
        <h1 className="text-lg font-semibold">Lab Test Requisition Generator</h1>
        <span className="text-sm text-slate">Clinic &amp; doctor details are saved — patient data never is</span>
      </header>

      <div className="grid grid-cols-[minmax(320px,460px)_1fr]">
        <div className="no-print p-6 overflow-y-auto max-h-[calc(100vh-58px)] bg-[#F6F7F8] border-r border-[#E4E5E7]">
          <ClinicForm clinic={clinic} setClinic={setClinic} saved={savedClinics} />
          <DoctorForm doctor={doctor} setDoctor={setDoctor} saved={savedDoctors} />
          <PatientForm patient={patient} setPatient={setPatient} />
          <TestSelector
            selectedTests={selectedTests}
            setSelectedTests={setSelectedTests}
            customTests={customTests}
            setCustomTests={setCustomTests}
          />

          <Section label="Clinical notes">
            <label className="block text-xs text-slate mt-2 mb-1">Reason for test / clinical notes</label>
            <textarea
              className="w-full border border-border rounded px-2.5 py-1.5 text-sm bg-white min-h-[56px] focus:outline-teal focus:border-teal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional"
            />
          </Section>

          <button
            type="button"
            onClick={downloadPdf}
            className="w-full bg-teal hover:bg-teal-dark text-white font-semibold rounded-md py-2.5 text-sm shadow-sm"
          >
            Download PDF
          </button>
        </div>

        <div className="p-7 flex justify-center bg-[#D6D8DA] overflow-y-auto max-h-[calc(100vh-58px)]">
          <Preview
            clinic={clinic}
            patient={patient}
            doctor={doctor}
            selectedTests={selectedTests}
            customTests={customTests}
            notes={notes}
          />
        </div>
      </div>
    </div>
  );
}