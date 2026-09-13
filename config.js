// ==============================================================================
// การตั้งค่าเชื่อมต่อ Supabase สำหรับระบบสอบ Data Science (Week 01 - 05)
// ==============================================================================

const SUPABASE_CONFIG = {
  // Project URL ของ Supabase
  url: "https://hxdrtfqxdsmqspdninqd.supabase.co",

  // Supabase API Key สำหรับใช้งานบน GitHub Pages / Static Web
  anonKey: "sb_secret_AaOWZgIY3R4TeFoBxV8HJQ_ksT-U9Nv",

  // Host ของ Supabase PostgreSQL Database (เมื่อรันผ่าน server.py ในเครื่อง)
  dbHost: "db.hxdrtfqxdsmqspdninqd.supabase.co",

  // ชื่อตารางใน Database
  tableName: "exam_submissions"
};

// ฟังก์ชันบันทึกการตั้งค่าลงใน LocalStorage
function saveSupabaseConfig(url, anonKey) {
  if (url) {
    url = url.trim().replace(/\/$/, "");
    window.localStorage.setItem("supabase_url", url);
    SUPABASE_CONFIG.url = url;
  }
  if (anonKey) {
    anonKey = anonKey.trim();
    window.localStorage.setItem("supabase_anon_key", anonKey);
    SUPABASE_CONFIG.anonKey = anonKey;
  }
}
