#!/usr/bin/env python3
"""
Server สำหรับระบบสอบวัดผลวิชา Data Science (Week 01 - 05)
เชื่อมต่อตรงกับ Supabase PostgreSQL Database (db.hxdrtfqxdsmqspdninqd.supabase.co)

การใช้งาน:
    python3 server.py
    หรือกำหนด PORT: PORT=8080 python3 server.py
"""

import os
import sys
import json
import decimal
import datetime
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import psycopg2
from psycopg2 import pool

# Database Configuration
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres:JJwachimoolang23@db.hxdrtfqxdsmqspdninqd.supabase.co:5432/postgres"
)
PORT = int(os.environ.get("PORT", 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_db_connection():
    """สร้าง Connection ตรงไปยัง Supabase PostgreSQL"""
    return psycopg2.connect(DATABASE_URL, connect_timeout=10)

class DecimalJsonEncoder(json.JSONEncoder):
    """แปลงประเภทข้อมูล Decimal และ Datetime เป็น JSON ที่อ่านได้"""
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return obj.isoformat()
        return super().default(obj)

class ExamHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def _set_headers(self, status_code=200, content_type="application/json"):
        self.send_response(status_code)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(204)

    def do_GET(self):
        # 1. API: ตรวจสอบสถานะการเชื่อมต่อ Database
        if self.path.startswith("/api/status"):
            try:
                with get_db_connection() as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT count(*) FROM public.exam_submissions;")
                        count = cur.fetchone()[0]
                self._set_headers(200)
                res = {
                    "status": "connected",
                    "database": "Supabase PostgreSQL Live",
                    "host": "db.hxdrtfqxdsmqspdninqd.supabase.co",
                    "submissions_count": count
                }
                self.wfile.write(json.dumps(res).encode("utf-8"))
            except Exception as e:
                self._set_headers(500)
                res = {"status": "error", "error": str(e)}
                self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        # 2. API: ดึงรายการข้อสอบทั้งหมดสำหรับอาจารย์
        if self.path.startswith("/api/submissions"):
            try:
                with get_db_connection() as conn:
                    with conn.cursor() as cur:
                        cur.execute("""
                            SELECT 
                                id, student_name, student_id, score_mc, total_mc, percentage,
                                week_scores, answers_mc, answers_written, written_scores,
                                written_total_score, total_score, status, teacher_feedback, created_at
                            FROM public.exam_submissions
                            ORDER BY created_at DESC;
                        """)
                        rows = cur.fetchall()
                        cols = [desc[0] for desc in cur.description]
                        submissions = [dict(zip(cols, row)) for row in rows]

                self._set_headers(200)
                self.wfile.write(json.dumps(submissions, cls=DecimalJsonEncoder).encode("utf-8"))
            except Exception as e:
                self._set_headers(500)
                res = {"error": f"Database error: {str(e)}"}
                self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        # 3. API: ดึงภาพรวมสถิติคะแนน (Overview View)
        if self.path.startswith("/api/overview"):
            try:
                with get_db_connection() as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT * FROM public.v_exam_overview;")
                        row = cur.fetchone()
                        cols = [desc[0] for desc in cur.description]
                        overview = dict(zip(cols, row)) if row else {}

                self._set_headers(200)
                self.wfile.write(json.dumps(overview, cls=DecimalJsonEncoder).encode("utf-8"))
            except Exception as e:
                self._set_headers(500)
                res = {"error": f"Database error: {str(e)}"}
                self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        # คำขออื่นๆ ส่งให้ SimpleHTTPRequestHandler จัดการไฟล์ static (HTML, CSS, JS)
        super().do_GET()

    def do_POST(self):
        # API: บันทึกการส่งข้อสอบลง Supabase Database
        if self.path.startswith("/api/submit"):
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length)
                data = json.loads(body.decode("utf-8"))

                student_name = data.get("student_name", "").strip()
                if not student_name:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "student_name is required"}).encode("utf-8"))
                    return

                student_id = data.get("student_id", "").strip() or None
                score_mc = int(data.get("score_mc", 0))
                total_mc = int(data.get("total_mc", 30))
                week_scores = json.dumps(data.get("week_scores", {}))
                answers_mc = json.dumps(data.get("answers_mc", {}))
                answers_written = json.dumps(data.get("answers_written", {}))
                status = data.get("status", "submitted")

                with get_db_connection() as conn:
                    with conn.cursor() as cur:
                        cur.execute("""
                            INSERT INTO public.exam_submissions (
                                student_name, student_id, score_mc, total_mc,
                                week_scores, answers_mc, answers_written, status
                            ) VALUES (%s, %s, %s, %s, %s::jsonb, %s::jsonb, %s::jsonb, %s)
                            RETURNING id, created_at, percentage;
                        """, (
                            student_name, student_id, score_mc, total_mc,
                            week_scores, answers_mc, answers_written, status
                        ))
                        inserted = cur.fetchone()
                    conn.commit()

                res = {
                    "success": True,
                    "id": str(inserted[0]),
                    "created_at": inserted[1].isoformat(),
                    "percentage": float(inserted[2]),
                    "message": "บันทึกคะแนนลง Supabase สำเร็จสมบูรณ์"
                }
                self._set_headers(201)
                self.wfile.write(json.dumps(res).encode("utf-8"))
            except Exception as e:
                self._set_headers(500)
                res = {"success": False, "error": f"Database insert failed: {str(e)}"}
                self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

def test_startup_db():
    print(f"🔄 กำลังทดสอบเชื่อมต่อ Supabase PostgreSQL...")
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT count(*) FROM public.exam_submissions;")
                count = cur.fetchone()[0]
        print(f"✅ เชื่อมต่อ Supabase สำเร็จสมบูรณ์! (พบคะแนนที่บันทึกแล้ว {count} รายการ)")
        return True
    except Exception as e:
        print(f"❌ ไม่สามารถเชื่อมต่อ Supabase ได้: {e}")
        return False

def main():
    test_startup_db()
    server_address = ("", PORT)
    httpd = ThreadingHTTPServer(server_address, ExamHandler)
    print("=" * 68)
    print("🎓 ระบบสอบวัดผลวิชา Data Science ทีละก้าว (Week 01 - 05)")
    print("=" * 68)
    print(f"📡 Supabase Host : db.hxdrtfqxdsmqspdninqd.supabase.co:5432")
    print(f"🌐 Server URL    : http://localhost:{PORT}")
    print(f"👉 คลิกหรือเปิดเบราว์เซอร์ไปที่: http://localhost:{PORT}")
    print("=" * 68)
    print("กด Ctrl+C เพื่อหยุดการทำงานของ Server\n")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 หยุดการทำงาน Server เรียบร้อยแล้ว")
        httpd.server_close()

if __name__ == "__main__":
    main()
