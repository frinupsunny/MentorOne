/* ============================================================
   MentorOne — Mentee app frontend
   Talks to the small Express backend over fetch(). No frameworks.
   ============================================================ */

const API = ''; // same-origin, backend serves this file too

let state = {
  token: localStorage.getItem('mentee_token') || null,
  mentee: null,
  mentor: null,
  sessions: [],
  mentors: [],
  notices: [],
  slotTemplate: [],
  selectedSlot: { new: null, resched: null },
  reschedulingSessionId: null,
  connectEnabled: true
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
      // token stale/invalid — fall back to login screen
      localStorage.removeItem('mentee_token');
      state.token = null;
    });
  }
});

// ---------------------------------------------------------------
// Auth
// ---------------------------------------------------------------
async function doLogin() {
  const regno = document.getElementById('login-regno').value.trim();
  const pass = document.getElementById('login-pass').value;
  const errBox = document.getElementById('login-error');
  const btn = document.getElementById('login-btn');
  errBox.style.display = 'none';
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Signing in...';
  try {
    const res = await api('/api/auth/mentee-login', {
      method: 'POST',
      body: JSON.stringify({ registerNo: regno, password: pass })
    });
    state.token = res.token;
    state.mentee = res.mentee;
    localStorage.setItem('mentee_token', res.token);
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
  localStorage.removeItem('mentee_token');
  state = { ...state, token: null, mentee: null, mentor: null };
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-regno').value = '';
  document.getElementById('login-pass').value = '';
}

async function enterApp() {
  const dash = await api('/api/mentee/dashboard');
  state.mentee = dash.mentee;
  state.mentor = dash.mentor;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('topbar-av').textContent = initials(state.mentee.name);
  document.getElementById('topbar-name').textContent = `${state.mentee.name} — ${state.mentee.registerNo}`;

  renderDashboard(dash);
  await Promise.all([loadSessions(), loadMentors(), loadNotices(), loadSlotTemplate()]);
  showPage('dashboard');
}

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
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

  if (name === 'book') renderBookPage();
  if (name === 'otp') renderOtpPage();
  if (name === 'notices') renderNotices();
  if (name === 'feedback') renderFeedbackPage();
  if (name === 'discover') renderMentorList();
}

