/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BabPelajaran, SoalPilihanGanda } from "../types";

export interface QuizGeneratorOptions {
  count?: number;
  difficulty?: "Mudah" | "Sedang" | "HOTS";
}

/**
 * Intelligent PAI Curriculum Question Bank & Synthesizer
 * Generates structured, high-quality PAI SMP questions automatically based on Bab title & description
 */
export function generateAutomaticQuiz(
  bab: BabPelajaran,
  options: QuizGeneratorOptions = {}
): SoalPilihanGanda[] {
  const count = options.count || 5;
  const difficulty = options.difficulty || "Sedang";
  const title = (bab.judul || "").toLowerCase();
  const desc = (bab.deskripsi || "").toLowerCase();

  const generatedList: SoalPilihanGanda[] = [];

  // Categorize Bab topic
  if (title.includes("thaharah") || title.includes("bersuci") || desc.includes("wudhu") || desc.includes("najis")) {
    generatedList.push(...getThaharahQuestions(difficulty));
  } else if (title.includes("amanah") || title.includes("jujur") || title.includes("akhlak") || desc.includes("amanah")) {
    generatedList.push(...getAkhlakQuestions(difficulty));
  } else if (title.includes("umayyah") || title.includes("sejarah") || title.includes("damaskus") || desc.includes("khalifah")) {
    generatedList.push(...getSejarahQuestions(difficulty));
  } else if (title.includes("shalat") || title.includes("berjamaah") || desc.includes("imam")) {
    generatedList.push(...getShalatQuestions(difficulty));
  } else if (title.includes("qur'an") || title.includes("tajwid") || title.includes("surah") || desc.includes("hafalan")) {
    generatedList.push(...getAlQuranQuestions(difficulty));
  } else {
    generatedList.push(...getGenericPaiQuestions(bab.judul, difficulty));
  }

  // Shuffle & slice to desired count
  const shuffled = [...generatedList].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  // Fallback if not enough questions generated
  if (selected.length < count) {
    const extra = getGenericPaiQuestions(bab.judul, difficulty);
    for (const q of extra) {
      if (selected.length < count && !selected.some(s => s.pertanyaan === q.pertanyaan)) {
        selected.push(q);
      }
    }
  }

  // Assign clean IDs
  return selected.map((q, idx) => ({
    ...q,
    id: `auto_${bab.id}_${Date.now()}_${idx + 1}`
  }));
}

