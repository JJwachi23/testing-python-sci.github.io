// ==============================================================================
// การตั้งค่าเชื่อมต่อ Supabase สำหรับระบบสอบ Data Science (Week 01 - 05)
// ==============================================================================

const SUPABASE_CONFIG = {
  // Project URL ของ Supabase (ตั้งค่าให้เชื่อมกับโปรเจกต์ของคุณเรียบร้อยแล้ว)
  url: "https://hxdrtfqxdsmqspdninqd.supabase.co",

  // ⚠️ สำหรับใช้งานบน GitHub Pages:
  // นำค่า "anon public key" จาก Supabase Dashboard (Settings -> API) มาวางในเครื่องหมายคำพูดด้านล่างนี้
  // เช่น: anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  // (หรือกดปุ่ม "⚙️ ตั้งค่า Supabase" ในหน้าเว็บก็ได้เช่นกัน)
  anonKey: window.localStorage.getItem("supabase_anon_key") || "",

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
