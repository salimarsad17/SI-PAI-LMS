/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, User, ShieldCheck, GraduationCap, ArrowRight, Info, Building2, Sparkles } from "lucide-react";
import { Guru, Siswa } from "../types";
import studentBg from "../assets/images/smp_student_mosque_1785149760195.jpg";

interface LoginProps {
  onLoginGuru: (nip: string) => void;
  onLoginSiswa: (nisn: string) => void;
  teachers: Guru;
  students: Siswa[];
}

export default function Login({ onLoginGuru, onLoginSiswa, teachers, students }: LoginProps) {
  const [activeTab, setActiveTab] = useState<"guru" | "siswa">("guru");
  const [nipInput, setNipInput] = useState("");
  const [nisnInput, setNisnInput] = useState("");
  const [error, setError] = useState("");

  const handleGuruLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nipInput.trim()) {
      setError("NIP / Nomor Registrasi wajib diisi.");
      return;
    }

    if (nipInput === teachers.nip || nipInput === "123") {
      onLoginGuru(teachers.nip);
    } else {
      setError("NIP tidak terdaftar dalam database Guru UPT SMPN 2 Rebang Tangkas.");
    }
  };

  const handleSiswaLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nisnInput.trim()) {
      setError("NISN wajib diisi.");
      return;
    }

    const found = students.find(s => s.nisn === nisnInput.trim() || (nisnInput === "123" && s.nisn === "0098765432"));
    if (found) {
      onLoginSiswa(found.nisn);
    } else {
      setError("NISN tidak terdaftar dalam database Siswa UPT SMPN 2 Rebang Tangkas.");
    }
  };

  const handleQuickLogin = (role: "guru" | "siswa", id: string) => {
    setError("");
    if (role === "guru") {
      onLoginGuru(id);
    } else {
      onLoginSiswa(id);
    }
  };

  return (
    <div id="login-container" className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-emerald-50 via-slate-50 to-amber-50/50 text-slate-800 font-sans overflow-y-auto">
      {/* Decorative bright ambient highlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Banner: Gambar Anak Sekolah SMP (Peci & Hijab, Sekolah 2 Lantai & Masjid) berada di Samping Login */}
        <div className="lg:col-span-6 relative bg-emerald-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8 min-h-[320px] lg:min-h-full text-white">
          {/* Bright, high-resolution student image */}
          <div className="absolute inset-0 z-0">
            <img
              src={studentBg}
              alt="Siswa SMP Laki-Laki Berpeci di Pojok Masjid"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Soft subtle gradient to keep image super clear & bright, but text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-emerald-950/20 to-transparent"></div>
          </div>

          {/* Top Info Tag */}
          <div className="relative z-10 flex items-center justify-end gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> PAI & LMS
            </span>
          </div>

          {/* Bottom Captions */}
          <div className="relative z-10 mt-auto pt-12 space-y-2">
            <div className="inline-block bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase text-emerald-100 border border-emerald-400/30">
              Generasi Muslim Berkarakter
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Sistem Informasi Pendidikan Agama Islam
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed drop-shadow max-w-md">
              Pembelajaran Digital terpadu untuk Siswa dan Guru dengan Jurnal Ibadah, Bank Soal, LMS Interaktif & Rekap Nilai Otomatis.
            </p>
          </div>
        </div>

        {/* Right Side: Form Login / Tombol Login */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-white">
          <div className="space-y-6">
            {/* Header Form */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold tracking-widest text-emerald-800 uppercase">
                  Portal Masuk Portal SI-PAI
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Selamat Datang
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Silakan pilih jenis akun Anda di bawah ini untuk melanjutkan.
              </p>
            </div>

            {/* Tab Selection */}
            <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => { setActiveTab("guru"); setError(""); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === "guru"
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                id="tab-login-guru"
              >
                <ShieldCheck className="w-4 h-4" />
                Guru / Wali Kelas
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab("siswa"); setError(""); }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === "siswa"
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                id="tab-login-siswa"
              >
                <GraduationCap className="w-4 h-4" />
                Siswa (LMS)
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2 border border-red-200 animate-fadeIn">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Form Input */}
            {activeTab === "guru" ? (
              <form onSubmit={handleGuruLogin} className="space-y-4">
                <div>
                  <label htmlFor="nip" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    NIP / Nomor Registrasi Guru
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="nip"
                      type="text"
                      required
                      value={nipInput}
                      onChange={(e) => setNipInput(e.target.value)}
                      placeholder="Masukkan NIP (Contoh: 198412122...)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition shadow-sm placeholder:text-slate-400"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Masukkan NIP terdaftar untuk mengelola perangkat ajar & jurnal kelas.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/20 active:scale-[0.99] group"
                >
                  Masuk Aplikasi Guru
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSiswaLogin} className="space-y-4">
                <div>
                  <label htmlFor="nisn" className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    NISN (Nomor Induk Siswa Nasional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <input
                      id="nisn"
                      type="text"
                      required
                      value={nisnInput}
                      onChange={(e) => setNisnInput(e.target.value)}
                      placeholder="Masukkan 10 digit NISN (Contoh: 0098...)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition shadow-sm placeholder:text-slate-400"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Gunakan NISN aktif Anda untuk belajar di LMS & mencatat Ibadah.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/20 active:scale-[0.99] group"
                >
                  Masuk LMS Siswa
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </button>
              </form>
            )}

            {/* Quick Demo Selector */}
            <div className="pt-4 border-t border-slate-200">
              <span className="block text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Akses Uji Coba Cepat (Demo Accounts)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("guru", teachers.nip)}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-left transition duration-200"
                >
                  <span className="block text-[10px] font-extrabold text-emerald-800 uppercase tracking-wide">
                    Login Guru
                  </span>
                  <span className="block text-xs font-bold text-slate-800 truncate">
                    H. Ahmad Syukron
                  </span>
                  <span className="block text-[10px] text-slate-500 font-mono">
                    NIP: ...11005
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("siswa", "0098765432")}
                  className="p-2.5 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 text-left transition duration-200"
                >
                  <span className="block text-[10px] font-extrabold text-amber-800 uppercase tracking-wide">
                    Login Siswa
                  </span>
                  <span className="block text-xs font-bold text-slate-800 truncate">
                    Farhan Maulana
                  </span>
                  <span className="block text-[10px] text-slate-500 font-mono">
                    NISN: 0098765432
                  </span>
                </button>
              </div>
              <div className="mt-2 text-[10px] text-center text-slate-400">
                *Atau ketik kata sandi simulasi <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono font-bold">123</code>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            <span>SI-PAI & LMS © 2026 UPT SMPN 2 Rebang Tangkas</span>
          </div>
        </div>

      </div>
    </div>
  );
}


