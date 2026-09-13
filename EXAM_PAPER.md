# 📝 ข้อสอบวัดผลการเรียนรู้: Data Science ทีละก้าว (Week 01 - 05)

**วิชา:** Python for Data Science (การวิเคราะห์ข้อมูลด้วย Python & Pandas)  
**ขอบเขตเนื้อหา:** Week 01 ถึง Week 05 (ครอบคลุมเฉพาะ Method, Function, Property ที่เรียนในบทเรียนเท่านั้น)  
**ชุดข้อมูลอ้างอิง:** `footballers.csv` (ตารางนักฟุตบอล 46 แถว 15 คอลัมน์)  
**เวลาในการทำข้อสอบ:** 90 นาที  
**คะแนนรวมทั้งสิ้น:** 50 คะแนน  
- **ส่วนที่ 1:** ข้อสอบปรนัยประยุกต์และไล่โค้ด (Code Tracing) 4 ตัวเลือก (A, B, C, D) จำนวน **30 ข้อ** (ข้อละ 1 คะแนน รวม 30 คะแนน)
- **ส่วนที่ 2:** ข้อสอบอัตนัย / ข้อเขียน จำนวน **5 ข้อ** (ข้อละ 4 คะแนน รวม 20 คะแนน)

---

## 📌 คำชี้แจงสำหรับผู้เข้าสอบ
1. ข้อสอบส่วนที่ 1 มีทั้งหมด 30 ข้อ ให้พิจารณาโค้ด ข้อผิดพลาด และหลักการทางสถิติ แล้วเลือกคำตอบที่ถูกต้องที่สุดเพียงข้อเดียวในแต่ละข้อ
2. ข้อสอบส่วนที่ 2 มีทั้งหมด 5 ข้อ ให้นักศึกษาเขียนโค้ดภาษา Python ร่วมกับ Pandas ตามโจทย์ที่กำหนด พร้อมอธิบายเหตุผลและหลักคิดทางสถิติให้ชัดเจน
3. เนื้อหาข้อสอบอ้างอิงจากบทเรียน Week 01 ถึง Week 05 สัปดาห์ละ 6 ข้อ ดังนี้:
   - **Week 01 (ข้อ 1 - 6):** เริ่มต้นและรู้จักข้อมูล (CSV, `open()`, `csv.DictReader`, `pd.read_csv`, `df.head()`, `df.shape`, Relative Path, `FileNotFoundError`)
   - **Week 02 (ข้อ 7 - 12):** Data Wrangling (การเลือกคอลัมน์ `df[]` vs `df[[]]`, Series vs DataFrame, `.rename()`, `df.columns`, `.copy()`, Case-Sensitivity & `KeyError`)
   - **Week 03 (ข้อ 13 - 18):** Cleaning Data (Missing Values `NaN`, `.isna().sum()`, `.median()`, `.fillna()`, `df.assign()`, การแทนค่าว่างด้วย Median vs 0 vs Mean)
   - **Week 04 (ข้อ 19 - 24):** Filter Data (Boolean Masking, `&`, `|`, วงเล็บ `()` และ Operator Precedence, `ValueError: truth value ambiguous`, `.isin()`, `.query()`)
   - **Week 05 (ข้อ 25 - 30):** Analysis พื้นฐาน (`groupby()`, `.mean()`, `.agg(["count", "mean"])`, `.sort_values(ascending=False)`, `.round()`, Sample Size & Responsible Reporting)

---

## ภาคที่ 1: ข้อสอบเลือกตอบ A B C D (30 ข้อ 30 คะแนน)

### 🔹 Week 01: เริ่มต้นและรู้จักข้อมูล (ข้อ 1 - 6)

#### ข้อที่ 1 (Code Tracing / Dimensions)
พิจารณาโค้ดต่อไปนี้ที่รันกับไฟล์ `footballers.csv` (ซึ่งมีข้อมูลจริงทั้งหมด 46 แถว และ 15 คอลัมน์):
```python
import pandas as pd
df = pd.read_csv("../data/footballers.csv")
sample = df.head(3)
print(sample.shape)
```
ผลลัพธ์ที่พิมพ์ออกมาทางหน้าจอคือข้อใด?
- **A)** `(46, 15)`
- **B)** `(3, 15)`
- **C)** `(15, 3)`
- **D)** `(3, 3)`

