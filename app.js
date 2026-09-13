// ==============================================================================
// Application Logic for Data Science Exam System (Week 01 - 05)
// ==============================================================================

// State
let currentTab = "all";
let userAnswers = {};      // { "1": "B", "2": "A", ... }
let writtenAnswers = {};   // { "1": "code...", ... }
let isSubmitted = false;
let examResult = null;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initSupabaseStatus();
  renderTabs();
  renderQuestions();
  updateProgress();
  setupEventListeners();
  loadSavedDraft();
});

// 1. Supabase Status Indicator & Config
async function initSupabaseStatus() {
  const badge = document.getElementById("supabase-status-badge");
  if (!badge) return;

  const isLocalServer = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port !== "";

  // 1. หากรันในเครื่องผ่าน server.py ให้ตรวจสอบ Server API
  if (isLocalServer) {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.status === "connected") {
          badge.className = "supabase-badge connected";
          badge.innerHTML = `<span>●</span> Supabase ต่อตรงเรียบร้อย (${data.submissions_count || 0} รายการ)`;
          return;
        }
      }
    } catch (e) {
      // fallback
    }
  }

  // 2. สำหรับ GitHub Pages / Cloud Hosting หรือ Direct REST API
  const isConfigured = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  if (isConfigured) {
    badge.className = "supabase-badge connected";
    badge.innerHTML = "<span>●</span> Supabase Cloud พร้อมใช้งาน";
  } else {
    badge.className = "supabase-badge disconnected";
    badge.innerHTML = isLocalServer 
      ? "<span>○</span> รัน `python3 server.py` เพื่อเชื่อมต่อ Database"
      : "<span>○</span> ยังไม่ใส่ Anon Key ใน config.js";
  }
}

// 2. Render Tabs
function renderTabs() {
  const tabsContainer = document.getElementById("nav-tabs");
  if (!tabsContainer) return;

  const tabs = [
    { id: "all", label: "ข้อสอบทั้งหมด (35 ข้อ)" },
    { id: "dashboard", label: "📊 คะแนนผู้เรียน" }
  ];

  tabsContainer.innerHTML = tabs.map(tab => `
    <button class="tab-btn ${tab.id === currentTab ? 'active' : ''}" data-tab="${tab.id}">
      ${tab.label}
    </button>
  `).join("");

  tabsContainer.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterQuestionsByTab();
    });
  });
}

// 3. Render Questions
function renderQuestions() {
  const mcContainer = document.getElementById("mc-questions-list");
  const writtenContainer = document.getElementById("written-questions-list");
  if (!mcContainer || !writtenContainer) return;

  // Render 30 Multiple Choice Questions
  mcContainer.innerHTML = EXAM_DATA.multiple_choice.map((q) => {
    return `
      <article class="question-card" id="q-card-${q.id}" data-type="mc">
        <div class="question-top">
          <span class="q-badge">ข้อที่ ${q.id} / 30</span>
        </div>
        <div class="question-text">${formatCode(q.question)}</div>
        <div class="options-list">
          ${Object.entries(q.options).map(([key, val]) => `
            <label class="option-label" id="opt-${q.id}-${key}" data-qid="${q.id}" data-choice="${key}">
              <input type="radio" name="q_${q.id}" value="${key}" ${userAnswers[q.id] === key ? 'checked' : ''} ${isSubmitted ? 'disabled' : ''}>
              <span class="option-key">${key})</span>
              <span class="option-text">${formatCode(val)}</span>
            </label>
          `).join("")}
        </div>
        <div class="explanation-box" id="explain-${q.id}" style="display: none;"></div>
      </article>
    `;
  }).join("");

  // Render 5 Written Questions
  writtenContainer.innerHTML = EXAM_DATA.written.map((w) => {
    return `
      <article class="question-card" id="written-card-${w.id}" data-type="written">
        <div class="question-top">
          <span class="q-badge" style="background:#fef3c7; color:#92400e;">ข้อเขียนที่ ${w.id} / 5</span>
          <span class="q-week">คะแนนเต็ม ${w.max_points} คะแนน</span>
        </div>
        <div class="question-text">${formatCode(w.prompt)}</div>
        <div style="margin-top: 12px;">
          <label style="font-size:0.85rem; font-weight:600; color:#475569; display:block; margin-bottom:6px;">
            พื้นที่เขียนโค้ดและคำอธิบาย:
          </label>
          <textarea class="written-textarea" id="written-${w.id}" ${isSubmitted ? 'readonly' : ''}>${writtenAnswers[w.id] || ''}</textarea>
          <div class="written-hint">คำแนะนำ: ${w.hint}</div>
        </div>
        <div class="explanation-box" id="written-explain-${w.id}" style="display: none; margin-top: 14px; background:#eff6ff; border-color:#bfdbfe; color:#1e40af;">
          <b>แนวคำตอบที่สมบูรณ์ (Model Answer):</b>
          <pre class="code-block" style="margin-top:8px;"><code>${escapeHtml(w.model_answer)}</code></pre>
        </div>
      </article>
    `;
  }).join("");

  attachQuestionInputEvents();
}

