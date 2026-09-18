/* ============================================================
   MentorOne — Coordinator app frontend
   Talks to the same Express backend as Mentee/Mentor, but only
   ever uses /api/auth/coordinator-login and /api/coordinator/*.
   ============================================================ */

const API = '';

let state = {
  token: localStorage.getItem('coordinator_token') || null,
  coordinator: null,
  mentors: [],
  assignMode: 'manual',
  manualPickMenteeId: null,
  classes: [],
  connectEnabled: true
};

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
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-pass').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
  });
  if (state.token) {
    enterApp().catch(() => {
      localStorage.removeItem('coordinator_token');
      state.token = null;
    });
  }
});

// ---------------------------------------------------------------
// Auth (dedicated coordinator login — separate route, separate page)
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
    const res = await api('/api/auth/coordinator-login', {
      method: 'POST',
      body: JSON.stringify({ employeeId: empId, password: pass })
    });
    state.token = res.token;
    state.coordinator = res.coordinator;
    localStorage.setItem('coordinator_token', res.token);
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
  localStorage.removeItem('coordinator_token');
  state = { ...state, token: null, coordinator: null };
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-empid').value = '';
  document.getElementById('login-pass').value = '';
}

async function enterApp() {
  const dash = await api('/api/coordinator/dashboard');
  state.coordinator = dash.coordinator;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('topbar-av').textContent = initials(state.coordinator.name);
  document.getElementById('topbar-name').textContent = `${state.coordinator.name} — ${state.coordinator.department}`;

  renderDashboard(dash);
  await Promise.all([loadMentors(), loadClasses(), loadConnectMode()]);
  showPage('dashboard');
}

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
function showPage(name) {
  document.querySelectorAll('.panel-page').forEach((p) => p.classList.add('hidden'));
  document.getElementById('page-' + name).classList.remove('hidden');
  document.querySelectorAll('.slink').forEach((s) => s.classList.remove('active'));
  const link = document.querySelector(`.slink[data-page="${name}"]`);
  if (link) link.classList.add('active');

  if (name === 'mentors') renderMentorsPage();
  if (name === 'assign') renderAssignPage();
  if (name === 'notifications') renderNotifications();
  if (name === 'hodnotices') renderHodNotices();
  if (name === 'remarks') renderRemarksPage();
  if (name === 'feedback') renderFeedbackPage();
  if (name === 'reports') renderReportsPage();
}

// ---------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------
function renderDashboard(dash) {
  document.getElementById('dash-sub').textContent = `${dash.coordinator.department} · Coordinator overview`;
  document.getElementById('stat-mentors').textContent = dash.stats.mentorsCount;
  document.getElementById('stat-mentees').textContent = dash.stats.totalMentees;
  document.getElementById('stat-sessions').textContent = dash.stats.sessionsThisMonth;

  const alertBox = document.getElementById('unmet-alert');
  if (dash.stats.unmetPairs > 0) {
    alertBox.classList.remove('hidden');
    alertBox.innerHTML = `⚠️ ${dash.stats.unmetPairs} mentor-mentee pair(s) have had zero sessions this month. <a href="#" onclick="showPage('notifications');return false;" style="color:inherit;text-decoration:underline">View in Notifications</a>`;
  } else {
    alertBox.classList.add('hidden');
  }

  const table = document.getElementById('mentor-overview-table');
  table.innerHTML =
    '<tr><th>Mentor</th><th>Mentees</th><th>Sessions this month</th><th>Avg feedback</th><th>Compliance</th></tr>' +
    dash.mentorOverview
      .map(
        (m) => `
      <tr>
        <td>${escapeHtml(m.name)}</td>
        <td>${m.menteeCount} / ${m.capacity}</td>
        <td>${m.sessionsThisMonth}</td>
        <td>${m.avgFeedback ? '★ ' + m.avgFeedback : '—'}</td>
        <td>${m.compliant ? '<span class="badge b-green">Compliant</span>' : '<span class="badge b-red">Action needed</span>'}</td>
      </tr>`
      )
      .join('');
}