#### ข้อที่ 2 (Relative Path & Debugging)
กำหนดโครงสร้างไดเรกทอรีของโปรเจกต์ดังนี้:
```text
data-sci/
├── data/
│   └── footballers.csv
└── challenge/
    └── challenge_1.ipynb
```
หากเปิดรันไฟล์ `challenge_1.ipynb` แล้วเขียนโค้ด:
```python
with open("data/footballers.csv") as f:
    rows = list(csv.DictReader(f))
```
จะเกิดข้อผิดพลาดใดขึ้น และเป็นเพราะเหตุใด?
- **A)** เกิด `KeyError: 'data'` เพราะโฟลเดอร์ data ไม่มีอยู่จริงในหน่วยความจำ
- **B)** เกิด `FileNotFoundError` เพราะ Working Directory ของ Notebook ปัจจุบันอยู่ที่ `challenge/` การเข้าถึงไฟล์ใน `data/` ต้องใช้ `../data/footballers.csv` เพื่อถอยออกมา 1 ระดับ
- **C)** เกิด `TypeError` เพราะ `csv.DictReader` ไม่สามารถใช้คำสั่ง `list()` ครอบได้
- **D)** โค้ดทำงานได้ปกติโดยไม่มี Error ใดๆ

#### ข้อที่ 3 (Data Structure Comparison: Pure Python vs Pandas)
พิจารณาโค้ดการอ่านข้อมูลแถวแรกของนักเตะ Lionel Messi เปรียบเทียบระหว่าง 2 วิธี:
```python
# วิธีที่ 1: Pure Python
with open("../data/footballers.csv") as f:
    rows = list(csv.DictReader(f))
first_val = rows[0]["overall"]

# วิธีที่ 2: Pandas
df = pd.read_csv("../data/footballers.csv")
df_val = df["overall"][0]
```
ข้อใดระบุชนิดข้อมูล (Data Type) ของ `first_val` และ `df_val` ได้อย่างถูกต้อง?
- **A)** ทั้งคู่เป็น `int` เหมือนกันโดยอัตโนมัติ
- **B)** `first_val` เป็น `str` (ข้อความ) ส่วน `df_val` ถูก Pandas แปลงเป็น `int64` (จำนวนเต็ม) ให้อัตโนมัติ
- **C)** `first_val` เป็น `int` ส่วน `df_val` เป็น `str`
- **D)** ทั้งคู่เป็น `float` เพราะในตารางมีข้อมูลสูญหายปะปนอยู่

#### ข้อที่ 4 (Attribute vs Method & Syntax Trap)
ผู้เรียนต้องการแสดงจำนวนแถวของตาราง `df` ออกมาทางหน้าจอ โดยไม่ต้องการแสดงจำนวนคอลัมน์ โค้ดในข้อใดทำงานได้ถูกต้องสมบูรณ์**โดยไม่เกิด Error**?
- **A)** `print(df.shape())`
- **B)** `print(df.shape[0])`
- **C)** `print(df.rows)`
- **D)** `print(len(df.shape))`

#### ข้อที่ 5 (Pure Python DictReader Mechanics)
เมื่อรันโค้ดการอ่านไฟล์ด้วย Pure Python ดังนี้:
```python
import csv
with open("../data/footballers.csv") as f:
    reader = csv.DictReader(f)
    first_row = next(reader)
    print(type(first_row))
```
ผลลัพธ์ที่แสดงบนหน้าจอคือข้อใด?
- **A)** `<class 'list'>`
- **B)** `<class 'dict'>`
- **C)** `<class 'pandas.core.series.Series'>`
- **D)** `<class 'tuple'>`

#### ข้อที่ 6 (DataFrame Creation from Dictionary)
พิจารณาโค้ดสร้าง DataFrame จาก Dictionary ในบทเรียน Week 01:
```python
import pandas as pd
data = {
    "list": ["Food", "Travel", "Game"],
    "price": [100, 200, 300]
}
result = pd.DataFrame(data)
print(result.shape)
```
ค่าของ `result.shape` ที่แสดงผลคือข้อใด?
- **A)** `(2, 3)`
- **B)** `(3, 2)`
- **C)** `(6,)`
- **D)** `(1, 2)`

---

### 🔹 Week 02: Data Wrangling (ข้อ 7 - 12)

#### ข้อที่ 7 (Series vs DataFrame Dimensionality)
พิจารณาตัวแปร 2 ตัวที่ถูกสร้างขึ้นจาก DataFrame `df` (ซึ่งมีขนาด 46 แถว 15 คอลัมน์):
```python
s1 = df["name"]
s2 = df[["name"]]
```
ข้อใดระบุชนิดข้อมูลของ `type(s1)` และมิติของ `s2.shape` ได้อย่างถูกต้อง?
- **A)** `type(s1)` คือ `Series` และ `s2.shape` คือ `(46, 1)`
- **B)** `type(s1)` คือ `DataFrame` และ `s2.shape` คือ `(46,)`
- **C)** `type(s1)` คือ `Series` และ `s2.shape` คือ `(46,)`
- **D)** `type(s1)` คือ `DataFrame` และ `s2.shape` คือ `(1, 46)`

