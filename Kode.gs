/**
 * ==============================================================================
 * KODE.GS - GOOGLE APPS SCRIPT BACKEND & DATABASE GOOGLE SHEETS
 * SISTEM INFORMASI PAI SMP & MANAJEMEN PEMBELAJARAN
 * ==============================================================================
 * 
 * PANDUAN DEPLOYMENT:
 * 1. Buka Google Sheets baru di Google Drive Anda (beri nama: "Database PAI SMP").
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script".
 * 3. Hapus kode bawaan di editor, lalu Salin & Tempel seluruh isi file Kode.gs ini.
 * 4. (Opsional) Jalankan fungsi 'setupDatabase()' satu kali untuk membuat semua Sheet & Header secara otomatis.
 * 5. Klik tombol "Deploy" (Terapkan) di pojok kanan atas > "Deployment baru" (New deployment).
 * 6. Pilih jenis: "Aplikasi Web" (Web App).
 *    - Deskripsi: Aplikasi PAI SMP Web App & API
 *    - Jalankan sebagai (Execute as): "Saya" (Me - akun Anda)
 *    - Siapa yang memiliki akses (Who has access): "Siapa saja" (Anyone)
 * 7. Klik "Deploy" / "Terapkan", berikan izin akses (Authorize access).
 * 8. Salin URL Aplikasi Web yang dihasilkan (https://script.google.com/macros/s/.../exec).
 * ==============================================================================
 */

// ===================== KONFIGURASI NAMA SHEET =====================
var SHEET_NAMES = {
  SEKOLAH: "DataSekolah",
  GURU: "DataGuru",
  KELAS: "DataKelas",
  SISWA: "DataSiswa",
  JURNAL: "JurnalMengajar",
  CATATAN_SAKU: "CatatanSakuPAI",
  PENILAIAN: "DataPenilaian",
  PRESENSI: "DataPresensi",
  TUGAS_LMS: "TugasLMS",
  PENGUMPULAN: "PengumpulanTugas",
  IBADAH: "JurnalIbadahHarian",
  PENDAMPINGAN: "PendampinganMurid"
};