// Format Markdown-like code in questions
function formatCode(text) {
  if (!text) return "";
  // Block code ```python ... ```
  text = text.replace(/```python\n([\s\S]*?)```/g, (match, code) => {
    return `<pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre>`;
  });
  text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre>`;
  });
  // Inline code `code`
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  // Newlines to <br> for regular text
  text = text.replace(/\n/g, "<br>");
  return text;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 4. Attach Events for Radio & Textarea
function attachQuestionInputEvents() {
  // Option selection
  document.querySelectorAll(".option-label").forEach(label => {
    label.addEventListener("click", (e) => {
      if (isSubmitted) return;
      const qid = label.dataset.qid;
      const choice = label.dataset.choice;
      const radio = label.querySelector("input[type='radio']");
      if (radio) radio.checked = true;

      userAnswers[qid] = choice;
      saveDraft();
      updateSelectedStyles(qid, choice);
      updateProgress();
    });
  });

  // Written answers
  document.querySelectorAll(".written-textarea").forEach(textarea => {
    textarea.addEventListener("input", () => {
      const id = textarea.id.replace("written-", "");
      writtenAnswers[id] = textarea.value;
      saveDraft();
      updateProgress();
    });
  });
}

function updateSelectedStyles(qid, choice) {
  document.querySelectorAll(`[data-qid="${qid}"]`).forEach(el => el.classList.remove("selected"));
  const selected = document.getElementById(`opt-${qid}-${choice}`);
  if (selected) selected.classList.add("selected");
}

// 5. Filter Questions by Current Tab
function filterQuestionsByTab() {
  const mcSection = document.getElementById("mc-section");
  const writtenSection = document.getElementById("written-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const studentCard = document.querySelector(".student-card");
  const progressWrapper = document.querySelector(".progress-wrapper");
  const submitBar = document.querySelector(".submit-bar");

  if (currentTab === "dashboard") {
    if (mcSection) mcSection.style.display = "none";
    if (writtenSection) writtenSection.style.display = "none";
    if (studentCard) studentCard.style.display = "none";
    if (progressWrapper) progressWrapper.style.display = "none";
    if (submitBar) submitBar.style.display = "none";
    if (dashboardSection) dashboardSection.style.display = "block";
    loadTeacherDashboard();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // Restore layout for exam view ('all')
  if (studentCard) studentCard.style.display = "block";
  if (progressWrapper) progressWrapper.style.display = "block";
  if (submitBar) submitBar.style.display = "flex";
  if (dashboardSection) dashboardSection.style.display = "none";
  if (mcSection) mcSection.style.display = "block";
  if (writtenSection) writtenSection.style.display = "block";
  document.querySelectorAll(".question-card").forEach(card => card.style.display = "block");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 6. Update Progress Bar
function updateProgress() {
  const totalMC = EXAM_DATA.multiple_choice.length;
  const answeredMC = Object.keys(userAnswers).length;
  const totalWritten = EXAM_DATA.written.length;
  const answeredWritten = Object.values(writtenAnswers).filter(t => t.trim().length > 0).length;

  const totalAnswered = answeredMC + answeredWritten;
  const totalQuestions = totalMC + totalWritten;
  const pct = Math.round((totalAnswered / totalQuestions) * 100);

  const fill = document.getElementById("progress-fill");
  const text = document.getElementById("progress-text");
  if (fill) fill.style.width = `${pct}%`;
  if (text) text.innerText = `ทำแล้ว ${totalAnswered} / ${totalQuestions} ข้อ (${pct}%)`;

  const submitStats = document.getElementById("submit-stats");
  if (submitStats) {
    submitStats.innerText = `ตอบข้อกาแล้ว ${answeredMC}/30 ข้อ · ตอบข้อเขียนแล้ว ${answeredWritten}/5 ข้อ`;
  }
}

// 7. Grade Multiple Choice and Calculate Scores
function gradeExam() {
  let score = 0;
  const weekScores = { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 };
  const weekTotals = { week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 };

  EXAM_DATA.multiple_choice.forEach(q => {
    const userChoice = userAnswers[q.id];
    const isCorrect = userChoice === q.answer;
    const weekKey = `week${q.week}`;

    weekTotals[weekKey] += 1;
    if (isCorrect) {
      score += 1;
      weekScores[weekKey] += 1;
    }

    // Display Review Styles
    const card = document.getElementById(`q-card-${q.id}`);
    const explainBox = document.getElementById(`explain-${q.id}`);
    
    // Highlight correct & user choices
    Object.keys(q.options).forEach(optKey => {
      const optLabel = document.getElementById(`opt-${q.id}-${optKey}`);
      if (!optLabel) return;
      optLabel.classList.remove("selected", "correct", "incorrect");
      
      if (optKey === q.answer) {
        optLabel.classList.add("correct");
      } else if (optKey === userChoice && !isCorrect) {
        optLabel.classList.add("incorrect");
      }
    });

    if (explainBox) {
      explainBox.style.display = "block";
      if (isCorrect) {
        explainBox.className = "explanation-box";
        explainBox.innerHTML = `<b>✓ ถูกต้อง (+1 คะแนน):</b> ${q.explanation}`;
      } else {
        explainBox.className = "explanation-box wrong";
        explainBox.innerHTML = `<b>✗ ตอบผิด (คุณเลือก ${userChoice || "ยังไม่ตอบ"} | คำตอบที่ถูกคือ ${q.answer}):</b> ${q.explanation}`;
      }
    }
  });

  // Reveal written solutions
  EXAM_DATA.written.forEach(w => {
    const explainBox = document.getElementById(`written-explain-${w.id}`);
    if (explainBox) explainBox.style.display = "block";
  });

  return {
    score_mc: score,
    total_mc: EXAM_DATA.multiple_choice.length,
    percentage: ((score / EXAM_DATA.multiple_choice.length) * 100).toFixed(1),
    weekScores,
    weekTotals
  };
}

// 8. Submit to Supabase
async function submitExamToSupabase(payload) {
  const isLocalServer = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port !== "";

  // 1. ถ้าเป็น Local Server ในเครื่อง ให้ส่งผ่าน Server API
  if (isLocalServer) {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          return { success: true, data: data, source: "Supabase PostgreSQL (Live)" };
        }
      }
    } catch (e) {
      // API endpoint ไม่พร้อมทำงานหรือไม่รองรับ
    }
  }

  // 2. สำหรับ GitHub Pages / Cloud Hosting: ส่งผ่าน Supabase REST API Direct
  if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    const endpoint = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}`;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_CONFIG.anonKey,
          "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
          "Prefer": "return=representation"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Supabase error response:", errorText);
        return { success: false, error: errorText };
      }

      const data = await res.json();
      return { success: true, data: data[0], source: "Supabase REST API" };
    } catch (err) {
      console.error("Network error submitting to Supabase:", err);
      return { success: false, error: err.message };
    }
  }

  return { success: false, reason: "not_configured" };
}