#### ข้อที่ 8 (Rename Immutability & Reassignment Trap)
พิจารณาโค้ดการเปลี่ยนชื่อคอลัมน์ต่อไปนี้:
```python
df = pd.read_csv("../data/footballers.csv")
df.rename(columns={"overall": "rating"})
print("rating" in df.columns)
print("overall" in df.columns)
```
ผลลัพธ์ที่พิมพ์ออกมาทั้ง 2 บรรทัดคือข้อใด?
- **A)** `True` แล้วตามด้วย `False`
- **B)** `False` แล้วตามด้วย `True`
- **C)** เกิดข้อผิดพลาด `KeyError: 'rating'`
- **D)** `True` แล้วตามด้วย `True`

#### ข้อที่ 9 (Case-Sensitivity & KeyError)
หากผู้เรียนเขียนโค้ดต่อไปนี้:
```python
cols = ["name", "club", "Overall"]
summary = df[cols].copy()
```
จากไฟล์ข้อมูลจริง `footballers.csv` จะเกิดผลลัพธ์อย่างไร?
- **A)** โปรแกรมจะสร้างตารางที่มีคอลัมน์ Overall เป็นค่า NaN ทั้งหมด
- **B)** เกิดข้อผิดพลาด `KeyError` เพราะชื่อคอลัมน์ในไฟล์จริงสะกดด้วยตัวพิมพ์เล็กทั้งหมดคือ `'overall'` และ Pandas มีคุณสมบัติ Case-Sensitive
- **C)** โปรแกรมจะแปลงชื่อเป็นตัวพิมพ์เล็กให้อัตโนมัติและทำงานผ่านปกติ
- **D)** เกิด `AttributeError: 'DataFrame' object has no attribute 'copy'`

#### ข้อที่ 10 (Pure Python Wrangling vs Pandas Logic)
พิจารณาโค้ด Pure Python จากบทเรียน Week 02:
```python
summary = []
for row in rows:
    summary.append({"name": row["name"], "club": row["club"], "rating": row["overall"]})
```
โค้ดของ Pandas ในข้อใดทำงานเทียบเท่ากับโค้ดด้านบนได้อย่างสมบูรณ์ โดยไม่แก้ไข `df` ต้นฉบับ?
- **A)** `summary = df[["name", "club", "overall"]].rename(columns={"overall": "rating"})`
- **B)** `summary = df["name", "club", "overall"].rename(columns={"overall": "rating"})`
- **C)** `summary = df.rename(columns={"overall": "rating"})[["name", "rating"]]`
- **D)** `summary = df[["name", "club"]].assign(rating=df["overall"]).drop("overall")`

#### ข้อที่ 11 (Data Safety & `.copy()`)
พิจารณาโค้ดต่อไปนี้:
```python
cols = ["name", "club", "overall"]
summary = df[cols].copy()
summary = summary.rename(columns={"overall": "rating"})
```
ข้อใดอธิบายสถานะของ DataFrame `df` และ `summary` ได้อย่างถูกต้องที่สุด?
- **A)** คอลัมน์ overall ใน df ถูกเปลี่ยนชื่อเป็น rating ไปด้วย
- **B)** df ต้นฉบับยังคงมีคอลัมน์ overall เหมือนเดิม และไม่มีคอลัมน์ rating เพราะการใช้ `.copy()` ทำให้ summary มีพื้นที่หน่วยความจำแยกเป็นอิสระ
- **C)** summary เป็นเพียง View ที่ชี้ไปยังตำแหน่งหน่วยความจำเดียวกับ df
- **D)** ไฟล์ footballers.csv ในเครื่องจะถูกบันทึกคอลัมน์ใหม่โดยอัตโนมัติ

#### ข้อที่ 12 (Columns Property & Type Conversion)
พิจารณาคำสั่งตรวจสอบคอลัมน์ 2 บรรทัดนี้:
```python
cols_a = df.columns
cols_b = df.columns.tolist()
```
ข้อใดระบุชนิดข้อมูล (type) ของ `cols_a` และ `cols_b` ได้ถูกต้อง?
- **A)** `cols_a` เป็น `Index` และ `cols_b` เป็น `list`
- **B)** ทั้งคู่เป็น `list`
- **C)** `cols_a` เป็น `list` และ `cols_b` เป็น `tuple`
- **D)** ทั้งคู่เป็น `Series`

