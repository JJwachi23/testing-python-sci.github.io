#!/usr/bin/env python3
"""
Python Script สำหรับทดสอบและเชื่อมต่อ Supabase Database
วิชา Data Science ทีละก้าว (Week 01 - 05)

การใช้งาน:
    python3 submit_scores.py --test-connection
    python3 submit_scores.py --mock-submit
    python3 submit_scores.py --list-submissions
    python3 submit_scores.py --overview
    python3 submit_scores.py --export-csv scores.csv
"""

import os
import sys
import json
import argparse
import psycopg2

DEFAULT_DB_URL = "postgresql://postgres:JJwachimoolang23@db.hxdrtfqxdsmqspdninqd.supabase.co:5432/postgres"
DATABASE_URL = os.environ.get("DATABASE_URL", DEFAULT_DB_URL)

def get_connection():
    return psycopg2.connect(DATABASE_URL, connect_timeout=10)

def test_connection():
    print(f"🔄 กำลังทดสอบเชื่อมต่อ Supabase PostgreSQL...")
    print(f"   Target: db.hxdrtfqxdsmqspdninqd.supabase.co:5432")
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT version();")
                v = cur.fetchone()[0]
                cur.execute("SELECT count(*) FROM public.exam_submissions;")
                count = cur.fetchone()[0]
                cur.execute("SELECT * FROM public.v_exam_overview;")
                overview = cur.fetchone()
        print("✅ เชื่อมต่อ Supabase สำเร็จสมบูรณ์!")
        print(f"   PostgreSQL Version : {v.split(',')[0]}")
        print(f"   Table              : public.exam_submissions (พบ {count} แถว)")
        if overview and overview[0] > 0:
            print(f"   ผู้สอบทั้งหมด     : {overview[0]} คน | คะแนนเฉลี่ย: {overview[1]}/30 ({overview[4]}%)")
        return True
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return False

def submit_score(student_name, score_mc, week_scores, answers_mc, answers_written, student_id=None):
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO public.exam_submissions (
                        student_name, student_id, score_mc, total_mc,
                        week_scores, answers_mc, answers_written, status
                    ) VALUES (%s, %s, %s, %s, %s::jsonb, %s::jsonb, %s::jsonb, %s)
                    RETURNING id, created_at, percentage;
                """, (
                    student_name,
                    student_id or None,
                    score_mc,
                    30,
                    json.dumps(week_scores),
                    json.dumps(answers_mc),
                    json.dumps(answers_written),
                    "submitted"
                ))
                res = cur.fetchone()
            conn.commit()

        print(f"✅ บันทึกคะแนนของ '{student_name}' ลง Supabase สำเร็จ!")
        print(f"   Submission ID : {res[0]}")
        print(f"   คะแนนปรนัย    : {score_mc}/30 ({res[2]}%)")
        print(f"   วันที่บันทึก    : {res[1]}")
        return res[0]
    except Exception as e:
        print(f"❌ Error submitting score: {e}")
        return None

def list_submissions():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT id, student_name, score_mc, total_mc, percentage, created_at, status
                    FROM public.exam_submissions
                    ORDER BY created_at DESC;
                """)
                rows = cur.fetchall()

        if not rows:
            print("\n📋 ยังไม่มีประวัติการส่งข้อสอบใน Database")
            return

        print(f"\n📋 รายการส่งข้อสอบใน Supabase ทั้งหมด ({len(rows)} รายการ):")
        print("=" * 80)
        print(f"{'ลำดับ':<5} | {'ชื่อ-นามสกุล':<26} | {'คะแนน':<14} | {'สถานะ':<10} | {'วันที่ส่ง'}")
        print("-" * 80)
        for idx, r in enumerate(rows, 1):
            sub_id, name, score, total, pct, dt, status = r
            name_str = name[:24]
            score_str = f"{score}/{total} ({pct}%)"
            dt_str = dt.strftime("%Y-%m-%d %H:%M:%S") if dt else "-"
            print(f"{idx:<5} | {name_str:<26} | {score_str:<14} | {status:<10} | {dt_str}")
        print("=" * 80)
    except Exception as e:
        print(f"❌ Error fetching submissions: {e}")

