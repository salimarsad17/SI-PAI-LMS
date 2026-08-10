/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Users, GraduationCap, Clock, Bell, CheckCircle2, AlertCircle, BookOpen, ExternalLink, Link2, Globe, ShieldCheck, Award } from "lucide-react";
import { Guru, Kelas, JurnalMengajar, PengumpulanTugas } from "../../types";

interface GuruDashboardProps {
  guru: Guru;
  classes: Kelas[];
  attendanceRate: number; // e.g. 94.2
  jurnals: JurnalMengajar[];
  pendingSubmissions: PengumpulanTugas[];
  onNavigate: (tab: string, subTab?: string) => void;
  onGradeClick: (submissionId: string) => void;
}

export default function GuruDashboard({
  guru,
  classes,
  attendanceRate,
  jurnals,
  pendingSubmissions,
  onNavigate,
  onGradeClick
}: GuruDashboardProps) {
  const totalSiswa = classes.reduce((sum, c) => sum + c.totalSiswa, 0);

  // Today's agenda items
  const agendaHariIni = [
    { kelas: "VII-A", jam: "Jam ke 1-2 (07:30 - 09:00)", materi: "Thaharah & Praktek Wudhu", tempat: "Mushola Al-Ikhlas" },
    { kelas: "VII-B", jam: "Jam ke 4-5 (10:15 - 11:45)", materi: "Meneladani Sikap Jujur & Amanah", tempat: "Ruang Kelas VII-B" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10">
          <BookOpen className="w-80 h-80" />
        </div>
        <div className="relative z-10 space-y-2">
          <div className="inline-block bg-emerald-700/50 backdrop-blur-sm text-amber-300 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
            Guru Pendidikan Agama Islam (PAI) & Budi Pekerti
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang, {guru.nama}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl">
            Sistem Informasi PAI Terpadu UPT SMPN 2 Rebang Tangkas. Kelola kurikulum, pantau sikap spiritual-sosial siswa, dan selenggarakan kelas interaktif dengan LMS dalam satu dasbor terpadu.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200">
            <span><strong>NIP:</strong> {guru.nip}</span>
            <span>•</span>
            <span><strong>Wali Kelas:</strong> {guru.isWaliKelas ? `Kelas ${guru.waliKelasDi}` : "Bukan Wali Kelas"}</span>
            <span>•</span>
            <span><strong>Sertifikasi:</strong> {guru.sertifikasi}</span>
          </div>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">Kelas Diampu</span>
            <span className="block text-2xl font-bold text-slate-900">{classes.length} Kelas</span>
            <span className="block text-xs text-slate-500 mt-0.5">Fase D (Kelas VII & VIII)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">Total Siswa Aktif</span>
            <span className="block text-2xl font-bold text-slate-900">{totalSiswa} Siswa</span>
            <span className="block text-xs text-slate-500 mt-0.5">Siswa terdaftar SI-PAI</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">Kehadiran Siswa</span>
            <span className="block text-2xl font-bold text-slate-900">{attendanceRate}%</span>
            <span className="block text-xs text-emerald-600 font-medium mt-0.5">Melampaui target bulanan</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Agenda & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agenda Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Agenda Mengajar Hari Ini
              </h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Senin, 13 Juli 2026
              </span>
            </div>

            <div className="space-y-3">
              {agendaHariIni.map((agenda, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition duration-150">
                  <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex flex-col items-center justify-center text-xs shrink-0 border border-emerald-100">
                    <span className="text-[10px] uppercase text-emerald-600 tracking-wider">KELAS</span>
                    <span className="text-sm font-extrabold leading-none">{agenda.kelas}</span>
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">
                      {agenda.materi}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {agenda.jam}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">
                        {agenda.tempat}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate("jurnal", "jurnal-mengajar")}
                    className="self-center p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                    title="Isi Jurnal Mengajar"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Laporan jurnal harian akan direkap secara otomatis setiap bulannya.
              </span>
              <button
                onClick={() => onNavigate("jurnal", "jurnal-mengajar")}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Lihat Semua Jurnal &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Notifications / Pending Submissions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full flex flex-col">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-emerald-600" />
              Notifikasi & LMS Tugas
              {pendingSubmissions.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingSubmissions.length}
                </span>
              )}
            </h2>

            {pendingSubmissions.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Semua tugas siswa telah dinilai!</p>
                <p className="text-[10px] text-slate-400 mt-1">Tidak ada setoran hafalan tertunda.</p>
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[280px] pr-1">
                {pendingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/70 hover:bg-amber-50 transition duration-150 space-y-2 text-left"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-bold text-amber-950 font-sans">
                        {sub.siswaNama} ({sub.kelasId})
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                        {sub.tipePengumpulan}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-relaxed line-clamp-2 bg-white/60 p-1.5 rounded border border-amber-50">
                      <strong>{sub.tugasJudul}</strong>: {sub.kontenTeks}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Hari ini {sub.tanggalKumpul.split(" ")[1]}</span>
                      <button
                        onClick={() => onGradeClick(sub.id)}
                        className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-0.5"
                      >
                        Beri Nilai &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigate("nilai")}
                className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 transition"
              >
                Masuk Rekap Nilai PAI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LINK PORTAL KEDINASAN SECTION (SIAGA PENDIS, INFO GTK, MyASN BKN) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-black uppercase">
              <Globe className="w-3 h-3" /> Tautan Layanan Kedinasan Resmi
            </div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-amber-400" />
              Akses Cepat Portal Guru & ASN (SIAGA Pendis, Info GTK, MyASN BKN)
            </h2>
          </div>

          <button
            onClick={() => onNavigate("link")}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition shadow-md self-start sm:self-auto cursor-pointer"
          >
            <span>Buka Semua Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SIAGA PENDIS CARD */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-800/50 hover:border-emerald-500 transition space-y-3 flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-emerald-900 text-emerald-300 text-[10px] font-black rounded border border-emerald-700/50">
                  KEMENAG RI
                </span>
                <span className="text-[10px] font-bold text-emerald-400">Aktif / Real-time</span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-emerald-400 transition">
                SIAGA Pendis Kemenag
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                Portal verifikasi jadwal mengajar PAI, pencairan TPG Kemenag, dan verval sertifikasi guru agama.
              </p>
            </div>
            <a
              href="https://www.siagapendis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition shadow"
            >
              <span>Buka SIAGA Pendis</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* INFO GTK CARD */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-blue-800/50 hover:border-blue-500 transition space-y-3 flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-blue-900 text-blue-300 text-[10px] font-black rounded border border-blue-700/50">
                  KEMDIKBUDRISTEK
                </span>
                <span className="text-[10px] font-bold text-blue-400">Dapodik Linked</span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-blue-400 transition">
                Info GTK Kemdikbud
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                Cek validasi data Dapodik, beban mengajar (JJM), penerbitan SKTP, dan NUPTK guru.
              </p>
            </div>
            <a
              href="https://info.gtk.kemdikbud.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition shadow"
            >
              <span>Buka Info GTK</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* MyASN BKN CARD */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-800/50 hover:border-amber-500 transition space-y-3 flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-amber-900 text-amber-300 text-[10px] font-black rounded border border-amber-700/50">
                  BADAN KEPEGAWAIAN NEGARA
                </span>
                <span className="text-[10px] font-bold text-amber-400">PNS & PPPK</span>
              </div>
              <h3 className="text-sm font-black text-white group-hover:text-amber-400 transition">
                MyASN BKN (MySAPK)
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                Peremajaan Data Mandiri (PDM) ASN, riwayat SK kepangkatan, E-Kinerja, dan profil BKN.
              </p>
            </div>
            <a
              href="https://myasn.bkn.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-lg flex items-center justify-center gap-1.5 transition shadow"
            >
              <span>Buka MyASN BKN</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
