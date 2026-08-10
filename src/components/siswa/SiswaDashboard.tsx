/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Bell, Calendar, Clock, ArrowRight, UserCheck, ChevronRight, FileText } from "lucide-react";
import { Siswa, TugasLms, PengumpulanTugas } from "../../types";

interface SiswaDashboardProps {
  siswa: Siswa;
  tasks: TugasLms[];
  submissions: PengumpulanTugas[];
  onNavigate: (tab: string) => void;
}

export default function SiswaDashboard({
  siswa,
  tasks,
  submissions,
  onNavigate
}: SiswaDashboardProps) {
  // Find which tasks are already submitted vs pending
  const classTasks = tasks.filter((t) => t.kelasId === siswa.kelasId);

  const pendingTasks = classTasks.filter(
    (task) => !submissions.some((sub) => sub.tugasId === task.id)
  );

  const announcements = [
    {
      id: "a-1",
      sender: "H. Ahmad Syukron, M.Pd.",
      date: "Hari ini, 08:00",
      content: "Assalamualaikum Wr Wb anak-anakku Kelas VII-A. Mengingat hari Kamis esok akan dilaksanakan praktik Sholat Gerhana (Khusuf), dimohon kepada seluruh siswa agar membawa perlengkapan ibadah (mukena bagi siswi, sarung & peci bagi siswa) serta membawa mushaf Al-Qur'an saku ke mushola sekolah tepat jam ke-1.",
      badge: "PENTING"
    },
    {
      id: "a-2",
      sender: "H. Ahmad Syukron, M.Pd.",
      date: "Kemarin",
      content: "Bagi yang belum melengkapi setoran hafalan surah Ad-Duha di LMS, bapak tunggu batas pengumpulannya hingga minggu depan nggih. Harap dibaca tajwid panjang-pendeknya dengan baik.",
      badge: "PENGUMUMAN"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Student Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 opacity-10">
          <GraduationCap className="w-72 h-72" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-block bg-amber-400 text-emerald-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Ruang Belajar Digital Siswa
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Marhaban, {siswa.nama}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Selamat datang di portal pembelajaran PAI UPT SMPN 2 Rebang Tangkas. Mari luruskan niat belajar kita hari ini untuk meraih keberkahan ilmu!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200 font-semibold font-mono">
              <span>NISN: {siswa.nisn}</span>
              <span>•</span>
              <span>Kelas: {siswa.kelasId}</span>
              <span>•</span>
              <span>Agama: {siswa.agama}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center shrink-0 w-full sm:w-auto">
            <span className="block text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Tugas Menunggu</span>
            <span className="block text-3xl font-extrabold text-amber-300 my-0.5">{pendingTasks.length}</span>
            <button
              onClick={() => onNavigate("lms")}
              className="text-[11px] font-bold text-white hover:text-amber-300 flex items-center gap-1 mx-auto transition"
            >
              Buka LMS Kelas <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Announcements vs Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Announcements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-emerald-600" />
              Mading & Pengumuman Kelas
            </h2>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{ann.sender}</span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      ann.badge === "PENTING" ? "bg-red-50 text-red-700 border border-red-100" : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                    }`}>
                      {ann.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {ann.content}
                  </p>
                  <span className="block text-[10px] text-slate-400 text-right">
                    {ann.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Garis Waktu Tugas (Timeline) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-emerald-600" />
              Garis Waktu Tugas (Timeline)
            </h2>

            {pendingTasks.length === 0 ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <UserCheck className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-800">Alhamdulillah!</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Semua tugas PAI Anda sudah dikerjakan.</p>
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="relative pl-7 space-y-1.5 group">
                    {/* Circle timeline dot */}
                    <span className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-amber-500 shadow-sm ring-1 ring-slate-200 transition group-hover:scale-110"></span>

                    <div className="text-left">
                      <span className="block text-[10px] font-extrabold uppercase text-amber-700 font-mono">
                        Batas: {task.deadline}
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 line-clamp-1">
                        {task.judul}
                      </h4>
                      <span className="block text-[10px] text-slate-400">
                        {task.bab}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate("lms")}
                      className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
                    >
                      Kerjakan Sekarang <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
