# 🎓 ระบบข้อสอบวัดผลวิชา Data Science ทีละก้าว (Week 01 - 05)
### พร้อมระบบตรวจคะแนนอัตโนมัติและบันทึกลง Supabase Database

โครงการนี้สร้างขึ้นเพื่อใช้เป็นแบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนวิชา **Data Science ทีละก้าว (Python & Pandas)** โดยอิงเนื้อหา แบบฝึกหัด และโค้ดตัวอย่างจากโปรเจกต์ `data-sci` ตั้งแต่ **Week 01 ถึง Week 05**

---

## 📂 โครงสร้างไฟล์ในโปรเจกต์

```text
testing-sci/
├── EXAM_PAPER.md          # เอกสารข้อสอบฉบับเต็ม (30 ปรนัย + 5 อัตนัย) สำหรับพิมพ์หรือแจกผู้เรียน
├── EXAM_SOLUTIONS.md      # เฉลยละเอียด 30 ข้อ พร้อมเกณฑ์การให้คะแนน (Rubric) ข้อเขียน 5 ข้อ
├── questions.json         # ข้อมูลโจทย์ ตัวเลือก เฉลย คำอธิบาย ในรูปแบบ JSON
├── questions-data.js      # ข้อมูลโจทย์สำหรับรันบนเว็บเบราว์เซอร์ได้ทันที (Zero-CORS)
├── index.html             # เว็บแอปพลิเคชันทำข้อสอบแบบ Interactive (สวยงาม ใช้งานง่าย)
├── style.css              # สไตล์ UI ของระบบสอบ (Responsive รองรับทั้งคอมและมือถือ)
├── app.js                 # ระบบตรวจข้อสอบอัตโนมัติ ตัดเกรด และซิงก์คะแนนเข้า Supabase
├── config.js              # ไฟล์ตั้งค่าการเชื่อมต่อ Supabase
├── supabase_schema.sql    # SQL Script สำหรับสร้าง Table, Index, RLS, และ View ใน Supabase
├── submit_scores.py       # สคริปต์ Python สำหรับทดสอบและเชื่อมต่อ Supabase ผ่าน Terminal
└── README.md              # คู่มือการใช้งานระบบและการตั้งค่าอย่างละเอียด
```

---

## 🎯 โครงสร้างข้อสอบ (รวม 50 คะแนน)

### ส่วนที่ 1: ข้อสอบปรนัย 4 ตัวเลือก A B C D (30 ข้อ 30 คะแนน)
กระจายเนื้อหาอย่างสมดุลตามบทเรียน สัปดาห์ละ 6 ข้อ:
1. **Week 01 (ข้อ 1 - 6):** เริ่มต้นและรู้จักข้อมูล (CSV Plain text, `pd.read_csv()`, `df.head(3)`, `df.shape`, Relative Path และการแก้ `FileNotFoundError`)
2. **Week 02 (ข้อ 7 - 12):** Data Wrangling (การเลือกหลายคอลัมน์ `df[[]]`, Series vs DataFrame, `.rename(columns={...})`, `.copy()`, และการแก้ `KeyError` จาก Case-Sensitivity)
3. **Week 03 (ข้อ 13 - 18):** Cleaning Data (`NaN`, การนับค่าว่าง `isna().sum()`, การใช้ `fillna()` ร่วมกับ `df.assign()`, เหตุผลทางสถิติที่เลือก Median แทน 0 และ Mean)
4. **Week 04 (ข้อ 19 - 24):** Filter Data (Boolean Masking, การใช้ `&` แทน `and`, การใส่วงเล็บ `()`, การแก้ `ValueError: truth value ambiguous`, `.isin()`, `.query()`)
5. **Week 05 (ข้อ 25 - 30):** Analysis พื้นฐาน (`groupby()`, `.mean()`, การสรุปหลายสถิติด้วย `.agg(["count", "mean"])`, `.sort_values()`, Sample Size และการสรุปผลอย่างรับผิดชอบ)