// ---------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------
function renderDashboard(dash) {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('dash-greeting').textContent = `${greet}, ${dash.mentee.name.split(' ')[0]} 👋`;
  document.getElementById('dash-sub').textContent = `${dash.mentee.programme} · Semester ${dash.mentee.semester} · Section ${dash.mentee.section}`;

  document.getElementById('stat-month').textContent = dash.stats.sessionsThisMonth;
  document.getElementById('stat-total').textContent = dash.stats.totalSessions;
  document.getElementById('stat-attendance').textContent = dash.stats.attendance + '%';
  document.getElementById('stat-attendance-bar').style.width = dash.stats.attendance + '%';

  if (dash.mentor) {
    document.getElementById('mentor-avatar').textContent = initials(dash.mentor.name);
    document.getElementById('mentor-name').textContent = dash.mentor.name;
    document.getElementById('mentor-role').textContent = `${dash.mentor.designation} · ${dash.mentor.department}`;
    document.getElementById('mentor-card-actions').classList.remove('hidden');
    document.getElementById('mentor-card-empty').classList.add('hidden');
  } else {
    document.getElementById('mentor-avatar').textContent = '--';
    document.getElementById('mentor-name').textContent = 'No mentor assigned yet';
    document.getElementById('mentor-role').textContent = 'Visit Find Mentor to request one';
    document.getElementById('mentor-card-actions').classList.add('hidden');
    document.getElementById('mentor-card-empty').classList.remove('hidden');
  }

  const upcomingBox = document.getElementById('dash-upcoming');
  upcomingBox.innerHTML = dash.upcoming.length
    ? dash.upcoming
        .map(
          (s) => `
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border)">
        <div><div style="font-size:13px;font-weight:500">${escapeHtml(s.title)}</div><div style="font-size:12px;color:var(--muted)">${escapeHtml(s.label)} · ${escapeHtml(s.timeLabel)} · ${escapeHtml(s.mode)}</div></div>
        <span class="badge ${s.status === 'confirmed' ? 'b-blue' : 'b-amber'}">${s.status === 'confirmed' ? 'Confirmed' : 'Pending'}</span>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No upcoming sessions. Book one from the Book Session page.</div>';

  const legend = document.getElementById('dash-donut-legend');
  legend.innerHTML = `
    <div class="row"><span style="font-size:13px;color:var(--green)">● Completed</span><b>${dash.donut.completed}</b></div>
    <div class="row"><span style="font-size:13px;color:var(--amber)">● Pending</span><b>${dash.donut.pending}</b></div>`;

  document.getElementById('acad-att').textContent = dash.mentee.attendance + '%';
  document.getElementById('acad-att-bar').style.width = dash.mentee.attendance + '%';
  document.getElementById('acad-cgpa').textContent = dash.mentee.cgpa + ' / 10';
  document.getElementById('acad-cgpa-bar').style.width = dash.mentee.cgpa * 10 + '%';
  const backlogsBadge = document.getElementById('acad-backlogs');
  if (dash.mentee.backlogs > 0) {
    backlogsBadge.className = 'badge b-red';
    backlogsBadge.textContent = dash.mentee.backlogs;
  } else {
    backlogsBadge.className = 'badge b-green';
    backlogsBadge.textContent = 'None';
  }
}

// ---------------------------------------------------------------
// Find Mentor
// ---------------------------------------------------------------
async function loadMentors() {
  state.mentors = await api('/api/mentee/mentors');
}
function renderMentorList() {
  const assignedCard = document.getElementById('discover-assigned-card');
  const browseSection = document.getElementById('discover-browse-section');
  const sub = document.getElementById('discover-sub');

  if (state.mentor) {
    assignedCard.classList.remove('hidden');
    browseSection.classList.add('hidden');
    sub.textContent = 'You already have a mentor assigned.';
    document.getElementById('discover-assigned-avatar').textContent = initials(state.mentor.name);
    document.getElementById('discover-assigned-name').textContent = state.mentor.name;
    document.getElementById('discover-assigned-role').textContent = `${state.mentor.designation} · ${state.mentor.department}`;
    return;
  }

  assignedCard.classList.add('hidden');
  browseSection.classList.remove('hidden');
  sub.textContent = 'Browse faculty profiles — send a request to your preferred mentor';

  api('/api/mentee/connect-mode').then((res) => {
    state.connectEnabled = res.enabled;
    renderMentorListBody();
  });
}
function renderMentorListBody() {
  const box = document.getElementById('mentor-list');
  const disabledNotice = document.getElementById('discover-disabled-notice');
  if (!state.connectEnabled) {
    box.insertAdjacentHTML(
      'beforebegin',
      '<div class="notice notice-amber" id="discover-disabled-notice">Direct requests are currently switched off by your coordinator — they will assign you a mentor directly.</div>'
    );
  } else if (disabledNotice) {
    disabledNotice.remove();
  }
  const q = (document.getElementById('discover-search').value || '').toLowerCase();
  const list = state.mentors.filter(
    (m) =>
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q) ||
      m.tags.join(' ').toLowerCase().includes(q)
  );
  box.innerHTML = list
    .map(
      (m) => `
    <div class="card">
      <div style="display:flex;gap:14px">
        <div class="av av-blue av-lg">${initials(m.name)}</div>
        <div style="flex:1">
          <div style="font-size:15px;font-weight:600">${escapeHtml(m.name)}</div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:6px">${escapeHtml(m.designation)} · ${escapeHtml(m.department)}</div>
          <div class="tags">${m.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
          <div style="margin-top:8px;font-size:12px;color:var(--green)">${m.openSlots}/${m.totalSlots} slots open</div>
        </div>
        <button class="btn btn-blue" style="align-self:flex-start" ${state.connectEnabled ? '' : 'disabled'} onclick="requestMentor('${m.id}')">📨 Request</button>
      </div>
    </div>`
    )
    .join('');
}
async function requestMentor(mentorId) {
  try {
    const res = await api('/api/mentee/mentor-requests', {
      method: 'POST',
      body: JSON.stringify({ mentorId })
    });
    alert(res.message);
  } catch (e) {
    alert(e.message);
  }
}

// ---------------------------------------------------------------
// Sessions / Book / Reschedule
// ---------------------------------------------------------------
async function loadSessions() {
  state.sessions = await api('/api/mentee/sessions');
}
async function loadSlotTemplate() {
  state.slotTemplate = await api('/api/mentee/slots');
}

function renderBookPage() {
  const noMentor = !state.mentor;
  document.getElementById('book-no-mentor-notice').classList.toggle('hidden', !noMentor);
  document.getElementById('book-page-body').classList.toggle('hidden', noMentor);
  if (noMentor) return;
  document.getElementById('book-mentor-name').textContent = state.mentor?.name || 'your mentor';
  initDatePicker('new', 'new-date-picker');
  renderSlotGrid('new');
  renderRescheduleList();
  cancelReschedule();
}

function defaultBookingDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1); // default to tomorrow
  return d.toISOString().slice(0, 10);
}
function initDatePicker(prefix, inputId) {
  const el = document.getElementById(inputId);
  if (!el.value) el.value = defaultBookingDate();
  el.min = new Date().toISOString().slice(0, 10);
}
async function onNewDateChange() {
  await refreshSlotsForDate('new', 'new-date-picker', 'new-slot-heading');
}
async function onReschedDateChange() {
  await refreshSlotsForDate('resched', 'resched-date-picker', null);
}
async function refreshSlotsForDate(prefix, inputId, headingId) {
  const date = document.getElementById(inputId).value;
  if (!date) return;
  state.slotTemplate = await api(`/api/mentee/slots?date=${date}`);
  if (headingId) {
    document.getElementById(headingId).textContent = `📅 ${formatDateLabel(date)} — Free Slots`;
  }
  renderSlotGrid(prefix);
}

function renderSlotGrid(prefix) {
  const grid = document.getElementById(prefix + '-slot-grid');
  state.selectedSlot[prefix] = null;
  const inp = document.getElementById(prefix + '-slot-inp');
  if (inp) inp.value = 'Click a green slot above';
  const heading = document.getElementById(prefix + '-slot-heading');
  if (heading) {
    const dateInput = document.getElementById(prefix + '-date-picker');
    const dateVal = dateInput ? dateInput.value : null;
    heading.textContent = dateVal ? `📅 ${formatDateLabel(dateVal)} — Free Slots` : '📅 Free Slots';
  }
  grid.innerHTML = state.slotTemplate
    .map(
      (slot) => `
      <div class="slot ${slot.busy ? 'busy' : 'free'}" id="${prefix}-slot-${slot.time.replace(':', '')}"
           onclick="${slot.busy ? '' : `pickSlot('${prefix}','${slot.time}','${slot.label}')`}">
        <b>${slot.label}</b><span>${slot.busy ? 'Busy' : 'Both free'}</span>
      </div>`
    )
    .join('');
}

function pickSlot(prefix, time, label) {
  document.querySelectorAll(`#${prefix}-slot-grid .slot`).forEach((el) => el.classList.remove('selected'));
  document.getElementById(`${prefix}-slot-${time.replace(':', '')}`).classList.add('selected');
  state.selectedSlot[prefix] = { time, label };
  document.getElementById(prefix + '-slot-inp').value = `${label}`;
}

function toggleAfterClass(prefix) {
  const checked = document.getElementById(prefix + '-afterclass-chk').checked;
  document.getElementById(prefix + '-slot-section').classList.toggle('hidden', checked);
  document.getElementById(prefix + '-afterclass-section').classList.toggle('hidden', !checked);
}

async function submitNewSession() {
  const banner = document.getElementById('new-session-banner');
  const afterClass = document.getElementById('new-afterclass-chk').checked;
  const duration = document.getElementById('new-duration').value;
  const mode = document.getElementById('new-mode').value;
  const agenda = document.getElementById('new-agenda').value.trim();

  let payload = { duration, mode, agenda, afterClass };
  if (afterClass) {
    const date = document.getElementById('new-afterclass-date').value;
    const time = document.getElementById('new-afterclass-time').value;
    if (!date || !time) {
      banner.innerHTML = notice('red', 'Pick a date and time for the after-class session.');
      return;
    }
    payload = { ...payload, date, label: formatDateLabel(date), time, timeLabel: `After class · ${time}` };
  } else {
    const sel = state.selectedSlot.new;
    const date = document.getElementById('new-date-picker').value;
    if (!date) {
      banner.innerHTML = notice('red', 'Pick a date before sending the request.');
      return;
    }
    if (!sel) {
      banner.innerHTML = notice('red', 'Pick a free slot before sending the request.');
      return;
    }
    payload = { ...payload, date, label: formatDateLabel(date), time: sel.time, timeLabel: sel.label };
  }

  try {
    const res = await api('/api/mentee/sessions', { method: 'POST', body: JSON.stringify(payload) });
    banner.innerHTML = notice('green', `Session request sent to ${state.mentor.name} for ${res.session.label} · ${res.session.timeLabel}.`);
    document.getElementById('new-agenda').value = '';
    renderSlotGrid('new');
    await loadSessions();
    renderRescheduleList();
    populateSessionSelects();
  } catch (e) {
    banner.innerHTML = notice('red', e.message);
  }
}

function renderRescheduleList() {
  const box = document.getElementById('reschedule-existing-list');
  const upcoming = state.sessions.filter((s) => s.status !== 'completed');
  box.innerHTML = upcoming.length
    ? upcoming
        .map(
          (s) => `
      <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border)">
        <div><div style="font-size:13px;font-weight:500">${escapeHtml(s.title)}</div><div style="font-size:12px;color:var(--muted)">${escapeHtml(s.label)} · ${escapeHtml(s.timeLabel)} · ${escapeHtml(s.mode)}</div></div>
        <button class="btn btn-amber btn-xs" onclick="startReschedule('${s.id}')">🕐 Reschedule this</button>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No upcoming sessions to reschedule.</div>';
}

function startReschedule(sessionId) {
  const s = state.sessions.find((x) => x.id === sessionId);
  if (!s) return;
  state.reschedulingSessionId = sessionId;
  document.getElementById('reschedule-card').classList.remove('hidden');
  document.getElementById('reschedule-title').textContent = `🕐 Rescheduling: ${s.title} · ${s.label} · ${s.timeLabel}`;
  document.getElementById('reschedule-banner').innerHTML = `Pick a new date and time below for "${escapeHtml(s.title)} · ${escapeHtml(s.label)} · ${escapeHtml(s.timeLabel)}".`;
  document.getElementById('resched-date-picker').value = '';
  initDatePicker('resched', 'resched-date-picker');
  renderSlotGrid('resched');
  document.getElementById('reschedule-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelReschedule() {
  state.reschedulingSessionId = null;
  document.getElementById('reschedule-card').classList.add('hidden');
}

async function submitReschedule() {
  if (!state.reschedulingSessionId) return;
  const afterClass = document.getElementById('resched-afterclass-chk').checked;
  const reason = document.getElementById('resched-reason').value.trim();
  let payload = { reason, afterClass };

  if (afterClass) {
    const date = document.getElementById('resched-afterclass-date').value;
    const time = document.getElementById('resched-afterclass-time').value;
    if (!date || !time) {
      alert('Pick a date and time for the after-class session.');
      return;
    }
    payload = { ...payload, date, label: formatDateLabel(date), time, timeLabel: `After class · ${time}` };
  } else {
    const sel = state.selectedSlot.resched;
    const date = document.getElementById('resched-date-picker').value;
    if (!date) {
      alert('Pick a date before confirming.');
      return;
    }
    if (!sel) {
      alert('Pick a free slot before confirming.');
      return;
    }
    payload = { ...payload, date, label: formatDateLabel(date), time: sel.time, timeLabel: sel.label };
  }

  try {
    await api(`/api/mentee/sessions/${state.reschedulingSessionId}/reschedule`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    await loadSessions();
    renderRescheduleList();
    cancelReschedule();
    populateSessionSelects();
    alert('Session rescheduled — your mentor will see the updated time.');
  } catch (e) {
    alert(e.message);
  }
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

// ---------------------------------------------------------------
// OTP
// ---------------------------------------------------------------
function renderOtpPage() {
  const sel = document.getElementById('otp-session-select');
  sel.innerHTML = state.sessions
    .filter((s) => s.status !== 'completed')
    .map((s) => `<option value="${s.id}">${escapeHtml(s.title)} · ${escapeHtml(s.label)}</option>`)
    .join('') || '<option value="">No sessions available</option>';
  document.querySelectorAll('.otp-box').forEach((b) => (b.value = ''));
  document.getElementById('otp-result').innerHTML = '';
}
function otpAutoAdvance(el) {
  if (el.value && el.nextElementSibling) el.nextElementSibling.focus();
}
async function verifyOtp() {
  const sessionId = document.getElementById('otp-session-select').value;
  const boxes = Array.from(document.querySelectorAll('.otp-box'));
  const code = boxes.map((b) => b.value).join('');
  const resultBox = document.getElementById('otp-result');
  if (code.length < 6) {
    resultBox.innerHTML = notice('red', 'Enter all 6 digits of the OTP.');
    return;
  }
  try {
    const res = await api('/api/mentee/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ sessionId, code })
    });
    resultBox.innerHTML = notice('green', res.message);
    await loadSessions();
  } catch (e) {
    resultBox.innerHTML = notice('red', e.body?.message || e.message);
  }
}

// ---------------------------------------------------------------
// HOD Notices
// ---------------------------------------------------------------
async function loadNotices() {
  state.notices = await api('/api/mentee/hod-notices');
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
        <div class="row" style="margin-bottom:6px">
          <b>${escapeHtml(n.title)}</b>
          <span style="font-size:11px;color:var(--muted)">${escapeHtml(n.date)}</span>
        </div>
        <div style="font-size:13px;color:#c3cbdb;line-height:1.6;margin-bottom:8px">${escapeHtml(n.message)}</div>
        <div style="font-size:11.5px;color:var(--muted)">— ${escapeHtml(n.from)}</div>
      </div>`
        )
        .join('')
    : '<div class="notice notice-blue">No notices from the HOD right now.</div>';
}

// ---------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------
const STAR_COUNT = 5;
function buildStarRow(el) {
  el.innerHTML = Array.from({ length: STAR_COUNT })
    .map(() => '<i>★</i>')
    .join('');
  Array.from(el.children).forEach((star, i) => {
    star.classList.add(i < STAR_COUNT ? 'lit' : ''); // default all lit at 5, user can click to reduce
  });
  el.dataset.value = STAR_COUNT;
}
function renderFeedbackPage() {
  document.getElementById('fb-mentor-name').textContent = state.mentor?.name || 'your mentor';
  document.querySelectorAll('.star-rate').forEach(buildStarRow);
  const sel = document.getElementById('fb-session-select');
  sel.innerHTML = state.sessions
    .map((s) => `<option value="${s.id}">${escapeHtml(s.title)} · ${escapeHtml(s.label)}</option>`)
    .join('') || '<option value="">No sessions yet</option>';
  document.getElementById('fb-comment').value = '';
  document.getElementById('fb-note').innerHTML = '';
}
function rateStars(evt, el) {
  const stars = Array.from(el.children);
  const idx = stars.indexOf(evt.target);
  if (idx === -1) return;
  stars.forEach((s, i) => s.classList.toggle('lit', i <= idx));
  el.dataset.value = idx + 1;
}
async function submitFeedback() {
  const sessionId = document.getElementById('fb-session-select').value;
  const comment = document.getElementById('fb-comment').value.trim();
  const ratings = {};
  document.querySelectorAll('.star-rate').forEach((el) => {
    ratings[el.dataset.key] = Number(el.dataset.value || 0);
  });
  const note = document.getElementById('fb-note');
  try {
    await api('/api/mentee/feedback', {
      method: 'POST',
      body: JSON.stringify({ sessionId, ratings, comment })
    });
    note.innerHTML = notice('green', 'Thanks — your feedback has been recorded.');
  } catch (e) {
    note.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Small shared helpers
// ---------------------------------------------------------------
function populateSessionSelects() {
  if (!document.getElementById('page-otp').classList.contains('hidden')) renderOtpPage();
  if (!document.getElementById('page-feedback').classList.contains('hidden')) renderFeedbackPage();
}
function notice(color, text) {
  const cls = { green: 'notice-green', red: 'notice-red', amber: 'notice-amber', blue: 'notice-blue' }[color];
  return `<div class="notice ${cls}" style="margin-bottom:0">${escapeHtml(text)}</div>`;
}
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
