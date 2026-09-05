/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  BookOpen,
  Scroll,
  BookMarked,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Search,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ExternalLink,
  Volume2,
  Bookmark,
  Share2,
  Filter,
  CheckCircle2,
  Award,
  Layers,
  GraduationCap,
  Calendar,
  Compass,
  ArrowRight
} from "lucide-react";
import {
  LIST_SURAH_PILIHAN,
  LIST_HADIST_PILIHAN,
  LIST_BUKU_PELAJARAN,
  LIST_KISAH_NABI,
  LIST_NASEHAT_ISLAMI,
  LIST_HIKMAH_INSPIRATIF,
  SurahData,
  HadistData,
  BukuPelajaranData,
  KisahNabiData,
  NasehatIslamiData,
  HikmahData
} from "../../data/masterkuData";
import { QuranKemenag114 } from "./QuranKemenag114";

export type MasterkuCategory =
  | "alquran"
  | "hadist"
  | "buku"
  | "kisah_nabi"
  | "nasehat"
  | "hikmah";

interface MasterkuProps {
  initialCategory?: MasterkuCategory;
}

export const Masterku: React.FC<MasterkuProps> = ({ initialCategory = "alquran" }) => {
  // Main Category State
  const [activeCategory, setActiveCategory] = useState<MasterkuCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selection states for each module:
  // 1. Hadist
  const [selectedHadistId, setSelectedHadistId] = useState<string>(LIST_HADIST_PILIHAN[0].id);

  // 3. Buku Pelajaran
  const [selectedBukuId, setSelectedBukuId] = useState<string>(LIST_BUKU_PELAJARAN[0].id);
  const [selectedBabNomor, setSelectedBabNomor] = useState<number>(1);

  // 4. Kisah Nabi & Rasul
  const [selectedNabiNomor, setSelectedNabiNomor] = useState<number>(1); // Default Nabi Adam

  // 5. Nasehat Islami
  const [selectedNasehatId, setSelectedNasehatId] = useState<string>(LIST_NASEHAT_ISLAMI[0].id);

  // 6. Hikmah
  const [selectedHikmahId, setSelectedHikmahId] = useState<string>(LIST_HIKMAH_INSPIRATIF[0].id);

  // Toast / copy feedback
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrintCurrent = () => {
    window.print();
  };

  // Current active selections
  const currentHadist = LIST_HADIST_PILIHAN.find((h) => h.id === selectedHadistId) || LIST_HADIST_PILIHAN[0];
  const currentBuku = LIST_BUKU_PELAJARAN.find((b) => b.id === selectedBukuId) || LIST_BUKU_PELAJARAN[0];
  const currentBab = currentBuku.babList.find((bb) => bb.babNomor === selectedBabNomor) || currentBuku.babList[0];
  const currentNabi = LIST_KISAH_NABI.find((n) => n.nomorUrut === selectedNabiNomor) || LIST_KISAH_NABI[0];
  const currentNasehat = LIST_NASEHAT_ISLAMI.find((n) => n.id === selectedNasehatId) || LIST_NASEHAT_ISLAMI[0];
  const currentHikmah = LIST_HIKMAH_INSPIRATIF.find((hk) => hk.id === selectedHikmahId) || LIST_HIKMAH_INSPIRATIF[0];

  const categories = [
    {
      id: "alquran" as MasterkuCategory,
      title: "Al-Qur'an & Terjemah",
      desc: "114 Surat & Terjemah Kemenag RI",
      icon: BookOpen,
      badge: "114 Surat Lengkap",
      color: "from-emerald-700 to-teal-800",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
      id: "hadist" as MasterkuCategory,
      title: "Hadist Pilihan",
      desc: "Matan Arab, syarah & perawi",
      icon: Scroll,
      badge: `${LIST_HADIST_PILIHAN.length} Hadits Pokok`,
      color: "from-amber-700 to-yellow-800",
      accent: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
      id: "buku" as MasterkuCategory,
      title: "Buku Pelajaran",
      desc: "PAI Kelas 7, 8, 9 & ringkasan bab",
      icon: BookMarked,
      badge: "Kurikulum Merdeka",
      color: "from-blue-700 to-indigo-800",
      accent: "text-blue-700 bg-blue-50 border-blue-200"
    },
    {
      id: "kisah_nabi" as MasterkuCategory,
      title: "Kisah Nabi & Rosul",
      desc: "Mukjizat, dakwah & keteladanan",
      icon: Compass,
      badge: "25 Nabi & Rasul",
      color: "from-teal-700 to-emerald-900",
      accent: "text-teal-700 bg-teal-50 border-teal-200"
    },
    {
      id: "nasehat" as MasterkuCategory,
      title: "Nasehat Islami",
      desc: "Kalam salafush shalih & ulama",
      icon: HeartHandshake,
      badge: "Mutiara Adab",
      color: "from-purple-700 to-indigo-900",
      accent: "text-purple-700 bg-purple-50 border-purple-200"
    },
    {
      id: "hikmah" as MasterkuCategory,
      title: "Kisah Hikmah",
      desc: "Inspirasi ibrah penyejuk jiwa",
      icon: Lightbulb,
      badge: "Ibrah & Renungan",
      color: "from-rose-700 to-amber-800",
      accent: "text-rose-700 bg-rose-50 border-rose-200"
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/60">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-amber-300 text-xs font-black tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>KHAZANAH ISLAM & SUMBER BELAJAR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Masterku
              <span className="text-sm font-semibold text-emerald-300 px-3 py-0.5 rounded-xl bg-emerald-950/80 border border-emerald-700/50">
                Pustaka Digital PAI
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Pusat referensi pembelajaran Islam terpadu: Al-Qur'an dan terjemahannya, Hadits shahih, materi buku pelajaran kurikulum, kisah 25 nabi dan rasul, untaian nasehat islami, serta kisah-kisah hikmah penuh ibrah. Cukup pilih topik yang Anda inginkan, seluruh konten akan otomatis tersaji seketika.
            </p>
          </div>

          {/* Quick Stats or Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrintCurrent}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 border border-white/15 transition shadow-sm backdrop-blur-sm"
              title="Cetak atau simpan sebagai PDF"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Konten</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Category Selector Tabs (Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery("");
              }}
              className={`text-left p-3.5 rounded-2xl border transition-all relative flex flex-col justify-between group ${
                isActive
                  ? "bg-white shadow-lg border-emerald-600 ring-2 ring-emerald-500/30 -translate-y-0.5"
                  : "bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-emerald-700 text-white shadow-sm" : "bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  )}
                </div>
                <div>
                  <h3 className={`font-black text-xs leading-snug ${isActive ? "text-emerald-950 font-black" : "text-slate-800"}`}>
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {cat.desc}
                  </p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9.5px] font-bold text-slate-400 group-hover:text-emerald-700">
                  {cat.badge}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-emerald-700" : "text-slate-300"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. AL-QUR'AN DAN TERJEMAH KEMENAG RI (114 SURAT LENGKAP) */}
      {/* ========================================================================= */}
      {activeCategory === "alquran" && (
        <QuranKemenag114 />
      )}

      {/* ========================================================================= */}
      {/* 2. HADIST PILIHAN */}
      {/* ========================================================================= */}
      {activeCategory === "hadist" && (
        <div className="space-y-4">
          {/* Selector Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Scroll className="w-4 h-4 text-amber-700" />
                  Pilih Hadits Nabawi:
                </label>
                <div className="text-xs text-slate-500">
                  Pilih tema hadits di bawah ini untuk menampilkan matan Arab, takhrij perawi, terjemah, dan faidah ilmiyahnya.
                </div>
              </div>

              {/* Hadits Dropdown */}
              <select
                value={selectedHadistId}
                onChange={(e) => setSelectedHadistId(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/60 font-black text-xs text-amber-950 focus:ring-2 focus:ring-amber-500 focus:outline-none min-w-[280px]"
              >
                {LIST_HADIST_PILIHAN.map((h) => (
                  <option key={h.id} value={h.id}>
                    [{h.tema}] {h.judul} - {h.perawi.split(",")[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Chips for Hadits */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Tema Hadits:</span>
              {LIST_HADIST_PILIHAN.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHadistId(h.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                    selectedHadistId === h.id
                      ? "bg-amber-600 text-white border-amber-500 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {h.judul}
                </button>
              ))}
            </div>
          </div>

          {/* Current Hadits Card Detail */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Hadits Card Header */}
            <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-yellow-900 p-5 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px] border border-white/20">
                      {currentHadist.kitab}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-200 font-extrabold text-[11px]">
                      {currentHadist.tema}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white">{currentHadist.judul}</h2>
                  <p className="text-xs text-amber-100 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Takhrij / Perawi: <strong className="text-white">{currentHadist.perawi}</strong></span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    const text = `${currentHadist.judul}\n${currentHadist.perawi}\n\n${currentHadist.arab}\n\nArtinya:\n${currentHadist.terjemah}\n\nFaidah:\n` +
                      currentHadist.faidah.map((f, i) => `${i + 1}. ${f}`).join("\n");
                    handleCopyText(text, `hadist-${currentHadist.id}`);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition self-start sm:self-auto"
                >
                  {copiedId === `hadist-${currentHadist.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Hadits</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hadits Body */}
            <div className="p-6 space-y-6">
              {/* Matan Arab */}
              <div className="bg-amber-50/40 p-6 rounded-2xl border border-amber-200/80 text-right">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 block text-left mb-2">
                  Matan Hadits (Bahasa Arab):
                </span>
                <p dir="rtl" className="font-serif text-2xl sm:text-3xl text-slate-900 leading-[2.4] font-normal">
                  {currentHadist.arab}
                </p>
              </div>

              {/* Terjemahan */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Terjemahan Bahasa Indonesia:
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                  "{currentHadist.terjemah}"
                </p>
              </div>

              {/* Faidah & Pelajaran Ilmiyah */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Kandungan & Faidah Hadits untuk Pembelajaran:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentHadist.faidah.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-emerald-300 transition"
                    >
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {f}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BUKU PELAJARAN PAI */}
      {/* ========================================================================= */}
      {activeCategory === "buku" && (
        <div className="space-y-4">
          {/* Book & Chapter Selectors */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select Book (Kelas 7, 8, 9) */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-blue-700" />
                  1. Pilih Buku PAI & Budi Pekerti:
                </label>
                <select
                  value={selectedBukuId}
                  onChange={(e) => {
                    setSelectedBukuId(e.target.value);
                    setSelectedBabNomor(1);
                  }}
                  className="w-full p-2.5 rounded-xl border border-blue-300 bg-blue-50/60 font-black text-xs text-blue-950 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {LIST_BUKU_PELAJARAN.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.judul} ({b.kelas})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Chapter (Bab) */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-700" />
                  2. Pilih Bab Materi Pelajaran:
                </label>
                <select
                  value={selectedBabNomor}
                  onChange={(e) => setSelectedBabNomor(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-blue-300 bg-blue-50/60 font-black text-xs text-blue-950 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {currentBuku.babList.map((bab) => (
                    <option key={bab.babNomor} value={bab.babNomor}>
                      Bab {bab.babNomor}: {bab.judulBab} [{bab.kategori}]
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Bab Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Daftar Bab {currentBuku.kelas}:</span>
              {currentBuku.babList.map((bab) => (
                <button
                  key={bab.babNomor}
                  onClick={() => setSelectedBabNomor(bab.babNomor)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                    selectedBabNomor === bab.babNomor
                      ? "bg-blue-700 text-white border-blue-600 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <span>Bab {bab.babNomor}</span>
                  <span className="text-[10px] opacity-80">({bab.kategori})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Content View */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Header Bab */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 p-5 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px]">
                      {currentBuku.kelas}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px]">
                      {currentBab.kategori}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white">
                    Bab {currentBab.babNomor}: {currentBab.judulBab}
                  </h2>
                  <p className="text-xs text-blue-100 font-medium">
                    {currentBuku.kurikulum}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const text = `Bab ${currentBab.babNomor}: ${currentBab.judulBab} (${currentBuku.kelas})\n\nRingkasan:\n${currentBab.ringkasan}\n\nTujuan Pembelajaran:\n` +
                      currentBab.tujuanPembelajaran.map((t) => `- ${t}`).join("\n") +
                      `\n\nMateri Pokok:\n` +
                      currentBab.materiPokok.map((m) => `- ${m}`).join("\n");
                    handleCopyText(text, `bab-${currentBuku.id}-${currentBab.babNomor}`);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition self-start sm:self-auto"
                >
                  {copiedId === `bab-${currentBuku.id}-${currentBab.babNomor}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Rangkuman Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Rangkuman Bab</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Body Bab */}
            <div className="p-6 space-y-6">
              {/* Ringkasan Bab */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200/80 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-900 block">
                  Ringkasan & Intisari Bab:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {currentBab.ringkasan}
                </p>
              </div>

              {/* Grid: Tujuan Pembelajaran & Materi Pokok */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tujuan Pembelajaran */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    Tujuan Pembelajaran (Alur TP):
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentBab.tujuanPembelajaran.map((tp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{tp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materi Pokok Bahasan */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Materi Pokok Bahasan:
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentBab.materiPokok.map((mp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{mp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Istilah Penting / Glosarium Islami */}
              {currentBab.istilahPenting && currentBab.istilahPenting.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Glosarium & Istilah Penting:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentBab.istilahPenting.map((ist, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        <span className="font-extrabold text-xs text-slate-900 block text-emerald-800">
                          {ist.kata}
                        </span>
                        <span className="text-xs text-slate-600 leading-snug">
                          {ist.arti}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. KISAH-KISAH NABI DAN ROSUL */}
      {/* ========================================================================= */}
      {activeCategory === "kisah_nabi" && (
        <div className="space-y-4">
          {/* Selector Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-teal-700" />
                  Pilih Kisah Nabi & Rasul:
                </label>
                <div className="text-xs text-slate-500">
                  Pilih salah satu dari 25 nabi & rasul untuk memuat riwayat dakwah, mukjizat, dan keteladanan akhlaknya.
                </div>
              </div>

              {/* Dropdown Nabi */}
              <select
                value={selectedNabiNomor}
                onChange={(e) => setSelectedNabiNomor(Number(e.target.value))}
                className="px-3.5 py-2 rounded-xl border border-teal-300 bg-teal-50/60 font-black text-xs text-teal-950 focus:ring-2 focus:ring-teal-500 focus:outline-none min-w-[280px]"
              >
                {LIST_KISAH_NABI.map((n) => (
                  <option key={n.nomorUrut} value={n.nomorUrut}>
                    {n.nomorUrut}. {n.nama} {n.isUlulAzmi ? "⭐ [Ulul Azmi]" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Grid of Nabi Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Pilihan Cepat:</span>
              {LIST_KISAH_NABI.map((n) => (
                <button
                  key={n.nomorUrut}
                  onClick={() => setSelectedNabiNomor(n.nomorUrut)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                    selectedNabiNomor === n.nomorUrut
                      ? "bg-teal-700 text-white border-teal-600 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <span>{n.nama}</span>
                  {n.isUlulAzmi && <span className="text-amber-300">⭐</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Nabi Detail Display */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Header Banner Nabi */}
            <div className="bg-gradient-to-r from-teal-800 via-emerald-900 to-slate-900 p-5 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px]">
                      Nabi ke-{currentNabi.nomorUrut}
                    </span>
                    {currentNabi.isUlulAzmi && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] flex items-center gap-1">
                        <span>⭐ Rasul Ulul Azmi</span>
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-200 font-extrabold text-[11px]">
                      {currentNabi.periodeKaum}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{currentNabi.nama}</h2>
                  {currentNabi.gelar && (
                    <p className="text-xs text-amber-300 font-bold">
                      Gelar: {currentNabi.gelar}
                    </p>
                  )}
                  <p className="text-xs text-teal-100 font-medium">
                    Tempat Dakwah: {currentNabi.tempatDakwah} | Rujukan: {currentNabi.ayatAlquran}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const text = `${currentNabi.nama} (${currentNabi.gelar || ''})\nKaum: ${currentNabi.periodeKaum}\n\nKisah:\n${currentNabi.ringkasanKisah}\n\nMukjizat:\n` +
                      currentNabi.mukjizat.map((m) => `- ${m}`).join("\n") +
                      `\n\nKeteladanan:\n` +
                      currentNabi.keteladanan.map((k) => `- ${k}`).join("\n");
                    handleCopyText(text, `nabi-${currentNabi.nomorUrut}`);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition self-start sm:self-auto"
                >
                  {copiedId === `nabi-${currentNabi.nomorUrut}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Kisah Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kisah Nabi</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Body Kisah */}
            <div className="p-6 space-y-6">
              {/* Ringkasan Kisah */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Riwayat & Perjalanan Dakwah:
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {currentNabi.ringkasanKisah}
                </p>
              </div>

              {/* Mukjizat & Keteladanan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mukjizat */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Mukjizat & Keistimewaan atas Izin Allah:
                  </h3>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {currentNabi.mukjizat.map((mk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{mk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keteladanan */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    Ibrah & Nilai Keteladanan untuk Siswa:
                  </h3>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {currentNabi.keteladanan.map((kt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{kt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. NASEHAT ISLAMI */}
      {/* ========================================================================= */}
      {activeCategory === "nasehat" && (
        <div className="space-y-4">
          {/* Selector Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-purple-700" />
                  Pilih Untaian Nasehat Ulama & Salaf:
                </label>
                <div className="text-xs text-slate-500">
                  Pilih salah satu tokoh bijak untuk memunculkan kalam hikmah, renungan batin, dan amalan praktis harian.
                </div>
              </div>

              {/* Dropdown Tokoh */}
              <select
                value={selectedNasehatId}
                onChange={(e) => setSelectedNasehatId(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-purple-300 bg-purple-50/60 font-black text-xs text-purple-950 focus:ring-2 focus:ring-purple-500 focus:outline-none min-w-[280px]"
              >
                {LIST_NASEHAT_ISLAMI.map((n) => (
                  <option key={n.id} value={n.id}>
                    [{n.tema}] {n.tokoh}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Tokoh Salaf:</span>
              {LIST_NASEHAT_ISLAMI.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNasehatId(n.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                    selectedNasehatId === n.id
                      ? "bg-purple-700 text-white border-purple-600 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {n.tokoh.split(" ")[0]} ({n.tema})
                </button>
              ))}
            </div>
          </div>

          {/* Current Nasehat Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Header Nasehat */}
            <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 p-5 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px]">
                      {currentNasehat.tema}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-200 font-extrabold text-[11px]">
                      {currentNasehat.peran}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white">{currentNasehat.tokoh}</h2>
                </div>

                <button
                  onClick={() => {
                    const text = `Nasehat dari ${currentNasehat.tokoh} (${currentNasehat.tema}):\n\n` +
                      (currentNasehat.kutipanArab ? `${currentNasehat.kutipanArab}\n\n` : '') +
                      `"${currentNasehat.kutipanIndonesia}"\n\nUraian Hikmah:\n${currentNasehat.uraianHikmah}\n\nAmalan Praktis:\n${currentNasehat.amalanPraktis}`;
                    handleCopyText(text, `nasehat-${currentNasehat.id}`);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition self-start sm:self-auto"
                >
                  {copiedId === `nasehat-${currentNasehat.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Nasehat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Nasehat</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Body Nasehat */}
            <div className="p-6 space-y-6">
              {/* Kutipan Arab jika ada */}
              {currentNasehat.kutipanArab && (
                <div className="bg-purple-50/40 p-5 rounded-2xl border border-purple-200/80 text-right">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-800 block text-left mb-2">
                    Kutipan Asli:
                  </span>
                  <p dir="rtl" className="font-serif text-xl sm:text-2xl text-slate-900 leading-[2.2]">
                    {currentNasehat.kutipanArab}
                  </p>
                </div>
              )}

              {/* Kutipan Indonesia / Kata Mutiara */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50/50 p-5 rounded-2xl border border-purple-100 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-900 block">
                  Kalam Mutiara Bijak:
                </span>
                <p className="text-base text-slate-900 font-bold italic leading-relaxed">
                  "{currentNasehat.kutipanIndonesia}"
                </p>
              </div>

              {/* Uraian Hikmah & Amalan Praktis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    Refleksi & Makna Mendalam:
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentNasehat.uraianHikmah}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Amalan & Aplikasi Praktis Harian:
                  </h3>
                  <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                    {currentNasehat.amalanPraktis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. HIKMAH (KISAH INSPIRATIF & IBRAH) */}
      {/* ========================================================================= */}
      {activeCategory === "hikmah" && (
        <div className="space-y-4">
          {/* Selector Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-rose-700" />
                  Pilih Kisah Penuh Hikmah & Ibrah:
                </label>
                <div className="text-xs text-slate-500">
                  Pilih kisah inspiratif teladan untuk membuka pembelajaran (ice breaking / apersepsi) atau bahan kultum.
                </div>
              </div>

              {/* Dropdown Kisah Hikmah */}
              <select
                value={selectedHikmahId}
                onChange={(e) => setSelectedHikmahId(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-rose-300 bg-rose-50/60 font-black text-xs text-rose-950 focus:ring-2 focus:ring-rose-500 focus:outline-none min-w-[280px]"
              >
                {LIST_HIKMAH_INSPIRATIF.map((hk) => (
                  <option key={hk.id} value={hk.id}>
                    [{hk.kategori}] {hk.judul}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Daftar Kisah:</span>
              {LIST_HIKMAH_INSPIRATIF.map((hk) => (
                <button
                  key={hk.id}
                  onClick={() => setSelectedHikmahId(hk.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                    selectedHikmahId === hk.id
                      ? "bg-rose-700 text-white border-rose-600 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {hk.tokohKisah}
                </button>
              ))}
            </div>
          </div>

          {/* Current Hikmah Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Header Banner Kisah */}
            <div className="bg-gradient-to-r from-rose-800 via-amber-900 to-slate-900 p-5 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[11px]">
                      {currentHikmah.kategori}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-200 font-extrabold text-[11px]">
                      Tokoh: {currentHikmah.tokohKisah}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{currentHikmah.judul}</h2>
                  <p className="text-xs text-rose-200/90 font-medium">
                    Dalil Terkait: {currentHikmah.dalilTerkait}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const text = `${currentHikmah.judul}\nTokoh: ${currentHikmah.tokohKisah}\nDalil: ${currentHikmah.dalilTerkait}\n\nSinopsis:\n${currentHikmah.sinopsis}\n\nKisah Lengkap:\n${currentHikmah.kisahLengkap}\n\nButir-butir Hikmah:\n` +
                      currentHikmah.pelajaranHikmah.map((p, i) => `${i + 1}. ${p}`).join("\n");
                    handleCopyText(text, `hikmah-${currentHikmah.id}`);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition self-start sm:self-auto"
                >
                  {copiedId === `hikmah-${currentHikmah.id}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Kisah Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kisah Hikmah</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Body Hikmah */}
            <div className="p-6 space-y-6">
              {/* Sinopsis */}
              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200/80 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-900 block">
                  Sinopsis Singkat:
                </span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {currentHikmah.sinopsis}
                </p>
              </div>

              {/* Kisah Lengkap */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                  Alur Cerita Naratif:
                </span>
                <div className="text-sm text-slate-800 leading-relaxed font-normal bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <p className="whitespace-pre-line">{currentHikmah.kisahLengkap}</p>
                </div>
              </div>

              {/* Butir-Butir Ibrah & Pelajaran Hikmah */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Pelajaran Moral & Hikmah Spiritual:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentHikmah.pelajaranHikmah.map((plj, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1.5"
                    >
                      <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {plj}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