---

### 🔹 Week 03: Cleaning Data (ข้อ 13 - 18)

#### ข้อที่ 13 (Counting Missing Values)
ในไฟล์ `footballers.csv` แถวของ Casemiro ไม่มีข้อมูลส่วนสูง (`height_cm`) และแถวของ Marquinhos ไม่มีข้อมูลอายุ (`age`)
เมื่อรันโค้ดต่อไปนี้:
```python
missing_age = df["age"].isna().sum()
missing_height = df["height_cm"].isna().sum()
print(missing_age, missing_height)
```
ผลลัพธ์ที่พิมพ์ออกมาคือข้อใด?
- **A)** `0 0`
- **B)** `1 1`
- **C)** `46 46`
- **D)** `True True`

#### ข้อที่ 14 (Statistical Impact of Imputing 0)
สมมติมีข้อมูลอายุของนักเตะ 5 คน: `[20, 22, 24, 26, None]`
- หากแทนค่าว่าง `None` ด้วยเลข `0` ค่าเฉลี่ยของทั้ง 5 คนจะเป็น `A`
- หากแทนค่าว่าง `None` ด้วยค่ามัธยฐาน (Median) ของ 4 คนแรก (คือ `23.0`) ค่าเฉลี่ยของทั้ง 5 คนจะเป็น `B`
ค่าของ `A` และ `B` คือเท่าใดตามลำดับ?
- **A)** `A = 18.4` และ `B = 23.0`
- **B)** `A = 23.0` และ `B = 18.4`
- **C)** `A = 20.0` และ `B = 24.0`
- **D)** `A = 0.0` และ `B = 23.0`

#### ข้อที่ 15 (Pure Python Float Conversion Error on Empty String)
พิจารณาโค้ด Pure Python จากบทเรียน Week 03 ที่พยายามคำนวณส่วนสูง:
```python
heights = []
for row in rows:
    heights.append(float(row["height_cm"]))
```
เมื่อโปรแกรมวนลูปไปถึงแถวของ `Casemiro` ซึ่งช่อง `row["height_cm"]` เป็นสตริงว่าง (`""`) จะเกิดข้อผิดพลาดใด?
- **A)** `TypeError: could not convert NoneType to float`
- **B)** `ValueError: could not convert string to float: ''`
- **C)** `KeyError: 'height_cm'`
- **D)** `ZeroDivisionError: division by zero`

#### ข้อที่ 16 (Pandas Median Calculation with NaN)
สมมติมี Series ข้อมูลตัวเลขดังนี้:
```python
s = pd.Series([10, 20, np.nan, 40, 50])
print(s.median())
```
ผลลัพธ์ที่พิมพ์ออกมาคือเท่าใด?
- **A)** `NaN`
- **B)** `30.0`
- **C)** `20.0`
- **D)** เกิด `ValueError` เพราะมี NaN ในข้อมูล

#### ข้อที่ 17 (Safe Imputation with `df.assign()`)
พิจารณาโค้ดการจัดการข้อมูลสูญหายต่อไปนี้:
```python
med = df["age"].median()
clean_df = df.assign(age=df["age"].fillna(med))
print(df["age"].isna().sum())
print(clean_df["age"].isna().sum())
```
ผลลัพธ์ที่พิมพ์ออกมา 2 บรรทัดคือข้อใด?
- **A)** `0` แล้วตามด้วย `0`
- **B)** `1` แล้วตามด้วย `0`
- **C)** `0` แล้วตามด้วย `1`
- **D)** `1` แล้วตามด้วย `1`

#### ข้อที่ 18 (Pure Python Median Calculation Mechanics)
ในบทเรียน Week 03 การหาค่ามัธยฐานด้วย Pure Python ใช้โค้ดดังนี้:
```python
middle = sorted(heights)[len(heights) // 2]
```
เหตุใดจึงจำเป็นต้องเรียกใช้ฟังก์ชัน `sorted()` ก่อนหยิบตำแหน่งกึ่งกลาง?
- **A)** เพราะถ้าไม่ใช้ `sorted()` ข้อมูลจะไม่ถูกแปลงเป็นตัวเลข
- **B)** เพราะนิยามของมัธยฐานคือค่ากึ่งกลางของข้อมูลที่เรียงลำดับจากน้อยไปมากแล้ว หากไม่เรียงลำดับ ค่าที่หยิบมาจะเป็นเพียงข้อมูลแถวกลางๆ ที่ไม่ได้บอกตำแหน่งมัธยฐานจริง
- **C)** เพราะตัวดำเนินการ `//` ของ Python บังคับให้ใช้กับ list ที่เรียงลำดับแล้วเท่านั้น
- **D)** เพื่อลบค่าข้อมูลที่ซ้ำกันออกไปก่อนคำนวณ