// ---------------------------------------------------------------
// My Mentors
// ---------------------------------------------------------------
async function loadMentors() {
  state.mentors = await api('/api/coordinator/mentors');
}
function renderMentorsPage() {
  const box = document.getElementById('mentors-list');
  box.innerHTML = state.mentors
    .map(
      (m) => `
    <div class="card">
      <div class="row" style="margin-bottom:10px">
        <div class="row-start"><div class="av av-blue av-lg">${initials(m.name)}</div><div><div style="font-weight:600">${escapeHtml(m.name)}</div><div style="font-size:12px;color:var(--muted)">${escapeHtml(m.designation)} · ${escapeHtml(m.department)}</div></div></div>
        ${m.overview.compliant ? '<span class="badge b-green">Compliant</span>' : '<span class="badge b-red">Action needed</span>'}
      </div>
      <div class="tags" style="margin-bottom:10px">${m.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="grid2">
        <div><div style="font-size:11px;color:var(--muted)">Active mentees</div><div style="font-weight:600">${m.overview.menteeCount} / ${m.overview.capacity}</div></div>
        <div><div style="font-size:11px;color:var(--muted)">Sessions this month</div><div style="font-weight:600">${m.overview.sessionsThisMonth}</div></div>
        <div><div style="font-size:11px;color:var(--muted)">Avg feedback</div><div style="font-weight:600">${m.overview.avgFeedback ? '★ ' + m.overview.avgFeedback : '—'}</div></div>
        <div><div style="font-size:11px;color:var(--muted)">Experience</div><div style="font-weight:600">${m.experienceYears} yrs · ${m.papers} papers</div></div>
      </div>
    </div>`
    )
    .join('');
}

// ---------------------------------------------------------------
// Assign Mentees
// ---------------------------------------------------------------
function setAssignMode(mode) {
  state.assignMode = mode;
  document.querySelectorAll('#assign-mode-tabs .btn').forEach((b) => {
    b.classList.toggle('btn-purple', b.dataset.mode === mode);
  });
  document.getElementById('assign-manual').classList.toggle('hidden', mode !== 'manual');
  document.getElementById('assign-dynamic').classList.toggle('hidden', mode !== 'dynamic');
  document.getElementById('assign-connect').classList.toggle('hidden', mode !== 'connect');
  if (mode === 'manual') renderManualList();
  if (mode === 'dynamic') renderDynamicPage();
  if (mode === 'connect') renderConnectPage();
}
function renderAssignPage() {
  setAssignMode(state.assignMode);
}