// 1. Thaharah Bank
function getThaharahQuestions(diff: string): SoalPilihanGanda[] {
  return [
    {
      id: "",
      pertanyaan: "Menurut Bahasa, kata Thaharah bermakna...",
      pilihan: [
        "A. Mensucikan dan membersihkan diri",
        "B. Melakukan ibadah secara bersama-sama",
        "C. Menjaga lisan dari perkataan bohong",
        "D. Membaca ayat suci Al-Qur'an secara tartil"
      ],
      jawabanBenar: "A",
      pembahasan: "Secara bahasa (etimologi), Thaharah artinya bersih atau suci. Sedangkan secara syara', Thaharah adalah mensucikan diri dari hadas dan najis yang menghalangi keabsahan shalat."
    },
    {
      id: "",
      pertanyaan: "Air kencing bayi laki-laki berusia di bawah 2 tahun yang belum makan makanan selain ASI tergolong jenis najis...",
      pilihan: [
        "A. Najis Mutawassitah (Sedang)",
        "B. Najis Mukhaffafah (Ringan)",
        "C. Najis Mughalladah (Berat)",
        "D. Najis Ma'fu (Dimaafkan)"
      ],
      jawabanBenar: "B",
      pembahasan: "Najis Mukhaffafah adalah najis ringan. Cara mensucikannya cukup dengan memercikkan air bersih ke bagian yang terkena najis hingga merata."
    },
    {
      id: "",
      pertanyaan: "Apabila seseorang tidak menemukan air setelah berusaha mencari, atau sedang dalam kondisi sakit yang dilarang terkena air, maka disyariatkan mengganti wudhu dengan...",
      pilihan: [
        "A. Istinja menggunakan kain basah",
        "B. Mandi sunnah sebelum ibadah",
        "C. Tayamum menggunakan debu yang suci",
        "D. Menunggu sampai air ditemukan tanpa shalat"
      ],
      jawabanBenar: "C",
      pembahasan: "Tayamum adalah keringanan (rukhshah) bersuci menggunakan debu yang suci sebagai pengganti wudhu atau mandi wajib saat tidak ada air atau berhalangan sakit."
    },
    {
      id: "",
      pertanyaan: diff === "HOTS" 
        ? "Farhan terkena percikan darah yang cukup banyak pada celananya saat menyembelih hewan kurban. Manakah tata cara bersuci yang paling tepat sesuai kaidah fiqih?"
        : "Bagaimanakah cara mensucikan benda yang terkena najis Mutawassitah (sedang) seperti darah atau air kencing orang dewasa?",
      pilihan: [
        "A. Cukup diusap dengan kain lap kering",
        "B. Dibasuh dengan air mengalir sampai hilang wujud, bau, dan rasanya",
        "C. Dibasuh sebanyak 7 kali dan salah satunya dicampur tanah suci",
        "D. Dipercikkan air sedikit saja pada bagian tengahnya"
      ],
      jawabanBenar: "B",
      pembahasan: "Darah dan air kencing dewasa termasuk Najis Mutawassitah. Mensucikannya wajib dibasuh air mengalir hingga zat, bau, warna, dan rasanya hilang."
    },
    {
      id: "",
      pertanyaan: "Berikut ini yang merupakan rukun wudhu yang wajib dilaksanakan secara berurutan (tertib) adalah...",
      pilihan: [
        "A. Berkumur, mengusap telinga, dan membasuh Kaki",
        "B. Niat, membasuh wajah, membasuh kedua tangan hingga siku, mengusap kepala, membasuh kedua kaki hingga mata kaki, dan tertib",
        "C. Membaca basmalah, mengusap leher, dan berdoa",
        "D. Membasuh tangan 3 kali, bersiwak, dan minum air wudhu"
      ],
      jawabanBenar: "B",
      pembahasan: "Rukun wudhu ada 6: (1) Niat, (2) Membasuh wajah, (3) Membasuh kedua tangan sampai siku, (4) Mengusap sebagian kepala, (5) Membasuh kedua kaki sampai mata kaki, dan (6) Tertib (berurutan)."
    },
    {
      id: "",
      pertanyaan: "Seseorang yang berhadas besar diwajibkan mensucikan diri dengan cara...",
      pilihan: [
        "A. Cukup berwudhu seperti hendak shalat",
        "B. Mandi wajib (mandi janabah) mengalirkan air ke seluruh tubuh",
        "C. Bertayamum dengan 3 kaliusapan debu",
        "D. Membasuh kedua telapak kaki hingga mata kaki"
      ],
      jawabanBenar: "B",
      pembahasan: "Hadas besar (seperti mimpi basah atau haidh) disucikan dengan mandi wajib, yaitu meratakan air suci ke seluruh permukaan tubuh dari ujung rambut hingga kaki disertai niat."
    }
  ];
}