---

### 🔹 Week 04: Filter Data (ข้อ 19 - 24)

#### ข้อที่ 19 (Operator Precedence & Parentheses Trap)
หากผู้เรียนเขียนโค้ดกรองข้อมูลโดย**ไม่ใส่วงเล็บ**ดังนี้:
```python
result = df[df["age"] <= 25 & df["overall"] >= 85]
```
ข้อใดอธิบายสิ่งที่ภาษา Python พยายามประมวลผลเป็นลำดับแรกได้อย่างถูกต้องตามกฎ Operator Precedence?
- **A)** Python ประมวลผล `df["age"] <= 25` ก่อน
- **B)** Python ประมวลผล `25 & df["overall"]` ก่อน เพราะตัวดำเนินการ Bitwise AND (`&`) มีลำดับความสำคัญสูงกว่าตัวดำเนินการเปรียบเทียบ (`<=`, `>=`) จึงทำให้การทำงานผิดพลาดทันที
- **C)** Python รันผ่านได้ตามปกติโดยไม่ต้องมีวงเล็บ
- **D)** Python จะกรองเฉพาะแถวที่มีอายุ 25 ปีเท่านั้น

#### ข้อที่ 20 (Series Truth Value Ambiguity Error)
เมื่อผู้เรียนเขียนเงื่อนไขกรองข้อมูลดังนี้:
```python
cond = (df["age"] <= 25) and (df["overall"] >= 85)
```
จะเกิดข้อผิดพลาดใดขึ้น?
- **A)** `TypeError: unsupported operand type for and`
- **B)** `ValueError: The truth value of a Series is ambiguous. Use a.empty, a.bool(), a.item(), a.any() or a.all().`
- **C)** `KeyError: 'and'`
- **D)** `SyntaxError: invalid syntax`

#### ข้อที่ 21 (Bitwise OR `|` vs Bitwise AND `&` Logic)
พิจารณานักเตะ 3 คนจากตารางข้อมูล:
- **Mbappe:** age = 26, overall = 91
- **Haaland:** age = 24, overall = 91
- **Pedri:** age = 22, overall = 82

หากใช้คำสั่งกรองด้วยตัวดำเนินการ `|` (Bitwise OR) ดังนี้:
```python
filtered = df[(df["age"] <= 25) | (df["overall"] >= 90)]
```
นักเตะคนใดบ้างจะ**ผ่านการคัดกรอง**เข้ามาอยู่ใน `filtered`?
- **A)** Haaland คนเดียวเท่านั้น
- **B)** ทั้ง Mbappe, Haaland, และ Pedri ผ่านทุกคน
- **C)** Mbappe และ Haaland เท่านั้น
- **D)** Haaland และ Pedri เท่านั้น

#### ข้อที่ 22 (Filtering with `.isin()`)
พิจารณาโค้ดต่อไปนี้:
```python
targets = ["Real Madrid", "Barcelona"]
mask = df["club"].isin(targets)
```
ตัวแปร `mask` ที่ได้ออกมาจะมีลักษณะโครงสร้างข้อมูลและค่าภายในเป็นอย่างไร?
- **A)** เป็น List ของชื่อสโมสรที่ตรงกับเงื่อนไข
- **B)** เป็น DataFrame ที่มีเฉพาะคอลัมน์ club
- **C)** เป็น Series ของค่า Boolean (`True`/`False`) ที่มีความยาวเท่ากับจำนวนแถวทั้งหมดของ `df`
- **D)** เป็นตัวเลขจำนวนเต็มบอกจำนวนนักเตะที่สังกัด 2 สโมสรนี้

#### ข้อที่ 23 (Query Method String Syntax)
ต้องการใช้คำสั่ง `.query()` เพื่อกรองหานักเตะที่ตำแหน่ง (`position`) เป็น `'ST'` หรือ `'RW'` และมีความแข็งแกร่ง (`physical`) ตั้งแต่ 75 ขึ้นไป โค้ดในข้อใดเขียนได้ถูกต้องสมบูรณ์?
- **A)** `df.query("position in ['ST', 'RW'] and physical >= 75")`
- **B)** `df.query(position == ['ST', 'RW'] & physical >= 75)`
- **C)** `df.query("position == ['ST', 'RW'] && physical >= 75")`
- **D)** `df.query("position.isin(['ST', 'RW']) and physical >= 75")`