### ส่วนที่ 2: ข้อสอบอัตนัย / ข้อเขียน (5 ข้อ 20 คะแนน)
- **ข้อเขียนที่ 1 (Week 01):** เขียนโค้ดโหลดไฟล์ CSV, แสดง shape, แสดง 3 แถวแรก และอธิบายวิธีตรวจแก้ `FileNotFoundError` (4 คะแนน)
- **ข้อเขียนที่ 2 (Week 02):** เขียนโค้ดคัดเลือก 3 คอลัมน์, เปลี่ยนชื่อคอลัมน์ โดยไม่กระทบ `df` เดิม พร้อมอธิบายความสำคัญของ `.copy()` และ Case-Sensitivity (4 คะแนน)
- **ข้อเขียนที่ 3 (Week 03):** เขียนโค้ดตรวจนับค่าว่าง, คำนวณ Median และสร้าง `clean_df` พร้อมอธิบายเปรียบเทียบระหว่าง 0, Mean และ Median ทางสถิติ (4 คะแนน)
- **ข้อเขียนที่ 4 (Week 04):** วิเคราะห์โค้ดบั๊กที่เกิดจาก `and`, แก้ไขด้วย Boolean Masking (`&` และวงเล็บ) และเขียนอีกทางเลือกด้วย `.query()` (4 คะแนน)
- **ข้อเขียนที่ 5 (Week 05):** เขียนโค้ด Groupby ตามสัญชาติเพื่อหา count และ mean ของ pace เรียงจากมากไปน้อย และเขียนประโยคสรุปผลอย่างรับผิดชอบที่มีครบ 3 องค์ประกอบ (4 คะแนน)

---

## 🚀 วิธีการเปิดใช้งานระบบสอบ (Interactive Web App)

### วิธีที่ 1: รันผ่าน Python Server (แนะนำสูงสุด - บันทึกคะแนนลง Supabase ทันที)
เปิด Terminal ในโฟลเดอร์นี้ แล้วรันคำสั่ง:
```bash
python3 server.py
```
จากนั้นเปิดเบราว์เซอร์ไปที่: **`http://localhost:8000`**
- ระบบจะเชื่อมต่อกับ Supabase PostgreSQL (`db.hxdrtfqxdsmqspdninqd.supabase.co`) โดยอัตโนมัติ
- เมื่อนักเรียนกดส่งข้อสอบ คะแนนจะถูกบันทึกลงตาราง `exam_submissions` ใน Supabase ทันทีโดยไม่ต้องตั้งค่าใดๆ เพิ่มเติม!

### วิธีที่ 2: เปิดไฟล์ตรงๆ ใน Browser
- ดับเบิ้ลคลิกไฟล์ [index.html](file:///Users/jj/Desktop/teaching/python/testing-sci/index.html) เพื่อเปิดทำข้อสอบ
- ระบบจะตรวจคะแนนอัตโนมัติและบันทึกคะแนนสำรองไว้ใน Local Storage ของเครื่อง

---

## 🗄️ การเชื่อมต่อกับ Supabase Database

ตารางและ View ใน Supabase ได้ถูก Migrate และติดตั้งโครงสร้างเรียบร้อยแล้ว:
- **Connection URI:** `postgresql://postgres:***@db.hxdrtfqxdsmqspdninqd.supabase.co:5432/postgres`
- **Table:** `public.exam_submissions`
- **View:** `public.v_exam_overview` (สรุปผลสถิติและคะแนนภาพรวม)

### การจัดการและตรวจสอบข้อมูลผ่าน Command Line (CLI)
คุณครูสามารถใช้สคริปต์ [submit_scores.py](file:///Users/jj/Desktop/teaching/python/testing-sci/submit_scores.py) เพื่อจัดการคะแนนใน Supabase ได้โดยตรง:
```bash
# 1. ทดสอบการเชื่อมต่อกับ Supabase
python3 submit_scores.py --test-connection

# 2. ดูรายชื่อนักเรียนและคะแนนทั้งหมดที่ส่งเข้ามา
python3 submit_scores.py --list-submissions

# 3. ดูแดชบอร์ดสรุปสถิติภาพรวม (คะแนนเฉลี่ย, สูงสุด, อัตราการผ่าน)
python3 submit_scores.py --overview

# 4. ส่งออกผลคะแนนทั้งหมดเป็นไฟล์ CSV
python3 submit_scores.py --export-csv scores.csv
```

---

## 📄 เอกสารอ้างอิง
- ข้อสอบฉบับเต็ม: [EXAM_PAPER.md](file:///Users/jj/Desktop/teaching/python/testing-sci/EXAM_PAPER.md)
- เฉลยและเกณฑ์ตรวจ: [EXAM_SOLUTIONS.md](file:///Users/jj/Desktop/teaching/python/testing-sci/EXAM_SOLUTIONS.md)
- โครงสร้าง Database: [supabase_schema.sql](file:///Users/jj/Desktop/teaching/python/testing-sci/supabase_schema.sql)
- เว็บข้อสอบ: [index.html](file:///Users/jj/Desktop/teaching/python/testing-sci/index.html)
