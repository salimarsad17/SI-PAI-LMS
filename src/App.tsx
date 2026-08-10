/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Database,
  BookOpen,
  PenTool,
  Award,
  LogOut,
  Calendar,
  Users,
  GraduationCap,
  Sparkles,
  Info,
  Sliders,
  RefreshCw,
  Clock,
  Heart,
  UserCheck,
  Globe,
  Link2
} from "lucide-react";

import { DataService } from "./data/initialData";
import {
  Guru,
  Kelas,
  Siswa,
  PerangkatAjar,
  JurnalMengajar,
  CatatanSikapSiswa,
  TugasLms,
  PengumpulanTugas,
  JurnalIbadahHarian,
  NilaiKhususPai,
  RekapNilaiTotal,
  NilaiSemesterParalel,
  BabPelajaran
} from "./types";

// Import sub-components
import Login from "./components/Login";
import GuruDashboard from "./components/guru/GuruDashboard";
import DataDasar from "./components/guru/DataDasar";
import PerangkatAjarView from "./components/guru/PerangkatAjar";
import JurnalGuruSiswa from "./components/guru/JurnalGuruSiswa";
import RekapNilai from "./components/guru/RekapNilai";
import PendampinganMurid from "./components/guru/PendampinganMurid";
import LinkLayanan from "./components/guru/LinkLayanan";

import SiswaDashboard from "./components/siswa/SiswaDashboard";
import LmsClassroom from "./components/siswa/LmsClassroom";
import IbadahMandiri from "./components/siswa/IbadahMandiri";
import BukuNilaiSiswa from "./components/siswa/BukuNilaiSiswa";

