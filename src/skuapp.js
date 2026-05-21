import React, { useMemo, useState } from "react";

/**
 * SKU System (Safe Minimal App)
 * - No external icons/packages
 * - Guaranteed export default
 * - Guaranteed visible UI (no white screen)
 */

const SECTIONS = [
  "Seksyen Kualiti, Majlis & Protokol (SKMP)",
  "Seksyen Pentadbiran & Kewangan (SPK)",
  "Unit Perpustakaan (LIB)",
  "Seksyen Pembangunan & Aset (SPAK)",
  "Unit Pembantu Operasi (PO)",
];

const SAMPLE_KPIS = [
  {
    id: 1,
    sku_name: "Mengurus Majlis Rasmi",
    sub_sku_name:
      "Peratus urusan penyediaan Kertas Cadangan penganjuran (14 hari bekerja).",
    unit: "Peratus",
    target: 100,
    actual: 0,
    section: "Seksyen Kualiti, Majlis & Protokol (SKMP)",
  },
  {
    id: 2,
    sku_name: "Pengurusan Dokumentasi",
    sub_sku_name: "Ketepatan penyediaan dokumen/prosedur mengikut standard.",
    unit: "Peratus",
    target: 100,
    actual: 65,
    section: "Seksyen Pentadbiran & Kewangan (SPK)",
  },
];

function pct(actual, target) {
  const a = Number(actual || 0);
  const t = Number(target || 0);
  if (!t) return 0;
  return Math.min(100, Math.round((a / t) * 100));
}

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