// -- Manual --
let unassignedCache = [];
async function renderManualList() {
  unassignedCache = await api('/api/coordinator/mentees/unassigned');
  const q = (document.getElementById('manual-search').value || '').toLowerCase();
  const list = unassignedCache.filter((m) => !q || m.name.toLowerCase().includes(q) || m.programme.toLowerCase().includes(q));
  const table = document.getElementById('manual-table');
  table.innerHTML =
    '<tr><th>Mentee</th><th>Programme</th><th>Sem</th><th>Status</th><th></th></tr>' +
    (list.length
      ? list
          .map(
            (m) => `
      <tr>
        <td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.programme)}</td><td>${m.semester}</td>
        <td><span class="badge b-amber">No mentor</span></td>
        <td><button class="btn btn-xs btn-purple" onclick="pickMentorFor('${m.id}','${escapeHtml(m.name)}')">Assign</button></td>
      </tr>`
          )
          .join('')
      : '<tr><td colspan="5" style="color:var(--muted)">No unassigned mentees.</td></tr>');
  document.getElementById('manual-pick-mentor-card').classList.add('hidden');
  document.getElementById('manual-result').innerHTML = '';
}
function pickMentorFor(menteeId, menteeName) {
  state.manualPickMenteeId = menteeId;
  document.getElementById('manual-pick-name').textContent = menteeName;
  document.getElementById('manual-pick-mentor-card').classList.remove('hidden');
  document.getElementById('manual-mentor-options').innerHTML = state.mentors
    .map(
      (m) => `
    <div class="row" style="padding:8px 0;border-bottom:1px solid var(--border)">
      <div class="row-start"><div class="av av-blue">${initials(m.name)}</div><span style="font-size:13px">${escapeHtml(m.name)}</span></div>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="font-size:12px;color:var(--muted)">${m.overview.capacity - m.overview.menteeCount} open slots</span>
        <button class="btn btn-purple btn-xs" onclick="confirmManualAssign('${m.id}')">Assign</button>
      </div>
    </div>`
    )
    .join('');
}
function cancelManualPick() {
  document.getElementById('manual-pick-mentor-card').classList.add('hidden');
}
async function confirmManualAssign(mentorId) {
  const result = document.getElementById('manual-result');
  try {
    const res = await api('/api/coordinator/assign', {
      method: 'POST',
      body: JSON.stringify({ menteeId: state.manualPickMenteeId, mentorId })
    });
    result.innerHTML = notice('green', res.message);
    await loadMentors();
    renderManualList();
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// -- Dynamic --
async function loadClasses() {
  state.classes = await api('/api/coordinator/classes');
}
function renderDynamicPage() {
  const sel = document.getElementById('dynamic-class-select');
  sel.innerHTML = state.classes.map((c) => `<option value="${escapeHtml(c.className)}">${escapeHtml(c.className)} · ${c.count} students</option>`).join('');
  renderDynamicMentors();
}
function renderDynamicMentors() {
  const box = document.getElementById('dynamic-mentor-checklist');
  box.innerHTML = state.mentors
    .map((m) => `<label style="font-size:13px;display:flex;gap:8px;align-items:center"><input type="checkbox" class="dyn-chk" value="${m.id}"/> ${escapeHtml(m.name)} (${m.overview.capacity - m.overview.menteeCount} open)</label>`)
    .join('');
  document.getElementById('dynamic-result').innerHTML = '';
}
async function dynamicSplit() {
  const className = document.getElementById('dynamic-class-select').value;
  const cls = state.classes.find((c) => c.className === className);
  const mentorIds = Array.from(document.querySelectorAll('.dyn-chk:checked')).map((c) => c.value);
  const result = document.getElementById('dynamic-result');
  if (!cls || !mentorIds.length) {
    result.innerHTML = notice('red', 'Pick a class and at least one mentor.');
    return;
  }
  try {
    const res = await api('/api/coordinator/dynamic-split', {
      method: 'POST',
      body: JSON.stringify({ menteeIds: cls.menteeIds, mentorIds })
    });
    result.innerHTML = res.summary
      .map((s) => notice('green', `${s.mentorName}: ${s.menteeNames.join(', ') || 'none'}`))
      .join('');
    await Promise.all([loadMentors(), loadClasses()]);
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// -- Connect mode --
async function loadConnectMode() {
  const res = await api('/api/coordinator/connect-mode');
  state.connectEnabled = res.enabled;
}
function renderConnectPage() {
  document.getElementById('connect-toggle').checked = state.connectEnabled;
  document.getElementById('connect-toggle-label').textContent = state.connectEnabled ? 'On' : 'Off';
  loadOpenRequests();
}
async function toggleConnectMode() {
  const enabled = document.getElementById('connect-toggle').checked;
  await api('/api/coordinator/connect-mode', { method: 'PUT', body: JSON.stringify({ enabled }) });
  state.connectEnabled = enabled;
  document.getElementById('connect-toggle-label').textContent = enabled ? 'On' : 'Off';
}
async function loadOpenRequests() {
  const requests = await api('/api/coordinator/open-requests');
  document.getElementById('open-requests-list').innerHTML = requests.length
    ? requests
        .map(
          (r) => `
      <div class="row" style="padding:9px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:13px">${r.direction === 'mentee' ? escapeHtml(r.menteeName) + ' → requested ' + escapeHtml(r.mentorName) : escapeHtml(r.mentorName) + ' → reached out to ' + escapeHtml(r.menteeName)}</span>
        <span class="badge b-amber">Awaiting response</span>
      </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No open requests right now.</div>';
}

// ---------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------
async function renderNotifications() {
  const items = await api('/api/coordinator/notifications');
  const badgeFor = { unmet: 'b-red', 'at-risk': 'b-amber', feedback: 'b-blue' };
  const labelFor = { unmet: 'Unmet', 'at-risk': 'At risk', feedback: 'Feedback' };
  document.getElementById('notif-count').textContent = items.length;
  document.getElementById('notif-count').classList.toggle('hidden', items.length === 0);
  document.getElementById('notifications-list').innerHTML = items.length
    ? items
        .map(
          (n) => `
    <div class="card">
      <div class="row" style="margin-bottom:4px"><b style="font-size:13px">${escapeHtml(n.title)}</b><span class="badge ${badgeFor[n.type] || 'b-blue'}">${labelFor[n.type] || n.type}</span></div>
      <div style="font-size:12px;color:var(--muted)">${escapeHtml(n.detail)} · ${escapeHtml(n.date)}</div>
    </div>`
        )
        .join('')
    : '<div class="notice notice-green">No alerts right now.</div>';
}

// ---------------------------------------------------------------
// HOD Notices
// ---------------------------------------------------------------
async function renderHodNotices() {
  const notices = await api('/api/coordinator/hod-notices');
  document.getElementById('notices-count').textContent = notices.length;
  document.getElementById('notices-count').classList.toggle('hidden', notices.length === 0);
  document.getElementById('hodnotices-list').innerHTML = notices.length
    ? notices
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
// Remarks (read-only)
// ---------------------------------------------------------------
function renderRemarksPage() {
  const sel = document.getElementById('remarks-mentor-select');
  sel.innerHTML = state.mentors.map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');
  renderRemarksMenteeOptions();
}
function renderRemarksMenteeOptions() {
  const mentorId = document.getElementById('remarks-mentor-select').value;
  const sel = document.getElementById('remarks-mentee-select');
  fetchMenteesForMentor(mentorId).then((mentees) => {
    sel.innerHTML = mentees.map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('') || '<option value="">No mentees</option>';
    loadCoordRemarks();
  });
}
async function fetchMenteesForMentor(mentorId) {
  const dash = await api('/api/coordinator/dashboard');
  const row = dash.mentorOverview.find((m) => m.id === mentorId);
  return row ? row.mentees || [] : [];
}
async function loadCoordRemarks() {
  const mentorId = document.getElementById('remarks-mentor-select').value;
  const menteeId = document.getElementById('remarks-mentee-select').value;
  if (!mentorId || !menteeId) return;
  const res = await api(`/api/coordinator/remarks?mentorId=${mentorId}&menteeId=${menteeId}`);
  document.getElementById('remarks-cells').innerHTML = res.cells.length
    ? res.cells
        .map(
          (c) => `<div class="card" style="margin-bottom:8px"><div style="font-size:12px;color:var(--muted);margin-bottom:4px">Q: ${escapeHtml(c.question)}</div><div style="font-size:13px">${escapeHtml(c.answer)}</div></div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No remarks logged yet for this pair.</div>';
  document.getElementById('remarks-transcript').textContent = res.transcript || 'No transcript saved yet.';
}

// ---------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------
async function renderFeedbackPage() {
  const rows = await api('/api/coordinator/feedback');
  const box = document.getElementById('feedback-mentor-cards');
  box.innerHTML = rows
    .map(
      (r) => `
    <div class="card">
      <div class="card-title">⭐ ${escapeHtml(r.mentorName)}</div>
      <div class="grid2" style="margin-bottom:14px">
        ${['availability', 'communication', 'guidance', 'overall']
          .map((k) => `<div><div style="font-size:11px;color:var(--muted);text-transform:capitalize">${k}</div><div style="font-weight:600">${r.avgs[k] ?? '—'}</div></div>`)
          .join('')}
      </div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:6px">Mentee-wise feedback</div>
      <div style="margin-bottom:14px">
        ${
          r.entries.length
            ? r.entries.map((e) => `<div class="row" style="padding:6px 0;border-bottom:1px solid var(--border)"><span style="font-size:12px">${escapeHtml(e.menteeName)}</span><span style="font-size:12px;color:var(--amber)">${'★'.repeat(e.ratings.overall || 0)}</span></div>`).join('')
            : '<div style="font-size:12px;color:var(--muted)">No mentee feedback yet.</div>'
        }
      </div>
      <hr class="div"/>
      <div class="field"><label class="label">Your feedback to this mentor</label></div>
      <div class="star-input" data-mentor="${r.mentorId}" style="display:flex;gap:4px;font-size:20px;cursor:pointer;color:#3a4256;margin-bottom:10px" onclick="rateCoordStar(event,this)"></div>
      <textarea class="input coord-fb-comment" data-mentor="${r.mentorId}" rows="2" placeholder="Write your feedback...">${r.coordinatorFeedback ? escapeHtml(r.coordinatorFeedback.comment) : ''}</textarea>
      <button class="btn btn-purple btn-xs" style="margin-top:8px" onclick="submitCoordFeedback('${r.mentorId}')">Submit</button>
      <div class="coord-fb-note" data-mentor="${r.mentorId}" style="margin-top:8px"></div>
    </div>`
    )
    .join('');
  // paint stars after render
  rows.forEach((r) => {
    const el = document.querySelector(`.star-input[data-mentor="${r.mentorId}"]`);
    const value = r.coordinatorFeedback ? r.coordinatorFeedback.stars : 5;
    el.innerHTML = Array.from({ length: 5 }).map((_, i) => `<i class="${i < value ? 'lit' : ''}" style="color:${i < value ? 'var(--amber)' : 'inherit'}">★</i>`).join('');
    el.dataset.value = value;
  });
}
function rateCoordStar(evt, el) {
  const stars = Array.from(el.children);
  const idx = stars.indexOf(evt.target);
  if (idx === -1) return;
  stars.forEach((s, i) => (s.style.color = i <= idx ? 'var(--amber)' : 'inherit'));
  el.dataset.value = idx + 1;
}
async function submitCoordFeedback(mentorId) {
  const el = document.querySelector(`.star-input[data-mentor="${mentorId}"]`);
  const comment = document.querySelector(`.coord-fb-comment[data-mentor="${mentorId}"]`).value;
  const note = document.querySelector(`.coord-fb-note[data-mentor="${mentorId}"]`);
  try {
    await api('/api/coordinator/feedback', {
      method: 'POST',
      body: JSON.stringify({ mentorId, stars: el.dataset.value || 5, comment })
    });
    note.innerHTML = notice('green', 'Feedback saved — the mentor will see this on their Feedback page.');
  } catch (e) {
    note.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Reports
// ---------------------------------------------------------------
async function renderReportsPage() {
  const res = await api('/api/coordinator/reports');
  document.getElementById('reports-donut').innerHTML = `
    <div class="row"><span style="color:var(--green)">● Completed</span><b>${res.donut.completed}</b></div>
    <div class="row"><span style="color:var(--amber)">● Pending</span><b>${res.donut.pending}</b></div>`;

  document.getElementById('reports-per-mentor').innerHTML = res.overview
    .map(
      (m) => `<div style="margin-bottom:10px"><div class="row" style="margin-bottom:3px"><span style="font-size:13px">${escapeHtml(m.name)}</span><b>${m.sessionsThisMonth}</b></div><div class="prog-outer"><div class="prog-inner" style="width:${Math.min(m.sessionsThisMonth * 20, 100)}%;background:var(--blue)"></div></div></div>`
    )
    .join('');

  const table = document.getElementById('compliance-table');
  table.innerHTML =
    '<tr><th>Mentor</th><th>Mentee</th><th>Sessions this month</th><th>Status</th></tr>' +
    (res.compliance.length
      ? res.compliance
          .map(
            (c) => `<tr><td>${escapeHtml(c.mentorName)}</td><td>${escapeHtml(c.menteeName)}</td><td>${c.sessionsThisMonth}</td><td>${c.met ? '<span class="badge b-green">Met</span>' : '<span class="badge b-red">Unmet</span>'}</td></tr>`
          )
          .join('')
      : '<tr><td colspan="4" style="color:var(--muted)">No assigned pairs yet.</td></tr>');
}

// ---------------------------------------------------------------
function notice(color, text) {
  const cls = { green: 'notice-green', red: 'notice-red', amber: 'notice-amber', blue: 'notice-blue' }[color];
  return `<div class="notice ${cls}" style="margin-bottom:8px">${escapeHtml(text)}</div>`;
}
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
