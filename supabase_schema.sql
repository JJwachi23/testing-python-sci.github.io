-- ==============================================================================
-- Supabase Schema for Python Data Science Exam (Week 01 - 05)
-- วิชา Data Science ทีละก้าว
-- ==============================================================================

-- 1. Create table for exam submissions
CREATE TABLE IF NOT EXISTS public.exam_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    student_name TEXT NOT NULL,
    student_id TEXT DEFAULT NULL,
    
    -- คะแนนส่วนปรนัย (Multiple Choice 30 ข้อ)
    score_mc INTEGER NOT NULL CHECK (score_mc >= 0 AND score_mc <= 30),
    total_mc INTEGER NOT NULL DEFAULT 30,
    percentage NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((score_mc::numeric / total_mc::numeric) * 100, 2)) STORED,
    
    -- คะแนนแยกย่อยรายสัปดาห์ (Week 1 ถึง Week 5) ในรูปแบบ JSONB
    -- ตัวอย่าง: {"week1": 6, "week2": 5, "week3": 5, "week4": 6, "week5": 5}
    week_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- คำตอบที่ผู้เรียนเลือกสำหรับข้อปรนัย 30 ข้อ
    -- ตัวอย่าง: {"1": "B", "2": "B", "3": "B", ..., "30": "B"}
    answers_mc JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- คำตอบข้อเขียน 5 ข้อ
    -- ตัวอย่าง: {"1": "โค้ด...", "2": "โค้ด...", ...}
    answers_written JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- สำหรับผู้สอนให้คะแนนข้อเขียนเพิ่มเติม (คะแนนเต็มข้อละ 4 คะแนน รวม 20 คะแนน)
    written_scores JSONB DEFAULT NULL,
    written_total_score INTEGER DEFAULT NULL CHECK (written_total_score >= 0 AND written_total_score <= 20),
    total_score INTEGER DEFAULT NULL,
    
    -- สถานะการส่งและตรวจ
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'graded')),
    teacher_feedback TEXT DEFAULT NULL
);

-- 2. Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_exam_submissions_student_name ON public.exam_submissions (student_name);
CREATE INDEX IF NOT EXISTS idx_exam_submissions_created_at ON public.exam_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_exam_submissions_score_mc ON public.exam_submissions (score_mc DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.exam_submissions ENABLE ROW LEVEL SECURITY;

-- นโยบาย RLS: อนุญาตให้ผู้เรียน (Anonymous / Public Key) ส่งคำตอบเข้าตารางได้
DROP POLICY IF EXISTS "Allow public insert" ON public.exam_submissions;
CREATE POLICY "Allow public insert" ON public.exam_submissions
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

-- นโยบาย RLS: อนุญาตให้อ่านผลคะแนนเพื่อแสดงสรุปและ Leaderboard
DROP POLICY IF EXISTS "Allow public read" ON public.exam_submissions;
CREATE POLICY "Allow public read" ON public.exam_submissions
    FOR SELECT 
    TO anon, authenticated
    USING (true);

-- นโยบาย RLS: อนุญาตให้อัปเดตคะแนน (สำหรับผู้สอนตรวจข้อเขียน)
DROP POLICY IF EXISTS "Allow authenticated update" ON public.exam_submissions;
CREATE POLICY "Allow authenticated update" ON public.exam_submissions
    FOR UPDATE 
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 4. Analytical Views for Instructor (แดชบอร์ดสรุปผลภาพรวมสำหรับผู้สอน)
-- ==============================================================================

CREATE OR REPLACE VIEW public.v_exam_overview AS
SELECT 
    COUNT(*) AS total_students,
    ROUND(AVG(score_mc), 2) AS avg_mc_score,
    MAX(score_mc) AS max_mc_score,
    MIN(score_mc) AS min_mc_score,
    ROUND(AVG(percentage), 2) AS avg_percentage,
    COUNT(*) FILTER (WHERE score_mc >= 18) AS passed_students,
    COUNT(*) FILTER (WHERE score_mc < 18) AS failed_students
FROM public.exam_submissions;

-- ตัวอย่าง Query สำหรับดึงรายงานภาพรวม:
-- SELECT * FROM public.v_exam_overview;

-- ตัวอย่าง Query สำหรับดูรายชื่อและคะแนนเรียงลำดับ:
-- SELECT student_name, student_id, score_mc, percentage, created_at 
-- FROM public.exam_submissions 
-- ORDER BY score_mc DESC, created_at ASC;