export default function App() {
  // Session Authentication state
  const [role, setRole] = useState<"GUEST" | "GURU" | "SISWA">("GUEST");
  const [loggedGuruNip, setLoggedGuruNip] = useState<string>("");
  const [loggedSiswaNisn, setLoggedSiswaNisn] = useState<string>("");

  // DB States synchronized with LocalStorage
  const [guruData, setGuruData] = useState<Guru>(DataService.getGuru());
  const [classes, setClasses] = useState<Kelas[]>(DataService.getKelas());
  const [students, setStudents] = useState<Siswa[]>(DataService.getSiswa());
  const [perangkatAjar, setPerangkatAjar] = useState<PerangkatAjar[]>(DataService.getPerangkatAjar());
  const [jurnals, setJurnals] = useState<JurnalMengajar[]>(DataService.getJurnalMengajar());
  const [attitudes, setAttitudes] = useState<CatatanSikapSiswa[]>(DataService.getCatatanSikap());
  const [tasks, setTasks] = useState<TugasLms[]>(DataService.getTugas());
  const [submissions, setSubmissions] = useState<PengumpulanTugas[]>(DataService.getPengumpulan());
  const [worships, setWorships] = useState<JurnalIbadahHarian[]>(DataService.getIbadah());
  const [nilaiKhusus, setNilaiKhusus] = useState<NilaiKhususPai[]>(DataService.getNilaiKhusus());
  const [rekapNilai, setRekapNilai] = useState<RekapNilaiTotal[]>(DataService.getRekapNilai());
  const [nilaiParalelList, setNilaiParalelList] = useState<NilaiSemesterParalel[]>(DataService.getNilaiSemesterParalel());
  const [babPelajaran, setBabPelajaran] = useState<BabPelajaran[]>(DataService.getBabPelajaran());

  const handleUpdateNilaiParalelList = (updated: NilaiSemesterParalel[]) => {
    setNilaiParalelList(updated);
    DataService.saveNilaiSemesterParalel(updated);
  };

  const handleUpdateBabPelajaran = (updatedBab: BabPelajaran[]) => {
    setBabPelajaran(updatedBab);
    DataService.saveBabPelajaran(updatedBab);
  };

  // Navigation Panel Tabs
  const [guruActiveTab, setGuruActiveTab] = useState<"dashboard" | "master" | "perangkat" | "jurnal" | "nilai" | "wali" | "link">("dashboard");
  const [siswaActiveTab, setSiswaActiveTab] = useState<"dashboard" | "lms" | "ibadah" | "nilai">("dashboard");

  const sortStudentsByName = (list: Siswa[]): Siswa[] => {
    return [...list].sort((a, b) => a.nama.localeCompare(b.nama, "id", { sensitivity: "base" }));
  };

  const handleUpdateStudents = (updatedStudents: Siswa[]) => {
    const sorted = sortStudentsByName(updatedStudents);
    setStudents(sorted);
    DataService.saveSiswa(sorted);

    // Synchronize names and classes in rekapNilai state
    const updatedRekap = rekapNilai.map((rec) => {
      const match = sorted.find((s) => s.nisn === rec.siswaNisn);
      if (match) {
        return {
          ...rec,
          siswaNama: match.nama,
          kelasId: match.kelasId,
        };
      }
      return rec;
    });
    setRekapNilai(updatedRekap);
    DataService.saveRekapNilai(updatedRekap);
  };

  // Preselected grading ID to route directly from notification panel
  const [activeSubmissionIdToGrade, setActiveSubmissionIdToGrade] = useState<string>("");

  // Synchronize student stats on classes total
  useEffect(() => {
    const updatedClasses = classes.map((c) => {
      const classStudentsCount = students.filter((s) => s.kelasId === c.id && s.statusKeaktifan === "Aktif").length;
      return { ...c, totalSiswa: classStudentsCount };
    });
    // check difference to prevent endless cycles
    if (JSON.stringify(updatedClasses) !== JSON.stringify(classes)) {
      setClasses(updatedClasses);
      DataService.saveKelas(updatedClasses);
    }
  }, [students]);

  // Auth logins
  const handleLoginGuru = (nip: string) => {
    setLoggedGuruNip(nip);
    setRole("GURU");
    setGuruActiveTab("dashboard");
  };

  const handleLoginSiswa = (nisn: string) => {
    setLoggedSiswaNisn(nisn);
    setRole("SISWA");
    setSiswaActiveTab("dashboard");
  };

  const handleLogOut = () => {
    setRole("GUEST");
    setLoggedGuruNip("");
    setLoggedSiswaNisn("");
    setActiveSubmissionIdToGrade("");
  };

  // State Writers with LocalStorage sync
  const handleUpdateGuru = (updated: Guru) => {
    setGuruData(updated);
    DataService.saveGuru(updated);
  };

  const handleUpdateClasses = (updatedClasses: Kelas[]) => {
    setClasses(updatedClasses);
    DataService.saveKelas(updatedClasses);
  };

  const handleAddStudent = (newStudent: Siswa) => {
    const updated = sortStudentsByName([...students, newStudent]);
    setStudents(updated);
    DataService.saveSiswa(updated);

    // Prepare their empty grade rekap automatically!
    const emptyRekap: RekapNilaiTotal = {
      siswaNisn: newStudent.nisn,
      siswaNama: newStudent.nama,
      kelasId: newStudent.kelasId,
      formatifKuis: 80,
      formatifTugas: 80,
      formatifDiskusi: 80,
      sumatifPts: 80,
      sumatifPas: 80,
      hafalanJuzAmmaScore: 80,
      praktikSholat: 80,
      praktikWudhu: 80
    };
    const updatedRekap = [...rekapNilai, emptyRekap];
    setRekapNilai(updatedRekap);
    DataService.saveRekapNilai(updatedRekap);
  };

  const handleBulkAddStudents = (newStudentsList: Siswa[]) => {
    const updated = sortStudentsByName([...students, ...newStudentsList]);
    setStudents(updated);
    DataService.saveSiswa(updated);

    const newRekaps: RekapNilaiTotal[] = newStudentsList.map((st) => ({
      siswaNisn: st.nisn,
      siswaNama: st.nama,
      kelasId: st.kelasId,
      formatifKuis: 80,
      formatifTugas: 80,
      formatifDiskusi: 80,
      sumatifPts: 80,
      sumatifPas: 80,
      hafalanJuzAmmaScore: 80,
      praktikSholat: 80,
      praktikWudhu: 80
    }));

    const updatedRekap = [...rekapNilai, ...newRekaps];
    setRekapNilai(updatedRekap);
    DataService.saveRekapNilai(updatedRekap);
  };

  const handleToggleStudentStatus = (nisn: string) => {
    const updated = sortStudentsByName(
      students.map((s) => {
        if (s.nisn === nisn) {
          return {
            ...s,
            statusKeaktifan: (s.statusKeaktifan === "Aktif" ? "Tidak Aktif" : "Aktif") as "Aktif" | "Tidak Aktif"
          };
        }
        return s;
      })
    );
    setStudents(updated);
    DataService.saveSiswa(updated);
  };

  const handleAddPerangkat = (newPa: PerangkatAjar) => {
    const updated = [newPa, ...perangkatAjar];
    setPerangkatAjar(updated);
    DataService.savePerangkatAjar(updated);
  };

  const handleEditPerangkat = (updatedPa: PerangkatAjar) => {
    const updated = perangkatAjar.map((pa) => pa.id === updatedPa.id ? updatedPa : pa);
    setPerangkatAjar(updated);
    DataService.savePerangkatAjar(updated);
  };

  const handleDeletePerangkat = (id: string) => {
    const updated = perangkatAjar.filter((pa) => pa.id !== id);
    setPerangkatAjar(updated);
    DataService.savePerangkatAjar(updated);
  };

  const handleAddJurnal = (newJm: JurnalMengajar) => {
    const updated = [newJm, ...jurnals];
    setJurnals(updated);
    DataService.saveJurnalMengajar(updated);
  };

  const handleAddAttitude = (newCs: CatatanSikapSiswa) => {
    const updated = [newCs, ...attitudes];
    setAttitudes(updated);
    DataService.saveCatatanSikap(updated);
  };

  const handleAddSubmission = (newSub: PengumpulanTugas) => {
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    DataService.savePengumpulan(updated);
  };

  const handleGradeSubmission = (subId: string, score: number, comment: string) => {
    const updated = submissions.map((sub) => {
      if (sub.id === subId) {
        return { ...sub, nilai: score, komentarGuru: comment };
      }
      return sub;
    });
    setSubmissions(updated);
    DataService.savePengumpulan(updated);
  };

  const handleAddWorship = (newWorship: JurnalIbadahHarian) => {
    // Check if record exists for today
    const index = worships.findIndex((w) => w.siswaNisn === newWorship.siswaNisn && w.tanggal === newWorship.tanggal);
    let updated = [...worships];
    if (index >= 0) {
      updated[index] = newWorship;
    } else {
      updated = [newWorship, ...updated];
    }
    setWorships(updated);
    DataService.saveIbadah(updated);
  };

  const handleUpdateNilai = (updatedRec: RekapNilaiTotal) => {
    const updated = rekapNilai.map((rec) => (rec.siswaNisn === updatedRec.siswaNisn ? updatedRec : rec));
    setRekapNilai(updated);
    DataService.saveRekapNilai(updated);
  };

  const handleUpdateNilaiKhusus = (updatedNk: NilaiKhususPai) => {
    const updated = nilaiKhusus.map((nk) => (nk.siswaNisn === updatedNk.siswaNisn ? updatedNk : nk));
    setNilaiKhusus(updated);
    DataService.saveNilaiKhusus(updated);
  };

  // Direct LMS grading router from stats card
  const handleGradeClickFromDashboard = (submissionId: string) => {
    setActiveSubmissionIdToGrade(submissionId);
    setGuruActiveTab("nilai");
  };

  // Reset entire application database mock helper
  const handleResetApp = () => {
    if (confirm("Apakah Anda yakin ingin mengatur ulang semua data simulasi ke setelan awal?")) {
      DataService.resetAll();
    }
  };

  // Pre-calculated stats for Teacher Dashboard
  const currentMonthJurnals = jurnals.filter((j) => j.tanggal.startsWith("2026-07"));
  const totalStudentsInMonth = classes.reduce((sum, c) => sum + c.totalSiswa, 0);

  const attendanceTotalPercent = currentMonthJurnals.length > 0
    ? Math.round(
        (currentMonthJurnals.reduce((sum, j) => sum + j.kehadiranHadir, 0) /
          (currentMonthJurnals.length * totalStudentsInMonth)) *
          1000
      ) / 10
    : 95.4;

  const pendingSubmissions = submissions.filter((s) => s.nilai === undefined || s.nilai === null);

  // Active student object
  const activeSiswaObj = students.find((s) => s.nisn === loggedSiswaNisn);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* GLOBAL BANNER HEADER */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm relative z-20 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-emerald-700/10">
            🕌
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-slate-900 leading-none">
              SI-PAI & LMS
            </h1>
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mt-1">
              UPT SMPN 2 REBANG TANGKAS
            </span>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          {role !== "GUEST" && (
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 border border-emerald-100/50">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Aktif: {role === "GURU" ? "Guru PAI" : `Siswa (${activeSiswaObj?.nama})`}
            </div>
          )}

          <button
            onClick={handleResetApp}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1 shrink-0"
            title="Reset Database"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Atur Ulang Data</span>
          </button>

          {role !== "GUEST" && (
            <button
              onClick={handleLogOut}
              className="p-2 bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          )}
        </div>
      </header>

      {/* RENDER BODY DISPATCHER */}
      {role === "GUEST" ? (
        <Login
          onLoginGuru={handleLoginGuru}
          onLoginSiswa={handleLoginSiswa}
          teachers={guruData}
          students={students}
        />
      ) : (
        <div className="flex-1 flex flex-col md:flex-row">
          {/* SIDEBAR NAVIGATION PANEL */}
          <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-850 justify-between print:hidden">
            {/* Nav list */}
            <div className="p-4 space-y-6">
              {role === "GURU" ? (
                /* GURU SIDEBAR NAVIGATION */
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-800">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Profil Pendidik</span>
                    <span className="block text-xs font-bold text-white truncate">{guruData.nama}</span>
                    <span className="block text-[9px] text-emerald-400 font-bold uppercase mt-0.5">Guru PAI Utama</span>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => setGuruActiveTab("dashboard")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "dashboard" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard Guru
                    </button>

                    <button
                      onClick={() => setGuruActiveTab("master")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "master" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Database className="w-4 h-4" />
                      Data Dasar (Master)
                    </button>

                    <button
                      onClick={() => setGuruActiveTab("perangkat")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "perangkat" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Perangkat Ajar PAI
                    </button>

                    <button
                      onClick={() => setGuruActiveTab("jurnal")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "jurnal" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <PenTool className="w-4 h-4" />
                      Jurnal Guru & Siswa
                    </button>

                    <button
                      onClick={() => setGuruActiveTab("nilai")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "nilai" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      Rekap Nilai PAI
                    </button>

                    <button
                      onClick={() => setGuruActiveTab("wali")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "wali" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      Guru Wali
                    </button>

                    <button
                      onClick={() => setGuruActiveTab("link")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        guruActiveTab === "link" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Globe className="w-4 h-4 text-emerald-400" />
                      Link Layanan (SIAGA, GTK, MyASN)
                    </button>
                  </div>
                </div>
              ) : (
                /* SISWA SIDEBAR NAVIGATION */
                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-800">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Identitas Siswa</span>
                    <span className="block text-xs font-bold text-white truncate">{activeSiswaObj?.nama}</span>
                    <span className="block text-[9px] text-emerald-400 font-bold uppercase mt-0.5">Kelas {activeSiswaObj?.kelasId}</span>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => setSiswaActiveTab("dashboard")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        siswaActiveTab === "dashboard" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard Utama
                    </button>

                    <button
                      onClick={() => setSiswaActiveTab("lms")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        siswaActiveTab === "lms" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Ruang Kelas LMS PAI
                    </button>

                    <button
                      onClick={() => setSiswaActiveTab("ibadah")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        siswaActiveTab === "ibadah" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      Jurnal Ibadah Mandiri
                    </button>

                    <button
                      onClick={() => setSiswaActiveTab("nilai")}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                        siswaActiveTab === "nilai" ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10" : "hover:bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      Buku Nilai Siswa
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Credit line inside Sidebar */}
            <div className="p-4 border-t border-slate-800/60 text-[10px] text-slate-500 font-medium">
              UPT SMPN 2 Rebang Tangkas
              <span className="block text-[9px] text-slate-600 mt-0.5">Sistem Integrasi PAI v2.6</span>
            </div>
          </aside>

          {/* MAIN PAGE PANEL CONTAINER */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
            {role === "GURU" ? (
              /* GURU MAIN ROUTING SWITCHES */
              <div>
                {guruActiveTab === "dashboard" && (
                  <GuruDashboard
                    guru={guruData}
                    classes={classes}
                    attendanceRate={attendanceTotalPercent}
                    jurnals={jurnals}
                    pendingSubmissions={pendingSubmissions}
                    onNavigate={(tab, subTab) => {
                      setGuruActiveTab(tab as any);
                    }}
                    onGradeClick={handleGradeClickFromDashboard}
                  />
                )}

                {guruActiveTab === "master" && (
                  <DataDasar
                    guru={guruData}
                    onUpdateGuru={handleUpdateGuru}
                    classes={classes}
                    onUpdateClasses={handleUpdateClasses}
                    students={students}
                    onUpdateStudents={handleUpdateStudents}
                    onAddStudent={handleAddStudent}
                    onBulkAddStudents={handleBulkAddStudents}
                    onToggleStudentStatus={handleToggleStudentStatus}
                    attitudes={attitudes}
                    worships={worships}
                    rekapNilai={rekapNilai}
                  />
                )}

                {guruActiveTab === "perangkat" && (
                  <PerangkatAjarView
                    items={perangkatAjar}
                    onAddItem={handleAddPerangkat}
                    onEditItem={handleEditPerangkat}
                    onDeleteItem={handleDeletePerangkat}
                    babPelajaran={babPelajaran}
                    onUpdateBabPelajaran={handleUpdateBabPelajaran}
                  />
                )}

                {guruActiveTab === "jurnal" && (
                  <JurnalGuruSiswa
                    jurnals={jurnals}
                    onAddJurnal={handleAddJurnal}
                    attitudes={attitudes}
                    onAddAttitude={handleAddAttitude}
                    students={students}
                    classes={classes}
                  />
                )}

                {guruActiveTab === "nilai" && (
                  <RekapNilai
                    rekapNilai={rekapNilai}
                    onUpdateNilai={handleUpdateNilai}
                    students={students}
                    classes={classes}
                    submissions={submissions}
                    onGradeSubmission={handleGradeSubmission}
                    nilaiKhusus={nilaiKhusus}
                    onUpdateNilaiKhusus={handleUpdateNilaiKhusus}
                    activeSubmissionIdToGrade={activeSubmissionIdToGrade}
                    onClearActiveSubmissionId={() => setActiveSubmissionIdToGrade("")}
                    nilaiParalelList={nilaiParalelList}
                    onUpdateNilaiParalelList={handleUpdateNilaiParalelList}
                  />
                )}

                {guruActiveTab === "wali" && (
                  <PendampinganMurid
                    guru={guruData}
                    students={students}
                    classes={classes}
                    onUpdateStudents={handleUpdateStudents}
                  />
                )}

                {guruActiveTab === "link" && (
                  <LinkLayanan />
                )}
              </div>
            ) : (
              /* SISWA MAIN ROUTING SWITCHES */
              <div>
                {activeSiswaObj ? (
                  <div>
                    {siswaActiveTab === "dashboard" && (
                      <SiswaDashboard
                        siswa={activeSiswaObj}
                        tasks={tasks}
                        submissions={submissions}
                        onNavigate={(tab) => setSiswaActiveTab(tab as any)}
                      />
                    )}

                    {siswaActiveTab === "lms" && (
                      <LmsClassroom
                        siswa={activeSiswaObj}
                        tasks={tasks}
                        submissions={submissions}
                        onAddSubmission={handleAddSubmission}
                        babPelajaran={babPelajaran}
                        rekapNilai={rekapNilai}
                        onUpdateRekapNilai={handleUpdateNilai}
                        onUpdateBabPelajaran={handleUpdateBabPelajaran}
                      />
                    )}

                    {siswaActiveTab === "ibadah" && (
                      <IbadahMandiri
                        siswa={activeSiswaObj}
                        worships={worships}
                        onAddWorship={handleAddWorship}
                      />
                    )}

                    {siswaActiveTab === "nilai" && (
                      <BukuNilaiSiswa
                        siswa={activeSiswaObj}
                        tasks={tasks}
                        submissions={submissions}
                        rekapNilai={rekapNilai}
                        nilaiKhusus={nilaiKhusus}
                      />
                    )}
                  </div>
                ) : (
                  <div className="p-8 bg-red-50 text-red-800 text-xs rounded-xl font-bold border border-red-100">
                    Siswa tidak ditemukan. Harap keluar dan masuk kembali menggunakan NISN yang valid.
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