// 9. Handle Exam Submission Flow
async function handleSubmitExam() {
  const studentNameInput = document.getElementById("student-name");
  const studentName = studentNameInput ? studentNameInput.value.trim() : "";

  if (!studentName) {
    showToast("กรุณากรอกชื่อ-นามสกุลก่อนส่งข้อสอบ", "error");
    if (studentNameInput) studentNameInput.focus();
    return;
  }

  const answeredMC = Object.keys(userAnswers).length;
  if (answeredMC < EXAM_DATA.multiple_choice.length) {
    const confirm = window.confirm(`คุณยังตอบข้อสอบปรนัยไม่ครบ (ตอบไปแล้ว ${answeredMC}/30 ข้อ) ต้องการส่งข้อสอบเลยหรือไม่?`);
    if (!confirm) return;
  }

  isSubmitted = true;
  examResult = gradeExam();

  const payload = {
    student_name: studentName,
    student_id: studentName,
    score_mc: examResult.score_mc,
    total_mc: examResult.total_mc,
    week_scores: examResult.weekScores,
    answers_mc: userAnswers,
    answers_written: writtenAnswers,
    status: "submitted"
  };

  // Save to local storage
  const localHistory = JSON.parse(window.localStorage.getItem("exam_submissions_history") || "[]");
  localHistory.unshift({ ...payload, submitted_at: new Date().toISOString() });
  window.localStorage.setItem("exam_submissions_history", JSON.stringify(localHistory));

  // Show loading indicator in button
  const submitBtn = document.getElementById("btn-submit-exam");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "กำลังบันทึกคะแนนเข้า Database...";
  }

  // Sync to Supabase
  const syncResult = await submitExamToSupabase(payload);

  if (submitBtn) {
    submitBtn.innerText = "ส่งข้อสอบแล้ว (ดูผลคะแนน)";
  }

  // Open Result Modal
  showResultModal(examResult, syncResult);
  showToast("ส่งข้อสอบและตรวจคะแนนเรียบร้อยแล้ว!", "success");
}