/**
 * Endpoint GET: Melayani UI Web App atau API Query
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "";

  // Jika parameter action ada, kembalikan data JSON API
  if (action) {
    var responseData = {};
    try {
      if (action === "getAllData") {
        responseData = getAllDatabaseData();
      } else if (action === "getSekolah") {
        responseData = getSheetDataAsJson(SHEET_NAMES.SEKOLAH);
      } else if (action === "getGuru") {
        responseData = getSheetDataAsJson(SHEET_NAMES.GURU);
      } else if (action === "getKelas") {
        responseData = getSheetDataAsJson(SHEET_NAMES.KELAS);
      } else if (action === "getSiswa") {
        responseData = getSheetDataAsJson(SHEET_NAMES.SISWA);
      } else if (action === "getJurnal") {
        responseData = getSheetDataAsJson(SHEET_NAMES.JURNAL);
      } else if (action === "getCatatanSaku") {
        responseData = getSheetDataAsJson(SHEET_NAMES.CATATAN_SAKU);
      } else if (action === "getPenilaian") {
        responseData = getSheetDataAsJson(SHEET_NAMES.PENILAIAN);
      } else if (action === "getPresensi") {
        responseData = getSheetDataAsJson(SHEET_NAMES.PRESENSI);
      } else if (action === "ping") {
        responseData = { status: "success", message: "Google Apps Script Server Aktif", timestamp: new Date() };
      } else {
        responseData = { status: "error", message: "Action '" + action + "' tidak dikenali." };
      }
      return createJsonResponse({ status: "success", data: responseData });
    } catch (err) {
      return createJsonResponse({ status: "error", message: err.toString() });
    }
  }

  // Jika diakses langsung via browser tanpa action, tampilkan Halaman Index HTML atau info status
  try {
    return HtmlService.createHtmlOutputFromFile("Index")
      .setTitle("Sistem Informasi & Manajemen PAI SMP")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } catch (err) {
    // Jika file Index.html belum ada di Google Apps Script editor
    var htmlContent = "<!DOCTYPE html>" +
      "<html><head><meta charset='utf-8'><title>Server PAI SMP Aktif</title>" +
      "<style>body{font-family:sans-serif;background:#f8fafc;color:#1e293b;padding:40px;line-height:1.6;}" +
      ".card{background:white;max-width:600px;margin:0 auto;padding:30px;border-radius:16px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);border:1px solid #e2e8f0;}" +
      "h2{color:#0f766e;margin-top:0;}pre{background:#f1f5f9;padding:12px;border-radius:8px;overflow-x:auto;font-size:12px;}" +
      ".badge{display:inline-block;padding:4px 10px;background:#dcfce7;color:#166534;font-weight:bold;border-radius:99px;font-size:12px;}" +
      "</style></head><body><div class='card'>" +
      "<span class='badge'>API & Web App Siap</span>" +
      "<h2>Server Google Apps Script Berjalan Normal</h2>" +
      "<p>Web Service Backend PAI SMP siap digunakan untuk menyimpan & membaca data secara real-time ke Google Spreadsheet.</p>" +
      "<hr style='border:none;border-top:1px solid #e2e8f0;margin:20px 0;'>" +
      "<p><strong>Endpoint Uji Coba:</strong></p>" +
      "<ul>" +
      "<li><code>?action=ping</code> - Uji Koneksi</li>" +
      "<li><code>?action=getAllData</code> - Ambil Semua Data Spreadsheet</li>" +
      "<li><code>?action=getSiswa</code> - Ambil Data Siswa</li>" +
      "</ul>" +
      "</div></body></html>";
    return HtmlService.createHtmlOutput(htmlContent)
      .setTitle("API Backend PAI SMP")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

/**
 * Endpoint POST: Menerima & Menyimpan Data dari Aplikasi ke Google Sheets
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Kunci proses maksimal 30 detik untuk mencegah race conditions
    lock.waitLock(30000);
    
    var requestData = {};
    if (e.postData && e.postData.contents) {
      requestData = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      requestData = e.parameter;
    }

    var action = requestData.action || "";
    var payload = requestData.payload || requestData.data || requestData;
    var result = {};

    switch (action) {
      case "saveSekolah":
        result = saveSingleRowObject(SHEET_NAMES.SEKOLAH, payload);
        break;
      case "saveGuru":
        result = saveSingleRowObject(SHEET_NAMES.GURU, payload);
        break;
      case "saveKelas":
        result = replaceOrUpdateSheetData(SHEET_NAMES.KELAS, payload, "id");
        break;
      case "saveSiswa":
        result = replaceOrUpdateSheetData(SHEET_NAMES.SISWA, payload, "nisn");
        break;
      case "saveJurnal":
        result = appendOrUpdateRow(SHEET_NAMES.JURNAL, payload, "id");
        break;
      case "saveCatatanSaku":
        result = appendOrUpdateRow(SHEET_NAMES.CATATAN_SAKU, payload, "id");
        break;
      case "savePenilaian":
        result = replaceOrUpdateSheetData(SHEET_NAMES.PENILAIAN, payload, "id");
        break;
      case "savePresensi":
        result = appendOrUpdateRow(SHEET_NAMES.PRESENSI, payload, "id");
        break;
      case "saveAllData":
        result = syncAllData(payload);
        break;
      case "setup":
        result = setupDatabase();
        break;
      default:
        throw new Error("Action POST '" + action + "' tidak valid.");
    }

    return createJsonResponse({ status: "success", message: "Data berhasil diproses", result: result });

  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Fungsi Setup: Membuat semua sheet dan header kolom secara otomatis
 */
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var schemas = [
    {
      name: SHEET_NAMES.SEKOLAH,
      headers: ["namaSekolah", "npsn", "alamat", "akreditasi", "namaKepsek", "nipKepsek", "terakhirDiperbarui"]
    },
    {
      name: SHEET_NAMES.GURU,
      headers: ["nip", "nama", "sertifikasi", "kontak", "isWaliKelas", "waliKelasDi", "terakhirDiperbarui"]
    },
    {
      name: SHEET_NAMES.KELAS,
      headers: ["id", "nama", "waliKelasNip", "waliKelasNama", "kuota", "totalSiswa"]
    },
    {
      name: SHEET_NAMES.SISWA,
      headers: ["nisn", "nama", "gender", "agama", "statusKeaktifan", "kelasId", "kontakOrangTua", "catatanKhusus"]
    },
    {
      name: SHEET_NAMES.JURNAL,
      headers: ["id", "tanggal", "kelasId", "jamKe", "materiPokok", "kehadiranHadir", "kehadiranIzin", "kehadiranSakit", "kehadiranAlpa", "catatanKejadian"]
    },
    {
      name: SHEET_NAMES.CATATAN_SAKU,
      headers: ["id", "tanggal", "siswaNisn", "siswaNama", "kelasId", "kategoriSikap", "jenisSikap", "deskripsiKejadian", "tindakLanjut"]
    },
    {
      name: SHEET_NAMES.PENILAIAN,
      headers: ["id", "siswaNisn", "siswaNama", "kelasId", "materiId", "tpCode", "jenisAsesmen", "nilai", "keterangan"]
    },
    {
      name: SHEET_NAMES.PRESENSI,
      headers: ["id", "tanggal", "kelasId", "siswaNisn", "status", "keterangan"]
    }
  ];

  schemas.forEach(function(schema) {
    var sheet = ss.getSheetByName(schema.name);
    if (!sheet) {
      sheet = ss.insertSheet(schema.name);
    }
    // Set Header jika sheet baru atau kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(schema.headers);
      var headerRange = sheet.getRange(1, 1, 1, schema.headers.length);
      headerRange.setBackground("#0f766e").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
  });

  return { message: "Database dan semua struktur sheet berhasil diinisialisasi!" };
}

