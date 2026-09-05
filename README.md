# Lab Test Requisition Generator

Next.js (App Router) + Tailwind CSS MVP.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What's persisted vs. not

- **Clinic** and **Doctor** records: saved via `/api/clinics` and `/api/doctors`
  (Next.js API routes) to JSON files under `data/`. This stands in for a real
  database — swap `lib/store.js` for Postgres/Mongo calls later without
  touching the route handlers or the UI.
- **Patient** details, selected tests, and clinical notes: kept only in React
  state in the browser tab. Nothing about a patient is ever sent to the
  server or written to disk. Closing/refreshing the tab clears it.

## Structure

```
app/
  page.js              — main page, wires state + API calls together
  api/clinics/route.js — GET/POST/DELETE saved clinics
  api/doctors/route.js — GET/POST/DELETE saved doctors
  globals.css          — Tailwind + print styles (only #a4-preview prints)
components/
  ClinicForm.jsx, DoctorForm.jsx, PatientForm.jsx
  TestSelector.jsx     — categorized, searchable checklist + custom test entry
  Preview.jsx          — the live A4 document preview
  SavedPicker.jsx       — dropdown to reload a saved clinic/doctor
lib/
  testCatalog.js       — the predefined test categories/tests
  store.js             — tiny JSON-file persistence layer
data/                  — clinics.json / doctors.json get created here at runtime
```

## Printing / PDF

Click **Print / Save as PDF** — this calls the browser's native print dialog.
CSS in `globals.css` hides everything except the `#a4-preview` element when
printing, and sizes it to 210mm × 297mm (A4).

## Next steps

- Swap the JSON-file store for Postgres/Mongo.
- Add auth if this ever needs to run somewhere multi-user.
- Consider a proper PDF library (e.g. `@react-pdf/renderer`) if browser
  print-to-PDF isn't reliable enough across the clinic's printers/browsers.
