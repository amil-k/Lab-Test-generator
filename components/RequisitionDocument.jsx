"use client";

import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Times-Roman", fontSize: 10, color: "#161f29" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: "#204b42",
    paddingBottom: 8,
    marginBottom: 14,
  },
  headerLeft: { flexDirection: "row", alignItems: "flex-start" },
  logo: { width: 50, height: 50, objectFit: "contain", marginRight: 10 },
  clinicName: { fontSize: 16, fontWeight: "bold" },
  clinicMeta: { fontSize: 9, color: "#4a5560", marginTop: 3, lineHeight: 1.4 },
  title: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#204b42",
    marginVertical: 14,
    letterSpacing: 1,
  },
  grid: { flexDirection: "row", marginBottom: 10 },
  col: { flex: 1, paddingRight: 12 },
  field: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#b9b2a0",
    paddingVertical: 3,
  },
  fieldLabel: { color: "#5a6470", width: "42%" },
  fieldValue: { fontWeight: "bold" },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#204b42",
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  testsWrap: { flexDirection: "row", flexWrap: "wrap" },
  testItem: { width: "50%", fontSize: 10, paddingVertical: 1 },
  emptyNote: { fontSize: 10, fontStyle: "italic", color: "#9a9284" },
  notesBox: {
    fontSize: 10,
    minHeight: 40,
    borderWidth: 0.5,
    borderColor: "#d9d4c7",
    borderRadius: 2,
    padding: 6,
  },
});

function fmtDate(v) {
  if (!v) return "";
  const d = new Date(v + "T00:00:00");
  if (isNaN(d)) return v;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function RequisitionDocument({ clinic, patient, doctor, selectedTests, customTests, notes }) {
  const allTests = [...selectedTests, ...customTests.map((t) => `${t} (custom)`)];
  const clinicMetaLine = [clinic.address, [clinic.phone, clinic.email].filter(Boolean).join("  |  ")]
    .filter(Boolean)
    .join("\n");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {clinic.logo && <Image src={clinic.logo} style={styles.logo} />}
            <View>
              <Text style={styles.clinicName}>{clinic.name || "Clinic name"}</Text>
              {clinicMetaLine ? <Text style={styles.clinicMeta}>{clinicMetaLine}</Text> : null}
            </View>
          </View>
        </View>

        <Text style={styles.title}>LABORATORY TEST REQUISITION FORM</Text>

        <View style={styles.grid}>
          <View style={styles.col}>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Patient name</Text>
              <Text style={styles.fieldValue}>{patient.name || "—"}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Age / Gender</Text>
              <Text style={styles.fieldValue}>{(patient.age || "—") + " / " + (patient.gender || "—")}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Phone</Text>
              <Text style={styles.fieldValue}>{patient.phone || "—"}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Address</Text>
              <Text style={styles.fieldValue}>{patient.address || "—"}</Text>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Patient ID</Text>
              <Text style={styles.fieldValue}>{patient.patientId || "—"}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Date</Text>
              <Text style={styles.fieldValue}>{fmtDate(patient.date) || "—"}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Referring doctor</Text>
              <Text style={styles.fieldValue}>{doctor.name || "—"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>TESTS REQUESTED</Text>
        {allTests.length ? (
          <View style={styles.testsWrap}>
            {allTests.map((t) => (
              <Text key={t} style={styles.testItem}>
                {"\u2611 " + t}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyNote}>No tests selected yet</Text>
        )}

        <Text style={styles.sectionTitle}>CLINICAL NOTES</Text>
        <Text style={styles.notesBox}>{notes || "None provided"}</Text>
      </Page>
    </Document>
  );
}