#### ข้อที่ 24 (Chained Filtering & Column Selection)
พิจารณาโค้ดต่อไปนี้:
```python
sub = df.query("age <= 21")[["name", "club", "overall"]]
print(sub.shape[1])
```
ผลลัพธ์ที่พิมพ์ออกมาคือข้อใด?
- **A)** `15`
- **B)** `3`
- **C)** `4`
- **D)** `21`

---

### 🔹 Week 05: Analysis พื้นฐาน (ข้อ 25 - 30)

#### ข้อที่ 25 (Groupby Output Structure)
พิจารณาโค้ดการจัดกลุ่มข้อมูลต่อไปนี้:
```python
league_mean = df.groupby("league")["overall"].mean()
print(type(league_mean))
print(league_mean.index.name)
```
ผลลัพธ์ของ `type(league_mean)` และชื่อของ Index คือข้อใด?
- **A)** `Series` และ Index ชื่อ `'league'`
- **B)** `DataFrame` และ Index ชื่อ `'overall'`
- **C)** `dict` และ Index ไม่มีชื่อ
- **D)** `Series` และ Index ชื่อ `'overall'`

#### ข้อที่ 26 (Multi-Aggregation with `.agg()`)
พิจารณาโค้ดการสรุปข้อมูลหลายสถิติพร้อมกัน:
```python
stats = df.groupby("nationality")["pace"].agg(["count", "mean"])
print(list(stats.columns))
```
ผลลัพธ์ของ `list(stats.columns)` คือข้อใด?
- **A)** `['nationality', 'pace']`
- **B)** `['count', 'mean']`
- **C)** `['pace_count', 'pace_mean']`
- **D)** `['nationality']`

#### ข้อที่ 27 (Sorting Descending vs Ascending)
พิจารณาโค้ดการเรียงลำดับผลลัพธ์:
```python
stats = df.groupby("nationality")["pace"].agg(["count", "mean"])
sorted_stats = stats.sort_values("mean", ascending=False)
top_country = sorted_stats.index[0]
```
ฟังก์ชัน `sort_values("mean", ascending=False)` มีผลต่อลำดับข้อมูลใน `sorted_stats` อย่างไร?
- **A)** เรียงจากสัญชาติที่มี pace เฉลี่ยน้อยที่สุดไปหามากที่สุด
- **B)** เรียงจากสัญชาติที่มี pace เฉลี่ยมากที่สุดลงไปหาน้อยที่สุด ทำให้แถวแรก (`index[0]`) คือสัญชาติที่มีค่าเฉลี่ยสูงสุด
- **C)** เรียงตามจำนวนนักเตะ (count) จากมากไปน้อย
- **D)** เรียงชื่อสัญชาติตามตัวอักษร A ถึง Z

#### ข้อที่ 28 (Statistical Pitfall with Sample Size: Count vs Mean)
สมมติผลการวิเคราะห์สถิติความเร็ว (`pace`) แยกลำดับสัญชาติได้ผลดังนี้:
- **ประเทศ X:** count = 1 คน, mean = 95.0
- **ประเทศ Y:** count = 8 คน, mean = 86.5

ข้อใดอธิบายเปรียบเทียบระหว่างประเทศ X และ Y ในเชิงวิทยาศาสตร์ข้อมูลได้อย่างสมเหตุสมผลที่สุด?
- **A)** สรุปได้อย่างมั่นใจว่านักเตะสัญชาติ X ทุกคนในโลกวิ่งเร็วกว่านักเตะสัญชาติ Y อย่างแน่นอน
- **B)** ประเทศ X มีค่าเฉลี่ยสูงกว่าแต่มีตัวอย่างเพียงคนเดียว (count = 1) จึงอาจเป็นเพียงความสามารถเฉพาะบุคคล ในขณะที่ประเทศ Y มีขนาดตัวอย่าง 8 คน ค่าเฉลี่ยจึงสะท้อนภาพรวมได้น่าเชื่อถือกว่า
- **C)** ควรตัดข้อมูลประเทศ Y ทิ้งเพราะมีค่าเฉลี่ยต่ำกว่า
- **D)** ขนาดกลุ่มตัวอย่าง (count) ไม่มีผลต่อความน่าเชื่อถือของการวิเคราะห์ข้อมูล

