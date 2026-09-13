// ข้อมูลชุดข้อสอบ Data Science ทีละก้าว (Week 01 - 05)
const EXAM_DATA = {
  "title": "แบบทดสอบวัดผลวิชา Data Science ทีละก้าว (Week 01 - 05)",
  "description": "ข้อสอบวัดทักษะการวิเคราะห์ข้อมูล การไล่โค้ด (Code Tracing) การแก้ Error และหลักสถิติด้วย Python & Pandas (ระดับประยุกต์และพลิกแพลงตามขอบเขตเนื้อหา Week 01 - 05)",
  "total_multiple_choice": 30,
  "total_written": 5,
  "passing_score": 18,
  "weeks": [
    {
      "id": 1,
      "title": "Week 01: เริ่มต้นและรู้จักข้อมูล (Getting Started with Data)",
      "range": "ข้อ 1 - 6"
    },
    {
      "id": 2,
      "title": "Week 02: Data Wrangling (การจัดและแปลงรูปข้อมูล)",
      "range": "ข้อ 7 - 12"
    },
    {
      "id": 3,
      "title": "Week 03: Cleaning Data (การจัดการข้อมูลสูญหาย)",
      "range": "ข้อ 13 - 18"
    },
    {
      "id": 4,
      "title": "Week 04: Filter Data (การกรองข้อมูลด้วยเงื่อนไข)",
      "range": "ข้อ 19 - 24"
    },
    {
      "id": 5,
      "title": "Week 05: Analysis พื้นฐาน (การวิเคราะห์สถิติและการสรุปผล)",
      "range": "ข้อ 25 - 30"
    }
  ],
  "multiple_choice": [
    {
      "id": 1,
      "week": 1,
      "question": "พิจารณาโค้ดต่อไปนี้ที่รันกับไฟล์ `footballers.csv` (ซึ่งมีข้อมูลจริงทั้งหมด 46 แถว และ 15 คอลัมน์):\n```python\nimport pandas as pd\ndf = pd.read_csv(\"../data/footballers.csv\")\nsample = df.head(3)\nprint(sample.shape)\n```\nผลลัพธ์ที่พิมพ์ออกมาทางหน้าจอคือข้อใด?",
      "options": {
        "A": "(46, 15)",
        "B": "(3, 15)",
        "C": "(15, 3)",
        "D": "(3, 3)"
      },
      "answer": "B",
      "explanation": "คำสั่ง `df.head(3)` จะตัดเฉพาะ 3 แถวแรกของข้อมูลออกมา แต่จำนวนคอลัมน์ยังคงเดิมครบทั้ง 15 คอลัมน์ ดังนั้น `sample.shape` จึงคืนค่า Tuple เป็น `(3, 15)`"
    },
    {
      "id": 2,
      "week": 1,
      "question": "กำหนดโครงสร้างไดเรกทอรีของโปรเจกต์ดังนี้:\n```text\ndata-sci/\n├── data/\n│   └── footballers.csv\n└── challenge/\n    └── challenge_1.ipynb\n```\nหากเปิดรันไฟล์ `challenge_1.ipynb` แล้วเขียนโค้ด:\n```python\nwith open(\"data/footballers.csv\") as f:\n    rows = list(csv.DictReader(f))\n```\nจะเกิดข้อผิดพลาดใดขึ้น และเป็นเพราะเหตุใด?",
      "options": {
        "A": "เกิด `KeyError: 'data'` เพราะโฟลเดอร์ data ไม่มีอยู่จริงในหน่วยความจำ",
        "B": "เกิด `FileNotFoundError` เพราะ Working Directory ของ Notebook ปัจจุบันอยู่ที่ `challenge/` การเข้าถึงไฟล์ใน `data/` ต้องใช้ `../data/footballers.csv` เพื่อถอยออกมา 1 ระดับ",
        "C": "เกิด `TypeError` เพราะ `csv.DictReader` ไม่สามารถใช้คำสั่ง `list()` ครอบได้",
        "D": "โค้ดทำงานได้ปกติโดยไม่มี Error ใดๆ"
      },
      "answer": "B",
      "explanation": "เนื่องจากตำแหน่งการทำงาน (Working Directory) อยู่ภายในโฟลเดอร์ `challenge/` การระบุ Relative Path ด้วย `\"data/footballers.csv\"` จะทำให้ Python ไปค้นหาที่ `challenge/data/footballers.csv` ซึ่งไม่มีอยู่จริง จึงเกิด `FileNotFoundError` ทางแก้คือต้องใช้ `\"../data/footballers.csv\"`"
    },
    {
      "id": 3,
      "week": 1,
      "question": "พิจารณาโค้ดการอ่านข้อมูลแถวแรกของนักเตะ Lionel Messi เปรียบเทียบระหว่าง 2 วิธี:\n```python\n# วิธีที่ 1: Pure Python\nwith open(\"../data/footballers.csv\") as f:\n    rows = list(csv.DictReader(f))\nfirst_val = rows[0][\"overall\"]\n\n# วิธีที่ 2: Pandas\ndf = pd.read_csv(\"../data/footballers.csv\")\ndf_val = df[\"overall\"][0]\n```\nข้อใดระบุชนิดข้อมูล (Data Type) ของ `first_val` และ `df_val` ได้อย่างถูกต้อง?",
      "options": {
        "A": "ทั้งคู่เป็น `int` เหมือนกันโดยอัตโนมัติ",
        "B": "`first_val` เป็น `str` (ข้อความ) ส่วน `df_val` ถูก Pandas แปลงเป็น `int64` (จำนวนเต็ม) ให้อัตโนมัติ",
        "C": "`first_val` เป็น `int` ส่วน `df_val` เป็น `str`",
        "D": "ทั้งคู่เป็น `float` เพราะในตารางมีข้อมูลสูญหายปะปนอยู่"
      },
      "answer": "B",
      "explanation": "`csv.DictReader` ของ Python จะอ่านทุกค่าในไฟล์ CSV เป็นข้อความ (`str`) ทั้งหมด (เช่น `'90'`) ในขณะที่ `pd.read_csv()` ของ Pandas จะมีระบบตรวจสอบชนิดข้อมูลของคอลัมน์อัตโนมัติ (Type Inference) และแปลงเป็นตัวเลขจำนวนเต็ม `int64` ให้ทันที"
    },
    {
      "id": 4,
      "week": 1,
      "question": "ผู้เรียนต้องการแสดงจำนวนแถวของตาราง `df` ออกมาทางหน้าจอ โดยไม่ต้องการแสดงจำนวนคอลัมน์ โค้ดในข้อใดทำงานได้ถูกต้องสมบูรณ์**โดยไม่เกิด Error**?",
      "options": {
        "A": "print(df.shape())",
        "B": "print(df.shape[0])",
        "C": "print(df.rows)",
        "D": "print(len(df.shape))"
      },
      "answer": "B",
      "explanation": "`df.shape` เป็น Property / Attribute ไม่ใช่ฟังก์ชัน จึงต้องไม่ใส่วงเล็บ `()` (หากใส่ `df.shape()` จะเกิด `TypeError: 'tuple' object is not callable`) และ `df.shape` คืนค่าเป็น Tuple `(แถว, คอลัมน์)` การเข้าถึงจำนวนแถวจึงต้องใช้ Index 0 คือ `df.shape[0]`"
    },
    {
      "id": 5,
      "week": 1,
      "question": "เมื่อรันโค้ดการอ่านไฟล์ด้วย Pure Python ดังนี้:\n```python\nimport csv\nwith open(\"../data/footballers.csv\") as f:\n    reader = csv.DictReader(f)\n    first_row = next(reader)\n    print(type(first_row))\n```\nผลลัพธ์ที่แสดงบนหน้าจอคือข้อใด?",
      "options": {
        "A": "<class 'list'>",
        "B": "<class 'dict'>",
        "C": "<class 'pandas.core.series.Series'>",
        "D": "<class 'tuple'>"
      },
      "answer": "B",
      "explanation": "`csv.DictReader` ทำหน้าที่อ่านข้อมูลแต่ละแถวโดยจับคู่ชื่อคอลัมน์กับค่าในแถวนั้นให้อยู่ในรูปของ Dictionary (`dict`) ซึ่งต่างจาก `csv.reader` ปกติที่จะคืนค่าเป็น `list`"
    },
    {
      "id": 6,
      "week": 1,
      "question": "พิจารณาโค้ดสร้าง DataFrame จาก Dictionary ในบทเรียน Week 01:\n```python\nimport pandas as pd\ndata = {\n    \"list\": [\"Food\", \"Travel\", \"Game\"],\n    \"price\": [100, 200, 300]\n}\nresult = pd.DataFrame(data)\nprint(result.shape)\n```\nค่าของ `result.shape` ที่แสดงผลคือข้อใด?",
      "options": {
        "A": "(2, 3)",
        "B": "(3, 2)",
        "C": "(6,)",
        "D": "(1, 2)"
      },
      "answer": "B",
      "explanation": "ตารางมี 3 รายการข้อมูล (Food, Travel, Game) จึงมี 3 แถว และมี 2 คอลัมน์ (list, price) ดังนั้นผลลัพธ์ของ `shape` ที่เป็น `(จำนวนแถว, จำนวนคอลัมน์)` จึงเป็น `(3, 2)`"
    },
    {
      "id": 7,
      "week": 2,
      "question": "พิจารณาตัวแปร 2 ตัวที่ถูกสร้างขึ้นจาก DataFrame `df` (ซึ่งมีขนาด 46 แถว 15 คอลัมน์):\n```python\ns1 = df[\"name\"]\ns2 = df[[\"name\"]]\n```\nข้อใดระบุชนิดข้อมูลของ `type(s1)` และมิติของ `s2.shape` ได้อย่างถูกต้อง?",
      "options": {
        "A": "type(s1) คือ Series และ s2.shape คือ (46, 1)",
        "B": "type(s1) คือ DataFrame และ s2.shape คือ (46,)",
        "C": "type(s1) คือ Series และ s2.shape คือ (46,)",
        "D": "type(s1) คือ DataFrame และ s2.shape คือ (1, 46)"
      },
      "answer": "A",
      "explanation": "การดึงด้วยก้ามปูชั้นเดียว `df[\"name\"]` จะได้ Series (ข้อมูล 1 มิติ) จึงไม่มีมิติคอลัมน์ ส่วนก้ามปูสองชั้น `df[[\"name\"]]` จะได้ DataFrame (ข้อมูล 2 มิติ) ที่มี 46 แถว และ 1 คอลัมน์ จึงมี shape เป็น `(46, 1)`"
    },
    {
      "id": 8,
      "week": 2,
      "question": "พิจารณาโค้ดการเปลี่ยนชื่อคอลัมน์ต่อไปนี้:\n```python\ndf = pd.read_csv(\"../data/footballers.csv\")\ndf.rename(columns={\"overall\": \"rating\"})\nprint(\"rating\" in df.columns)\nprint(\"overall\" in df.columns)\n```\nผลลัพธ์ที่พิมพ์ออกมาทั้ง 2 บรรทัดคือข้อใด?",
      "options": {
        "A": "True แล้วตามด้วย False",
        "B": "False แล้วตามด้วย True",
        "C": "เกิดข้อผิดพลาด KeyError: 'rating'",
        "D": "True แล้วตามด้วย True"
      },
      "answer": "B",
      "explanation": "เมธอด `.rename()` ใน Pandas โดยค่าเริ่มต้นจะส่งคืน DataFrame ตัวใหม่ที่เปลี่ยนชื่อแล้วออกมา โดยที่ DataFrame ตัวเดิม (`df`) จะ**ไม่ถูกเปลี่ยนแปลง**ในหน่วยความจำ เพราะไม่ได้กำหนดตัวแปรมารับค่า (เช่น `df = df.rename(...)`) ดังนั้นใน `df.columns` จึงยังคงมีคอลัมน์เดิมคือ `overall` และยังไม่มี `rating`"
    },
    {
      "id": 9,
      "week": 2,
      "question": "หากผู้เรียนเขียนโค้ดต่อไปนี้:\n```python\ncols = [\"name\", \"club\", \"Overall\"]\nsummary = df[cols].copy()\n```\nจากไฟล์ข้อมูลจริง `footballers.csv` จะเกิดผลลัพธ์อย่างไร?",
      "options": {
        "A": "โปรแกรมจะสร้างตารางที่มีคอลัมน์ Overall เป็นค่า NaN ทั้งหมด",
        "B": "เกิดข้อผิดพลาด KeyError เพราะชื่อคอลัมน์ในไฟล์จริงสะกดด้วยตัวพิมพ์เล็กทั้งหมดคือ 'overall' และ Pandas มีคุณสมบัติ Case-Sensitive",
        "C": "โปรแกรมจะแปลงชื่อเป็นตัวพิมพ์เล็กให้อัตโนมัติและทำงานผ่านปกติ",
        "D": "เกิด AttributeError: 'DataFrame' object has no attribute 'copy'"
      },
      "answer": "B",
      "explanation": "Python และ Pandas แยกแยะความแตกต่างระหว่างตัวพิมพ์เล็กและตัวพิมพ์ใหญ่ (Case-Sensitive) ในไฟล์ข้อมูลจริงชื่อคอลัมน์คือ `overall` เมื่อระบุ `Overall` จึงค้นหาไม่พบและเกิด `KeyError` ทันที"
    },
    {
      "id": 10,
      "week": 2,
      "question": "พิจารณาโค้ด Pure Python จากบทเรียน Week 02:\n```python\nsummary = []\nfor row in rows:\n    summary.append({\"name\": row[\"name\"], \"club\": row[\"club\"], \"rating\": row[\"overall\"]})\n```\nโค้ดของ Pandas ในข้อใดทำงานเทียบเท่ากับโค้ดด้านบนได้อย่างสมบูรณ์ โดยไม่แก้ไข `df` ต้นฉบับ?",
      "options": {
        "A": "summary = df[[\"name\", \"club\", \"overall\"]].rename(columns={\"overall\": \"rating\"})",
        "B": "summary = df[\"name\", \"club\", \"overall\"].rename(columns={\"overall\": \"rating\"})",
        "C": "summary = df.rename(columns={\"overall\": \"rating\"})[[\"name\", \"rating\"]]",
        "D": "summary = df[[\"name\", \"club\"]].assign(rating=df[\"overall\"]).drop(\"overall\")"
      },
      "answer": "A",
      "explanation": "ตัวเลือก A ถูกต้องสมบูรณ์: เริ่มจากเลือก 3 คอลัมน์ที่ต้องการด้วยก้ามปูสองชั้น `df[[\"name\", \"club\", \"overall\"]]` แล้วต่อด้วย `.rename(columns={\"overall\": \"rating\"})` เพื่อเปลี่ยนชื่อคอลัมน์"
    },
    {
      "id": 11,
      "week": 2,
      "question": "พิจารณาโค้ดต่อไปนี้:\n```python\ncols = [\"name\", \"club\", \"overall\"]\nsummary = df[cols].copy()\nsummary = summary.rename(columns={\"overall\": \"rating\"})\n```\nข้อใดอธิบายสถานะของ DataFrame `df` และ `summary` ได้อย่างถูกต้องที่สุด?",
      "options": {
        "A": "คอลัมน์ overall ใน df ถูกเปลี่ยนชื่อเป็น rating ไปด้วย",
        "B": "df ต้นฉบับยังคงมีคอลัมน์ overall เหมือนเดิม และไม่มีคอลัมน์ rating เพราะการใช้ .copy() ทำให้ summary มีพื้นที่หน่วยความจำแยกเป็นอิสระ",
        "C": "summary เป็นเพียง View ที่ชี้ไปยังตำแหน่งหน่วยความจำเดียวกับ df",
        "D": "ไฟล์ footballers.csv ในเครื่องจะถูกบันทึกคอลัมน์ใหม่โดยอัตโนมัติ"
      },
      "answer": "B",
      "explanation": "การใช้ `.copy()` ช่วยสร้าง DataFrame ตัวใหม่ที่เป็น Deep Copy แยกขาดจาก `df` เดิม การเปลี่ยนแปลงคอลัมน์หรือข้อมูลใน `summary` จึงไม่ส่งผลกระทบใดๆ ต่อ `df` และช่วยป้องกันคำเตือน SettingWithCopyWarning"
    },
    {
      "id": 12,
      "week": 2,
      "question": "พิจารณาคำสั่งตรวจสอบคอลัมน์ 2 บรรทัดนี้:\n```python\ncols_a = df.columns\ncols_b = df.columns.tolist()\n```\nข้อใดระบุชนิดข้อมูล (type) ของ `cols_a` และ `cols_b` ได้ถูกต้อง?",
      "options": {
        "A": "cols_a เป็น Index และ cols_b เป็น list",
        "B": "ทั้งคู่เป็น list",
        "C": "cols_a เป็น list และ cols_b เป็น tuple",
        "D": "ทั้งคู่เป็น Series"
      },
      "answer": "A",
      "explanation": "`df.columns` คืออ็อบเจกต์ Index (`pandas.core.indexes.base.Index`) ส่วนเมธอด `.tolist()` จะแปลงอ็อบเจกต์ Index นั้นให้กลายเป็น `list` มาตรฐานของภาษา Python"
    },
    {
      "id": 13,
      "week": 3,
      "question": "ในไฟล์ `footballers.csv` แถวของ Casemiro ไม่มีข้อมูลส่วนสูง (`height_cm`) และแถวของ Marquinhos ไม่มีข้อมูลอายุ (`age`)\nเมื่อรันโค้ดต่อไปนี้:\n```python\nmissing_age = df[\"age\"].isna().sum()\nmissing_height = df[\"height_cm\"].isna().sum()\nprint(missing_age, missing_height)\n```\nผลลัพธ์ที่พิมพ์ออกมาคือข้อใด?",
      "options": {
        "A": "0 0",
        "B": "1 1",
        "C": "46 46",
        "D": "True True"
      },
      "answer": "B",
      "explanation": "ในชุดข้อมูลจริงมีค่าว่างในคอลัมน์ `age` 1 จุด (Marquinhos) และในคอลัมน์ `height_cm` 1 จุด (Casemiro) เมื่อใช้ `.isna().sum()` จึงได้ผลลัพธ์เป็น `1 1`"
    },
    {
      "id": 14,
      "week": 3,
      "question": "สมมติมีข้อมูลอายุของนักเตะ 5 คน: `[20, 22, 24, 26, None]`\n- หากแทนค่าว่าง `None` ด้วยเลข `0` ค่าเฉลี่ยของทั้ง 5 คนจะเป็น `A`\n- หากแทนค่าว่าง `None` ด้วยค่ามัธยฐาน (Median) ของ 4 คนแรก (คือ `23.0`) ค่าเฉลี่ยของทั้ง 5 คนจะเป็น `B`\nค่าของ `A` และ `B` คือเท่าใดตามลำดับ?",
      "options": {
        "A": "A = 18.4 และ B = 23.0",
        "B": "A = 23.0 และ B = 18.4",
        "C": "A = 20.0 และ B = 24.0",
        "D": "A = 0.0 และ B = 23.0"
      },
      "answer": "A",
      "explanation": "กรณีแทนด้วย 0: (20 + 22 + 24 + 26 + 0) / 5 = 92 / 5 = 18.4 ปี\nกรณีแทนด้วย Median (23.0): (20 + 22 + 24 + 26 + 23) / 5 = 115 / 5 = 23.0 ปี\nนี่คือตัวอย่างชัดเจนว่าการแทนด้วย 0 จะดึงให้ค่าเฉลี่ยตกฮวบลงอย่างบิดเบือนความเป็นจริง"
    },
    {
      "id": 15,
      "week": 3,
      "question": "พิจารณาโค้ด Pure Python จากบทเรียน Week 03 ที่พยายามคำนวณส่วนสูง:\n```python\nheights = []\nfor row in rows:\n    heights.append(float(row[\"height_cm\"]))\n```\nเมื่อโปรแกรมวนลูปไปถึงแถวของ `Casemiro` ซึ่งช่อง `row[\"height_cm\"]` เป็นสตริงว่าง (`\"\"`) จะเกิดข้อผิดพลาดใด?",
      "options": {
        "A": "TypeError: could not convert NoneType to float",
        "B": "ValueError: could not convert string to float: ''",
        "C": "KeyError: 'height_cm'",
        "D": "ZeroDivisionError: division by zero"
      },
      "answer": "B",
      "explanation": "ในภาษา Python การเรียกฟังก์ชัน `float(\"\")` กับสตริงว่างเปล่า จะเกิดข้อผิดพลาด `ValueError: could not convert string to float: ''` เพราะไม่สามารถแปลงข้อความว่างเป็นตัวเลขได้"
    },
    {
      "id": 16,
      "week": 3,
      "question": "สมมติมี Series ข้อมูลตัวเลขดังนี้:\n```python\ns = pd.Series([10, 20, np.nan, 40, 50])\nprint(s.median())\n```\nผลลัพธ์ที่พิมพ์ออกมาคือเท่าใด?",
      "options": {
        "A": "NaN",
        "B": "30.0",
        "C": "20.0",
        "D": "เกิด ValueError เพราะมี NaN ในข้อมูล"
      },
      "answer": "B",
      "explanation": "ฟังก์ชันทางสถิติใน Pandas (รวมถึง `.median()`) จะทำการข้าม (ignore/skip) ค่า `NaN` ออกไปโดยอัตโนมัติ ข้อมูลที่เหลือจึงเป็น `[10, 20, 40, 50]` ค่ากึ่งกลางคือตำแหน่งระหว่าง 20 และ 40 ดังนั้นมัธยฐานคือ `(20 + 40) / 2 = 30.0`"
    },
    {
      "id": 17,
      "week": 3,
      "question": "พิจารณาโค้ดการจัดการข้อมูลสูญหายต่อไปนี้:\n```python\nmed = df[\"age\"].median()\nclean_df = df.assign(age=df[\"age\"].fillna(med))\nprint(df[\"age\"].isna().sum())\nprint(clean_df[\"age\"].isna().sum())\n```\nผลลัพธ์ที่พิมพ์ออกมา 2 บรรทัดคือข้อใด?",
      "options": {
        "A": "0 แล้วตามด้วย 0",
        "B": "1 แล้วตามด้วย 0",
        "C": "0 แล้วตามด้วย 1",
        "D": "1 แล้วตามด้วย 1"
      },
      "answer": "B",
      "explanation": "เมธอด `df.assign(...)` จะสร้าง DataFrame ตัวใหม่ (`clean_df`) โดยที่ `df` เดิมยังคงสภาพเดิมไม่เปลี่ยนแปลง ดังนั้น `df` เดิมจึงยังมีค่าว่าง 1 จุด ส่วน `clean_df` ค่าว่างถูกแทนที่ด้วย median แล้ว จึงเหลือค่าว่าง 0 จุด"
    },
    {
      "id": 18,
      "week": 3,
      "question": "ในบทเรียน Week 03 การหาค่ามัธยฐานด้วย Pure Python ใช้โค้ดดังนี้:\n```python\nmiddle = sorted(heights)[len(heights) // 2]\n```\nเหตุใดจึงจำเป็นต้องเรียกใช้ฟังก์ชัน `sorted()` ก่อนหยิบตำแหน่งกึ่งกลาง?",
      "options": {
        "A": "เพราะถ้าไม่ใช้ sorted() ข้อมูลจะไม่ถูกแปลงเป็นตัวเลข",
        "B": "เพราะนิยามของมัธยฐานคือค่ากึ่งกลางของข้อมูลที่เรียงลำดับจากน้อยไปมากแล้ว หากไม่เรียงลำดับ ค่าที่หยิบมาจะเป็นเพียงข้อมูลแถวกลางๆ ที่ไม่ได้บอกตำแหน่งมัธยฐานจริง",
        "C": "เพราะตัวดำเนินการ // ของ Python บังคับให้ใช้กับ list ที่เรียงลำดับแล้วเท่านั้น",
        "D": "เพื่อลบค่าข้อมูลที่ซ้ำกันออกไปก่อนคำนวณ"
      },
      "answer": "B",
      "explanation": "มัธยฐาน (Median) คือค่าที่อยู่ตรงกลางเมื่อนำข้อมูลทั้งหมดมาจัดเรียงตามลำดับขนาด (Ranked data) หากไม่ใช้ `sorted()` ก่อน ข้อมูลจะยังคงเรียงตามลำดับเดิมในไฟล์ ซึ่งไม่ใช่ค่ามัธยฐานทางสถิติ"
    },
    {
      "id": 19,
      "week": 4,
      "question": "หากผู้เรียนเขียนโค้ดกรองข้อมูลโดย**ไม่ใส่วงเล็บ**ดังนี้:\n```python\nresult = df[df[\"age\"] <= 25 & df[\"overall\"] >= 85]\n```\nข้อใดอธิบายสิ่งที่ภาษา Python พยายามประมวลผลเป็นลำดับแรกได้อย่างถูกต้องตามกฎ Operator Precedence?",
      "options": {
        "A": "Python ประมวลผล df[\"age\"] <= 25 ก่อน",
        "B": "Python ประมวลผล 25 & df[\"overall\"] ก่อน เพราะตัวดำเนินการ Bitwise AND (&) มีลำดับความสำคัญสูงกว่าตัวดำเนินการเปรียบเทียบ (<=, >=) จึงทำให้การทำงานผิดพลาดทันที",
        "C": "Python รันผ่านได้ตามปกติโดยไม่ต้องมีวงเล็บ",
        "D": "Python จะกรองเฉพาะแถวที่มีอายุ 25 ปีเท่านั้น"
      },
      "answer": "B",
      "explanation": "ในภาษา Python เครื่องหมาย Bitwise `&` มีลำดับความสำคัญ (Operator Precedence) สูงกว่าเครื่องหมายเปรียบเทียบ เช่น `<=` และ `>=` หากไม่ใส่วงเล็บ Python จะนำตัวเลข `25` ไปทำ Bitwise AND กับ Series `df[\"overall\"]` ก่อน ซึ่งผิดเจตนาและจะทำให้เกิด Error ทันที จึงต้องใส่วงเล็บ `(...) & (...)` เสมอ"
    },
    {
      "id": 20,
      "week": 4,
      "question": "เมื่อผู้เรียนเขียนเงื่อนไขกรองข้อมูลดังนี้:\n```python\ncond = (df[\"age\"] <= 25) and (df[\"overall\"] >= 85)\n```\nจะเกิดข้อผิดพลาดใดขึ้น?",
      "options": {
        "A": "TypeError: unsupported operand type for and",
        "B": "ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().",
        "C": "KeyError: 'and'",
        "D": "SyntaxError: invalid syntax"
      },
      "answer": "B",
      "explanation": "Keyword `and` ในภาษา Python ออกแบบมาเพื่อประเมินค่าความจริงเดี่ยว (Scalar Boolean) แต่เงื่อนไขในวงเล็บคืนค่าเป็น Series ที่มีค่า True/False หลายแถว ทำให้ Python ไม่สามารถตัดสินความจริงได้ จึงโยน `ValueError: The truth value of a Series is ambiguous...` ออกมา ใน Pandas จึงต้องใช้เครื่องหมาย `&` แทน"
    },
    {
      "id": 21,
      "week": 4,
      "question": "พิจารณานักเตะ 3 คนจากตารางข้อมูล:\n- **Mbappe:** age = 26, overall = 91\n- **Haaland:** age = 24, overall = 91\n- **Pedri:** age = 22, overall = 82\nหากใช้คำสั่งกรองด้วยตัวดำเนินการ `|` (Bitwise OR) ดังนี้:\n```python\nfiltered = df[(df[\"age\"] <= 25) | (df[\"overall\"] >= 90)]\n```\nนักเตะคนใดบ้างจะ**ผ่านการคัดกรอง**เข้ามาอยู่ใน `filtered`?",
      "options": {
        "A": "Haaland คนเดียวเท่านั้น",
        "B": "ทั้ง Mbappe, Haaland, และ Pedri ผ่านทุกคน",
        "C": "Mbappe และ Haaland เท่านั้น",
        "D": "Haaland และ Pedri เท่านั้น"
      },
      "answer": "B",
      "explanation": "เครื่องหมาย `|` คือ OR ขอเพียงผ่านเงื่อนไขใดเงื่อนไขหนึ่งก็เป็นจริง:\n- Mbappe: overall = 91 (>= 90 เป็นจริง) -> ผ่าน\n- Pedri: age = 22 (<= 25 เป็นจริง) -> ผ่าน\n- Haaland: เข้าทั้งสองเงื่อนไข -> ผ่าน\nดังนั้นทั้ง 3 คนจึงผ่านการคัดกรองทั้งหมด"
    },
    {
      "id": 22,
      "week": 4,
      "question": "พิจารณาโค้ดต่อไปนี้:\n```python\ntargets = [\"Real Madrid\", \"Barcelona\"]\nmask = df[\"club\"].isin(targets)\n```\nตัวแปร `mask` ที่ได้ออกมาจะมีลักษณะโครงสร้างข้อมูลและค่าภายในเป็นอย่างไร?",
      "options": {
        "A": "เป็น List ของชื่อสโมสรที่ตรงกับเงื่อนไข",
        "B": "เป็น DataFrame ที่มีเฉพาะคอลัมน์ club",
        "C": "เป็น Series ของค่า Boolean (True/False) ที่มีความยาวเท่ากับจำนวนแถวทั้งหมดของ df",
        "D": "เป็นตัวเลขจำนวนเต็มบอกจำนวนนักเตะที่สังกัด 2 สโมสรนี้"
      },
      "answer": "C",
      "explanation": "เมธอด `.isin()` ของ Series จะส่งคืน Series ของค่าความจริง (`True` หากค่าในแถวนั้นอยู่ในรายการ และ `False` หากไม่อยู่) ซึ่งโครงสร้างนี้เรียกว่า Boolean Mask"
    },
    {
      "id": 23,
      "week": 4,
      "question": "ต้องการใช้คำสั่ง `.query()` เพื่อกรองหานักเตะที่ตำแหน่ง (`position`) เป็น `'ST'` หรือ `'RW'` และมีความแข็งแกร่ง (`physical`) ตั้งแต่ 75 ขึ้นไป โค้ดในข้อใดเขียนได้ถูกต้องสมบูรณ์?",
      "options": {
        "A": "df.query(\"position in ['ST', 'RW'] and physical >= 75\")",
        "B": "df.query(position == ['ST', 'RW'] & physical >= 75)",
        "C": "df.query(\"position == ['ST', 'RW'] && physical >= 75\")",
        "D": "df.query(\"position.isin(['ST', 'RW']) and physical >= 75\")"
      },
      "answer": "A",
      "explanation": "ในคำสั่ง `.query()` เงื่อนไขจะต้องเขียนเป็น String ข้อความ โดยสามารถใช้คำว่า `in` สำหรับตรวจสอบการเป็นสมาชิกใน List และใช้คำว่า `and` เพื่อเชื่อมเงื่อนไขได้โดยตรงโดยไม่ต้องใช้ `&` หรือใส่วงเล็บซับซ้อน"
    },
    {
      "id": 24,
      "week": 4,
      "question": "พิจารณาโค้ดต่อไปนี้:\n```python\nsub = df.query(\"age <= 21\")[[\"name\", \"club\", \"overall\"]]\nprint(sub.shape[1])\n```\nผลลัพธ์ที่พิมพ์ออกมาคือข้อใด?",
      "options": {
        "A": "15",
        "B": "3",
        "C": "4",
        "D": "21"
      },
      "answer": "B",
      "explanation": "แม้ว่าตารางเดิมจะมี 15 คอลัมน์ แต่โค้ดมีการเลือกเฉพาะ 3 คอลัมน์ต่อท้าย คือ `[[\"name\", \"club\", \"overall\"]]` ดังนั้นจำนวนคอลัมน์ของ `sub` ซึ่งดูได้จาก `shape[1]` จึงมีค่าเท่ากับ 3"
    },
    {
      "id": 25,
      "week": 5,
      "question": "พิจารณาโค้ดการจัดกลุ่มข้อมูลต่อไปนี้:\n```python\nleague_mean = df.groupby(\"league\")[\"overall\"].mean()\nprint(type(league_mean))\nprint(league_mean.index.name)\n```\nผลลัพธ์ของ `type(league_mean)` และชื่อของ Index คือข้อใด?",
      "options": {
        "A": "Series และ Index ชื่อ 'league'",
        "B": "DataFrame และ Index ชื่อ 'overall'",
        "C": "dict และ Index ไม่มีชื่อ",
        "D": "Series และ Index ชื่อ 'overall'"
      },
      "answer": "A",
      "explanation": "เมื่อจัดกลุ่มด้วย `groupby(\"league\")` แล้วเลือก 1 คอลัมน์ตัวเลข `[\"overall\"]` มาหาค่าเฉลี่ย ผลลัพธ์ที่ได้จะเป็น Pandas Series โดยมีชื่อกลุ่มในคอลัมน์ `league` กลายมาเป็น Index ของ Series นั้น"
    },
    {
      "id": 26,
      "week": 5,
      "question": "พิจารณาโค้ดการสรุปข้อมูลหลายสถิติพร้อมกัน:\n```python\nstats = df.groupby(\"nationality\")[\"pace\"].agg([\"count\", \"mean\"])\nprint(list(stats.columns))\n```\nผลลัพธ์ของ `list(stats.columns)` คือข้อใด?",
      "options": {
        "A": "['nationality', 'pace']",
        "B": "['count', 'mean']",
        "C": "['pace_count', 'pace_mean']",
        "D": "['nationality']"
      },
      "answer": "B",
      "explanation": "เมื่อใช้ `.agg([\"count\", \"mean\"])` Pandas จะสร้าง DataFrame ที่มีหัวคอลัมน์เป็นชื่อฟังก์ชันสถิติที่ระบุ คือ `'count'` และ `'mean'` โดยมี `'nationality'` ทำหน้าที่เป็น Index"
    },
    {
      "id": 27,
      "week": 5,
      "question": "พิจารณาโค้ดการเรียงลำดับผลลัพธ์:\n```python\nstats = df.groupby(\"nationality\")[\"pace\"].agg([\"count\", \"mean\"])\nsorted_stats = stats.sort_values(\"mean\", ascending=False)\ntop_country = sorted_stats.index[0]\n```\nฟังก์ชัน `sort_values(\"mean\", ascending=False)` มีผลต่อลำดับข้อมูลใน `sorted_stats` อย่างไร?",
      "options": {
        "A": "เรียงจากสัญชาติที่มี pace เฉลี่ยน้อยที่สุดไปหามากที่สุด",
        "B": "เรียงจากสัญชาติที่มี pace เฉลี่ยมากที่สุดลงไปหาน้อยที่สุด ทำให้แถวแรก (index[0]) คือสัญชาติที่มีค่าเฉลี่ยสูงสุด",
        "C": "เรียงตามจำนวนนักเตะ (count) จากมากไปน้อย",
        "D": "เรียงชื่อสัญชาติตามตัวอักษร A ถึง Z"
      },
      "answer": "B",
      "explanation": "พารามิเตอร์ `ascending=False` กำหนดให้เรียงจากค่ามากไปหาน้อยตามคอลัมน์ `'mean'` ดังนั้นแถวแรกสุดของผลลัพธ์จึงเป็นสัญชาติที่มีค่าเฉลี่ยความเร็วสูงที่สุด"
    },
    {
      "id": 28,
      "week": 5,
      "question": "สมมติผลการวิเคราะห์สถิติความเร็ว (`pace`) แยกลำดับสัญชาติได้ผลดังนี้:\n- **ประเทศ X:** count = 1 คน, mean = 95.0\n- **ประเทศ Y:** count = 8 คน, mean = 86.5\nข้อใดอธิบายเปรียบเทียบระหว่างประเทศ X และ Y ในเชิงวิทยาศาสตร์ข้อมูลได้อย่างสมเหตุสมผลที่สุด?",
      "options": {
        "A": "สรุปได้อย่างมั่นใจว่านักเตะสัญชาติ X ทุกคนในโลกวิ่งเร็วกว่านักเตะสัญชาติ Y อย่างแน่นอน",
        "B": "ประเทศ X มีค่าเฉลี่ยสูงกว่าแต่มีตัวอย่างเพียงคนเดียว (count = 1) จึงอาจเป็นเพียงความสามารถเฉพาะบุคคล ในขณะที่ประเทศ Y มีขนาดตัวอย่าง 8 คน ค่าเฉลี่ยจึงสะท้อนภาพรวมได้น่าเชื่อถือกว่า",
        "C": "ควรตัดข้อมูลประเทศ Y ทิ้งเพราะมีค่าเฉลี่ยต่ำกว่า",
        "D": "ขนาดกลุ่มตัวอย่าง (count) ไม่มีผลต่อความน่าเชื่อถือของการวิเคราะห์ข้อมูล"
      },
      "answer": "B",
      "explanation": "นักวิเคราะห์ข้อมูลที่ดีต้องระวังกับดักทางสถิติของกลุ่มตัวอย่างขนาดเล็ก (Small sample size) การที่ประเทศ X มีนักเตะเพียงคนเดียว ค่าเฉลี่ย 95.0 จึงเป็นเพียงสถิติของคนๆ นั้นคนเดียว ไม่สามารถสรุปเหมารวมเป็นตัวแทนของทั้งประเทศได้ จึงต้องดู `count` ควบคู่กับ `mean` เสมอ"
    },
    {
      "id": 29,
      "week": 5,
      "question": "ผู้เรียนเขียนโค้ด:\n```python\nby_position = df.groupby(\"positions\")[\"value_millions\"].mean()\n```\nแล้วพบข้อผิดพลาด `KeyError: 'positions'` เมื่อเรียกดู `df.columns` พบว่าชื่อจริงคือ `'position'` (รูปเอกพจน์) โค้ดแก้ไขที่ถูกต้องและตรงจุดที่สุดคือข้อใด?",
      "options": {
        "A": "by_position = df.groupby(\"position\")[\"value_millions\"].mean()",
        "B": "by_position = df.groupby(\"positions\".strip())[\"value_millions\"].mean()",
        "C": "by_position = df.rename(columns={\"position\": \"positions\"}).groupby(\"positions\")[\"value_millions\"].sum()",
        "D": "by_position = df[\"value_millions\"].groupby(\"position\").mean()"
      },
      "answer": "A",
      "explanation": "สาเหตุของ `KeyError` มาจากการสะกดชื่อคอลัมน์ผิด (เติม s เป็นพหูพจน์) การแก้ที่ถูกต้องและตรงจุดที่สุดคือการเปลี่ยนชื่อในสตริงให้สะกดตรงกับคอลัมน์จริงในตารางคือ `\"position\"`"
    },
    {
      "id": 30,
      "week": 5,
      "question": "พิจารณาโค้ดแบบ Pipeline จากบทเรียน Week 05:\n```python\nresult = df.groupby(\"league\")[\"overall\"].mean().sort_values(ascending=False).round(1)\n```\nข้อใดระบุลำดับขั้นตอนการประมวลผลของโค้ดบรรทัดนี้ได้อย่างถูกต้อง?",
      "options": {
        "A": "ปัดเศษทศนิยม -> จัดกลุ่มแยกลีก -> หาค่าเฉลี่ย -> เรียงลำดับจากมากไปน้อย",
        "B": "จัดกลุ่มแยกลีก -> เลือกคอลัมน์ overall -> คำนวณค่าเฉลี่ย -> เรียงลำดับค่าเฉลี่ยจากมากไปน้อย -> ปัดเศษทศนิยมเหลือ 1 ตำแหน่ง",
        "C": "เรียงลำดับข้อมูลทั้งตาราง -> แบ่งกลุ่มแยกลีก -> ปัดเศษทศนิยม -> หาค่าเฉลี่ย",
        "D": "คำนวณค่าเฉลี่ยทั้งตารางก่อน -> แล้วค่อยแยกกลุ่มตามลีก"
      },
      "answer": "B",
      "explanation": "โค้ดจะทำงานจากซ้ายไปขวา: 1. `df.groupby(\"league\")` แบ่งกลุ่มตามลีก 2. `[\"overall\"]` เลือกคอลัมน์คะแนน 3. `.mean()` หาค่าเฉลี่ยรายกลุ่ม 4. `.sort_values(ascending=False)` เรียงลำดับจากมากไปน้อย 5. `.round(1)` ปัดเศษทศนิยม 1 ตำแหน่ง"
    }
  ],
  "written": [
    {
      "id": 1,
      "week": 1,
      "title": "Week 01: การสำรวจมิติและตรวจจับ Relative Path",
      "prompt": "กำหนดให้ผู้เรียนเปิดไฟล์ Jupyter Notebook ที่อยู่ในโฟลเดอร์ `challenge/`\n1. จงเขียนโค้ด Pandas เพื่อโหลดไฟล์ `footballers.csv` ที่อยู่ในโฟลเดอร์ `data/` เข้ามาเก็บไว้ในตัวแปร `df` ด้วย Relative Path ที่ถูกต้อง\n2. แสดงตัวอย่างข้อมูล 3 แถวแรกของตาราง\n3. เขียนโค้ดพิมพ์จำนวนแถวและจำนวนคอลัมน์ของตารางแยกออกมา โดยใช้ Attribute `.shape`\n4. จงอธิบายว่า หากผู้เรียนเขียนโค้ด `pd.read_csv(\"data/footballers.csv\")` จะเกิด Error ใด ทำไมจึงเกิด และมีหลักการคิดในการนับระดับโฟลเดอร์ `../` อย่างไร?",
      "max_points": 4,
      "hint": "ใช้ pd.read_csv(\"../data/footballers.csv\"), df.head(3), df.shape[0], df.shape[1]",
      "model_answer": "```python\nimport pandas as pd\n\n# 1. โหลดไฟล์ด้วย Relative Path ที่ถูกต้องจากโฟลเดอร์ย่อย\ndf = pd.read_csv(\"../data/footballers.csv\")\n\n# 2. แสดง 3 แถวแรก\ndisplay(df.head(3))\n\n# 3. แสดงจำนวนแถวและจำนวนคอลัมน์\nprint(\"จำนวนแถว:\", df.shape[0])\nprint(\"จำนวนคอลัมน์:\", df.shape[1])\n```\n\n**คำอธิบายข้อ 4:**\n- จะเกิดข้อผิดพลาด `FileNotFoundError: [Errno 2] No such file or directory`\n- สาเหตุ: เมื่อรัน Notebook จากโฟลเดอร์ `challenge/` ตำแหน่ง Working Directory จะอยู่ที่โฟลเดอร์นั้น การระบุ `data/footballers.csv` จะทำให้โปรแกรมมองหาที่ `challenge/data/footballers.csv` ซึ่งไม่มีอยู่จริง\n- หลักการนับ: ต้องใช้ `../` หนึ่งครั้ง เพื่อถอยออกมา 1 ระดับไปที่ Root (`data-sci/`) จากนั้นจึงเข้าสู่โฟลเดอร์ `data/` เป็น `../data/footballers.csv`"
    },
    {
      "id": 2,
      "week": 2,
      "title": "Week 02: Data Wrangling, Immutability & Case Sensitivity",
      "prompt": "จาก DataFrame `df`:\n1. จงเขียนโค้ดคัดเลือกเฉพาะ 3 คอลัมน์ ได้แก่ `name`, `club`, `overall` แล้วเปลี่ยนชื่อคอลัมน์ `overall` ให้เป็น `rating` โดยบันทึกผลลงในตัวแปรชื่อ `summary`\n2. กำหนดให้การทำงานนี้ต้อง**ไม่ส่งผลกระทบและไม่เปลี่ยนแปลง**ข้อมูลใน `df` เดิม โดยให้นักศึกษาเขียนคำสั่ง `print()` ตรวจสอบยืนยันว่าใน `df.columns` ยังคงมีชื่อคอลัมน์ `overall` และไม่มีคอลัมน์ `rating`\n3. อธิบายในเชิงลึกว่า:\n   - เหตุใดการระบุ `df[\"name\"]` จึงได้ Series แต่ `df[[\"name\"]]` ได้ DataFrame?\n   - เหตุใดการใช้ `.copy()` จึงจำเป็นในการป้องกันคำเตือน `SettingWithCopyWarning`?",
      "max_points": 4,
      "hint": "ใช้ df[[\"name\", \"club\", \"overall\"]].copy(), .rename(columns={...}), \"rating\" in df.columns",
      "model_answer": "```python\n# 1. เลือก 3 คอลัมน์และสร้างตารางอิสระด้วย .copy() พร้อมเปลี่ยนชื่อ\nsummary = df[[\"name\", \"club\", \"overall\"]].copy()\nsummary = summary.rename(columns={\"overall\": \"rating\"})\n\n# 2. เขียนโค้ดตรวจสอบยืนยันว่า df เดิมไม่ถูกแก้ไข\nprint(\"overall in df:\", \"overall\" in df.columns)   # ได้ True\nprint(\"rating in df:\", \"rating\" in df.columns)     # ได้ False\nprint(\"rating in summary:\", \"rating\" in summary.columns) # ได้ True\n```\n\n**คำอธิบายข้อ 3:**\n- `df[\"name\"]` ส่งสตริงเดี่ยวเข้าไป Pandas จะส่งคืนคอลัมน์นั้นในรูป Series (ข้อมูล 1 มิติ) แต่ `df[[\"name\"]]` ส่ง List ของสตริงเข้าไป Pandas จะส่งคืนโครงสร้างตาราง DataFrame (ข้อมูล 2 มิติ)\n- การใส่ `.copy()` เป็นการบังคับทำ Deep Copy แยกข้อมูลและหน่วยความจำออกมาเป็นอิสระ ป้องกันไม่ให้ Pandas มองว่า `summary` เป็นเพียง View ของ `df` ซึ่งหากไม่มี `.copy()` การไปแก้ไขค่าในตารางใหม่อาจส่งผลข้างเคียงต่อตารางเดิมและก่อให้เกิดคำเตือน `SettingWithCopyWarning`"
    },
    {
      "id": 3,
      "week": 3,
      "title": "Week 03: Data Cleaning, Missing Values & Statistical Defense",
      "prompt": "ในชุดข้อมูล `footballers.csv` มีข้อมูลสูญหาย (Missing Values):\n1. จงเขียนโค้ดเพื่อนับจำนวนค่าว่างในคอลัมน์ `age` และ `height_cm` ของ `df` ออกมาแสดงผล\n2. จงคำนวณหาค่ามัธยฐาน (Median) ของคอลัมน์ `height_cm` แล้วสร้าง DataFrame ใหม่ชื่อ `clean_df` โดยแทนค่าว่างในคอลัมน์ `height_cm` ด้วยค่ามัธยฐานดังกล่าว โดยใช้คำสั่ง `df.assign()` ร่วมกับ `.fillna()` โดยที่ `df` เดิมต้องไม่ถูกแก้ไข\n3. จงเขียนอธิบายเชิงวิเคราะห์ทางสถิติ:\n   - หากเราแทนค่าส่วนสูง (`height_cm`) ที่หายไปด้วยเลข `0` จะส่งผลกระทบต่อค่าเฉลี่ย (`mean`) ของตารางอย่างไร?\n   - เหตุใดในทางสถิติจึงแนะนำให้ใช้ค่ามัธยฐาน (Median) แทนค่าเฉลี่ย (Mean) เมื่อชุดข้อมูลมีความเสี่ยงที่จะมีค่าผิดปกติสุดโต่ง (Outliers)?",
      "max_points": 4,
      "hint": "ใช้ df[\"col\"].isna().sum(), df[\"height_cm\"].median(), df.assign(height_cm=...)",
      "model_answer": "```python\n# 1. นับจำนวนค่าว่างของ age และ height_cm\nprint(\"ค่าว่างใน age:\", df[\"age\"].isna().sum())\nprint(\"ค่าว่างใน height_cm:\", df[\"height_cm\"].isna().sum())\n\n# 2. คำนวณ Median และสร้าง clean_df อย่างปลอดภัย\nmed_height = df[\"height_cm\"].median()\nclean_df = df.assign(height_cm=df[\"height_cm\"].fillna(med_height))\n\n# ตรวจสอบยืนยัน\nprint(\"ค่าว่าง height_cm ใน clean_df:\", clean_df[\"height_cm\"].isna().sum())\nprint(\"ค่าว่าง height_cm ใน df เดิม:\", df[\"height_cm\"].isna().sum())\n```\n\n**คำอธิบายข้อ 3:**\n- การแทนด้วยเลข `0`: ส่วนสูง 0 ซม. ไม่มีจริงในนักฟุตบอลอาชีพ เลข 0 จะทำหน้าที่เป็นค่าต่ำสุดโต่งที่ดึงค่าเฉลี่ยรวม (`mean`) ของส่วนสูงทั้งชุดข้อมูลให้ลดฮวบลงอย่างบิดเบือนความเป็นจริง\n- ทำไมเลือก Median แทน Mean: เพราะมัธยฐานคือค่ากึ่งกลางของข้อมูลหลังจากนำมาเรียงลำดับ จึงมีความทนทานต่อ Outliers (Robust to Outliers) สูงมาก แม้จะมีนักเตะที่ตัวสูงหรือเตี้ยผิดปกติ ค่ากึ่งกลางจะไม่ขยับตาม แตกต่างจาก Mean ที่คำนวณจากการนำทุกค่ามารวมกัน ค่าผิดปกติเพียงค่าเดียวจึงสามารถดึงค่าเฉลี่ยให้บิดเบือนได้ทันที"
    },
    {
      "id": 4,
      "week": 4,
      "title": "Week 04: Complex Filtering, Precedence & Query",
      "prompt": "ผู้เรียนต้องการกรองหานักเตะที่มีคุณสมบัติตรงตาม 3 เงื่อนไขพร้อมกัน:\n- อายุ (`age`) ไม่เกิน `25` ปี\n- ตำแหน่ง (`position`) เป็น `\"ST\"` หรือ `\"RW\"`\n- ค่าคะแนนรวม (`overall`) ตั้งแต่ `85` ขึ้นไป\n\nแต่เขาเขียนโค้ดดังนี้แล้วเกิด Error:\n```python\nresult = df[df[\"age\"] <= 25 and df[\"position\"].isin([\"ST\", \"RW\"]) and df[\"overall\"] >= 85]\n# Error: ValueError: The truth value of a Series is ambiguous\n```\nจงตอบคำถามต่อไปนี้:\n1. อธิบายสาเหตุของ Error นี้ และอธิบายว่าทำไมเมื่อเปลี่ยนมาใช้ `&` แล้วจึงจำเป็นต้องใส่วงเล็บ `(...)` ครอบแต่ละเงื่อนไขเสมอ (อธิบายเรื่อง Operator Precedence)?\n2. จงเขียนโค้ดแก้ไขให้ถูกต้องโดยใช้วิธี Boolean Masking (ใช้เครื่องหมาย `&` และวงเล็บ) พร้อมเลือกแสดงผลเฉพาะคอลัมน์ `[\"name\", \"age\", \"position\", \"overall\"]`\n3. จงเขียนโค้ดทางเลือกอีก 1 วิธีโดยใช้คำสั่ง `.query()` เพื่อให้ได้ผลลัพธ์เดียวกัน",
      "max_points": 4,
      "hint": "ใช้ (df[\"age\"] <= 25) & (df[\"position\"].isin([\"ST\", \"RW\"])) & (df[\"overall\"] >= 85) และ df.query(...)",
      "model_answer": "```python\n# 1. คำอธิบาย:\n# - สาเหตุ Error: 'and' ใน Python เป็น Logical Operator ที่ต้องการค่าความจริงเพียง 1 ค่า (Scalar Boolean) แต่เงื่อนไขของ Pandas คืนค่าเป็น Series ที่มี True/False หลายแถว Python จึงตัดสินไม่ได้ (ambiguous)\n# - ทำไมต้องใส่วงเล็บ: ตัวดำเนินการระดับบิต '&' มีลำดับความสำคัญ (Precedence) สูงกว่าตัวดำเนินการเปรียบเทียบ (<=, >=) หากไม่ใส่วงเล็บ Python จะนำค่าตัวเลขตรงกลางไปทำ Bitwise AND ก่อน ทำให้คำนวณผิดพลาดทันที\n\n# 2. โค้ดแก้ไขด้วย Boolean Masking:\ncond = (df[\"age\"] <= 25) & (df[\"position\"].isin([\"ST\", \"RW\"])) & (df[\"overall\"] >= 85)\nresult1 = df[cond][[\"name\", \"age\", \"position\", \"overall\"]]\ndisplay(result1)\n\n# 3. โค้ดทางเลือกด้วย .query():\nresult2 = df.query(\"age <= 25 and position in ['ST', 'RW'] and overall >= 85\")[[\"name\", \"age\", \"position\", \"overall\"]]\ndisplay(result2)\n```"
    },
    {
      "id": 5,
      "week": 5,
      "title": "Week 05: Advanced Groupby Aggregation & Responsible Reporting",
      "prompt": "จงเขียนโค้ดและเขียนบทวิเคราะห์ข้อมูลตามข้อกำหนดต่อไปนี้:\n1. เขียนโค้ด Pandas จัดกลุ่มข้อมูลตามสโมสรลีก (`league`)\n2. คำนวณหาทั้ง **จำนวนนักเตะ (`count`)** และ **ค่าคะแนนเฉลี่ย (`mean`)** ของคอลัมน์ `overall` พร้อมกันในคำสั่งเดียว\n3. เรียงลำดับจากลีกที่มีค่าเฉลี่ยมากที่สุดไปหาน้อยที่สุด และปัดเศษทศนิยม 1 ตำแหน่ง\n4. สมมติผลลัพธ์พบว่า: ลีก **MLS** มีค่าเฉลี่ย `overall = 90.0` (`count = 1` คน คือ Messi) ในขณะที่ลีก **Premier League** มีค่าเฉลี่ย `overall = 83.5` (`count = 15` คน)\n   - ให้นักศึกษาเขียนประโยคสรุปผลการวิเคราะห์อย่างมีความรับผิดชอบ (Responsible Reporting) ความยาว 3-4 ประโยค โดยมีองค์ประกอบครบทั้ง: สิ่งที่ค้นพบจากตัวเลข, กับดักทางสถิติของค่าเฉลี่ยเมื่อกลุ่มตัวอย่างเล็ก (Sample Size = 1), และข้อสรุปที่ถูกต้องตามหลักฐานพร้อมระบุข้อจำกัดของข้อมูล",
      "max_points": 4,
      "hint": "ใช้ df.groupby(\"league\")[\"overall\"].agg([\"count\", \"mean\"]).sort_values(\"mean\", ascending=False).round(1)",
      "model_answer": "```python\n# 1, 2, 3. จัดกลุ่ม league คำนวณ count & mean เรียงลำดับจากมากไปน้อย ปัดเศษ 1 ตำแหน่ง\nleague_stats = (\n    df.groupby(\"league\")[\"overall\"]\n    .agg([\"count\", \"mean\"])\n    .sort_values(\"mean\", ascending=False)\n    .round(1)\n)\ndisplay(league_stats)\n```\n\n**ข้อความสรุปผลอย่างมีความรับผิดชอบ (Responsible Reporting):**\n\"ในชุดข้อมูลนี้ ลีกที่มีค่าคะแนน overall เฉลี่ยสูงที่สุดคือลีก MLS (เฉลี่ย 90.0) อย่างไรก็ตาม เมื่อพิจารณาขนาดกลุ่มตัวอย่างพบว่าลีก MLS มีข้อมูลนักเตะเพียง 1 คนเท่านั้น (Lionel Messi) ซึ่งถือเป็นกับดักทางสถิติที่ค่าเฉลี่ยสะท้อนเพียงความสามารถของยอดนักเตะรายบุคคล ไม่ได้สะท้อนมาตรฐานของนักเตะทั้งลีก MLS แต่อย่างใด ในขณะที่ Premier League มีตัวอย่างถึง 15 คนซึ่งมีความน่าเชื่อถือทางสถิติมากกว่า ดังนั้นจึงสรุปได้เพียงว่า 'ในกลุ่มตัวอย่าง 46 คนนี้ นักเตะจาก MLS มีคะแนนสูงสุด' แต่ไม่สามารถสรุปเหมารวมว่าลีก MLS เหนือกว่าลีกอื่นได้เนื่องจากข้อจำกัดด้านขนาดกลุ่มตัวอย่าง\""
    }
  ]
};