def show_overview():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM public.v_exam_overview;")
                row = cur.fetchone()
                cols = [desc[0] for desc in cur.description]
                data = dict(zip(cols, row)) if row else {}

        print("\n📊 แดชบอร์ดสรุปภาพรวมผลการสอบ (v_exam_overview):")
        print("=" * 50)
        print(f"  จำนวนผู้เข้าสอบทั้งหมด : {data.get('total_students', 0)} คน")
        print(f"  คะแนนเฉลี่ย           : {data.get('avg_mc_score', 0)} / 30")
        print(f"  คะแนนสูงสุด           : {data.get('max_mc_score', 0)} / 30")
        print(f"  คะแนนต่ำสุด           : {data.get('min_mc_score', 0)} / 30")
        print(f"  คิดเป็นร้อยละเฉลี่ย     : {data.get('avg_percentage', 0)}%")
        print(f"  ผู้สอบผ่าน (>=60%)    : {data.get('passed_students', 0)} คน")
        print(f"  ผู้สอบไม่ผ่าน (<60%)   : {data.get('failed_students', 0)} คน")
        print("=" * 50)
    except Exception as e:
        print(f"❌ Error fetching overview: {e}")

def export_csv(filename):
    import csv
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    SELECT id, created_at, student_name, score_mc, total_mc, percentage, status
                    FROM public.exam_submissions
                    ORDER BY created_at DESC;
                """)
                rows = cur.fetchall()
                cols = [desc[0] for desc in cur.description]

        with open(filename, "w", newline="", encoding="utf-8-sig") as f:
            writer = csv.writer(f)
            writer.writerow(cols)
            writer.writerows(rows)

        print(f"✅ ส่งออกข้อมูลคะแนน {len(rows)} แถว ไปยังไฟล์ '{filename}' เรียบร้อยแล้ว")
    except Exception as e:
        print(f"❌ Error exporting CSV: {e}")

def main():
    parser = argparse.ArgumentParser(description="Supabase Scoring Utility for Data Science Exam")
    parser.add_argument("--test-connection", action="store_true", help="ทดสอบการเชื่อมต่อกับ Supabase")
    parser.add_argument("--mock-submit", action="store_true", help="ส่งข้อมูลจำลอง 1 รายการเพื่อทดสอบ")
    parser.add_argument("--list-submissions", action="store_true", help="ดูรายการส่งข้อสอบทั้งหมด")
    parser.add_argument("--overview", action="store_true", help="ดูสรุปสถิติภาพรวมจาก View")
    parser.add_argument("--export-csv", type=str, metavar="FILENAME", help="ส่งออกข้อมูลคะแนนเป็นไฟล์ CSV")

    args = parser.parse_args()

    if args.test_connection:
        test_connection()
    elif args.mock_submit:
        mock_weeks = {"week1": 6, "week2": 5, "week3": 6, "week4": 5, "week5": 6}
        mock_answers = {str(i): "B" for i in range(1, 31)}
        mock_written = {
            "1": "import pandas as pd\ndf = pd.read_csv('../data/footballers.csv')\ndf.head(3)\nprint(df.shape)",
            "2": "summary = df[['name', 'club', 'overall']].copy()\nsummary.rename(columns={'overall': 'rating'})",
            "3": "clean_df = df.assign(age=df['age'].fillna(df['age'].median()))",
            "4": "result = df[(df['position'].isin(['ST', 'RW'])) & (df['physical'] >= 75)]",
            "5": "df.groupby('nationality')['pace'].agg(['count', 'mean']).sort_values('mean', ascending=False)"
        }
        submit_score("สมชาย ทดสอบระบบ", 28, mock_weeks, mock_answers, mock_written)
    elif args.list_submissions:
        list_submissions()
    elif args.overview:
        show_overview()
    elif args.export_csv:
        export_csv(args.export_csv)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