#### ข้อที่ 29 (Groupby KeyError Diagnosis)
ผู้เรียนเขียนโค้ด:
```python
by_position = df.groupby("positions")["value_millions"].mean()
```
แล้วพบข้อผิดพลาด `KeyError: 'positions'` เมื่อเรียกดู `df.columns` พบว่าชื่อจริงคือ `'position'` (รูปเอกพจน์) โค้ดแก้ไขที่ถูกต้องและตรงจุดที่สุดคือข้อใด?
- **A)** `by_position = df.groupby("position")["value_millions"].mean()`
- **B)** `by_position = df.groupby("positions".strip())["value_millions"].mean()`
- **C)** `by_position = df.rename(columns={"position": "positions"}).groupby("positions")["value_millions"].sum()`
- **D)** `by_position = df["value_millions"].groupby("position").mean()`

#### ข้อที่ 30 (Chained Groupby & Sorting Pipeline)
พิจารณาโค้ดแบบ Pipeline จากบทเรียน Week 05:
```python
result = df.groupby("league")["overall"].mean().sort_values(ascending=False).round(1)
```
ข้อใดระบุลำดับขั้นตอนการประมวลผลของโค้ดบรรทัดนี้ได้อย่างถูกต้อง?
- **A)** ปัดเศษทศนิยม -> จัดกลุ่มแยกลีก -> หาค่าเฉลี่ย -> เรียงลำดับจากมากไปน้อย
- **B)** จัดกลุ่มแยกลีก -> เลือกคอลัมน์ overall -> คำนวณค่าเฉลี่ย -> เรียงลำดับค่าเฉลี่ยจากมากไปน้อย -> ปัดเศษทศนิยมเหลือ 1 ตำแหน่ง
- **C)** เรียงลำดับข้อมูลทั้งตาราง -> แบ่งกลุ่มแยกลีก -> ปัดเศษทศนิยม -> หาค่าเฉลี่ย
- **D)** คำนวณค่าเฉลี่ยทั้งตารางก่อน -> แล้วค่อยแยกกลุ่มตามลีก

---

## ภาคที่ 2: ข้อสอบอัตนัย / ข้อเขียน (5 ข้อ 20 คะแนน)

### ข้อเขียนที่ 1 (Week 01 - 4 คะแนน): การสำรวจมิติและตรวจจับ Relative Path
กำหนดให้ผู้เรียนเปิดไฟล์ Jupyter Notebook ที่อยู่ในโฟลเดอร์ `challenge/`
1. จงเขียนโค้ด Pandas เพื่อโหลดไฟล์ `footballers.csv` ที่อยู่ในโฟลเดอร์ `data/` เข้ามาเก็บไว้ในตัวแปร `df` ด้วย Relative Path ที่ถูกต้อง
2. แสดงตัวอย่างข้อมูล 3 แถวแรกของตาราง
3. เขียนโค้ดพิมพ์จำนวนแถวและจำนวนคอลัมน์ของตารางแยกออกมา โดยใช้ Attribute `.shape`
4. จงอธิบายว่า หากผู้เรียนเขียนโค้ด `pd.read_csv("data/footballers.csv")` จะเกิด Error ใด ทำไมจึงเกิด และมีหลักการคิดในการนับระดับโฟลเดอร์ `../` อย่างไร?

---

### ข้อเขียนที่ 2 (Week 02 - 4 คะแนน): Data Wrangling, Immutability & Case Sensitivity
จาก DataFrame `df`:
1. จงเขียนโค้ดคัดเลือกเฉพาะ 3 คอลัมน์ ได้แก่ `name`, `club`, `overall` แล้วเปลี่ยนชื่อคอลัมน์ `overall` ให้เป็น `rating` โดยบันทึกผลลงในตัวแปรชื่อ `summary`
2. กำหนดให้การทำงานนี้ต้อง**ไม่ส่งผลกระทบและไม่เปลี่ยนแปลง**ข้อมูลใน `df` เดิม โดยให้นักศึกษาเขียนคำสั่ง `print()` ตรวจสอบยืนยันว่าใน `df.columns` ยังคงมีชื่อคอลัมน์ `overall` และไม่มีคอลัมน์ `rating`
3. อธิบายในเชิงลึกว่า:
   - เหตุใดการระบุ `df["name"]` จึงได้ Series แต่ `df[["name"]]` ได้ DataFrame?
   - เหตุใดการใช้ `.copy()` จึงจำเป็นในการป้องกันคำเตือน `SettingWithCopyWarning`?

---

