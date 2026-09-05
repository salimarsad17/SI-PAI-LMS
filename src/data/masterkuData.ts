/**
 * Data Khazanah & Sumber Belajar Islam - Masterku
 * Al-Qur'an, Hadist, Buku Pelajaran, Kisah Nabi & Rosul, Nasehat Islami, dan Hikmah.
 */

export interface SurahData {
  nomor: number;
  nama: string;
  namaArab: string;
  arti: string;
  golongan: "Makkiyyah" | "Madaniyyah";
  jumlahAyat: number;
  deskripsi: string;
  ayatList: {
    nomor: number;
    arab: string;
    latin: string;
    arti: string;
  }[];
}

export interface HadistData {
  id: string;
  judul: string;
  kitab: string;
  tema: string;
  perawi: string;
  arab: string;
  terjemah: string;
  faidah: string[];
}

export interface BukuPelajaranData {
  id: string;
  judul: string;
  kelas: string;
  kurikulum: string;
  babList: {
    babNomor: number;
    judulBab: string;
    kategori: "Akidah" | "Akhlak" | "Fiqih" | "Al-Qur'an & Tajwid" | "Sejarah (Tarikh)";
    ringkasan: string;
    tujuanPembelajaran: string[];
    materiPokok: string[];
    istilahPenting: { kata: string; arti: string }[];
  }[];
}

export interface KisahNabiData {
  nomorUrut: number;
  nama: string;
  gelar?: string;
  isUlulAzmi: boolean;
  periodeKaum: string;
  tempatDakwah: string;
  mukjizat: string[];
  ringkasanKisah: string;
  ayatAlquran: string;
  keteladanan: string[];
}

export interface NasehatIslamiData {
  id: string;
  tokoh: string;
  peran: string;
  tema: string;
  kutipanArab?: string;
  kutipanIndonesia: string;
  uraianHikmah: string;
  amalanPraktis: string;
}

export interface HikmahData {
  id: string;
  judul: string;
  tokohKisah: string;
  kategori: string;
  sinopsis: string;
  kisahLengkap: string;
  pelajaranHikmah: string[];
  dalilTerkait: string;
}