// 10. Display Result Modal
function showResultModal(result, syncResult) {
  const modal = document.getElementById("result-modal");
  if (!modal) return;

  const scoreNum = document.getElementById("modal-score-num");
  const badge = document.getElementById("modal-score-badge");
  const grid = document.getElementById("modal-week-grid");
  const syncMsg = document.getElementById("modal-sync-msg");

  if (scoreNum) scoreNum.innerText = result.score_mc;
  
  const passed = result.score_mc >= EXAM_DATA.passing_score;
  if (badge) {
    badge.className = `score-badge ${passed ? 'passed' : 'failed'}`;
    badge.innerText = passed 
      ? `ผ่านเกณฑ์ประเมิน (คิดเป็น ${result.percentage}%)` 
      : `ยังไม่ผ่านเกณฑ์ (ต้องได้ 18/30 ขึ้นไป)`;
  }

  if (grid) {
    grid.innerHTML = Object.entries(result.weekScores).map(([week, score], idx) => `
      <div class="week-score-box">
        <span>ส่วนที่ ${idx + 1}</span>
        <b>${score} / 6</b>
      </div>
    `).join("");
  }

  if (syncMsg) {
    if (syncResult && syncResult.success) {
      syncMsg.innerHTML = `
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; color:#15803d; padding:12px; border-radius:8px; font-size:0.9rem;">
          <b>✓ บันทึกคะแนนลง Supabase สำเร็จ</b><br>
          <span style="font-size:0.8rem; color:#166534;">Submission ID: ${syncResult.data.id}</span>
        </div>
      `;
    } else if (syncResult && syncResult.reason === "not_configured") {
      syncMsg.innerHTML = `
        <div style="background:#fffbeb; border:1px solid #fde68a; color:#b45309; padding:12px; border-radius:8px; font-size:0.88rem;">
          <b>ℹ️ บันทึกคะแนนลงในเครื่อง (Local Storage) แล้ว</b><br>
          หากต้องการส่งคะแนนเข้า Supabase กรุณากดปุ่ม <b>"ตั้งค่า Supabase"</b> ที่แถบด้านบน
        </div>
      `;
    } else {
      syncMsg.innerHTML = `
        <div style="background:#fef2f2; border:1px solid #fecaca; color:#b91c1c; padding:12px; border-radius:8px; font-size:0.88rem;">
          <b>⚠️ ไม่สามารถบันทึกเข้า Supabase ได้:</b> ${syncResult.error || "เกิดข้อผิดพลาดในการเชื่อมต่อ"}<br>
          (ระบบได้สำรองข้อมูลไว้ในเครื่องเรียบร้อยแล้ว)
        </div>
      `;
    }
  }

  modal.classList.add("open");
}