// ===================== FUNGSI PEMBANTU (HELPERS) =====================

/**
 * Mengambil semua data dari seluruh tabel sheet
 */
function getAllDatabaseData() {
  var data = {};
  for (var key in SHEET_NAMES) {
    var sheetName = SHEET_NAMES[key];
    data[key.toLowerCase()] = getSheetDataAsJson(sheetName);
  }
  return data;
}

/**
 * Membaca data satu Sheet dan mengubahnya menjadi Array of Objects JSON
 */
function getSheetDataAsJson(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow <= 1 || lastCol === 0) return [];

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  var result = [];
  for (var i = 0; i < rows.length; i++) {
    var rowObj = {};
    for (var j = 0; j < headers.length; j++) {
      var headerKey = headers[j];
      var cellVal = rows[i][j];
      if (cellVal instanceof Date) {
        cellVal = Utilities.formatDate(cellVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
      }
      rowObj[headerKey] = cellVal;
    }
    result.push(rowObj);
  }
  return result;
}

/**
 * Menyimpan data single-row (seperti konfigurasi Sekolah atau Guru)
 */
function saveSingleRowObject(sheetName, obj) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    setupDatabase();
    sheet = ss.getSheetByName(sheetName);
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowValues = [];
  obj.terakhirDiperbarui = new Date().toISOString();

  for (var i = 0; i < headers.length; i++) {
    var key = headers[i];
    rowValues.push(obj[key] !== undefined ? obj[key] : "");
  }

  // Tulis ke baris 2 (timpa)
  sheet.getRange(2, 1, 1, headers.length).setValues([rowValues]);
  return { updated: true, sheet: sheetName };
}

/**
 * Mengganti atau memperbarui daftar data di sheet (Array of Objects)
 */
function replaceOrUpdateSheetData(sheetName, dataList, primaryKey) {
  if (!Array.isArray(dataList)) dataList = [dataList];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    setupDatabase();
    sheet = ss.getSheetByName(sheetName);
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Bersihkan data lama mulai baris 2
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }

  if (dataList.length === 0) return { count: 0 };

  var rowsToWrite = [];
  for (var i = 0; i < dataList.length; i++) {
    var item = dataList[i];
    var row = [];
    for (var j = 0; j < headers.length; j++) {
      var key = headers[j];
      var val = item[key] !== undefined ? item[key] : "";
      if (typeof val === "boolean") val = val ? "true" : "false";
      row.push(val);
    }
    rowsToWrite.push(row);
  }

  sheet.getRange(2, 1, rowsToWrite.length, headers.length).setValues(rowsToWrite);
  return { count: rowsToWrite.length, sheet: sheetName };
}

/**
 * Menambahkan atau mengupdate satu baris berdasarkan primaryKey
 */
function appendOrUpdateRow(sheetName, item, primaryKey) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    setupDatabase();
    sheet = ss.getSheetByName(sheetName);
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var primaryColIdx = headers.indexOf(primaryKey);

  var rowValues = [];
  for (var j = 0; j < headers.length; j++) {
    var key = headers[j];
    var val = item[key] !== undefined ? item[key] : "";
    if (typeof val === "boolean") val = val ? "true" : "false";
    rowValues.push(val);
  }

  // Cek apakah data sudah ada
  var lastRow = sheet.getLastRow();
  var foundRow = -1;

  if (primaryColIdx !== -1 && lastRow > 1) {
    var colData = sheet.getRange(2, primaryColIdx + 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < colData.length; i++) {
      if (String(colData[i][0]) === String(item[primaryKey])) {
        foundRow = i + 2;
        break;
      }
    }
  }

  if (foundRow > 0) {
    sheet.getRange(foundRow, 1, 1, headers.length).setValues([rowValues]);
    return { action: "updated", row: foundRow };
  } else {
    sheet.appendRow(rowValues);
    return { action: "appended", row: sheet.getLastRow() };
  }
}

/**
 * Sinkronisasi seluruh kumpulan data sekaligus
 */
function syncAllData(allData) {
  if (allData.sekolah) saveSingleRowObject(SHEET_NAMES.SEKOLAH, allData.sekolah);
  if (allData.guru) saveSingleRowObject(SHEET_NAMES.GURU, allData.guru);
  if (allData.kelas) replaceOrUpdateSheetData(SHEET_NAMES.KELAS, allData.kelas, "id");
  if (allData.siswa) replaceOrUpdateSheetData(SHEET_NAMES.SISWA, allData.siswa, "nisn");
  if (allData.jurnal) replaceOrUpdateSheetData(SHEET_NAMES.JURNAL, allData.jurnal, "id");
  if (allData.catatanSaku) replaceOrUpdateSheetData(SHEET_NAMES.CATATAN_SAKU, allData.catatanSaku, "id");
  return { status: "success", syncedAt: new Date().toISOString() };
}

/**
 * Format Response JSON dengan CORS Header agar dapat dipanggil dari Web/React
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper include HTML template (bila menggunakan split file di Apps Script)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
