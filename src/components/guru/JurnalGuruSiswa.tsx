/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, Calendar, Plus, PenTool, CheckCircle, Award, Smile, ShieldAlert, FileText, Download, UserPlus, FileCheck, Printer } from "lucide-react";
import { JurnalMengajar, CatatanSikapSiswa, Siswa, Kelas } from "../../types";
import { DataService } from "../../data/initialData";

interface JurnalGuruSiswaProps {
  jurnals: JurnalMengajar[];
  onAddJurnal: (newJurnal: JurnalMengajar) => void;
  attitudes: CatatanSikapSiswa[];
  onAddAttitude: (newAttitude: CatatanSikapSiswa) => void;
  students: Siswa[];
  classes: Kelas[];
}

export default function JurnalGuruSiswa({
  jurnals,
  onAddJurnal,
  attitudes,
  onAddAttitude,
  students,
  classes
}: JurnalGuruSiswaProps) {
  const [subTab, setSubTab] = useState<"mengajar" | "saku">("mengajar");
  const [isAddingJurnal, setIsAddingJurnal] = useState(false);
  const [isAddingAttitude, setIsAddingAttitude] = useState(false);

  // Teaching Journal form state
  const [newJurnal, setNewJurnal] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    kelasId: "VII-A",
    jamKe: "1-2",
    materiPokok: "",
    kehadiranHadir: 30,
    kehadiranIzin: 0,
    kehadiranSakit: 0,
    kehadiranAlpa: 0,
    catatanKejadian: ""
  });

  // Attitude Log form state
  const [newAttitude, setNewAttitude] = useState({
    siswaNisn: "",
    kategoriSikap: "Spiritual" as "Spiritual" | "Sosial",
    jenisSikap: "Positif" as "Positif" | "Perbaikan",
    deskripsiKejadian: "",
    tindakLanjut: ""
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportMonth, setExportMonth] = useState("07"); // July

  const handleJurnalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJurnal.materiPokok) {
      alert("Harap isi materi pokok!");
      return;
    }
    const item: JurnalMengajar = {
      id: "jm-" + Date.now(),
      tanggal: newJurnal.tanggal,
      kelasId: newJurnal.kelasId,
      jamKe: newJurnal.jamKe,
      materiPokok: newJurnal.materiPokok,
      kehadiranHadir: Number(newJurnal.kehadiranHadir),
      kehadiranIzin: Number(newJurnal.kehadiranIzin),
      kehadiranSakit: Number(newJurnal.kehadiranSakit),
      kehadiranAlpa: Number(newJurnal.kehadiranAlpa),
      catatanKejadian: newJurnal.catatanKejadian
    };
    onAddJurnal(item);
    setIsAddingJurnal(false);
    setNewJurnal({
      tanggal: new Date().toISOString().split("T")[0],
      kelasId: "VII-A",
      jamKe: "1-2",
      materiPokok: "",
      kehadiranHadir: 30,
      kehadiranIzin: 0,
      kehadiranSakit: 0,
      kehadiranAlpa: 0,
      catatanKejadian: ""
    });
  };

  const handleAttitudeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttitude.siswaNisn || !newAttitude.deskripsiKejadian) {
      alert("Harap pilih siswa dan masukkan deskripsi kejadian!");
      return;
    }
    const studentObj = students.find(s => s.nisn === newAttitude.siswaNisn);
    if (!studentObj) return;

    const item: CatatanSikapSiswa = {
      id: "cs-" + Date.now(),
      tanggal: new Date().toISOString().split("T")[0],
      siswaNisn: newAttitude.siswaNisn,
      siswaNama: studentObj.nama,
      kelasId: studentObj.kelasId,
      kategoriSikap: newAttitude.kategoriSikap,
      jenisSikap: newAttitude.jenisSikap,
      deskripsiKejadian: newAttitude.deskripsiKejadian,
      tindakLanjut: newAttitude.tindakLanjut
    };
    onAddAttitude(item);
    setIsAddingAttitude(false);
    setNewAttitude({
      siswaNisn: "",
      kategoriSikap: "Spiritual",
      jenisSikap: "Positif",
      deskripsiKejadian: "",
      tindakLanjut: ""
    });
  };

  // Helpers to get day name in Indonesian
  const getIndoDay = (dateStr: string) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const d = new Date(dateStr);
    return days[d.getDay()];
  };

  const getIndoMonthName = (monthCode: string) => {
    const months: Record<string, string> = {
      "01": "Januari", "02": "Februari", "03": "Maret", "04": "April", "05": "Mei", "06": "Juni",
      "07": "Juli", "08": "Agustus", "09": "September", "10": "Oktober", "11": "November", "12": "Desember"
    };
    return months[monthCode] || "Juli";
  };

  const handlePrintRekapBulanan = () => {
    const sekolah = DataService.getSekolah();
    const guru = DataService.getGuru();
    const monthJurnals = jurnals.filter(j => j.tanggal.split("-")[1] === exportMonth);
    const monthName = getIndoMonthName(exportMonth);

    const printWindow = window.open("", "_blank", "width=950,height=800");
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Jurnal Mengajar PAI - ${monthName} 2026</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 12mm;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
            background: #ffffff;
            margin: 0;
            padding: 20px;
            font-size: 10pt;
            line-height: 1.3;
          }
          .header {
            text-align: center;
            border-bottom: 3px double #111827;
            padding-bottom: 6px;
            margin-bottom: 12px;
          }
          .header h5 { margin: 0; font-size: 9.5pt; font-weight: bold; text-transform: uppercase; color: #374151; }
          .header h4 { margin: 2px 0; font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: #1f2937; }
          .header h3 { margin: 2px 0; font-size: 12pt; font-weight: 900; text-transform: uppercase; color: #111827; }
          .header p { margin: 2px 0; font-size: 8pt; font-style: italic; color: #4b5563; }

          .title { text-align: center; margin-bottom: 14px; }
          .title h4 { margin: 0; font-size: 11pt; font-weight: 800; text-decoration: underline; text-transform: uppercase; }
          .title p { margin: 2px 0 0 0; font-size: 9pt; font-weight: 700; color: #374151; }

          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
          .info-table td { padding: 3px 6px; font-size: 9pt; font-weight: 600; vertical-align: top; }

          table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
          table.data-table th, table.data-table td { border: 1px solid #9ca3af; padding: 6px 8px; font-size: 8.5pt; }
          table.data-table th { background-color: #f3f4f6; font-weight: 700; text-transform: uppercase; text-align: center; color: #111827; }

          .signatures { margin-top: 28px; display: table; width: 100%; page-break-inside: avoid; }
          .sig-col { display: table-cell; width: 50%; text-align: center; font-size: 9.5pt; vertical-align: top; }
          .sig-space { height: 50px; }
          .sig-name { font-weight: bold; text-decoration: underline; }
          .sig-nip { font-size: 8.5pt; color: #4b5563; }

          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h5>PEMERINTAH KABUPATEN WAY KANAN</h5>
          <h4>DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
          <h3>${sekolah.namaSekolah.toUpperCase()}</h3>
          <p>${sekolah.alamat} • NPSN: ${sekolah.npsn} • Akreditasi: ${sekolah.akreditasi}</p>
        </div>

        <div class="title">
          <h4>REKAPITULASI JURNAL AKTIVITAS MENGAJAR GURU PAI & BUDI PEKERTI</h4>
          <p>PERIODE BULAN: ${monthName.toUpperCase()} 2026 • TAHUN AJARAN 2026/2027</p>
        </div>

        <table class="info-table">
          <tr>
            <td width="15%">Nama Guru PAI</td>
            <td width="35%">: <strong>${guru.nama}</strong></td>
            <td width="15%">Nama Sekolah</td>
            <td width="35%">: ${sekolah.namaSekolah}</td>
          </tr>
          <tr>
            <td>NIP Guru</td>
            <td>: ${guru.nip}</td>
            <td>Kepala Sekolah</td>
            <td>: ${sekolah.namaKepsek}</td>
          </tr>
        </table>

        <table class="data-table">
          <thead>
            <tr>
              <th width="4%">No.</th>
              <th width="14%">Hari / Tanggal</th>
              <th width="8%">Kelas</th>
              <th width="8%">Jam Ke</th>
              <th width="32%">Materi Pokok / Pembelajaran</th>
              <th width="8%">Hadir</th>
              <th width="10%">S / I / A</th>
              <th width="16%">Catatan / Evaluasi</th>
            </tr>
          </thead>
          <tbody>
            ${
              monthJurnals.length === 0
                ? `<tr><td colspan="8" style="text-align: center; padding: 12px; color: #6b7280; font-style: italic;">Tidak ada catatan jurnal mengajar pada bulan ${monthName} 2026.</td></tr>`
                : monthJurnals.map((j, idx) => `
                  <tr>
                    <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
                    <td style="text-align: center;">${getIndoDay(j.tanggal)}, ${j.tanggal}</td>
                    <td style="text-align: center; font-weight: bold;">${j.kelasId}</td>
                    <td style="text-align: center;">${j.jamKe}</td>
                    <td>${j.materiPokok}</td>
                    <td style="text-align: center; font-weight: bold; color: #047857;">${j.kehadiranHadir}</td>
                    <td style="text-align: center;">${j.kehadiranSakit} / ${j.kehadiranIzin} / ${j.kehadiranAlpa}</td>
                    <td>${j.catatanKejadian || "-"}</td>
                  </tr>
                `).join('')
            }
          </tbody>
        </table>

        <div class="signatures">
          <div class="sig-col">
            <p>Mengetahui,<br/>Kepala ${sekolah.namaSekolah}</p>
            <div class="sig-space"></div>
            <p class="sig-name">${sekolah.namaKepsek}</p>
            <p class="sig-nip">NIP. ${sekolah.nipKepsek}</p>
          </div>
          <div class="sig-col">
            <p>Way Kanan, ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}<br/>Guru PAI & Budi Pekerti</p>
            <div class="sig-space"></div>
            <p class="sig-name">${guru.nama}</p>
            <p class="sig-nip">NIP. ${guru.nip}</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setShowExportModal(false);
  };

  const handlePrintCatatanSikap = () => {
    const sekolah = DataService.getSekolah();
    const guru = DataService.getGuru();

    const printWindow = window.open("", "_blank", "width=950,height=800");
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Rekap Catatan Sikap Siswa PAI</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 12mm;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
            background: #ffffff;
            margin: 0;
            padding: 20px;
            font-size: 10pt;
            line-height: 1.3;
          }
          .header {
            text-align: center;
            border-bottom: 3px double #111827;
            padding-bottom: 6px;
            margin-bottom: 12px;
          }
          .header h5 { margin: 0; font-size: 9.5pt; font-weight: bold; text-transform: uppercase; color: #374151; }
          .header h4 { margin: 2px 0; font-size: 10.5pt; font-weight: bold; text-transform: uppercase; color: #1f2937; }
          .header h3 { margin: 2px 0; font-size: 12pt; font-weight: 900; text-transform: uppercase; color: #111827; }
          .header p { margin: 2px 0; font-size: 8pt; font-style: italic; color: #4b5563; }

          .title { text-align: center; margin-bottom: 14px; }
          .title h4 { margin: 0; font-size: 11pt; font-weight: 800; text-decoration: underline; text-transform: uppercase; }
          .title p { margin: 2px 0 0 0; font-size: 9pt; font-weight: 700; color: #374151; }

          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
          .info-table td { padding: 3px 6px; font-size: 9pt; font-weight: 600; vertical-align: top; }

          table.data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
          table.data-table th, table.data-table td { border: 1px solid #9ca3af; padding: 6px 8px; font-size: 8.5pt; }
          table.data-table th { background-color: #f3f4f6; font-weight: 700; text-transform: uppercase; text-align: center; color: #111827; }

          .badge-positif { color: #047857; font-weight: bold; }
          .badge-perbaikan { color: #b45309; font-weight: bold; }

          .signatures { margin-top: 28px; display: table; width: 100%; page-break-inside: avoid; }
          .sig-col { display: table-cell; width: 50%; text-align: center; font-size: 9.5pt; vertical-align: top; }
          .sig-space { height: 50px; }
          .sig-name { font-weight: bold; text-decoration: underline; }
          .sig-nip { font-size: 8.5pt; color: #4b5563; }

          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h5>PEMERINTAH KABUPATEN WAY KANAN</h5>
          <h4>DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
          <h3>${sekolah.namaSekolah.toUpperCase()}</h3>
          <p>${sekolah.alamat} • NPSN: ${sekolah.npsn} • Akreditasi: ${sekolah.akreditasi}</p>
        </div>

        <div class="title">
          <h4>REKAPITULASI CATATAN SIKAP & PERKEMBANGAN AKHLAK SISWA</h4>
          <p>BUKU CATATAN SAKU PAI • TAHUN AJARAN 2026/2027</p>
        </div>

        <table class="info-table">
          <tr>
            <td width="15%">Nama Guru PAI</td>
            <td width="35%">: <strong>${guru.nama}</strong></td>
            <td width="15%">Nama Sekolah</td>
            <td width="35%">: ${sekolah.namaSekolah}</td>
          </tr>
          <tr>
            <td>NIP Guru</td>
            <td>: ${guru.nip}</td>
            <td>Kepala Sekolah</td>
            <td>: ${sekolah.namaKepsek}</td>
          </tr>
        </table>

        <table class="data-table">
          <thead>
            <tr>
              <th width="4%">No.</th>
              <th width="12%">Tanggal</th>
              <th width="18%">Nama Siswa</th>
              <th width="8%">Kelas</th>
              <th width="12%">Dimensi Sikap</th>
              <th width="12%">Perilaku</th>
              <th width="20%">Deskripsi Kejadian</th>
              <th width="14%">Tindak Lanjut</th>
            </tr>
          </thead>
          <tbody>
            ${
              attitudes.length === 0
                ? `<tr><td colspan="8" style="text-align: center; padding: 12px; color: #6b7280; font-style: italic;">Belum ada catatan sikap siswa.</td></tr>`
                : attitudes.map((a, idx) => `
                  <tr>
                    <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
                    <td style="text-align: center;">${a.tanggal}</td>
                    <td><strong>${a.siswaNama}</strong></td>
                    <td style="text-align: center; font-weight: bold;">${a.kelasId}</td>
                    <td style="text-align: center;">${a.kategoriSikap}</td>
                    <td style="text-align: center;" class="${a.jenisSikap === "Positif" ? "badge-positif" : "badge-perbaikan"}">${a.jenisSikap}</td>
                    <td>&ldquo;${a.deskripsiKejadian}&rdquo;</td>
                    <td>${a.tindakLanjut || "-"}</td>
                  </tr>
                `).join('')
            }
          </tbody>
        </table>

        <div class="signatures">
          <div class="sig-col">
            <p>Mengetahui,<br/>Kepala ${sekolah.namaSekolah}</p>
            <div class="sig-space"></div>
            <p class="sig-name">${sekolah.namaKepsek}</p>
            <p class="sig-nip">NIP. ${sekolah.nipKepsek}</p>
          </div>
          <div class="sig-col">
            <p>Way Kanan, ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}<br/>Guru PAI & Budi Pekerti</p>
            <div class="sig-space"></div>
            <p class="sig-name">${guru.nama}</p>
            <p class="sig-nip">NIP. ${guru.nip}</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setSubTab("mengajar")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition duration-150 ${
            subTab === "mengajar" ? "border-emerald-700 text-emerald-800 bg-emerald-50/20" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
          id="tab-jurnal-mengajar"
        >
          Jurnal Harian Mengajar Guru
        </button>
        <button
          onClick={() => setSubTab("saku")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition duration-150 ${
            subTab === "saku" ? "border-emerald-700 text-emerald-800 bg-emerald-50/20" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
          id="tab-catatan-sikap"
        >
          Buku Catatan Saku PAI (Sikap Siswa)
        </button>
      </div>

      {/* VIEW A: JURNAL MENGAJAR GURU */}
      {subTab === "mengajar" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">Jurnal Aktivitas Mengajar Harian</h4>
              <p className="text-xs text-slate-500 mt-1">
                Catat setiap sesi tatap muka pembelajaran PAI. Jurnal ini akan merekap kehadiran dan catatan khusus untuk dilaporkan kepada Kepala Sekolah.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                id="btn-rekap-jurnal"
              >
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Cetak Rekap Bulanan
              </button>
              <button
                onClick={() => setIsAddingJurnal(!isAddingJurnal)}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                id="btn-tambah-jurnal"
              >
                <Plus className="w-4 h-4" />
                Input Jurnal Baru
              </button>
            </div>
          </div>

          {/* Form input jurnal baru */}
          {isAddingJurnal && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 animate-fadeIn space-y-4">
              <span className="block text-sm font-bold text-slate-800">Isi Jurnal Mengajar Baru</span>
              <form onSubmit={handleJurnalSubmit} className="space-y-4 text-xs font-medium text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Tanggal Mengajar</label>
                    <input
                      type="date"
                      required
                      value={newJurnal.tanggal}
                      onChange={(e) => setNewJurnal({ ...newJurnal, tanggal: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Kelas</label>
                    <select
                      value={newJurnal.kelasId}
                      onChange={(e) => setNewJurnal({ ...newJurnal, kelasId: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800"
                    >
                      {classes.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Jam Mengajar Ke</label>
                    <input
                      type="text"
                      placeholder="Contoh: 1-2 atau 3-4"
                      value={newJurnal.jamKe}
                      onChange={(e) => setNewJurnal({ ...newJurnal, jamKe: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Materi Pokok</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Amanah dan Jujur"
                      value={newJurnal.materiPokok}
                      onChange={(e) => setNewJurnal({ ...newJurnal, materiPokok: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                </div>

                {/* Kehadiran block */}
                <div className="p-4 rounded-xl bg-white border border-slate-150 space-y-3">
                  <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Laporan Presensi Kehadiran Siswa</span>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Hadir (Siswa)</label>
                      <input
                        type="number"
                        min="0"
                        value={newJurnal.kehadiranHadir}
                        onChange={(e) => setNewJurnal({ ...newJurnal, kehadiranHadir: Number(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Izin (Siswa)</label>
                      <input
                        type="number"
                        min="0"
                        value={newJurnal.kehadiranIzin}
                        onChange={(e) => setNewJurnal({ ...newJurnal, kehadiranIzin: Number(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Sakit (Siswa)</label>
                      <input
                        type="number"
                        min="0"
                        value={newJurnal.kehadiranSakit}
                        onChange={(e) => setNewJurnal({ ...newJurnal, kehadiranSakit: Number(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Alpa (Siswa)</label>
                      <input
                        type="number"
                        min="0"
                        value={newJurnal.kehadiranAlpa}
                        onChange={(e) => setNewJurnal({ ...newJurnal, kehadiranAlpa: Number(e.target.value) })}
                        className="w-full p-2 rounded-lg border border-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Catatan Kejadian Khusus di Kelas</label>
                  <textarea
                    placeholder="Contoh: Siswa aktif berdiskusi kelompok, siswa X memberikan pertanyaan yang kritis, dsb."
                    value={newJurnal.catatanKejadian}
                    onChange={(e) => setNewJurnal({ ...newJurnal, catatanKejadian: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800 min-h-[80px]"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingJurnal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition"
                    id="btn-submit-jurnal"
                  >
                    Simpan Jurnal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Jurnal List Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Daftar Log Jurnal Pembelajaran</span>
              <span className="text-[10px] font-mono text-slate-400">Total terarsip: {jurnals.length} Sesi</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 font-bold uppercase border-b border-slate-100">
                    <th className="p-4 w-12 text-center font-bold text-slate-500">No.</th>
                    <th className="p-4 w-32">Hari / Tanggal</th>
                    <th className="p-4 w-20">Kelas</th>
                    <th className="p-4 w-24">Jam Ke</th>
                    <th className="p-4">Materi Pembelajaran Pokok</th>
                    <th className="p-4 w-36 text-center">Kehadiran Siswa</th>
                    <th className="p-4">Catatan Sesi Kelas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {jurnals.map((j, idx) => (
                    <tr key={j.id} className="hover:bg-slate-50/30 transition">
                      <td className="p-4 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-4">
                        <span className="block font-bold text-slate-900">{getIndoDay(j.tanggal)}</span>
                        <span className="block text-[10px] text-slate-400">{j.tanggal}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-bold">
                          {j.kelasId}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-500">{j.jamKe}</td>
                      <td className="p-4 font-bold text-slate-900 text-sm leading-snug">{j.materiPokok}</td>
                      <td className="p-4">
                        <div className="flex flex-col items-center gap-0.5 text-[10px]">
                          <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Hadir: {j.kehadiranHadir}
                          </span>
                          <div className="flex gap-1 text-[9px] text-slate-400">
                            <span>I: {j.kehadiranIzin}</span>•
                            <span>S: {j.kehadiranSakit}</span>•
                            <span>A: {j.kehadiranAlpa}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 font-medium leading-relaxed max-w-xs truncate" title={j.catatanKejadian}>
                        {j.catatanKejadian || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW B: BUKU CATATAN SAKU PAI (Sikap Siswa) */}
      {subTab === "saku" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Smile className="w-5 h-5 text-emerald-600" />
                Buku Catatan Saku PAI (Perkembangan Sikap)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Catat perkembangan kepribadian, akhlak mulia, kepemimpinan (Spiritual), maupun adab bermasyarakat dan berdiskusi siswa (Sosial) di sini.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrintCatatanSikap}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition border border-slate-300"
                id="btn-cetak-sikap"
                title="Cetak Rekap Catatan Sikap Siswa"
              >
                <Printer className="w-4 h-4 text-emerald-700" />
                Cetak Rekap Sikap
              </button>
              <button
                onClick={() => setIsAddingAttitude(!isAddingAttitude)}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                id="btn-tambah-sikap"
              >
                <Plus className="w-4 h-4" />
                Catat Sikap Siswa
              </button>
            </div>
          </div>

          {/* Form input Sikap baru */}
          {isAddingAttitude && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 animate-fadeIn space-y-4">
              <span className="block text-sm font-bold text-slate-800">Catat Kasus / Sikap Siswa</span>
              <form onSubmit={handleAttitudeSubmit} className="space-y-4 text-xs font-medium text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Pilih Siswa</label>
                    <select
                      value={newAttitude.siswaNisn}
                      onChange={(e) => setNewAttitude({ ...newAttitude, siswaNisn: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800 font-semibold"
                      required
                    >
                      <option value="">-- Pilih Siswa --</option>
                      {[...students].sort((a, b) => a.nama.localeCompare(b.nama, "id", { sensitivity: "base" })).map(s => (
                        <option key={s.nisn} value={s.nisn}>
                          {s.nama} ({s.kelasId})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Dimensi Sikap</label>
                    <select
                      value={newAttitude.kategoriSikap}
                      onChange={(e) => setNewAttitude({ ...newAttitude, kategoriSikap: e.target.value as "Spiritual" | "Sosial" })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800 font-semibold"
                    >
                      <option value="Spiritual">Spiritual (Ibadah, Berdoa, Toleransi)</option>
                      <option value="Sosial">Sosial (Sopan, Jujur, Tanggung Jawab, Gotong Royong)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Kecenderungan Perilaku</label>
                    <select
                      value={newAttitude.jenisSikap}
                      onChange={(e) => setNewAttitude({ ...newAttitude, jenisSikap: e.target.value as "Positif" | "Perbaikan" })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800 font-semibold"
                    >
                      <option value="Positif">Positif (Apresiatif & Teladan)</option>
                      <option value="Perbaikan">Perbaikan (Butuh Pembimbingan / Teguran)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Deskripsi Kejadian Perilaku</label>
                    <textarea
                      required
                      placeholder="Uraikan peristiwa atau tindakan siswa secara jujur dan objektif..."
                      value={newAttitude.deskripsiKejadian}
                      onChange={(e) => setNewAttitude({ ...newAttitude, deskripsiKejadian: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800 min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">Tindak Lanjut Guru / Wali Kelas</label>
                    <textarea
                      placeholder="Contoh: Diberikan bimbingan persuasif, diapresiasi di depan kelas, dinasihati usai ibadah berjamaah, dsb."
                      value={newAttitude.tindakLanjut}
                      onChange={(e) => setNewAttitude({ ...newAttitude, tindakLanjut: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-800 min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAttitude(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition"
                    id="btn-submit-sikap"
                  >
                    Simpan Catatan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cards Displaying character records */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {attitudes.map((att) => (
              <div
                key={att.id}
                className={`p-5 rounded-2xl border shadow-sm transition duration-150 flex flex-col justify-between ${
                  att.jenisSikap === "Positif"
                    ? "bg-emerald-50/20 border-emerald-100/70"
                    : "bg-amber-50/30 border-amber-100/70"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      {att.jenisSikap === "Positif" ? (
                        <Award className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ShieldAlert className="w-5 h-5 text-amber-600" />
                      )}
                      <span className="text-xs font-extrabold text-slate-900">{att.siswaNama}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {att.kelasId}
                      </span>
                    </div>

                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                      att.kategoriSikap === "Spiritual"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-purple-50 text-purple-700 border border-purple-100"
                    }`}>
                      Sikap {att.kategoriSikap}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    &ldquo;{att.deskripsiKejadian}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100/50 space-y-1">
                  <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    Tindak Lanjut & Intervensi Guru:
                  </span>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed">
                    {att.tindakLanjut || "Telah diawasi secara pasif."}
                  </p>
                  <span className="block text-[10px] text-slate-400 mt-2 text-right">
                    Tercatat tanggal {att.tanggal}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MONTHLY JOURNAL EXPORT PREVIEW MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col space-y-4 animate-scaleUp">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  Cetak Lembar Jurnal Mengajar Bulanan
                </h4>
                <p className="text-xs text-slate-400">Pilih bulan rekapitulasi pelaporan harian.</p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <select
                  value={exportMonth}
                  onChange={(e) => setExportMonth(e.target.value)}
                  className="p-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 flex-1 focus:outline-none"
                >
                  <option value="07">Juli 2026</option>
                  <option value="08">Agustus 2026</option>
                  <option value="09">September 2026</option>
                  <option value="10">Oktober 2026</option>
                  <option value="11">November 2026</option>
                  <option value="12">Desember 2026</option>
                </select>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-emerald-800 leading-relaxed font-semibold">
                Sistem mendeteksi {jurnals.filter(j => j.tanggal.split("-")[1] === exportMonth).length} log mengajar yang valid pada bulan {getIndoMonthName(exportMonth)} 2026. Laporan siap dicetak dan ditandatangani oleh Kepala Sekolah.
              </div>

              {/* Simulated Printable area preview */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-[10px] space-y-3 font-medium text-slate-700 max-h-[150px] overflow-y-auto">
                <div className="text-center font-bold text-slate-800 border-b border-slate-200 pb-1.5 mb-1.5 uppercase">
                  LAPORAN BULANAN AKTIVITAS MENGAJAR PAI - {getIndoMonthName(exportMonth)} 2026
                </div>
                {jurnals.filter(j => j.tanggal.split("-")[1] === exportMonth).map((j, idx) => (
                  <div key={idx} className="flex justify-between border-b border-dashed border-slate-200 pb-1">
                    <span>{j.tanggal} ({j.kelasId})</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[180px]">{j.materiPokok}</span>
                    <span>Hadir: {j.kehadiranHadir}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handlePrintRekapBulanan}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-700/10 flex items-center gap-1 transition"
                id="btn-confirm-print-rekap"
              >
                <Download className="w-4 h-4" />
                Cetak & Unduh PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