// 11. Teacher Dashboard: Load Submissions from Supabase or LocalStorage
// 11. Teacher Dashboard: Load Submissions from Supabase or LocalStorage
let currentSubmissionsList = [];

async function loadTeacherDashboard() {
  const container = document.getElementById("dashboard-content");
  if (!container) return;

  container.innerHTML = `<div style="text-align:center; padding:40px; color:#64748b;">กำลังโหลดข้อมูลจาก Database...</div>`;

  let submissions = [];
  const isLocalServer = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port !== "";
  let source = isLocalServer ? "Supabase PostgreSQL (Live)" : "Supabase Cloud Database";

  // 1. ลองดึงผ่าน Server API ก่อน (หากรันในเครื่องผ่าน server.py)
  if (isLocalServer) {
    try {
      const res = await fetch("/api/submissions", { cache: "no-store" });
      if (res.ok) {
        submissions = await res.json();
      }
    } catch (e) {
      console.warn("Local server fetch failed:", e);
    }
  }

  // 2. ถ้ายังไม่ได้ ให้ลองดึงผ่าน Supabase REST API
  if ((!submissions || submissions.length === 0) && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      const endpoint = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}?select=*&order=created_at.desc`;
      const res = await fetch(endpoint, {
        headers: {
          "apikey": SUPABASE_CONFIG.anonKey,
          "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (res.ok) {
        submissions = await res.json();
        source = "Supabase REST API";
      }
    } catch (err) {
      console.warn("Could not fetch from Supabase REST:", err);
    }
  }

  // 3. ถ้าไม่มีการเชื่อมต่อ ให้ใช้ข้อมูลสำรองใน Local Storage
  if (!submissions || submissions.length === 0) {
    submissions = JSON.parse(window.localStorage.getItem("exam_submissions_history") || "[]");
    source = "Local Storage (ในเครื่อง)";
  }

  currentSubmissionsList = submissions || [];

  if (currentSubmissionsList.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:50px; background:#fff; border-radius:12px; border:1px solid #e2e8f0; margin-top:20px;">
        <h3 style="color:#64748b; margin-bottom:8px;">ยังไม่มีข้อมูลการส่งข้อสอบ</h3>
        <p style="font-size:0.9rem; color:#94a3b8;">เมื่อผู้เรียนทำข้อสอบและกดส่ง ข้อมูลคะแนนจะปรากฏที่นี่ทันที</p>
      </div>
    `;
    return;
  }

  const avgScore = (currentSubmissionsList.reduce((acc, curr) => acc + (curr.score_mc || 0), 0) / currentSubmissionsList.length).toFixed(1);
  const maxScore = Math.max(...currentSubmissionsList.map(s => s.score_mc || 0));

  container.innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin: 20px 0;">
      <div style="background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:10px;">
        <span style="font-size:0.8rem; color:#64748b;">จำนวนผู้ส่งข้อสอบ</span>
        <h2 style="font-size:1.8rem; color:#1e293b; margin-top:4px;">${currentSubmissionsList.length} คน</h2>
      </div>
      <div style="background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:10px;">
        <span style="font-size:0.8rem; color:#64748b;">คะแนนปรนัยเฉลี่ย</span>
        <h2 style="font-size:1.8rem; color:#2563eb; margin-top:4px;">${avgScore} / 30</h2>
      </div>
      <div style="background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:10px;">
        <span style="font-size:0.8rem; color:#64748b;">คะแนนปรนัยสูงสุด</span>
        <h2 style="font-size:1.8rem; color:#16a34a; margin-top:4px;">${maxScore} / 30</h2>
      </div>
      <div style="background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:10px;">
        <span style="font-size:0.8rem; color:#64748b;">แหล่งข้อมูล</span>
        <h3 style="font-size:1rem; color:#475569; margin-top:8px;">${source}</h3>
      </div>
    </div>

    <div class="submissions-table-wrapper">
      <table class="submissions-table">
        <thead>
          <tr>
            <th style="width: 60px; text-align:center;">ลำดับ</th>
            <th>ชื่อ - นามสกุล</th>
            <th style="width: 180px;">คะแนนข้อเลือกตอบ</th>
            <th style="width: 120px;">คิดเป็นร้อยละ</th>
            <th style="width: 180px;">เวลาที่ส่ง</th>
            <th style="width: 150px; text-align:center;">ตรวจคำตอบ</th>
          </tr>
        </thead>
        <tbody>
          ${currentSubmissionsList.map((sub, idx) => {
            const dateStr = sub.created_at || sub.submitted_at 
              ? new Date(sub.created_at || sub.submitted_at).toLocaleString("th-TH")
              : "-";
            const scoreClass = sub.score_mc >= 18 ? 'high' : 'low';
            const pct = ((sub.score_mc / 30) * 100).toFixed(1);
            return `
              <tr>
                <td style="text-align:center; color:#64748b;">${idx + 1}</td>
                <td>
                  <b style="font-size:0.95rem; color:#1e293b;">${escapeHtml(sub.student_name)}</b>
                </td>
                <td>
                  <span class="score-tag-mc ${scoreClass}">
                    <b>${sub.score_mc}</b> / 30
                  </span>
                </td>
                <td><b>${pct}%</b></td>
                <td style="font-size:0.85rem; color:#64748b;">${dateStr}</td>
                <td style="text-align:center;">
                  <button class="btn btn-primary btn-sm" onclick="openStudentDetail(${idx})" title="กดเพื่อดูตัวเลือกที่ผู้เรียนตอบในแต่ละข้อ">
                    🔍 ดูคำตอบที่เลือก
                  </button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// 12. View Student Selected Answers (Does NOT show correct answers)
function openStudentDetail(idx) {
  const sub = currentSubmissionsList[idx];
  if (!sub) return;

  const modal = document.getElementById("student-detail-modal");
  const title = document.getElementById("detail-student-title");
  const subtitle = document.getElementById("detail-student-subtitle");
  const body = document.getElementById("detail-modal-body");
  if (!modal || !body) return;

  const dateStr = sub.created_at || sub.submitted_at
    ? new Date(sub.created_at || sub.submitted_at).toLocaleString("th-TH")
    : "-";

  let answersMC = sub.answers_mc;
  if (typeof answersMC === "string") {
    try { answersMC = JSON.parse(answersMC); } catch (e) { answersMC = {}; }
  }
  answersMC = answersMC || {};

  let answersWritten = sub.answers_written;
  if (typeof answersWritten === "string") {
    try { answersWritten = JSON.parse(answersWritten); } catch (e) { answersWritten = {}; }
  }
  answersWritten = answersWritten || {};

  const scorePct = ((sub.score_mc / 30) * 100).toFixed(1);
  const passText = sub.score_mc >= 18 ? "ผ่านเกณฑ์" : "ยังไม่ผ่านเกณฑ์";
  const passColor = sub.score_mc >= 18 ? "#15803d" : "#b91c1c";

  title.innerHTML = `📋 กระดาษคำตอบของ: <b>${escapeHtml(sub.student_name)}</b>`;
  subtitle.innerHTML = `คะแนนข้อเลือกตอบ: <b style="color:${passColor}; font-size:1rem;">${sub.score_mc} / 30 คะแนน</b> (${scorePct}% - ${passText}) · ส่งเมื่อ: ${dateStr}`;

  let html = `
    <div class="inspection-notice">
      <span style="font-size:1.1rem;">🔒</span>
      <div>
        <b>โหมดตรวจสอบคำตอบของผู้เรียน:</b> หน้านี้แสดงเฉพาะตัวเลือกที่นักเรียนคนนี้กดตอบในแต่ละข้อ <i>(ระบบไม่แสดงเฉลยข้อที่ถูกต้องตามที่กำหนด)</i>
      </div>
    </div>
  `;

  // Render 30 Multiple Choice Questions
  EXAM_DATA.multiple_choice.forEach((q) => {
    const studentPick = answersMC[String(q.id)] || answersMC[q.id] || null;
    const isAnswered = Boolean(studentPick);

    html += `
      <div class="inspection-q-card">
        <div class="inspection-q-header">
          <span class="inspection-q-num">ข้อที่ ${q.id}</span>
          ${isAnswered
            ? `<span class="inspection-student-tag">ผู้เรียนเลือก: ข้อ [${studentPick}]</span>`
            : `<span class="inspection-student-tag empty">ผู้เรียนไม่ได้ตอบข้อนี้</span>`}
        </div>

        <div class="question-text" style="font-size:0.92rem; margin-bottom:12px;">
          ${formatCode(q.question)}
        </div>

        <div class="inspection-opt-list">
    `;

    Object.entries(q.options).forEach(([key, val]) => {
      const isSelected = (studentPick === key);
      html += `
        <div class="inspection-opt ${isSelected ? 'selected-by-student' : ''}">
          <span class="inspection-opt-indicator">${isSelected ? '🔘' : '⚪'}</span>
          <span style="font-weight:700; width:22px; flex-shrink:0;">${key})</span>
          <span style="flex:1;">${formatCode(val)}</span>
          ${isSelected ? `<span class="student-choice-pill">👈 คำตอบที่นักเรียนเลือก</span>` : ''}
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  // Render Written Questions (if any)
  const writtenKeys = Object.keys(answersWritten).filter(k => answersWritten[k] && answersWritten[k].trim().length > 0);
  if (writtenKeys.length > 0) {
    html += `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px dashed #cbd5e1;">
        <h4 style="font-size:1.1rem; color:#1e293b; margin-bottom:14px;">📝 คำตอบข้อสอบอัตนัย / ข้อเขียน (5 ข้อ)</h4>
    `;

    EXAM_DATA.written.forEach(w => {
      const studentAns = answersWritten[String(w.id)] || answersWritten[w.id] || "(ไม่ได้ตอบข้อนี้)";
      html += `
        <div class="inspection-q-card" style="background:#fafafa;">
          <div class="inspection-q-header">
            <span class="inspection-q-num">ข้อเขียนที่ ${w.id}: ${escapeHtml(w.title)} (${w.max_points} คะแนน)</span>
          </div>
          <div class="question-text" style="font-size:0.88rem; color:#475569; margin-bottom:10px;">
            ${formatCode(w.prompt)}
          </div>
          <label style="font-size:0.82rem; font-weight:700; color:#334155; display:block; margin-bottom:4px;">
            คำตอบที่ผู้เรียนเขียน:
          </label>
          <pre class="code-block" style="background:#0f172a; color:#f8fafc; padding:12px; border-radius:6px; font-family:monospace; font-size:0.88rem; white-space:pre-wrap; overflow-x:auto;"><code>${escapeHtml(studentAns)}</code></pre>
        </div>
      `;
    });

    html += `</div>`;
  }

  body.innerHTML = html;
  modal.classList.add("open");
}

// 12. LocalStorage Draft Management
function saveDraft() {
  const studentNameInput = document.getElementById("student-name");
  const draft = {
    student_name: studentNameInput ? studentNameInput.value : "",
    userAnswers,
    writtenAnswers
  };
  window.localStorage.setItem("exam_current_draft", JSON.stringify(draft));
}

function loadSavedDraft() {
  const saved = window.localStorage.getItem("exam_current_draft");
  if (!saved) return;
  try {
    const draft = JSON.parse(saved);
    if (draft.student_name) {
      const el = document.getElementById("student-name");
      if (el) el.value = draft.student_name;
    }
    if (draft.userAnswers) {
      userAnswers = draft.userAnswers;
      Object.entries(userAnswers).forEach(([qid, choice]) => {
        updateSelectedStyles(qid, choice);
        const radio = document.querySelector(`input[name="q_${qid}"][value="${choice}"]`);
        if (radio) radio.checked = true;
      });
    }
    if (draft.writtenAnswers) {
      writtenAnswers = draft.writtenAnswers;
      Object.entries(writtenAnswers).forEach(([wid, text]) => {
        const textarea = document.getElementById(`written-${wid}`);
        if (textarea) textarea.value = text;
      });
    }
    updateProgress();
  } catch (e) {
    console.error("Error loading draft:", e);
  }
}

// 13. Event Listeners Setup
function setupEventListeners() {
  // Submit Button
  const submitBtn = document.getElementById("btn-submit-exam");
  if (submitBtn) {
    submitBtn.addEventListener("click", handleSubmitExam);
  }



  // Result Modal Close
  const closeResultBtn = document.getElementById("btn-close-result");
  const resultModal = document.getElementById("result-modal");
  if (closeResultBtn && resultModal) {
    closeResultBtn.addEventListener("click", () => {
      resultModal.classList.remove("open");
      // Switch to review mode on tab 'all'
      currentTab = "all";
      renderTabs();
      filterQuestionsByTab();
    });
  }

  // Dashboard Refresh Button
  const refreshBtn = document.getElementById("btn-refresh-dashboard");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", async () => {
      refreshBtn.disabled = true;
      refreshBtn.innerText = "กำลังโหลด...";
      await loadTeacherDashboard();
      refreshBtn.disabled = false;
      refreshBtn.innerText = "🔄 รีเฟรช";
      showToast("รีเฟรชข้อมูลแดชบอร์ดเรียบร้อยแล้ว", "success");
    });
  }

  // Student Detail Modal Close Buttons
  const detailModal = document.getElementById("student-detail-modal");
  const closeDetailBtn = document.getElementById("btn-close-detail");
  const closeDetailFooterBtn = document.getElementById("btn-close-detail-footer");
  if (closeDetailBtn && detailModal) {
    closeDetailBtn.addEventListener("click", () => detailModal.classList.remove("open"));
  }
  if (closeDetailFooterBtn && detailModal) {
    closeDetailFooterBtn.addEventListener("click", () => detailModal.classList.remove("open"));
  }
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) detailModal.classList.remove("open");
    });
  }

  // Student Input listeners for autosave
  const studentNameInput = document.getElementById("student-name");
  if (studentNameInput) studentNameInput.addEventListener("input", saveDraft);
}

// 14. Toast Notification Utility
function showToast(msg, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
