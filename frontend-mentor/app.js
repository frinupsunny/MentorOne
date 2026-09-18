/* ============================================================
   MentorOne — Mentor app frontend
   Talks to the same Express backend as the Mentee app, but only
   ever uses /api/auth/mentor-login and /api/mentor/* routes.
   ============================================================ */

const API = '';

let state = {
  token: localStorage.getItem('mentor_token') || null,
  mentor: null,
  mentees: [],
  sessions: [],
  findMentees: [],
  notices: [],
  slotTemplate: [],
  reschedulingSessionId: null,
  selectedSlot: null,
  remarkCells: [],
  recordTimerHandle: null,
  recordSeconds: 0,
  recording: false
};

// ---------------------------------------------------------------
// API helper
// ---------------------------------------------------------------
async function api(path, opts = {}) {
  const headers = Object.assign(
    { 'Content-Type': 'application/json' },
    state.token ? { Authorization: `Bearer ${state.token}` } : {},
    opts.headers || {}
  );
  const res = await fetch(API + path, { ...opts, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.error || body.message || 'Request failed');
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

// ---------------------------------------------------------------
// Boot
// ---------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-pass').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
  });
  if (state.token) {
    enterApp().catch(() => {
      localStorage.removeItem('mentor_token');
      state.token = null;
    });
  }
});

// ---------------------------------------------------------------
// Auth (dedicated mentor login — separate route, separate page)
// ---------------------------------------------------------------
async function doLogin() {
  const empId = document.getElementById('login-empid').value.trim();
  const pass = document.getElementById('login-pass').value;
  const errBox = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');
  errBox.style.display = 'none';
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Signing in...';
  try {
    const res = await api('/api/auth/mentor-login', {
      method: 'POST',
      body: JSON.stringify({ employeeId: empId, password: pass })
    });
    state.token = res.token;
    state.mentor = res.mentor;
    localStorage.setItem('mentor_token', res.token);
    await enterApp();
  } catch (e) {
    errBox.textContent = e.body?.error || 'Could not sign in. Check your details and try again.';
    errBox.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign in';
  }
}

function logout() {
  api('/api/auth/logout', { method: 'POST' }).catch(() => {});
  localStorage.removeItem('mentor_token');
  state = { ...state, token: null, mentor: null };
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-empid').value = '';
  document.getElementById('login-pass').value = '';
}

async function enterApp() {
  const dash = await api('/api/mentor/dashboard');
  state.mentor = dash.mentor;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('topbar-av').textContent = initials(state.mentor.name);
  document.getElementById('topbar-name').textContent = state.mentor.name;

  renderHome(dash);
  await Promise.all([loadMentees(), loadSessions(), loadFindMentees(), loadNotices(), loadSlotTemplate()]);
  showPage('home');
}

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Page routing
// ---------------------------------------------------------------
function showPage(name) {
  document.querySelectorAll('.panel-page').forEach((p) => p.classList.add('hidden'));
  document.getElementById('page-' + name).classList.remove('hidden');
  document.querySelectorAll('.slink').forEach((s) => s.classList.remove('active'));
  const link = document.querySelector(`.slink[data-page="${name}"]`);
  if (link) link.classList.add('active');

  if (name === 'mentees') renderMenteesPage();
  if (name === 'findmentees') renderFindMenteesPage();
  if (name === 'requests') renderRequestsPage();
  if (name === 'groupmeet') renderGroupMeetPage();
  if (name === 'otp') renderOtpPage();
  if (name === 'remarks') renderRemarksPage();
  if (name === 'critical') renderCriticalPage();
  if (name === 'notices') renderNotices();
  if (name === 'feedback') renderFeedbackReceived();
  if (name === 'profile') renderProfilePage();
}