### ข้อเขียนที่ 3 (Week 03 - 4 คะแนน): Data Cleaning, Missing Values & Statistical Defense
ในชุดข้อมูล `footballers.csv` มีข้อมูลสูญหาย (Missing Values):
1. จงเขียนโค้ดเพื่อนับจำนวนค่าว่างในคอลัมน์ `age` และ `height_cm` ของ `df` ออกมาแสดงผล
2. จงคำนวณหาค่ามัธยฐาน (Median) ของคอลัมน์ `height_cm` แล้วสร้าง DataFrame ใหม่ชื่อ `clean_df` โดยแทนค่าว่างในคอลัมน์ `height_cm` ด้วยค่ามัธยฐานดังกล่าว โดยใช้คำสั่ง `df.assign()` ร่วมกับ `.fillna()` โดยที่ `df` เดิมต้องไม่ถูกแก้ไข
3. จงเขียนอธิบายเชิงวิเคราะห์ทางสถิติ:
   - หากเราแทนค่าส่วนสูง (`height_cm`) ที่หายไปด้วยเลข `0` จะส่งผลกระทบต่อค่าเฉลี่ย (`mean`) ของตารางอย่างไร?
   - เหตุใดในทางสถิติจึงแนะนำให้ใช้ค่ามัธยฐาน (Median) แทนค่าเฉลี่ย (Mean) เมื่อชุดข้อมูลมีความเสี่ยงที่จะมีค่าผิดปกติสุดโต่ง (Outliers)?

---

### ข้อเขียนที่ 4 (Week 04 - 4 คะแนน): Complex Filtering, Precedence & Query
ผู้เรียนต้องการกรองหานักเตะที่มีคุณสมบัติตรงตาม 3 เงื่อนไขพร้อมกัน:
- อายุ (`age`) ไม่เกิน `25` ปี
- ตำแหน่ง (`position`) เป็น `"ST"` หรือ `"RW"`
- ค่าคะแนนรวม (`overall`) ตั้งแต่ `85` ขึ้นไป

แต่เขาเขียนโค้ดดังนี้แล้วเกิด Error:
```python
result = df[df["age"] <= 25 and df["position"].isin(["ST", "RW"]) and df["overall"] >= 85]
# Error: ValueError: The truth value of a Series is ambiguous
```
จงตอบคำถามต่อไปนี้:
1. อธิบายสาเหตุของ Error นี้ และอธิบายว่าทำไมเมื่อเปลี่ยนมาใช้ `&` แล้วจึงจำเป็นต้องใส่วงเล็บ `(...)` ครอบแต่ละเงื่อนไขเสมอ (อธิบายเรื่อง Operator Precedence)?
2. จงเขียนโค้ดแก้ไขให้ถูกต้องโดยใช้วิธี Boolean Masking (ใช้เครื่องหมาย `&` และวงเล็บ) พร้อมเลือกแสดงผลเฉพาะคอลัมน์ `["name", "age", "position", "overall"]`
3. จงเขียนโค้ดทางเลือกอีก 1 วิธีโดยใช้คำสั่ง `.query()` เพื่อให้ได้ผลลัพธ์เดียวกัน

---

### ข้อเขียนที่ 5 (Week 05 - 4 คะแนน): Advanced Groupby Aggregation & Responsible Reporting
จงเขียนโค้ดและเขียนบทวิเคราะห์ข้อมูลตามข้อกำหนดต่อไปนี้:
1. เขียนโค้ด Pandas จัดกลุ่มข้อมูลตามสโมสรลีก (`league`)
2. คำนวณหาทั้ง **จำนวนนักเตะ (`count`)** และ **ค่าคะแนนเฉลี่ย (`mean`)** ของคอลัมน์ `overall` พร้อมกันในคำสั่งเดียว
3. เรียงลำดับจากลีกที่มีค่าเฉลี่ยมากที่สุดไปหาน้อยที่สุด และปัดเศษทศนิยม 1 ตำแหน่ง
4. สมมติผลลัพธ์พบว่า: ลีก **MLS** มีค่าเฉลี่ย `overall = 90.0` (`count = 1` คน คือ Messi) ในขณะที่ลีก **Premier League** มีค่าเฉลี่ย `overall = 83.5` (`count = 15` คน)
   - ให้นักศึกษาเขียนประโยคสรุปผลการวิเคราะห์อย่างมีความรับผิดชอบ (Responsible Reporting) ความยาว 3-4 ประโยค โดยมีองค์ประกอบครบทั้ง: สิ่งที่ค้นพบจากตัวเลข, กับดักทางสถิติของค่าเฉลี่ยเมื่อกลุ่มตัวอย่างเล็ก (Sample Size = 1), และข้อสรุปที่ถูกต้องตามหลักฐานพร้อมระบุข้อจำกัดของข้อมูล