export const LIST_SURAH_PILIHAN: SurahData[] = [
  {
    nomor: 1,
    nama: "Al-Fatihah",
    namaArab: "الفاتحة",
    arti: "Pembukaan",
    golongan: "Makkiyyah",
    jumlahAyat: 7,
    deskripsi: "Surah pembuka Al-Qur'an dan induk Al-Qur'an (Ummul Kitab) yang wajib dibaca dalam setiap rakaat shalat.",
    ayatList: [
      { nomor: 1, arab: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", latin: "Bismillāhir-raḥmānir-raḥīm(i)", arti: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
      { nomor: 2, arab: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ", latin: "Al-ḥamdu lillāhi rabbil-'ālamīn(a)", arti: "Segala puji bagi Allah, Tuhan seluruh alam," },
      { nomor: 3, arab: "الرَّحْمٰنِ الرَّحِيْمِۙ", latin: "Ar-raḥmānir-raḥīm(i)", arti: "Yang Maha Pengasih, Maha Penyayang," },
      { nomor: 4, arab: "مٰلِكِ يَوْمِ الدِّيْنِۗ", latin: "Māliki yaumid-dīn(i)", arti: "Pemilik hari pembalasan." },
      { nomor: 5, arab: "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ", latin: "Iyyāka na'budu wa iyyāka nasta'īn(u)", arti: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan." },
      { nomor: 6, arab: "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ", latin: "Ihdinaṣ-ṣirāṭal-mustaqīm(a)", arti: "Tunjukilah kami jalan yang lurus," },
      { nomor: 7, arab: "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ", latin: "Ṣirāṭal-lażīna an'amta 'alaihim, gairil-magḍūbi 'alaihim walāḍ-ḍāllīn(a)", arti: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat." }
    ]
  },
  {
    nomor: 112,
    nama: "Al-Ikhlas",
    namaArab: "الإخلاص",
    arti: "Kemurnian Keesaan Allah",
    golongan: "Makkiyyah",
    jumlahAyat: 4,
    deskripsi: "Menegaskan pokok akidah tauhid murni bahwa Allah itu Maha Esa dan tempat bergantung seluruh makhluk.",
    ayatList: [
      { nomor: 1, arab: "قُلْ هُوَ اللّٰهُ اَحَدٌۚ", latin: "Qul huwallāhu aḥad(un)", arti: "Katakanlah (Nabi Muhammad), 'Dialah Allah Yang Maha Esa.'" },
      { nomor: 2, arab: "اَللّٰهُ الصَّمَدُۚ", latin: "Allāhuṣ-ṣamad(u)", arti: "Allah tempat meminta segala sesuatu." },
      { nomor: 3, arab: "لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ", latin: "Lam yalid wa lam yūlad", arti: "Dia tidak beranak dan tidak pula diperanakkan," },
      { nomor: 4, arab: "وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ", latin: "Wa lam yakul lahū kufuwan aḥad(un)", arti: "dan tidak ada sesuatu pun yang setara dengan Dia." }
    ]
  },
  {
    nomor: 113,
    nama: "Al-Falaq",
    namaArab: "الفلق",
    arti: "Waktu Subuh",
    golongan: "Makkiyyah",
    jumlahAyat: 5,
    deskripsi: "Doa perlindungan diri kepada Allah dari kejahatan malam, sihir, dan kedengkian orang yang hasad.",
    ayatList: [
      { nomor: 1, arab: "قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ", latin: "Qul a'ūżu birabbil-falaq(i)", arti: "Katakanlah (Nabi Muhammad), 'Aku berlindung kepada Tuhan yang menguasai subuh (fajar)'" },
      { nomor: 2, arab: "مِنْ شَرِّ مَا خَلَقَۙ", latin: "Min syarri mā khalaq(a)", arti: "dari kejahatan (makhluk yang) Dia ciptakan," },
      { nomor: 3, arab: "وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ", latin: "Wa min syarri gāsiqin iżā waqab(a)", arti: "dari kejahatan malam apabila telah gelap gulita," },
      { nomor: 4, arab: "وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ", latin: "Wa min syarrin-naffāṡāti fil-'uqad(i)", arti: "dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul (talinya)," },
      { nomor: 5, arab: "وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ", latin: "Wa min syarri ḥāsidin iżā ḥasad(a)", arti: "dan dari kejahatan orang yang dengki apabila dia dengki." }
    ]
  },
  {
    nomor: 114,
    nama: "An-Nas",
    namaArab: "الناس",
    arti: "Manusia",
    golongan: "Makkiyyah",
    jumlahAyat: 6,
    deskripsi: "Surah penutup mushaf yang mengajarkan permohonan perlindungan kepada Raja dan Sembahan manusia dari bisikan setan.",
    ayatList: [
      { nomor: 1, arab: "قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ", latin: "Qul a'ūżu birabbin-nās(i)", arti: "Katakanlah (Nabi Muhammad), 'Aku berlindung kepada Tuhannya manusia,'" },
      { nomor: 2, arab: "مَلِكِ النَّاسِۙ", latin: "Malikin-nās(i)", arti: "Raja manusia," },
      { nomor: 3, arab: "اِلٰهِ النَّاسِۙ", latin: "Ilāhin-nās(i)", arti: "Sembahan manusia," },
      { nomor: 4, arab: "مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ", latin: "Min syarril-waswāsil-khannās(i)", arti: "dari kejahatan (bisikan) setan yang bersembunyi," },
      { nomor: 5, arab: "الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ", latin: "Allażī yuwaswisu fī ṣudūrin-nās(i)", arti: "yang membisikkan (kejahatan) ke dalam dada manusia," },
      { nomor: 6, arab: "مِنَ الْجِنَّةِ وَالنَّاسِ", latin: "Minal-jinnati wan-nās(i)", arti: "dari (golongan) jin dan manusia." }
    ]
  },
  {
    nomor: 103,
    nama: "Al-'Asr",
    namaArab: "العصر",
    arti: "Masa / Waktu",
    golongan: "Makkiyyah",
    jumlahAyat: 3,
    deskripsi: "Menjelaskan bahwa manusia berada dalam kerugian kecuali yang beriman, beramal saleh, dan saling berpesan dalam kebenaran dan kesabaran.",
    ayatList: [
      { nomor: 1, arab: "وَالْعَصْرِۙ", latin: "Wal-'aṣr(i)", arti: "Demi masa," },
      { nomor: 2, arab: "اِنَّ الْاِنْسَانَ لَفِيْ خُسْرٍۙ", latin: "Innal-insāna lafī khusr(in)", arti: "sungguh, manusia berada dalam kerugian," },
      { nomor: 3, arab: "اِلَّا الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصّٰلِحٰتِ وَتَوَاصَوْا بِالْحَقِّ ەۙ وَتَوَاصَوْا بِالصَّبْرِ", latin: "Illal-lażīna āmanū wa 'amiluṣ-ṣāliḥāti wa tawāṣau bil-ḥaqqi wa tawāṣau biṣ-ṣabr(i)", arti: "kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran." }
    ]
  },
  {
    nomor: 108,
    nama: "Al-Kausar",
    namaArab: "الكوثر",
    arti: "Nikmat yang Berlimpah",
    golongan: "Makkiyyah",
    jumlahAyat: 3,
    deskripsi: "Perintah mendirikan shalat dan berkurban sebagai wujud syukur atas limpahan nikmat Allah SWT.",
    ayatList: [
      { nomor: 1, arab: "اِنَّآ اَعْطَيْنٰكَ الْكَوْثَرَۗ", latin: "Innā a'ṭainākal-kauṡar(a)", arti: "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak." },
      { nomor: 2, arab: "فَصَلِّ لِرَبِّكَ وَانْحَرْۗ", latin: "Faṣalli lirabbika wanḥar", arti: "Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah." },
      { nomor: 3, arab: "اِنَّ شَانِئَكَ هُوَ الْاَبْتَرُ", latin: "Inna syāni'aka huwal-abtar(u)", arti: "Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah)." }
    ]
  },
  {
    nomor: 94,
    nama: "Asy-Syarh (Al-Insyirah)",
    namaArab: "الشرح",
    arti: "Kelapangan Dada",
    golongan: "Makkiyyah",
    jumlahAyat: 8,
    deskripsi: "Memberikan ketenangan bahwa bersama kesulitan pasti selalu ada kemudahan ganda.",
    ayatList: [
      { nomor: 1, arab: "اَلَمْ نَشْرَحْ لَكَ صَدْرَكَۙ", latin: "A lam nasyraḥ laka ṣadrak(a)", arti: "Bukankah Kami telah melapangkan dadamu (Nabi Muhammad)?" },
      { nomor: 2, arab: "وَوَضَعْنَا عَنْكَ وِزْرَكَۙ", latin: "Wa waḍa'nā 'anka wizrak(a)", arti: "Kami pun telah menurunkan bebanmu darimu," },
      { nomor: 3, arab: "الَّذِيْٓ اَنْقَضَ ظَهْرَكَۙ", latin: "Allażī anqaḍa ẓahrak(a)", arti: "yang memberatkan punggungmu," },
      { nomor: 4, arab: "وَرَفَعْنَا لَكَ ذِكْرَكَۗ", latin: "Wa rafa'nā laka żikrak(a)", arti: "dan Kami tinggikan bagimu sebutan (nama)-mu." },
      { nomor: 5, arab: "فَاِنَّ مَعَ الْعُسْرِ يُسْرًاۙ", latin: "Fa inna ma'al-'usri yusrā(n)", arti: "Maka, sesungguhnya beserta kesulitan ada kemudahan." },
      { nomor: 6, arab: "اِنَّ مَعَ الْعُسْرِ يُسْرًاۗ", latin: "Inna ma'al-'usri yusrā(n)", arti: "Sesungguhnya beserta kesulitan ada kemudahan." },
      { nomor: 7, arab: "فَاِذَا فَرَغْتَ فَانْصَبْۙ", latin: "Fa iżā faragta fanṣab", arti: "Apabila engkau telah selesai (dari suatu urusan), tetaplah bekerja keras (untuk urusan yang lain)," },
      { nomor: 8, arab: "وَاِلٰى رَبِّكَ فَارْغَبْ", latin: "Wa ilā rabbika fargab", arti: "dan hanya kepada Tuhanmulah engkau berharap." }
    ]
  },
  {
    nomor: 95,
    nama: "At-Tin",
    namaArab: "التين",
    arti: "Buah Tin",
    golongan: "Makkiyyah",
    jumlahAyat: 8,
    deskripsi: "Menegaskan penciptaan manusia dalam bentuk yang sebaik-baiknya dan pentingnya menjaga martabat kemanusiaan dengan iman.",
    ayatList: [
      { nomor: 1, arab: "وَالتِّيْنِ وَالزَّيْتُوْنِۙ", latin: "Wat-tīni waz-zaitūn(i)", arti: "Demi (buah) Tin dan (buah) Zaitun," },
      { nomor: 2, arab: "وَطُوْرِ سِيْنِيْنَۙ", latin: "Wa ṭūri sīnīn(a)", arti: "demi gunung Sinai," },
      { nomor: 3, arab: "وَهٰذَا الْبَلَدِ الْاَمِيْنِۙ", latin: "Wa hāżal-baladil-amīn(i)", arti: "dan demi negeri (Mekah) yang aman ini." },
      { nomor: 4, arab: "لَقَدْ خَلَقْنَا الْاِنْسَانَ فِيْٓ اَحْسَنِ تَقْوِيْمٍۖ", latin: "Laqad khalaqnal-insāna fī aḥsani taqwīm(in)", arti: "Sungguh, Kami benar-benar telah menciptakan manusia dalam bentuk yang sebaik-baiknya." },
      { nomor: 5, arab: "ثُمَّ رَدَدْنٰهُ اَسْفَلَ سَافِلِيْنَۙ", latin: "Ṡumma radadnāhu asfala sāfilīn(a)", arti: "Kemudian, Kami mengembalikannya ke tingkat yang serendah-rendahnya," },
      { nomor: 6, arab: "اِلَّا الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصّٰلِحٰتِ فَلَهُمْ اَجْرٌ غَيْرُ مَمْنُوْنٍۗ", latin: "Illal-lażīna āmanū wa 'amiluṣ-ṣāliḥāti falahum ajrun gairu mamnūn(in)", arti: "kecuali orang-orang yang beriman dan mengerjakan kebajikan. Maka, bagi mereka pahala yang tidak putus-putusnya." },
      { nomor: 7, arab: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّيْنِۗ", latin: "Famā yukażżibuka ba'du bid-dīn(i)", arti: "Maka, apa yang menyebabkan (mereka) mendustakanmu tentang (hari) pembalasan setelah (adanya bukti-bukti) itu?" },
      { nomor: 8, arab: "اَلَيْسَ اللّٰهُ بِاَحْكَمِ الْحٰكِمِيْنَ", latin: "Alaisallāhu bi'aḥkamil-ḥākimīn(a)", arti: "Bukankah Allah hakim yang paling adil?" }
    ]
  },
  {
    nomor: 67,
    nama: "Al-Mulk",
    namaArab: "الملك",
    arti: "Kerajaan",
    golongan: "Makkiyyah",
    jumlahAyat: 30,
    deskripsi: "Keagungan kekuasaan Allah atas langit, bumi, dan kematian serta kehidupan sebagai sarana ujian bagi manusia.",
    ayatList: [
      { nomor: 1, arab: "تَبٰرَكَ الَّذِيْ بِيَدِهِ الْمُلْكُۖ وَهُوَ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌۙ", latin: "Tabārakal-lażī biyadihil-mulku wa huwa 'alā kulli syai'in qadīr(un)", arti: "Mahaberkah Allah yang di tangan-Nyalah segala kerajaan dan Dia Mahakuasa atas segala sesuatu," },
      { nomor: 2, arab: "الَّذِيْ خَلَقَ الْمَوْتَ وَالْحَيٰوةَ لِيَبْلُوَكُمْ اَيُّكُمْ اَحْسَنُ عَمَلًاۗ وَهُوَ الْعَزِيْزُ الْغَفُوْرُۙ", latin: "Allażī khalaqal-mauta wal-ḥayāta liyabluwakum ayyukum aḥsanu 'amalā(n), wa huwal-'azīzul-gafūr(u)", arti: "Yang menciptakan mati dan hidup, untuk menguji kamu, siapa di antara kamu yang lebih baik amalnya. Dan Dia Mahaperkasa, Maha Pengampun." },
      { nomor: 3, arab: "الَّذِيْ خَلَقَ سَبْعَ سَمٰوٰتٍ طِبَاقًاۗ مَا تَرٰى فِيْ خَلْقِ الرَّحْمٰنِ مِنْ تَفٰوُتٍۗ فَارْجِعِ الْبَصَرَۙ هَلْ تَرٰى مِنْ فُطُوْرٍ", latin: "Allażī khalaqa sab'a samāwātin ṭibāqā(n), mā tarā fī khalqir-raḥmāni min tafāwut(in), farji'il-baṣara hal tarā min fuṭūr(in)", arti: "Yang menciptakan tujuh langit berlapis-lapis. Kamu tidak melihat pada ciptaan Tuhan Yang Maha Pengasih sesuatu yang tidak seimbang. Maka lihatlah sekali lagi, adakah kamu lihat sesuatu yang cacat?" }
    ]
  },
  {
    nomor: 2,
    nama: "Ayat Kursi (Al-Baqarah: 255)",
    namaArab: "آية الكرسي",
    arti: "Ayat Singgasana Keagungan Allah",
    golongan: "Madaniyyah",
    jumlahAyat: 1,
    deskripsi: "Ayat paling agung dalam Al-Qur'an tentang tauhid, keesaan, dan keabadian kekuasaan Allah yang tidak mengantuk dan tidak tidur.",
    ayatList: [
      {
        nomor: 255,
        arab: "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ",
        latin: "Allāhu lā ilāha illā huw(a), al-ḥayyul-qayyūm(u), lā ta'khużuhū sinatuw walā naum(un), lahū mā fis-samāwāti wa mā fil-arḍ(i), man żal-lażī yasyfa'u 'indahū illā bi'iżnih(ī), ya'lamu mā baina aidīhim wa mā khalfahum, walā yuḥīṭūna bisyai'im min 'ilmihī illā bimā syā'(a), wasi'a kursiyyuhus-samāwāti wal-arḍ(a), walā ya'ūduhū ḥifẓuhumā, wa huwal-'aliyyul-'aẓīm(u)",
        arti: "Allah, tidak ada tuhan selain Dia, Yang Mahahidup lagi senantiasa mengurus (makhluk-Nya). Dia tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar."
      }
    ]
  }
];

export const LIST_HADIST_PILIHAN: HadistData[] = [
  {
    id: "h-01",
    judul: "Niat Menentukan Nilai Amal",
    kitab: "Hadits Arba'in An-Nawawi (Hadits 1)",
    tema: "Ikhlas & Niat",
    perawi: "HR. Bukhari no. 1 dan Muslim no. 1907",
    arab: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
    terjemah: "Sesungguhnya setiap amalan tergantung pada niatnya, dan setiap orang akan mendapatkan sesuai apa yang ia niatkan. Barangsiapa yang hijrahnya karena Allah dan Rasul-Nya, maka hijrahnya kepada Allah dan Rasul-Nya. Dan barangsiapa yang hijrahnya karena urusan dunia yang ingin ia raih atau karena wanita yang ingin dinikahinya, maka hijrahnya sesuai apa yang ia tuju.",
    faidah: [
      "Niat adalah tolok ukur diterimanya sebuah amalan lahiriah.",
      "Amalan mubah seperti belajar, mengajar, dan bekerja dapat bernilai pahala jika diniatkan ibadah mencari ridha Allah.",
      "Pentingnya meluruskan niat sebelum memulai aktivitas belajar mengajar di madrasah/sekolah."
    ]
  },
  {
    id: "h-02",
    judul: "Kewajiban Menuntut Ilmu",
    kitab: "Sunan Ibnu Majah",
    tema: "Pendidikan & Menuntut Ilmu",
    perawi: "HR. Ibnu Majah no. 224, dishahihkan oleh Al-Albani",
    arab: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    terjemah: "Menuntut ilmu itu hukumnya fardhu (wajib) atas setiap muslim (laki-laki maupun perempuan).",
    faidah: [
      "Ilmu agama dan ilmu yang bermanfaat bagi kemaslahatan umat adalah kewajiban hidup.",
      "Tidak ada batasan usia maupun gender dalam thalabul ilmi.",
      "Guru dan murid sama-sama mengemban amanah suci menyebarkan cahaya ilmu."
    ]
  },
  {
    id: "h-03",
    judul: "Akhlak yang Mulia dan Paling Dicintai",
    kitab: "Sunan At-Tirmidzi",
    tema: "Budi Pekerti & Akhlak",
    perawi: "HR. At-Tirmidzi no. 2018 (Hasan Shahih)",
    arab: "إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلَاقًا",
    terjemah: "Sesungguhnya orang yang paling aku cintai di antara kalian dan yang paling dekat tempat duduknya denganku pada hari kiamat adalah yang paling baik akhlaknya.",
    faidah: [
      "Kemuliaan seorang mukmin diukur dari keluhuran pekerti dan tutur katanya.",
      "Tujuan utama risalah Nabi Muhammad SAW adalah menyempurnakan akhlak manusia.",
      "Pendidik PAI menanamkan adab sebelum ilmu kepada para murid."
    ]
  },
  {
    id: "h-04",
    judul: "Menjaga Lisan dan Berbuat Baik kepada Tetangga",
    kitab: "Shahih Bukhari & Muslim",
    tema: "Adab Pergaulan",
    perawi: "HR. Bukhari no. 6018 dan Muslim no. 47",
    arab: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
    terjemah: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam. Barangsiapa beriman kepada Allah dan hari akhir, hendaklah memuliakan tetangganya. Dan barangsiapa beriman kepada Allah dan hari akhir, hendaklah memuliakan tamunya.",
    faidah: [
      "Bukti keimanan sejati tercermin dalam kemampuan menahan lisan dari ghibah, fitnah, dan kata-kata kotor.",
      "Diam lebih selamat daripada berbicara hal yang tidak mendatangkan manfaat.",
      "Menumbuhkan keharmonisan sosial antarsesama."
    ]
  },
  {
    id: "h-05",
    judul: "Persaudaraan Muslim Laksana Satu Tubuh",
    kitab: "Shahih Muslim",
    tema: "Ukhuwah Islamiyah",
    perawi: "HR. Muslim no. 2586",
    arab: "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ، وَتَرَاحُمِهِمْ، وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى",
    terjemah: "Perumpamaan orang-orang mukmin dalam hal saling mencintai, saling mengasihi, dan saling menyayangi adalah bagaikan satu tubuh. Apabila ada satu anggota tubuh yang sakit, maka seluruh tubuh akan ikut merasa sakit dengan tidak bisa tidur dan demam.",
    faidah: [
      "Tingginya empati dan kepedulian sosial antar-umat beriman.",
      "Menolak sikap individualis, egois, dan perundungan (bullying) di lingkungan sekolah.",
      "Membantu sesama yang terkena musibah adalah wujud nyata ukhuwah."
    ]
  },
  {
    id: "h-06",
    judul: "Kebersihan Sebagian dari Iman",
    kitab: "Shahih Muslim",
    tema: "Kebersihan & Kesucian",
    perawi: "HR. Muslim no. 223",
    arab: "الطَّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ",
    terjemah: "Kesucian (kebersihan) itu adalah sebagian dari iman, dan ucapan 'Alhamdulillah' dapat memenuhi timbangan kebaikan.",
    faidah: [
      "Menjaga kesucian lahir (thaharah) dan batin (taubat) adalah syarat diterimanya ibadah.",
      "Memelihara kebersihan kelas, madrasah, dan lingkungan hidup adalah cerminan pribadi muslim sejati."
    ]
  },
  {
    id: "h-07",
    judul: "Sedekah Tidak Mengurangi Harta",
    kitab: "Shahih Muslim",
    tema: "Sedekah & Kedermawanan",
    perawi: "HR. Muslim no. 2588",
    arab: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ",
    terjemah: "Sedekah itu tidak akan mengurangi harta, dan tidaklah Allah menambah bagi seorang hamba yang suka memaafkan melainkan kemuliaan, serta tidaklah seseorang merendahkan hati (tawadhu') karena Allah melainkan Allah akan mengangkat derajatnya.",
    faidah: [
      "Harta yang disedekahkan justru akan diberkahi dan dilipatgandakan pahalanya oleh Allah.",
      "Memaafkan kesalahan orang lain adalah sumber kehormatan diri.",
      "Tawadhu' melahirkan kemuliaan hakiki di hadapan Allah dan manusia."
    ]
  }
];

export const LIST_BUKU_PELAJARAN: BukuPelajaranData[] = [
  {
    id: "buku-smp-7",
    judul: "Pendidikan Agama Islam & Budi Pekerti Kelas VII",
    kelas: "Kelas VII (Fase D)",
    kurikulum: "Kurikulum Merdeka (Kemendikbudristek)",
    babList: [
      {
        babNomor: 1,
        judulBab: "Al-Qur'an dan Sunnah Sebagai Pedoman Hidup",
        kategori: "Al-Qur'an & Tajwid",
        ringkasan: "Memahami kedudukan Al-Qur'an dan Hadis Nabi sebagai sumber primer ajaran Islam, serta menerapkan hukum bacaan Alif Lam Syamsiyah dan Qamariyah.",
        tujuanPembelajaran: [
          "Membaca Q.S. an-Nisa'/4: 59 dan Q.S. an-Nahl/16: 64 dengan tartil dan tajwid yang benar.",
          "Menjelaskan fungsi Al-Qur'an dan Sunnah dalam memecahkan problematika hidup sehari-hari.",
          "Membiasakan diri berpegang teguh pada tuntunan syariat Islam."
        ],
        materiPokok: [
          "Kedudukan Al-Qur'an sebagai kalamullah mukjizat abadi.",
          "Kedudukan Hadis/Sunnah sebagai penjelas (bayan) ayat-ayat Al-Qur'an.",
          "Tajwid: Hukum bacaan Alif Lam Syamsiyah dan Alif Lam Qamariyah."
        ],
        istilahPenting: [
          { kata: "As-Sunnah", arti: "Segala perkataan, perbuatan, dan ketetapan Nabi Muhammad SAW." },
          { kata: "Syamsiyah", arti: "Hukum bacaan di mana huruf Lam diidghamkan ke huruf berikutnya." }
        ]
      },
      {
        babNomor: 2,
        judulBab: "Meneladani Nama dan Sifat Allah untuk Kebaikan Hidup",
        kategori: "Akidah",
        ringkasan: "Mendalami makna Asmaul Husna: Al-'Alim, Al-Khabir, As-Sami', dan Al-Bashir untuk membentuk karakter berintegritas dan mawas diri.",
        tujuanPembelajaran: [
          "Menjelaskan makna Al-Asma' al-Husna: al-'Alim, al-Khabir, as-Sami', dan al-Bashir.",
          "Menerapkan perilaku mawas diri karena meyakini Allah Maha Melihat dan Mendengar.",
          "Menampilkan perilaku jujur dalam ujian dan interaksi harian."
        ],
        materiPokok: [
          "Al-'Alim: Allah Maha Mengetahui segala rahasia langit dan bumi.",
          "Al-Khabir: Allah Maha Waspada/Teliti terhadap setiap gerak-gerik hamba-Nya.",
          "As-Sami': Allah Maha Mendengar doa dan bisikan hati.",
          "Al-Bashir: Allah Maha Melihat amalan nyata maupun tersembunyi."
        ],
        istilahPenting: [
          { kata: "Asmaul Husna", arti: "Nama-nama Allah yang terbaik dan terindah berjumlah 99." },
          { kata: "Muraqabah", arti: "Perasaan senantiasa diawasi oleh Allah SWT di manapun berada." }
        ]
      },
      {
        babNomor: 3,
        judulBab: "Menghadirkan Salat dan Zikir dalam Kehidupan",
        kategori: "Fiqih",
        ringkasan: "Hakikat shalat fardhu dan shalat sunnah, tata cara sujud sahwi, sujud tilawah, dan sujud syukur sebagai benteng dari perbuatan keji dan munkar.",
        tujuanPembelajaran: [
          "Menjelaskan hikmah shalat dan zikir dalam mencegah perbuatan keji dan munkar.",
          "Mempraktikkan shalat fardhu berjamaah dan tata cara sujud sahwi, syukur, dan tilawah.",
          "Menjadikan zikir sebagai penentram jiwa di setiap situasi."
        ],
        materiPokok: [
          "Shalat sebagai tiang agama dan pencegah fahsya' wal munkar (Q.S. Al-Ankabut: 45).",
          "Tata cara dan sebab sujud syukur, sujud sahwi, dan sujud tilawah.",
          "Adab dan keutamaan zikir ba'da shalat."
        ],
        istilahPenting: [
          { kata: "Sujud Sahwi", arti: "Dua sujud sebelum atau sesudah salam karena lupa atau ragu bilangan shalat." },
          { kata: "Thuma'ninah", arti: "Ketenangan diam sejenak di setiap rukun shalat." }
        ]
      },
      {
        babNomor: 4,
        judulBab: "Meneladani Perjuangan Nabi Muhammad SAW Periode Madinah",
        kategori: "Sejarah (Tarikh)",
        ringkasan: "Menganalisis strategi hijrah Nabi ke Yatsrib, pendirian Masjid Nabawi, Piagam Madinah, dan persaudaraan Muhajirin dan Anshar.",
        tujuanPembelajaran: [
          "Menjelaskan latar belakang dan faktor keberhasilan hijrah ke Madinah.",
          "Menguraikan nilai-nilai toleransi dalam Piagam Madinah (Mitsaq Madinah).",
          "Menerapkan semangat persaudaraan dan gotong royong di lingkungan sekolah."
        ],
        materiPokok: [
          "Strategi dakwah Nabi Muhammad SAW di Madinah.",
          "Piagam Madinah sebagai konstitusi pertama perlindungan hak asasi dan toleransi umat beragama.",
          "Keteladanan kaum Anshar dalam menyambut kaum Muhajirin."
        ],
        istilahPenting: [
          { kata: "Muhajirin", arti: "Sahabat Nabi yang berhijrah meninggalkan Mekkah menuju Madinah." },
          { kata: "Anshar", arti: "Penduduk asli Madinah yang menolong dan menyambut kaum Muhajirin." }
        ]
      }
    ]
  },
  {
    id: "buku-smp-8",
    judul: "Pendidikan Agama Islam & Budi Pekerti Kelas VIII",
    kelas: "Kelas VIII (Fase D)",
    kurikulum: "Kurikulum Merdeka (Kemendikbudristek)",
    babList: [
      {
        babNomor: 1,
        judulBab: "Inspirasi Al-Qur'an: Pelestarian Alam dan Lingkungan",
        kategori: "Al-Qur'an & Tajwid",
        ringkasan: "Mengkaji Q.S. ar-Rum/30: 41 dan ayat terkait tentang larangan berbuat kerusakan di muka bumi dan kewajiban menjaga ekosistem alam.",
        tujuanPembelajaran: [
          "Membaca dan menghafalkan Q.S. ar-Rum/30: 41 tentang kerusakan alam akibat ulah manusia.",
          "Menerapkan tajwid hukum bacaan Ra Tarqiq dan Ra Tafkhim.",
          "Menginisiasi aksi peduli lingkungan dan kebersihan madrasah."
        ],
        materiPokok: [
          "Kandungan Q.S. ar-Rum: 41, Ibrahim: 32, dan az-Zukhruf: 13.",
          "Hukum bacaan Ra Tafkhim (tebal) dan Ra Tarqiq (tipis).",
          "Peran muslim sebagai khalifah fil ardhi dalam merawat bumi."
        ],
        istilahPenting: [
          { kata: "Khalifah fil ardhi", arti: "Pemimpin dan pengelola kemakmuran di muka bumi." },
          { kata: "Tafkhim", arti: "Menebalkan bunyi pengucapan huruf hijaiyah tertentu." }
        ]
      },
      {
        babNomor: 2,
        judulBab: "Meyakini Kitab-Kitab Allah: Generasi Pecinta Al-Qur'an",
        kategori: "Akidah",
        ringkasan: "Memahami rukun iman ketiga: beriman kepada Taurat, Zabur, Injil, dan Al-Qur'an sebagai kitab suci pamungkas penyempurna.",
        tujuanPembelajaran: [
          "Menjelaskan makna beriman kepada 4 kitab Allah beserta nabi penerimanya.",
          "Menunjukkan perilaku gemar membaca, mentadaburi, dan mengamalkan Al-Qur'an.",
          "Menghargai keberagaman keyakinan dengan sikap tasamuh (toleran)."
        ],
        materiPokok: [
          "Taurat (Nabi Musa as), Zabur (Nabi Daud as), Injil (Nabi Isa as), Al-Qur'an (Nabi Muhammad SAW).",
          "Al-Qur'an sebagai muhaimin (penguji dan penyempurna) kitab-kitab sebelumnya.",
          "Adab membaca dan memuliakan mushaf Al-Qur'an."
        ],
        istilahPenting: [
          { kata: "Suhuf", arti: "Lembaran-lembaran wahyu yang diturunkan kepada nabi sebelum dibukukan." }
        ]
      }
    ]
  },
  {
    id: "buku-smp-9",
    judul: "Pendidikan Agama Islam & Budi Pekerti Kelas IX",
    kelas: "Kelas IX (Fase D)",
    kurikulum: "Kurikulum Merdeka (Kemendikbudristek)",
    babList: [
      {
        babNomor: 1,
        judulBab: "Meyakini Hari Akhir dengan Menumbuhkan Rasa Tanggung Jawab",
        kategori: "Akidah",
        ringkasan: "Memahami kiamat sughra, kiamat kubra, yaumul ba'ats, hisab, mizan, sirath, hingga surga dan neraka serta dampaknya terhadap etos amal saleh.",
        tujuanPembelajaran: [
          "Menjelaskan dalil naqli dan aqli tentang kepastian datangnya Hari Kiamat.",
          "Membedakan kiamat sughra (kematian, bencana) dan kiamat kubra.",
          "Menunjukkan sikap berhati-hati dalam berbuat karena keyakinan hisab akhirat."
        ],
        materiPokok: [
          "Fase-fase alam akhirat: Barzakh, Ba'ats, Mahsyar, Hisab, Mizan, Jaza'.",
          "Tanda-tanda kiamat besar dan kecil.",
          "Hikmah beriman kepada hari akhir terhadap etos kerja dan belajar."
        ],
        istilahPenting: [
          { kata: "Yaumul Ba'ats", arti: "Hari dibangkitkannya seluruh manusia dari alam kubur." },
          { kata: "Mizan", arti: "Timbangan amal perbuatan manusia di yaumul hisab." }
        ]
      },
      {
        babNomor: 2,
        judulBab: "Zakat Fitrah dan Zakat Mal Membangun Kesejahteraan",
        kategori: "Fiqih",
        ringkasan: "Ketentuan hukum zakat fitrah, zakat mal, mustahiq zakat (8 asnaf), dan perannya dalam mengentaskan kemiskinan umat.",
        tujuanPembelajaran: [
          "Menghitung nisab dan kadar zakat mal serta syarat sah zakat fitrah.",
          "Mengidentifikasi 8 golongan penerima zakat (mustahiq) menurut Q.S. at-Taubah: 60.",
          "Menumbuhkan jiwa kepedulian sosial dan gemar berinfak."
        ],
        materiPokok: [
          "Pengertian dan perbedaan zakat fitrah, zakat mal, infak, dan sedekah.",
          "Nisab emas, perak, pertanian, dan perdagangan.",
          "Manajemen zakat modern dan pemberdayaan ekonomi umat."
        ],
        istilahPenting: [
          { kata: "Nisab", arti: "Batas minimal jumlah kepemilikan harta yang wajib dikeluarkan zakatnya." },
          { kata: "Mustahiq", arti: "Orang yang berhak menerima penyaluran zakat." }
        ]
      }
    ]
  }
];

export const LIST_KISAH_NABI: KisahNabiData[] = [
  {
    nomorUrut: 1,
    nama: "Nabi Adam as",
    gelar: "Abul Basyar (Bapak Umat Manusia)",
    isUlulAzmi: false,
    periodeKaum: "Awal Penciptaan Manusia",
    tempatDakwah: "Bumi (setelah turun dari Surga)",
    mukjizat: [
      "Diciptakan langsung oleh Allah dari tanah dan ditiupkan ruh",
      "Diajarkan nama-nama seluruh benda di alam semesta yang malaikat pun tidak mengetahuinya",
      "Diberikan keturunan yang menyebar ke seluruh penjuru dunia"
    ],
    ringkasanKisah: "Nabi Adam as diciptakan sebagai khalifah pertama di bumi. Diberi kemuliaan ilmu hingga para malaikat bersujud hormat, sementara Iblis menolak karena sombong. Setelah melanggar larangan memakan buah khuldi akibat godaan iblis, Nabi Adam dan Hawa bertaubat dengan doa yang sangat tulus, lalu diampuni Allah dan diturunkan ke bumi untuk mengemban misi ibadah dan peradaban.",
    ayatAlquran: "Q.S. Al-Baqarah: 30-38, Q.S. Al-A'raf: 19-25",
    keteladanan: [
      "Mengakui kesalahan dan segera bertaubat kepada Allah.",
      "Pentingnya ilmu pengetahuan sebagai modal utama kepemimpinan.",
      "Waspada terhadap bujuk rayu dan tipu daya iblis/setan."
    ]
  },
  {
    nomorUrut: 3,
    nama: "Nabi Nuh as",
    gelar: "Syaikhul Anbiya' / Rasul Ulul Azmi",
    isUlulAzmi: true,
    periodeKaum: "Bani Rasib (Kaum Penyembah Berhala Wadd, Suwa', Yaghuts)",
    tempatDakwah: "Wilayah Mesopotamia (Irak Kuno)",
    mukjizat: [
      "Mampu membuat bahtera raksasa di atas bukit tandus atas wahyu Allah",
      "Selamat bersama pengikutnya dari banjir bandang dahsyat yang menenggelamkan kaum kafir",
      "Usia dakwah yang sangat panjang (950 tahun) dengan keteguhan iman luar biasa"
    ],
    ringkasanKisah: "Nabi Nuh berdakwah siang dan malam selama ratusan tahun mengajak kaumnya menyembah Allah. Namun kaumnya mengejek, menghina, dan tetap menyembah berhala, bahkan putranya (Kan'an) dan istrinya menolak beriman. Allah memerintahkan Nuh membuat kapal besar. Saat air bah datang meluap dari langit dan bumi, hanya kaum beriman dan pasangan binatang yang selamat di atas kapal.",
    ayatAlquran: "Q.S. Hud: 25-48, Q.S. Nuh: 1-28",
    keteladanan: [
      "Kesabaran tanpa batas dalam mendidik dan berdakwah.",
      "Ketaatan mutlak menjalankan perintah Allah meskipun dicemooh manusia.",
      "Ikatan iman melampaui ikatan darah semata."
    ]
  },
  {
    nomorUrut: 6,
    nama: "Nabi Ibrahim as",
    gelar: "Khalilullah (Kekasih Allah) / Abul Anbiya' (Bapak Para Nabi) / Ulul Azmi",
    isUlulAzmi: true,
    periodeKaum: "Kaum Babilonia & Raja Namrud (Penyembah Bintang & Patung)",
    tempatDakwah: "Ur (Irak), Babilonia, Palestina, Mesir, dan Mekkah",
    mukjizat: [
      "Tubuhnya tidak terbakar saat dilemparkan ke dalam kobaran api unggun raksasa Namrud",
      "Menghidupkan burung yang sudah dicincang atas izin Allah untuk membuktikan hari kebangkitan",
      "Mengeluarkan mata air zamzam untuk putranya Ismail dan istrinya Hajar",
      "Mendirikan Ka'bah bersama Nabi Ismail as"
    ],
    ringkasanKisah: "Nabi Ibrahim mencari kebenaran tauhid dengan berpikir kritis mengamati alam. Ia mendebat Namrud dan menghancurkan berhala-berhala kaumnya. Ketika dibakar hidup-hidup, Allah memerintahkan api menjadi dingin dan menyelamatkan Ibrahim. Ketaatannya diuji saat diperintahkan mengorbankan putranya Ismail yang kemudian diganti dengan domba surga, menjadi syariat Idul Adha.",
    ayatAlquran: "Q.S. Al-Anbiya: 51-70, Q.S. Asy-Syu'ara: 69-89, Q.S. As-Saffat: 100-111",
    keteladanan: [
      "Kecerdasan logika dan keberanian menyuarakan kebenaran.",
      "Ketundukan total (taslim) kepada syariat Allah.",
      "Menjadikan keluarga sebagai madrasah tauhid dan keikhlasan."
    ]
  },
  {
    nomorUrut: 14,
    nama: "Nabi Musa as",
    gelar: "Kalimullah (Orang yang Berbicara Langsung dengan Allah) / Ulul Azmi",
    isUlulAzmi: true,
    periodeKaum: "Bani Israil & Fir'aun Mesir",
    tempatDakwah: "Mesir, Madyan, Gurun Sinai",
    mukjizat: [
      "Tongkat yang berubah menjadi ular besar dan membelah Laut Merah",
      "Telapak tangan yang memancarkan cahaya putih menyilaukan tanpa cela",
      "Menerima Kitab Taurat di Bukit Tursina (Sinai)",
      "Memancarkan 12 mata air dari batu karang dengan pukulan tongkat"
    ],
    ringkasanKisah: "Lahir pada masa Fir'aun yang membunuhi setiap bayi laki-laki Bani Israil, Musa diselamatkan ibunya dengan dihanyutkan di Sungai Nil hingga diasuh di istana Fir'aun sendiri. Setelah dewasa dan diangkat menjadi rasul, Musa didampingi Harun kembali ke Mesir menuntut Fir'aun membebaskan Bani Israil. Saat dikejar bala tentara Fir'aun di Laut Merah, tongkat Musa membelah lautan hingga Fir'aun tenggelam.",
    ayatAlquran: "Q.S. Al-Qashash: 1-44, Q.S. Thaha: 9-98, Q.S. Al-A'raf: 103-160",
    keteladanan: [
      "Keberanian melawan tirani kezaliman dan menegakkan keadilan kaum tertindas.",
      "Tawakkal yang kokoh saat menghadapi jalan buntu.",
      "Semangat belajar yang tinggi (sebagaimana kisahnya berguru kepada Nabi Khidir as)."
    ]
  },
  {
    nomorUrut: 24,
    nama: "Nabi Isa as",
    gelar: "Ruhullah / Kalimatullah / Ulul Azmi",
    isUlulAzmi: true,
    periodeKaum: "Bani Israil era Romawi",
    tempatDakwah: "Palestina (Baitul Maqdis / Yerusalem)",
    mukjizat: [
      "Lahir tanpa ayah dari wanita suci Maryam binti Imran",
      "Dapat berbicara membela ibunya ketika masih berada dalam buaian bayi",
      "Menyembuhkan orang buta sejak lahir dan penderita penyakit kusta atas izin Allah",
      "Menghidupkan orang mati atas izin Allah",
      "Menurunkan hidangan dari langit (Al-Ma'idah)",
      "Menerima Kitab Suci Injil"
    ],
    ringkasanKisah: "Nabi Isa as diutus kepada Bani Israil yang telah melenceng dari ajaran Taurat. Beliau mengajarkan kasih sayang, zuhud, membersihkan hati dari ketamakan dunia, serta memberi kabar gembira tentang kedatangan nabi terakhir bernama Ahmad (Muhammad). Ketika orang-orang zalim hendak menyalibnya, Allah menyelamatkan Isa dengan mengangkatnya ke langit dan menyerupakan orang lain (Yudas/Yahuda) sebagai ganti.",
    ayatAlquran: "Q.S. Ali 'Imran: 45-59, Q.S. Maryam: 16-36, Q.S. Al-Ma'idah: 110-120",
    keteladanan: [
      "Sifat pemaaf, lemah lembut, dan welas asih kepada sesama.",
      "Zuhud terhadap gemerlap materi duniawi.",
      "Ketaatan membela kehormatan ibu dan orang tua."
    ]
  },
  {
    nomorUrut: 25,
    nama: "Nabi Muhammad SAW",
    gelar: "Khatamun Nabiyyin (Penutup Para Nabi) / Rahmatan lil 'Alamin / Sayyidul Mursalin / Ulul Azmi",
    isUlulAzmi: true,
    periodeKaum: "Kaum Quraisy dan Seluruh Umat Manusia",
    tempatDakwah: "Makkah Al-Mukarramah dan Madinah Al-Munawwarah",
    mukjizat: [
      "Al-Qur'anul Karim mukjizat abadi sepanjang zaman",
      "Peristiwa Isra' Mi'raj menembus Sidratul Muntaha menerima perintah shalat 5 waktu",
      "Membelah bulan menjadi dua bagian sebagai bukti kenabian",
      "Air memancar dari sela-sela jemari beliau saat para sahabat kehausan",
      "Makanan sedikit mencukupi ribuan sahabat saat perang Khandaq",
      "Pohon dan batu bersujud dan memberi salam kepada beliau"
    ],
    ringkasanKisah: "Lahir yatim di kota Makkah, dikenal bergelar Al-Amin (orang terpercaya) sejak belia. Menerima wahyu pertama di Gua Hira pada usia 40 tahun. Berdakwah dengan penuh kesabaran selama 13 tahun di Makkah menghadapi boikot dan penyiksaan kaum kafir Quraisy, lalu hijrah ke Madinah mendirikan peradaban Islam yang adil dan beradab. Wafat setelah menyempurnakan syariat Islam dan mewariskan Al-Qur'an serta Sunnah.",
    ayatAlquran: "Q.S. Al-Ahzab: 21 & 40, Q.S. Al-Anbiya: 107, Q.S. Al-Fath: 29",
    keteladanan: [
      "Uswatun hasanah (suri teladan terbaik) dalam seluruh aspek kehidupan.",
      "Keadilan, kejujuran, dan ketulusan dalam kepemimpinan.",
      "Kasih sayang kepada anak yatim, kaum lemah, dan sesama makhluk."
    ]
  },
  {
    nomorUrut: 12,
    nama: "Nabi Yusuf as",
    gelar: "Ash-Shiddiq (Yang Amat Benar)",
    isUlulAzmi: false,
    periodeKaum: "Masyarakat Mesir Kuno & Bani Israil",
    tempatDakwah: "Mesir",
    mukjizat: [
      "Diberkahi separuh ketampanan manusia dunia",
      "Dikaruniai kemampuan menakwilkan mimpi secara tepat",
      "Memimpin manajemen ketahanan pangan Mesir menghadapi 7 tahun masa paceklik"
    ],
    ringkasanKisah: "Dibuang ke sumur oleh saudara-saudaranya karena rasa iri, diselamatkan kafilah dagang lalu dijual menjadi budak di istana Mesir. Difitnah oleh istri majikannya (Zulaikha) hingga dipenjara bertahun-tahun. Di penjara beliau menafsirkan mimpi raja tentang masa panen dan paceklik. Diangkat menjadi menteri keuangan Mesir dan akhirnya memaafkan saudara-saudaranya dengan hati yang lapang.",
    ayatAlquran: "Q.S. Yusuf: 1-111 (Ahsanul Qashash)",
    keteladanan: [
      "Menjaga kesucian diri (iffah) dari perbuatan zina dan godaan syahwat.",
      "Kesabaran menghadapi ujian kedengkian dari orang terdekat.",
      "Kelapangan dada memaafkan orang yang pernah menyakiti tanpa dendam."
    ]
  },
  {
    nomorUrut: 11,
    nama: "Nabi Ayyub as",
    gelar: "Ash-Shabir (Teladan Kesabaran)",
    isUlulAzmi: false,
    periodeKaum: "Kaum Hauran (Syam)",
    tempatDakwah: "Wilayah Syam (Suriah/Yordania)",
    mukjizat: [
      "Menghentakkan kaki ke tanah lalu memancarkan air sejuk yang menyembuhkan penyakit kulitnya seketika",
      "Kembalinya harta, kekayaan, dan keturunan berlipat ganda setelah masa ujian berakhir"
    ],
    ringkasanKisah: "Seorang nabi yang kaya raya, dermawan, dan taat beribadah. Diuji oleh Allah dengan kehilangan seluruh ternak dan kekayaannya, wafatnya seluruh putra-putrinya, dan didera penyakit parah selama puluhan tahun hingga dijauhi kaumnya kecuali istrinya yang setia. Nabi Ayyub tidak pernah mengeluh, justru memperbanyak dzikir dan memohon kesembuhan dengan santun kepada Allah.",
    ayatAlquran: "Q.S. Al-Anbiya: 83-84, Q.S. Shad: 41-44",
    keteladanan: [
      "Kesabaran sejati dalam menghadapi musibah sakit dan kehilangan materi.",
      "Berbaik sangka (husnuzhan) kepada ketetapan takdir Allah.",
      "Kesetiaan dalam membina rumah tangga di saat suka maupun duka."
    ]
  }
];

export const LIST_NASEHAT_ISLAMI: NasehatIslamiData[] = [
  {
    id: "n-01",
    tokoh: "Imam Asy-Syafi'i rahimahullah",
    peran: "Mujtahid Mutlak & Pendiri Mazhab Syafi'i",
    tema: "Menuntut Ilmu & Adab",
    kutipanArab: "أَخِي لَنْ تَنَالَ العِلْمَ إِلَّا بِسِتَّةٍ سَأُنْبِيكَ عَنْ تَفْصِيلِهَا بِبَيَانِ: ذَكَاءٌ وَحِرْصٌ وَاجْتِهَادٌ وَبُلْغَةٌ وَصُحْبَةُ أُسْتَاذٍ وَطُولُ زَمَانِ",
    kutipanIndonesia: "Wahai saudaraku, engkau tidak akan meraih ilmu kecuali dengan enam perkara yang akan kuterangkan kepadamu dengan jelas: Kecerdasan akal, tekad yang kuat, kesungguhan gigih, bekal yang cukup, bimbingan seorang guru, dan masa waktu yang panjang.",
    uraianHikmah: "Ilmu tidak diperoleh secara instan atau sekadar hafalan daring tanpa adab talaqqi kepada guru. Dibutuhkan ketekunan, rasa haus akan kebenaran, pengorbanan waktu, dan kepatuhan memuliakan ustadz/guru agar ilmu membuahkan keberkahan dalam amal.",
    amalanPraktis: "Mencatat setiap materi ajar, menghormati bapak/ibu guru dengan mendengarkan tanpa memotong penjelasan, dan mengulang kembali pelajaran di rumah."
  },
  {
    id: "n-02",
    tokoh: "Umar bin Khattab radhiyallahu 'anhu",
    peran: "Khalifah Kedua / Al-Faruq",
    tema: "Muhasabah & Introspeksi Diri",
    kutipanArab: "حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا، وَزِنُوهَا قَبْلَ أَنْ تُوزَنُوا",
    kutipanIndonesia: "Hisablah (koreksilah) diri kalian sebelum kalian dihisab oleh Allah kelak pada hari kiamat, dan timbanglah amal perbuatan kalian sebelum kalian ditimbang.",
    uraianHikmah: "Orang yang cerdas adalah orang yang mampu menundukkan hawa nafsunya dan mempersiapkan bekal untuk kehidupan setelah kematian. Jangan sibuk mencari cela dan aib orang lain sementara diri sendiri berlumuran dosa dan kelalaian.",
    amalanPraktis: "Meluangkan waktu 5 menit setiap malam sebelum tidur untuk merenungi apa saja dosa yang dilakukan hari ini, lalu beristighfar dan bertekad memperbaiki diri esok hari."
  },
  {
    id: "n-03",
    tokoh: "Hasan Al-Bashri rahimahullah",
    peran: "Ulama Tabi'in Terkemuka & Ahli Zuhud",
    tema: "Waktu dan Nilai Umur",
    kutipanArab: "يَا ابْنَ آدَمَ إِنَّمَا أَنْتَ أَيَّامٌ، كُلَّمَا ذَهَبَ يَوْمٌ ذَهَبَ بَعْضُكَ",
    kutipanIndonesia: "Wahai anak Adam! Sesungguhnya engkau hanyalah kumpulan hari-hari. Setiap kali satu hari berlalu, maka hilanglah sebagian dari dirimu.",
    uraianHikmah: "Waktu adalah modal termahal yang tidak dapat dibeli kembali dengan emas dan permata. Setiap hembusan nafas yang terbuang sia-sia tanpa zikir, belajar, atau amal kebaikan adalah kerugian yang tidak akan pernah bisa tergantikan.",
    amalanPraktis: "Membuat jadwal kegiatan harian yang teratur, mengurangi waktu scrolling media sosial yang tidak bermanfaat, dan memanfaatkan waktu luang untuk membaca Al-Qur'an."
  },
  {
    id: "n-04",
    tokoh: "Ali bin Abi Thalib karramallahu wajhah",
    peran: "Khalifah Keempat & Pintu Gerbang Ilmu",
    tema: "Menjaga Rahasia & Kehormatan Diri",
    kutipanArab: "سِرُّكَ أَسِيرُكَ، فَإِذَا تَكَلَّمْتَ بِهِ صِرْتَ أَسِيرَهُ",
    kutipanIndonesia: "Rahasia hatimu adalah tawananmu, namun jika engkau telah membicarakannya kepada orang lain, maka engkaulah yang menjadi tawanannya.",
    uraianHikmah: "Keberanian sejati adalah kemampuan mengendalikan lisan. Banyak perselisihan, fitnah, dan permusuhan bermula dari ketidakmampuan menjaga rahasia kawan atau mengumbar aib pribadi ke muka publik.",
    amalanPraktis: "Menjaga amanah sahabat, tidak menyebarkan berita yang belum terbukti kebenarannya (tabayyun), dan menutup aib saudara seiman."
  },
  {
    id: "n-05",
    tokoh: "Luqman Al-Hakim",
    peran: "Hamba Saleh Penasihat Generasi",
    tema: "Adab Berbicara & Rendah Hati",
    kutipanArab: "وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِى الْاَرْضِ مَرَحًاۗ اِنَّ اللّٰهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُوْرٍ",
    kutipanIndonesia: "Dan janganlah engkau memalingkan wajahmu dari manusia (karena sombong) dan janganlah berjalan di bumi dengan angkuh. Sungguh, Allah tidak menyukai orang-orang yang sombong dan membanggakan diri. (Q.S. Luqman: 18)",
    uraianHikmah: "Ketinggian martabat manusia bukan diukur dari pakaian mewah, jabatan, atau kekayaan, melainkan dari ketawadhuan jiwa. Semakin berisi padi, ia semakin merunduk.",
    amalanPraktis: "Tersenyum dan mengucapkan salam saat berpapasan dengan teman atau guru, serta tidak meninggikan suara saat berdiskusi."
  },
  {
    id: "n-06",
    tokoh: "Imam Al-Ghazali rahimahullah",
    peran: "Hujjatul Islam / Penulis Kitab Ihya' Ulumiddin",
    tema: "Ikhlas Mencegah Riya'",
    kutipanArab: "النَّاسُ كُلُّهُمْ هَلْكَى إِلَّا العَالِمُونَ، وَالعَالِمُونَ كُلُّهُمْ هَلْكَى إِلَّا العَامِلُونَ، وَالعَامِلُونَ كُلُّهُمْ هَلْكَى إِلَّا المُخْلِصُونَ، وَالمُخْلِصُونَ عَلَى خَطَرٍ عَظِيمٍ",
    kutipanIndonesia: "Manusia semuanya binasa kecuali orang yang berilmu. Orang yang berilmu semuanya binasa kecuali yang mengamalkan ilmunya. Orang yang beramal semuanya binasa kecuali yang ikhlas. Dan orang yang ikhlas pun senantiasa berada dalam kekhawatiran besar.",
    uraianHikmah: "Ikhlas adalah nyawa dari setiap amal ibadah. Tanpa ikhlas, amal kebajikan hanya bagaikan debu beterbangan yang tidak memiliki bobot di timbangan akhirat.",
    amalanPraktis: "Menyembunyikan amalan sunnah sebagaimana kita menyembunyikan aib diri, serta melatih diri tidak haus akan pujian orang lain."
  }
];

export const LIST_HIKMAH_INSPIRATIF: HikmahData[] = [
  {
    id: "hk-01",
    judul: "Kisah Pemuda Ashabul Kahfi: Teguh Menjaga Iman di Tengah Tirani",
    tokohKisah: "Tujuh Pemuda Beriman dan Seekor Anjing (Qithmir)",
    kategori: "Keteguhan Iman & Perlindungan Allah",
    sinopsis: "Kisah sekelompok pemuda bangsawan yang memilih meninggalkan kemewahan istana dan melarikan diri ke gua demi mempertahankan akidah tauhid dari raja zalim Dikyanus.",
    kisahLengkap: "Pada zaman dahulu, hiduplah seorang raja kejam bernama Dikyanus yang mewajibkan seluruh rakyatnya menyembah berhala dan membunuh siapapun yang bertauhid kepada Allah. Tujuh orang pemuda istana yang hatinya telah diterangi cahaya hidayah menolak menyembah patung. Demi menyelamatkan iman, mereka mengasingkan diri ke sebuah gua terpencil di perbukitan didampingi seekor anjing setia. Di dalam gua tersebut, mereka memohon perlindungan Allah: 'Ya Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan sempurnakanlah petunjuk yang lurus bagi kami dalam urusan kami.' Allah mengabulkan doa mereka dengan menidurkan mereka selama 309 tahun qamariyah tanpa merasa lapar atau haus, sementara tubuh mereka dibolak-balikkan agar tidak rusak dimakan tanah. Ketika mereka terbangun, mereka mengira hanya tertidur sehari atau setengah hari. Ketika salah seorang pergi ke kota hendak membeli makanan, didapatinya negeri tersebut telah berubah menjadi negeri bertauhid dengan raja yang adil.",
    pelajaranHikmah: [
      "Allah senantiasa menolong hamba-hamba-Nya yang berani mengorbankan kesenangan dunia demi menjaga kemurnian iman.",
      "Kekuatan doa dan tawakkal mampu mendatangkan mukjizat yang melampaui logika manusia.",
      "Usia muda adalah masa emas untuk memperjuangkan kebenaran, bukan untuk berhura-hura dalam kemaksiatan."
    ],
    dalilTerkait: "Q.S. Al-Kahfi ayat 9 - 26"
  },
  {
    id: "hk-02",
    judul: "Kejujuran Penggembala Kambing di Masa Khalifah Umar bin Khattab",
    tokohKisah: "Anak Gembala & Khalifah Umar bin Khattab",
    kategori: "Integritas & Muraqabatullah",
    sinopsis: "Ujian kejujuran yang dilakukan Khalifah Umar terhadap seorang budak penggembala kambing di padang pasir yang membuahkan kebebasan dan kemuliaan.",
    kisahLengkap: "Suatu hari di terik padang pasir Madinah, Khalifah Umar bin Khattab r.a. bersama sahabatnya Abdullah bin Dinar berjumpa dengan seorang budak yang sedang menggembalakan kawanan domba milik tuannya. Khalifah Umar ingin menguji kejujuran anak muda tersebut. Umar berkata: 'Wahai gembala, juallah kepadaku seekor saja dari domba-domba itu, ambillah uangnya untukmu dan katakan kepada majikanmu bahwa domba itu telah dimakan serigala.' Sang pemuda penggembala menatap Umar dengan pandangan heran, lalu terucaplah kalimat yang menggetarkan sanubari Umar: 'Lalu dimanakah Allah? (Fa ainallāh?) Jika aku bisa membohongi tuanku, apakah aku bisa menyembunyikan kebohonganku ini di hadapan Allah yang Maha Melihat?' Mendengar jawaban penuh iman tersebut, Khalifah Umar menangis tersedu-sedu. Keesokan harinya, Umar mendatangi majikan sang budak, membelinya, lalu memerdekakan pemuda tersebut serta menghadiahkan kawanan domba kepadanya seraya berkata: 'Kalimat 'Dimanakah Allah' telah memerdekakanmu di dunia ini, dan aku berharap kalimat itu pula yang akan menyelamatkanmu di akhirat kelak.'",
    pelajaranHikmah: [
      "Integritas dan kejujuran sejati lahir dari rasa Muraqabatullah (selalu merasa diawasi oleh Allah SWT).",
      "Kejujuran mungkin terasa pahit atau rugi di awal, tetapi buah akhirnya selalu membawa keberkahan dan kemuliaan hidup.",
      "Karakter unggul tidak ditentukan oleh status sosial atau harta, melainkan oleh ketakwaan hati."
    ],
    dalilTerkait: "Q.S. Al-Hadid: 4 ('Dan Dia bersama kamu di mana saja kamu berada')"
  },
  {
    id: "hk-03",
    judul: "Kisah Uwais Al-Qarni: Bakti kepada Ibu Menggetarkan Penduduk Langit",
    tokohKisah: "Uwais Al-Qarni dan Ibundanya",
    kategori: "Birrul Walidain (Berbakti kepada Orang Tua)",
    sinopsis: "Pemuda miskin dari Yaman yang tidak terkenal di muka bumi, namun sangat masyhur di kalangan para malaikat langit karena baktinya yang luar biasa kepada sang ibu yang lumpuh dan buta.",
    kisahLengkap: "Uwais Al-Qarni adalah seorang pemuda yatim di Yaman yang menderita penyakit belang di kulitnya. Ia hidup berdua dengan ibunya yang sudah tua renta, lumpuh, dan buta. Uwais merawat ibunya dengan penuh kelembutan dan kesabaran tiada tara. Suatu ketika sang ibu ingin menunaikan ibadah haji ke Makkah. Karena tidak memiliki unta atau kendaraan, Uwais membeli seekor anak lembu. Setiap hari ia menggendong lembu tersebut naik turun bukit untuk melatih fisiknya. Orang-orang mengira Uwais telah gila. Namun rahasia itu terungkap ketika musim haji tiba, Uwais dengan kuat menggendong ibunya di atas punggungnya berjalan kaki menempuh jarak ratusan kilometer dari Yaman menuju Makkah untuk thawaf dan wukuf. Di hadapan Ka'bah, Uwais hanya berdoa: 'Ya Allah, ampuni semua dosa ibuku.' Ibunya bertanya: 'Bagaimana dengan dosamu wahai anakku?' Uwais menjawab: 'Jika Allah mengampunimu, maka ridhamu akan mengantarkanku ke surga-Nya.' Rasulullah SAW berpesan kepada Umar bin Khattab dan Ali bin Abi Thalib: 'Jika kalian berjumpa dengan Uwais bin Amir, mintalah kepadanya agar ia memohonkan ampunan untuk kalian, karena doanya mustajab.'",
    pelajaranHikmah: [
      "Ridha Allah terletak pada ridha kedua orang tua, dan murka Allah ada pada murka orang tua.",
      "Kemuliaan sejati bukan diukur dari popularitas di media sosial atau ketenaran duniawi, melainkan dari pengakuan penduduk langit.",
      "Pengorbanan untuk membahagiakan orang tua tidak akan pernah sia-sia dan menjadi kunci pembuka pintu surga."
    ],
    dalilTerkait: "Q.S. Al-Isra' ayat 23 - 24"
  },
  {
    id: "hk-04",
    judul: "Tiga Orang yang Terjebak di Dalam Gua: Tawasul dengan Amal Saleh",
    tokohKisah: "Tiga Musafir yang Tertutup Batu Besar",
    kategori: "Keikhlasan Amal & Doa Mustajab",
    sinopsis: "Kisah tiga orang yang terperangkap dalam gua akibat batu besar yang longsor, lalu batu tersebut bergeser perlahan setelah masing-masing bertawasul menyebut amalan paling ikhlas yang pernah mereka perbuat.",
    kisahLengkap: "Rasulullah SAW menceritakan tentang tiga orang musafir pada masa lampau yang terpaksa berteduh di dalam gua saat hujan lebat. Tiba-tiba sebongkah batu raksasa menggelinding dari atas bukit dan menutup rapat mulut gua. Mereka menyadari tidak ada kekuatan manusia yang mampu menggeser batu tersebut. Salah seorang berkata: 'Ingatlah amalan paling tulus yang pernah kalian persembahkan semata-mata karena Allah, lalu berdoalah dengan amalan itu!' Orang pertama berdoa dengan amalan berbaktinya kepada kedua orang tua, di mana ia tidak pernah memberi minum susu kepada anak-istrinya sebelum kedua orang tuanya minum terlebih dahulu. Batu pun bergeser sedikit. Orang kedua berdoa dengan amalan menahan diri dari zina terhadap putri pamannya yang sangat dicintainya saat ada kesempatan emas karena ia takut kepada Allah. Batu bergeser lebih lebar lagi namun mereka belum bisa keluar. Orang ketiga berdoa dengan amalan kejujurannya mengembangkan upah seorang buruh tani yang tertinggal hingga menjadi peternakan unta dan sapi yang melimpah lalu menyerahkan seluruhnya tanpa mengambil keuntungan sepeser pun. Seketika batu terbuka penuh dan mereka keluar dengan selamat.",
    pelajaranHikmah: [
      "Amalan yang dikerjakan dengan seratus persen ikhlas karena Allah menjadi penolong utama saat manusia berada di titik tergelap kehidupannya.",
      "Bakti kepada orang tua, menjaga kesucian diri dari maksiat, dan memegang amanah adalah pilar utama keselamatan.",
      "Allah tidak pernah menyia-nyiakan kebaikan sekecil apapun yang dikerjakan hamba-Nya."
    ],
    dalilTerkait: "HR. Bukhari no. 2272 dan Muslim no. 2743"
  }
];