// ---------------------------------------------------------------
// Home / Dashboard
// ---------------------------------------------------------------
function renderHome(dash) {
  document.getElementById('home-sub').textContent = `${dash.mentor.designation} · ${dash.mentor.department}`;
  document.getElementById('stat-mentees').textContent = `${dash.stats.activeMentees} / ${dash.stats.capacity}`;
  document.getElementById('stat-sessions').textContent = dash.stats.sessionsThisMonth;
  document.getElementById('stat-pending').textContent = dash.stats.pendingRequests;

  const pendingBox = document.getElementById('home-pending-sessions');
  pendingBox.innerHTML = dash.pendingSessions.length
    ? dash.pendingSessions.map(sessionRow).join('')
    : '<div style="font-size:13px;color:var(--muted)">No pending session requests.</div>';

  const reqBox = document.getElementById('home-mentee-requests');
  reqBox.innerHTML = dash.menteeRequests.length
    ? dash.menteeRequests
        .map(
          (r) => `
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border)">
        <div class="row-start"><div class="av av-teal">${initials(r.menteeName)}</div><div><b style="font-size:13px">${escapeHtml(r.menteeName)}</b><div style="font-size:11px;color:var(--muted)">${escapeHtml(r.mentee.programme)} · Sem ${r.mentee.semester} · requested ${escapeHtml(r.createdAt)}</div></div></div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-blue btn-xs" onclick="respondMenteeRequest('${r.id}','accept')">Accept</button>
          <button class="btn btn-red btn-xs" onclick="respondMenteeRequest('${r.id}','decline')">Decline</button>
        </div>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No mentees are currently requesting you.</div>';

  const glanceBox = document.getElementById('home-mentee-glance');
  glanceBox.innerHTML = dash.mentees.length
    ? dash.mentees
        .map(
          (m) => `
      <div class="row" style="padding:9px 0;border-bottom:1px solid var(--border)">
        <div class="row-start"><div class="av av-teal">${initials(m.name)}</div><span style="font-size:13px">${escapeHtml(m.name)}</span></div>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:12px;color:var(--muted)">Attendance ${m.attendance}%</span>
          <span style="font-size:12px;color:var(--muted)">CGPA ${m.cgpa}</span>
          ${m.status === 'At risk' ? '<span class="badge b-red">At risk</span>' : '<span class="badge b-green">Good standing</span>'}
        </div>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">You have no mentees yet.</div>';
}

async function respondMenteeRequest(requestId, action) {
  try {
    const res = await api(`/api/mentor/mentee-requests/${requestId}/respond`, {
      method: 'POST',
      body: JSON.stringify({ action })
    });
    alert(res.message);
    await refreshEverything();
  } catch (e) {
    alert(e.message);
  }
}

async function refreshEverything() {
  const dash = await api('/api/mentor/dashboard');
  renderHome(dash);
  await Promise.all([loadMentees(), loadSessions(), loadFindMentees()]);
  // re-render whichever page is currently visible
  const visible = Array.from(document.querySelectorAll('.panel-page')).find((p) => !p.classList.contains('hidden'));
  if (visible) showPage(visible.id.replace('page-', ''));
}

function sessionRow(s) {
  const badge =
    s.status === 'confirmed' ? '<span class="badge b-blue">Confirmed</span>' :
    s.status === 'declined' ? '<span class="badge b-red">Declined</span>' :
    s.status === 'completed' ? '<span class="badge b-green">Completed</span>' :
    '<span class="badge b-amber">Pending</span>';
  const actions =
    s.status === 'pending'
      ? `<button class="btn btn-blue btn-xs" onclick="respondSession('${s.id}','accept')">Accept</button>
         <button class="btn btn-xs" onclick="startMentorReschedule('${s.id}')">Reschedule</button>
         <button class="btn btn-red btn-xs" onclick="respondSession('${s.id}','decline')">Decline</button>`
      : '';
  return `
    <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:8px">
      <div><div style="font-size:13px;font-weight:500">${escapeHtml(s.title)} · ${escapeHtml(s.menteeName || '')}</div><div style="font-size:12px;color:var(--muted)">${escapeHtml(s.label)} · ${escapeHtml(s.timeLabel)} · ${escapeHtml(s.mode)}</div></div>
      <div style="display:flex;gap:6px;align-items:center">${badge} ${actions}</div>
    </div>`;
}

async function respondSession(sessionId, action) {
  try {
    await api(`/api/mentor/sessions/${sessionId}/respond`, { method: 'POST', body: JSON.stringify({ action }) });
    await refreshEverything();
  } catch (e) {
    alert(e.message);
  }
}

// ---------------------------------------------------------------
// My Mentees
// ---------------------------------------------------------------
async function loadMentees() {
  state.mentees = await api('/api/mentor/mentees');
}
function renderMenteesPage() {
  const box = document.getElementById('mentees-list');
  box.innerHTML = state.mentees.length
    ? state.mentees
        .map(
          (m) => `
    <div class="card">
      <div class="row" style="margin-bottom:10px">
        <div class="row-start"><div class="av av-teal av-lg">${initials(m.name)}</div><div><div style="font-weight:600">${escapeHtml(m.name)}</div><div style="font-size:12px;color:var(--muted)">${escapeHtml(m.programme)} · Sem ${m.semester} · Sec ${escapeHtml(m.section)} · Reg ${escapeHtml(m.registerNo)}</div></div></div>
        ${m.status === 'At risk' ? '<span class="badge b-red">At risk</span>' : '<span class="badge b-green">Good standing</span>'}
      </div>
      <div class="grid2" style="margin-bottom:12px">
        <div><div style="font-size:11px;color:var(--muted)">Attendance</div><div style="font-weight:600">${m.attendance}%</div><div class="prog-outer"><div class="prog-inner" style="width:${m.attendance}%;background:${m.attendance < 75 ? 'var(--red)' : 'var(--green)'}"></div></div></div>
        <div><div style="font-size:11px;color:var(--muted)">CGPA</div><div style="font-weight:600">${m.cgpa} / 10</div></div>
        <div><div style="font-size:11px;color:var(--muted)">Backlogs</div><div style="font-weight:600">${m.backlogs}</div></div>
        <div><div style="font-size:11px;color:var(--muted)">Sessions completed</div><div style="font-weight:600">${m.sessionCount}</div></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-blue btn-xs" onclick="showPage('remarks');document.getElementById('remarks-mentee-select').value='${m.id}';loadRemarksForMentee()">📝 Remarks</button>
      </div>
    </div>`
        )
        .join('')
    : '<div class="notice notice-blue">You have no mentees yet — visit Find Mentees to take on new ones.</div>';
}

// ---------------------------------------------------------------
// Find Mentees
// ---------------------------------------------------------------
async function loadFindMentees() {
  state.findMentees = await api('/api/mentor/find-mentees');
}
function renderFindMenteesPage() {
  const box = document.getElementById('findmentees-list');
  box.innerHTML = state.findMentees.length
    ? state.findMentees
        .map(
          (m) => `
    <div class="card">
      <div class="row">
        <div class="row-start"><div class="av av-teal">${initials(m.name)}</div><div><b style="font-size:13px">${escapeHtml(m.name)}</b><div style="font-size:12px;color:var(--muted)">${escapeHtml(m.programme)} · Sem ${m.semester} · No mentor yet</div></div></div>
        <button class="btn btn-blue btn-xs" onclick="sendMenteeRequest('${m.id}')">📨 Send request</button>
      </div>
    </div>`
        )
        .join('')
    : '<div class="notice notice-green">Every student in the department currently has a mentor.</div>';
}
async function sendMenteeRequest(menteeId) {
  try {
    const res = await api('/api/mentor/mentee-requests', { method: 'POST', body: JSON.stringify({ menteeId }) });
    alert(res.message);
  } catch (e) {
    alert(e.message);
  }
}

// ---------------------------------------------------------------
// Session Requests + Reschedule
// ---------------------------------------------------------------
async function loadSessions() {
  state.sessions = await api('/api/mentor/sessions');
}
async function loadSlotTemplate() {
  state.slotTemplate = await api('/api/mentor/slots');
}
function renderRequestsPage() {
  const pending = state.sessions.filter((s) => s.status === 'pending');
  document.getElementById('requests-pending-list').innerHTML = pending.length
    ? pending.map(sessionRow).join('')
    : '<div style="font-size:13px;color:var(--muted)">Nothing waiting on you right now.</div>';
  document.getElementById('requests-all-list').innerHTML = state.sessions.length
    ? state.sessions.map(sessionRow).join('')
    : '<div style="font-size:13px;color:var(--muted)">No sessions yet.</div>';
  document.getElementById('requests-count').textContent = pending.length;
  document.getElementById('requests-count').classList.toggle('hidden', pending.length === 0);
  cancelMentorReschedule();
}

function startMentorReschedule(sessionId) {
  const s = state.sessions.find((x) => x.id === sessionId);
  if (!s) return;
  state.reschedulingSessionId = sessionId;
  document.getElementById('mentor-reschedule-card').classList.remove('hidden');
  document.getElementById('mentor-reschedule-title').textContent = `🕐 Rescheduling: ${s.title} · ${s.menteeName}`;
  renderMentorSlotGrid();
  document.getElementById('mentor-reschedule-card').scrollIntoView({ behavior: 'smooth' });
}
function cancelMentorReschedule() {
  state.reschedulingSessionId = null;
  document.getElementById('mentor-reschedule-card').classList.add('hidden');
}
function renderMentorSlotGrid() {
  const grid = document.getElementById('mreshed-slot-grid');
  state.selectedSlot = null;
  document.getElementById('mreshed-slot-inp').value = 'Click a green slot above';
  grid.innerHTML = state.slotTemplate
    .map(
      (slot) => `
      <div class="slot ${slot.busy ? 'busy' : 'free'}" id="mreshed-slot-${slot.time.replace(':', '')}"
           onclick="${slot.busy ? '' : `pickMentorSlot('${slot.time}','${slot.label}')`}">
        <b>${slot.label}</b><span>${slot.busy ? 'Busy' : 'Both free'}</span>
      </div>`
    )
    .join('');
}
function pickMentorSlot(time, label) {
  document.querySelectorAll('#mreshed-slot-grid .slot').forEach((el) => el.classList.remove('selected'));
  document.getElementById(`mreshed-slot-${time.replace(':', '')}`).classList.add('selected');
  state.selectedSlot = { time, label };
  document.getElementById('mreshed-slot-inp').value = label;
}
async function submitMentorReschedule() {
  if (!state.reschedulingSessionId) return;
  const sel = state.selectedSlot;
  if (!sel) return alert('Pick a free slot first.');
  const reason = document.getElementById('mreshed-reason').value.trim();
  try {
    await api(`/api/mentor/sessions/${state.reschedulingSessionId}/reschedule`, {
      method: 'PUT',
      body: JSON.stringify({ date: '2026-07-23', label: 'Wed 23 Jul', time: sel.time, timeLabel: sel.label, reason })
    });
    await refreshEverything();
    alert('Session rescheduled — the mentee will see the updated time.');
  } catch (e) {
    alert(e.message);
  }
}

// ---------------------------------------------------------------
// Group Meet
// ---------------------------------------------------------------
function renderGroupMeetPage() {
  const box = document.getElementById('gm-mentee-checklist');
  box.innerHTML = state.mentees
    .map(
      (m) => `<label style="font-size:13px;display:flex;gap:8px;align-items:center"><input type="checkbox" class="gm-chk" value="${m.id}" onchange="gmUpdateCount()"/> ${escapeHtml(m.name)}</label>`
    )
    .join('') || '<div style="font-size:13px;color:var(--muted)">You have no mentees to invite yet.</div>';
  document.getElementById('gm-select-all').checked = false;
  gmUpdateCount();
}
function gmToggleAll() {
  const checked = document.getElementById('gm-select-all').checked;
  document.querySelectorAll('.gm-chk').forEach((c) => (c.checked = checked));
  gmUpdateCount();
}
function gmUpdateCount() {
  const n = document.querySelectorAll('.gm-chk:checked').length;
  document.getElementById('gm-count').textContent = `${n} selected`;
}
async function scheduleGroupMeet() {
  const menteeIds = Array.from(document.querySelectorAll('.gm-chk:checked')).map((c) => c.value);
  const date = document.getElementById('gm-date').value;
  const time = document.getElementById('gm-time').value;
  const mode = document.getElementById('gm-mode').value;
  const duration = document.getElementById('gm-duration').value;
  const agenda = document.getElementById('gm-agenda').value.trim();
  const result = document.getElementById('gm-result');
  if (!menteeIds.length || !date) {
    result.innerHTML = notice('red', 'Select at least one mentee and a date.');
    return;
  }
  try {
    await api('/api/mentor/group-meets', { method: 'POST', body: JSON.stringify({ menteeIds, date, time, mode, duration, agenda }) });
    result.innerHTML = notice('green', `Group meet scheduled with ${menteeIds.length} mentee(s) on ${date}.`);
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// OTP Attendance (mentor generates, mentee verifies)
// ---------------------------------------------------------------
function renderOtpPage() {
  const sel = document.getElementById('otp-session-select');
  sel.innerHTML = state.sessions
    .filter((s) => s.status !== 'declined')
    .map((s) => `<option value="${s.id}">${escapeHtml(s.title)} · ${escapeHtml(s.menteeName)} · ${escapeHtml(s.label)}</option>`)
    .join('') || '<option value="">No sessions available</option>';
  document.getElementById('otp-result').innerHTML = '';
}
async function generateOtp() {
  const sessionId = document.getElementById('otp-session-select').value;
  const result = document.getElementById('otp-result');
  if (!sessionId) return;
  try {
    const res = await api('/api/mentor/otp/generate', { method: 'POST', body: JSON.stringify({ sessionId }) });
    const mins = Math.round((res.expiresAt - Date.now()) / 60000);
    result.innerHTML = `
      <div class="notice notice-blue" style="flex-direction:column;align-items:flex-start;gap:6px">
        <div style="font-size:12px;color:var(--muted)">Read this code aloud to your mentee:</div>
        <div style="font-size:32px;font-weight:700;letter-spacing:6px;color:var(--text)">${res.code}</div>
        <div style="font-size:12px;color:var(--muted)">Expires in ~${mins} minutes</div>
      </div>`;
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Remarks
// ---------------------------------------------------------------
function renderRemarksPage() {
  const sel = document.getElementById('remarks-mentee-select');
  sel.innerHTML = state.mentees.map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('') || '<option value="">No mentees</option>';
  resetRecordingUi();
  if (state.mentees.length) loadRemarksForMentee();
}
async function loadRemarksForMentee() {
  const menteeId = document.getElementById('remarks-mentee-select').value;
  if (!menteeId) return;
  const [cells, tr] = await Promise.all([
    api(`/api/mentor/remarks/${menteeId}`),
    api(`/api/mentor/transcript/${menteeId}`)
  ]);
  state.remarkCells = cells;
  document.getElementById('transcript-text').value = tr.transcript || '';
  renderRemarkCells();
}
function renderRemarkCells() {
  const box = document.getElementById('remark-cells');
  box.innerHTML = state.remarkCells
    .map(
      (c, i) => `
    <div class="card" style="margin-bottom:10px">
      <div class="field"><label class="label">Question ${i + 1}</label><input class="input remark-q" data-idx="${i}" value="${escapeHtml(c.question)}"/></div>
      <div class="field" style="margin-bottom:0"><label class="label">Answer / observation</label><textarea class="input remark-a" data-idx="${i}" rows="2">${escapeHtml(c.answer)}</textarea></div>
    </div>`
    )
    .join('');
}
function addRemarkCellUi() {
  state.remarkCells.push({ question: '', answer: '' });
  renderRemarkCells();
}
async function saveAllRemarks() {
  const menteeId = document.getElementById('remarks-mentee-select').value;
  const note = document.getElementById('remarks-note');
  if (!menteeId) return;
  document.querySelectorAll('.remark-q').forEach((el) => (state.remarkCells[el.dataset.idx].question = el.value));
  document.querySelectorAll('.remark-a').forEach((el) => (state.remarkCells[el.dataset.idx].answer = el.value));
  try {
    // Persist any cells that don't have a server id yet (new ones added in this session)
    for (const cell of state.remarkCells) {
      if (!cell.id) {
        const res = await api(`/api/mentor/remarks/${menteeId}`, {
          method: 'POST',
          body: JSON.stringify({ question: cell.question, answer: cell.answer })
        });
        cell.id = res.cell.id;
      }
    }
    note.innerHTML = notice('green', 'Remarks saved.');
  } catch (e) {
    note.innerHTML = notice('red', e.message);
  }
}
function resetRecordingUi() {
  clearInterval(state.recordTimerHandle);
  state.recording = false;
  state.recordSeconds = 0;
  document.getElementById('record-timer').textContent = '00:00';
  document.getElementById('record-btn').textContent = '⏺ Start recording';
  document.getElementById('record-btn').classList.remove('btn-blue');
  document.getElementById('record-btn').classList.add('btn-red');
}
function toggleRecording() {
  const btn = document.getElementById('record-btn');
  if (!state.recording) {
    state.recording = true;
    state.recordSeconds = 0;
    btn.textContent = '⏹ Stop recording';
    state.recordTimerHandle = setInterval(() => {
      state.recordSeconds += 1;
      const m = String(Math.floor(state.recordSeconds / 60)).padStart(2, '0');
      const s = String(state.recordSeconds % 60).padStart(2, '0');
      document.getElementById('record-timer').textContent = `${m}:${s}`;
    }, 1000);
  } else {
    state.recording = false;
    clearInterval(state.recordTimerHandle);
    btn.textContent = '⏺ Start recording';
  }
}
function clearTranscript() {
  document.getElementById('transcript-text').value = '';
}
async function saveTranscript() {
  const menteeId = document.getElementById('remarks-mentee-select').value;
  const note = document.getElementById('transcript-note');
  if (!menteeId) return;
  try {
    await api(`/api/mentor/transcript/${menteeId}`, {
      method: 'PUT',
      body: JSON.stringify({ transcript: document.getElementById('transcript-text').value })
    });
    note.innerHTML = notice('green', 'Transcript saved.');
  } catch (e) {
    note.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Report Critical Issue
// ---------------------------------------------------------------
function renderCriticalPage() {
  const sel = document.getElementById('ci-mentee-select');
  sel.innerHTML = state.mentees.map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('') || '<option value="">No mentees</option>';
  loadCriticalHistory();
}
async function submitCriticalIssue() {
  const menteeId = document.getElementById('ci-mentee-select').value;
  const category = document.getElementById('ci-category').value;
  const details = document.getElementById('ci-details').value.trim();
  const note = document.getElementById('ci-note');
  if (!menteeId || !details) {
    note.innerHTML = notice('red', 'Select a mentee and describe the issue.');
    return;
  }
  try {
    await api('/api/mentor/critical-issues', { method: 'POST', body: JSON.stringify({ menteeId, category, details }) });
    note.innerHTML = notice('green', 'Escalation submitted to the HOD.');
    document.getElementById('ci-details').value = '';
    loadCriticalHistory();
  } catch (e) {
    note.innerHTML = notice('red', e.message);
  }
}
async function loadCriticalHistory() {
  const issues = await api('/api/mentor/critical-issues');
  document.getElementById('ci-history').innerHTML = issues.length
    ? issues
        .map(
          (i) => `
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border)">
        <div><b style="font-size:13px">${escapeHtml(i.category)}</b><div style="font-size:12px;color:var(--muted)">${escapeHtml(i.id)} · ${escapeHtml(i.menteeName)} · ${escapeHtml(i.date)}</div></div>
        <span class="badge ${i.status === 'Open' ? 'b-red' : 'b-green'}">${escapeHtml(i.status)}</span>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No escalations submitted yet.</div>';
}

// ---------------------------------------------------------------
// HOD Notices
// ---------------------------------------------------------------
async function loadNotices() {
  state.notices = await api('/api/mentor/hod-notices');
  const badge = document.getElementById('notices-count');
  if (state.notices.length > 0) {
    badge.textContent = state.notices.length;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}
function renderNotices() {
  const box = document.getElementById('notices-list');
  box.innerHTML = state.notices.length
    ? state.notices
        .map(
          (n) => `
      <div class="card">
        <div class="row" style="margin-bottom:6px"><b>${escapeHtml(n.title)}</b><span style="font-size:11px;color:var(--muted)">${escapeHtml(n.date)}</span></div>
        <div style="font-size:13px;color:#c3cbdb;line-height:1.6;margin-bottom:8px">${escapeHtml(n.message)}</div>
        <div style="font-size:11.5px;color:var(--muted)">— ${escapeHtml(n.from)}</div>
      </div>`
        )
        .join('')
    : '<div class="notice notice-blue">No notices from the HOD right now.</div>';
}

// ---------------------------------------------------------------
// Feedback Received
// ---------------------------------------------------------------
async function renderFeedbackReceived() {
  const res = await api('/api/mentor/feedback');
  const box = document.getElementById('feedback-overall');
  if (!res.entries.length) {
    box.innerHTML = '<div style="font-size:13px;color:var(--muted)">No feedback submitted yet.</div>';
  } else {
    const keys = ['availability', 'communication', 'guidance', 'overall'];
    const avgs = {};
    keys.forEach((k) => {
      const vals = res.entries.map((e) => e.ratings[k]).filter((v) => typeof v === 'number');
      avgs[k] = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : '—';
    });
    box.innerHTML = `
      <div style="font-size:28px;font-weight:700;margin-bottom:12px">${avgs.overall} <span style="font-size:14px;color:var(--amber)">★</span></div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${['availability', 'communication', 'guidance']
          .map(
            (k) => `<div><div class="row" style="margin-bottom:3px"><span style="font-size:13px;text-transform:capitalize">${k}</span><b>${avgs[k]}</b></div><div class="prog-outer"><div class="prog-inner" style="width:${(avgs[k] / 5) * 100}%;background:var(--blue)"></div></div></div>`
          )
          .join('')}
      </div>`;
  }

  const coordCard = document.getElementById('coord-feedback-card');
  if (res.coordinatorFeedback) {
    coordCard.classList.remove('hidden');
    document.getElementById('coord-feedback-body').innerHTML = `
      <div style="font-size:13px;color:#c3cbdb;line-height:1.6;margin-bottom:8px">"${escapeHtml(res.coordinatorFeedback.comment)}"</div>
      <div style="font-size:12px;color:var(--muted)">— ${escapeHtml(res.coordinatorFeedback.coordinatorName)} · ${'★'.repeat(res.coordinatorFeedback.stars)}</div>`;
  } else {
    coordCard.classList.add('hidden');
  }

  document.getElementById('mentee-feedback-list').innerHTML = res.entries.length
    ? res.entries
        .map(
          (f) => `
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border);align-items:flex-start">
        <div><b style="font-size:13px">${escapeHtml(f.menteeName)}</b><div style="font-size:12px;color:var(--muted);margin-top:2px">${escapeHtml(f.comment || 'No comment left')}</div></div>
        <span style="font-size:13px;color:var(--amber)">${'★'.repeat(f.ratings.overall || 0)}</span>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No mentee feedback yet.</div>';
}

// ---------------------------------------------------------------
// Profile
// ---------------------------------------------------------------
async function renderProfilePage() {
  const p = await api('/api/mentor/profile');
  document.getElementById('pf-name').value = p.name;
  document.getElementById('pf-designation').value = p.designation;
  document.getElementById('pf-department').value = p.department;
  document.getElementById('pf-qualification').value = p.qualification;
  document.getElementById('pf-tags').value = p.tags.join(', ');
  document.getElementById('pf-experience').value = p.experienceYears;
  document.getElementById('pf-papers').value = p.papers;
  document.getElementById('pf-note').innerHTML = '';
}
async function saveProfile() {
  const note = document.getElementById('pf-note');
  const payload = {
    name: document.getElementById('pf-name').value.trim(),
    designation: document.getElementById('pf-designation').value.trim(),
    department: document.getElementById('pf-department').value.trim(),
    qualification: document.getElementById('pf-qualification').value.trim(),
    tags: document.getElementById('pf-tags').value.split(',').map((t) => t.trim()).filter(Boolean),
    experienceYears: document.getElementById('pf-experience').value,
    papers: document.getElementById('pf-papers').value
  };
  try {
    const res = await api('/api/mentor/profile', { method: 'PUT', body: JSON.stringify(payload) });
    state.mentor = res.mentor;
    document.getElementById('topbar-name').textContent = res.mentor.name;
    document.getElementById('topbar-av').textContent = initials(res.mentor.name);
    note.innerHTML = notice('green', 'Profile saved.');
  } catch (e) {
    note.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------
function notice(color, text) {
  const cls = { green: 'notice-green', red: 'notice-red', amber: 'notice-amber', blue: 'notice-blue' }[color];
  return `<div class="notice ${cls}" style="margin-bottom:0">${escapeHtml(text)}</div>`;
}
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