// 2. Akhlak Bank
function getAkhlakQuestions(diff: string): SoalPilihanGanda[] {
  return [
    {
      id: "",
      pertanyaan: "Amanah secara harfiah berasal dari kata dalam Bahasa Arab yang berarti...",
      pilihan: [
        "A. Aman, tenteram, dan dapat dipercaya",
        "B. Kerja keras dan pantang menyerah",
        "C. Bijaksana dalam mengambil keputusan",
        "D. Ramah dan sopan santun kepada semua orang"
      ],
      jawabanBenar: "A",
      pembahasan: "Amanah berasal dari kata 'amana' yang artinya aman dan terpercaya. Orang yang amanah adalah orang yang dapat dipercaya untuk memegang dan menyampaikan titipan."
    },
    {
      id: "",
      pertanyaan: "Menjaga organ tubuh seperti mata, telinga, dan tangan dari perbuatan maksiat merupakan contoh penerapan amanah kepada...",
      pilihan: [
        "A. Sesama manusia",
        "B. Diri sendiri",
        "C. Bapak/Ibu guru di sekolah",
        "D. Pemerintah dan negara"
      ],
      jawabanBenar: "B",
      pembahasan: "Amanah dibagi 3: (1) Amanah kepada Allah, (2) Amanah kepada sesama manusia, dan (3) Amanah kepada diri sendiri (menjaga kesehatan fisik & ruhani dari keharaman)."
    },
    {
      id: "",
      pertanyaan: diff === "HOTS"
        ? "Di kantin kejujuran sekolah, Difa membeli roti seharga Rp 3.000 dan membayar uang Rp 10.000. Saat mengambil kembalian Rp 7.000, terdapat kelebihan uang Rp 5.000 di kotak. Tindakan yang mencerminkan sifat Jujur dan Amanah adalah..."
        : "Contoh perilaku jujur seorang siswa saat mengikuti ujian/kuis di sekolah adalah...",
      pilihan: [
        "A. Mengambil kelebihan uang tersebut sebagai rezeki",
        "B. Mengerjakan soal ujian sendiri tanpa menyontek atau memberi contekan kepada teman",
        "C. Pura-pura tidak tahu dan meninggalkan tempat ujian",
        "D. Meminta bantuan teman menjawab soal yang sulit"
      ],
      jawabanBenar: "B",
      pembahasan: "Jujur adalah kesesuaian antara lisan, hati, dan perbuatan. Mengerjakan ujian secara mandiri tanpa menyontek adalah wujud kejujuran dalam menuntut ilmu."
    },
    {
      id: "",
      pertanyaan: "Rasulullah SAW sejak masa muda sudah digelari oleh masyarakat Quraisy dengan julukan 'Al-Amin' karena...",
      pilihan: [
        "A. Keturunan bangsawan paling kaya di Makkah",
        "B. Sangat jujur dan terpercaya dalam bertutur kata maupun berdagang",
        "C. Memiliki kekuatan fisik yang sangat tangguh",
        "D. Sering menjuarai perlombaan syair Arab"
      ],
      jawabanBenar: "B",
      pembahasan: "Gelar Al-Amin artinya 'Orang yang sangat terpercaya'. Makkah mengakui kejujuran dan kemuliaan akhlak Nabi Muhammad SAW bahkan sebelum beliau diangkat menjadi Rasul."
    },
    {
      id: "",
      pertanyaan: "Kesesuaian antara perkataan, ucapan hati, dan kenyataan perbuatan yang sebenarnya dinamakan...",
      pilihan: [
        "A. Jujur (As-Siddiq)",
        "B. Istiqamah",
        "C. Empati",
        "D. Qana'ah"
      ],
      jawabanBenar: "A",
      pembahasan: "As-Siddiq artinya jujur atau benar. Kejujuran menuntun pada kebaikan, dan kebaikan menuntun menuju surga Allah SWT."
    }
  ];
}

// 3. Sejarah Daulah Umayyah
function getSejarahQuestions(diff: string): SoalPilihanGanda[] {
  return [
    {
      id: "",
      pertanyaan: "Daulah Umayyah resmi berdiri pada tahun 661 Masehi (41 Hijriah) dengan ibu kota pemerintahan berada di kota...",
      pilihan: [
        "A. Madinah Al-Munawwarah",
        "B. Damaskus (Syam)",
        "C. Baghdad (Irak)",
        "D. Kairo (Mesir)"
      ],
      jawabanBenar: "B",
      pembahasan: "Setelah peristiwa perdamaian Amul Jama'ah, Muawiyah bin Abu Sufyan memindahkan pusat pemerintahan Daulah Umayyah dari Madinah ke Damaskus."
    },
    {
      id: "",
      pertanyaan: "Pendiri sekaligus Khalifah pertama dari Daulah Umayyah di Damaskus adalah...",
      pilihan: [
        "A. Umar bin Abdul Aziz",
        "B. Abdul Malik bin Marwan",
        "C. Muawiyah bin Abu Sufyan",
        "D. Al-Walid bin Abdul Malik"
      ],
      jawabanBenar: "C",
      pembahasan: "Muawiyah bin Abu Sufyan merupakan pendiri Daulah Umayyah yang memerintah selama 20 tahun dan merintis kemajuan administrasi serta armada laut Islam."
    },
    {
      id: "",
      pertanyaan: "Salah satu peninggalan karya arsitektur terbesar dan termegah pada masa Khalifah Al-Walid bin Abdul Malik yang masih berdiri hingga saat ini adalah...",
      pilihan: [
        "A. Masjid Agung Damaskus (Masjid Al-Umayyah)",
        "B. Istana Taj Mahal",
        "C. Masjid Nabawi Madinah",
        "D. Menara Al-Azhar"
      ],
      jawabanBenar: "A",
      pembahasan: "Masjid Agung Damaskus didirikan oleh Khalifah Al-Walid I dengan pilar mozaik indah dan menjadi mahakarya arsitektur Islam klasik."
    },
    {
      id: "",
      pertanyaan: "Khalifah Daulah Umayyah yang sangat terkenal akan keadilan, kesederhanaan, dan keagungan akhlaknya hingga dijuluki Khulafaur Rasyidin ke-5 adalah...",
      pilihan: [
        "A. Yazid bin Muawiyah",
        "B. Umar bin Abdul Aziz",
        "C. Marwan bin Hakam",
        "D. Hisyam bin Abdul Malik"
      ],
      jawabanBenar: "B",
      pembahasan: "Umar bin Abdul Aziz memimpin dengan sangat adil, menghapus diskriminasi, memberantas korupsi, dan memakmurkan rakyat hingga sulit menemukan penerima zakat."
    }
  ];
}

// 4. Shalat & Fiqih
function getShalatQuestions(diff: string): SoalPilihanGanda[] {
  return [
    {
      id: "",
      pertanyaan: "Hukum melaksanakan Shalat Fardhu secara berjamaah bagi laki-laki menurut mayoritas ulama adalah...",
      pilihan: [
        "A. Sunnah Muakkad / Fardhu Kifayah",
        "B. Mubah (Boleh)",
        "C. Makruh",
        "D. Haram"
      ],
      jawabanBenar: "A",
      pembahasan: "Shalat berjamaah memiliki keutamaan 27 derajat dibandingkan shalat sendirian (munfarid). Hukumnya Sunnah Muakkad yang sangat dianjurkan."
    },
    {
      id: "",
      pertanyaan: "Syarat utama seorang jamaah dapat diangkat menjadi Imam dalam shalat berjamaah adalah...",
      pilihan: [
        "A. Memiliki jabatan paling tinggi di kampung",
        "B. Paling bagus dan tartil bacaan Al-Qur'an serta paham hukum fiqih shalat",
        "C. Orang yang usianya paling tua di antara jamaah",
        "D. Orang yang pakaiannya paling mahal"
      ],
      jawabanBenar: "B",
      pembahasan: "Sesuai hadits Nabi, yang berhak menjadi imam adalah yang paling faqih (paham agama) dan paling fasih/baik bacaan Al-Qur'annya."
    }
  ];
}

// 5. Al-Qur'an & Tajwid
function getAlQuranQuestions(diff: string): SoalPilihanGanda[] {
  return [
    {
      id: "",
      pertanyaan: "Kandungan utama Surah Ad-Duha mengajarkan kepada umat Islam agar...",
      pilihan: [
        "A. Selalu bersyukur atas nikmat Allah dan tidak menyia-nyiakan anak yatim serta peminta-minta",
        "B. Melakukan perdagangan antar pulau dengan jujur",
        "C. Menjauhi minuman keras dan perjudian",
        "D. Melaksanakan ibadah haji ke Baitullah"
      ],
      jawabanBenar: "A",
      pembahasan: "Surah Ad-Duha menghibur hati Nabi SAW dan memerintahkan umat Islam memelihara anak yatim, menyayangi peminta-minta, dan menyiarkan nikmat Allah."
    },
    {
      id: "",
      pertanyaan: "Apabila Nun Sukun (نْ) atau Tanwin bertemu dengan huruf Ra (ر) atau Lam (ل), maka hukum bacaan tajwidnya adalah...",
      pilihan: [
        "A. Idgham Bilaghunnah (masuk tanpa mendengung)",
        "B. Idgham Bighunnah (masuk dengan mendengung)",
        "C. Izhar Halqi (dibaca jelas)",
        "D. Iqlab (menukar suara m)"
      ],
      jawabanBenar: "A",
      pembahasan: "Idgham Bilaghunnah terjadi jika nun mati/tanwin bertemu Lam atau Ra. Cara membacanya dimasukkan penuh tanpa dengung."
    }
  ];
}

// 6. Generic PAI fallback builder
function getGenericPaiQuestions(judulBab: string, diff: string): SoalPilihanGanda[] {
  return [
    {
      id: "",
      pertanyaan: `Apa tujuan utama mempelajari ${judulBab} dalam Kurikulum Merdeka PAI SMP?`,
      pilihan: [
        "A. Menerapkan pemahaman ajaran Islam dan membentuk akhlakul karimah dalam kehidupan sehari-hari",
        "B. Sekedar mendapatkan nilai tinggi di dalam buku rapor sekolah",
        "C. Menunjukkan kelebihan ilmu di hadapan teman-teman",
        "D. Memenuhi syarat kelulusan tanpa perlu mengamalkan ilmunya"
      ],
      jawabanBenar: "A",
      pembahasan: "Pendidikan Agama Islam (PAI) bertujuan membentuk insan kamil yang beriman, bertaqwa, dan berakhlak mulia sesuai nilai-nilai Kurikulum Merdeka."
    },
    {
      id: "",
      pertanyaan: "Berikut ini yang merupakan sikap seorang murid yang berakhlak mulia ketika menerima materi pelajaran PAI dari Guru adalah...",
      pilihan: [
        "A. Menyimak dengan tertib, bertanya santun, dan berusaha mengamalkannya",
        "B. Mengobrol dengan kawan saat guru menerangkan",
        "C. Tidur di dalam kelas saat jam pelajaran",
        "D. Acuh tak acuh terhadap tugas yang diberikan guru"
      ],
      jawabanBenar: "A",
      pembahasan: "Adab menuntut ilmu meliputi mendengarkan penjelasan guru secara khidmat, mencatat hal penting, dan meneladani ilmunya."
    },
    {
      id: "",
      pertanyaan: "Landasan utama seluruh materi hukum dan syariat dalam ajaran agama Islam bersumber dari...",
      pilihan: [
        "A. Al-Qur'an dan Sunnah/Hadits Rasulullah SAW",
        "B. Buku cerita dongeng lama",
        "C. Pendapat pribadi individu tanpa dalil",
        "D. Berita viral di media sosial"
      ],
      jawabanBenar: "A",
      pembahasan: "Sumber utama syariat Islam adalah Al-Qur'an sebagai Kalamullah dan Al-Hadits sebagai sabda, perbuatan, dan ketetapan Nabi Muhammad SAW."
    }
  ];
}
