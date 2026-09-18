/* ============================================================
   MentorOne — HOD app frontend
   Talks to the same Express backend as the other three apps, but
   only ever uses /api/auth/hod-login and /api/hod/*.
   ============================================================ */

const API = '';

let state = {
  token: localStorage.getItem('hod_token') || null,
  hod: null,
  departments: [],
  faculty: [],
  mentors: [],
  mentees: [],
  coordinators: []
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
      localStorage.removeItem('hod_token');
      state.token = null;
    });
  }
});

// ---------------------------------------------------------------
// Auth (dedicated HOD login — separate route, separate page)
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
    const res = await api('/api/auth/hod-login', {
      method: 'POST',
      body: JSON.stringify({ employeeId: empId, password: pass })
    });
    state.token = res.token;
    state.hod = res.hod;
    localStorage.setItem('hod_token', res.token);
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
  localStorage.removeItem('hod_token');
  state = { ...state, token: null, hod: null };
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-empid').value = '';
  document.getElementById('login-pass').value = '';
}

async function enterApp() {
  const dash = await api('/api/hod/dashboard');
  state.hod = dash.hod;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('topbar-av').textContent = initials(state.hod.name);
  document.getElementById('topbar-name').textContent = `${state.hod.name} — HOD, ${state.hod.department}`;

  renderDashboard(dash);
  await Promise.all([loadDepartments(), loadMentors(), loadMentees(), loadCoordinators()]);
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

  if (name === 'assigncoord') renderAssignCoordPage();
  if (name === 'allocation') renderAllocationPage();
  if (name === 'capacity') renderCapacityPage();
  if (name === 'compliance') renderCompliancePage();
  if (name === 'diaries') renderDiariesPage();
  if (name === 'critical') renderCriticalPage();
  if (name === 'peer') renderPeerPage();
}

// ---------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------
function renderDashboard(dash) {
  document.getElementById('dash-sub').textContent = `${dash.hod.department} · Department overview`;
  document.getElementById('stat-mentees').textContent = dash.stats.departmentMentees;
  document.getElementById('stat-mentors').textContent = dash.stats.mentors;
  document.getElementById('stat-allocated').textContent = dash.stats.allocatedStudents;
  const alertBox = document.getElementById('awaiting-alert');
  if (dash.stats.awaitingApproval > 0) {
    alertBox.classList.remove('hidden');
    alertBox.innerHTML = `⏳ ${dash.stats.awaitingApproval} item(s) awaiting your attention — open critical issues or pending connect requests.`;
  } else {
    alertBox.classList.add('hidden');
  }
}

// ---------------------------------------------------------------
// Shared loads
// ---------------------------------------------------------------
async function loadDepartments() {
  state.departments = await api('/api/hod/departments');
}
async function loadMentors() {
  state.mentors = await api('/api/hod/mentors-list');
}
async function loadMentees() {
  state.mentees = await api('/api/hod/mentees-list');
}
async function loadCoordinators() {
  state.coordinators = await api('/api/hod/coordinators-list');
}

// ---------------------------------------------------------------
// Assign Coordinator
// ---------------------------------------------------------------
function renderAssignCoordPage() {
  const sel = document.getElementById('ac-dept-select');
  sel.innerHTML = state.departments.map((d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
  onDeptChange();
}
async function onDeptChange() {
  const dept = document.getElementById('ac-dept-select').value;
  const [faculty, current] = await Promise.all([
    api(`/api/hod/faculty?department=${encodeURIComponent(dept)}`),
    api(`/api/hod/coordinator-assignment?department=${encodeURIComponent(dept)}`)
  ]);
  state.faculty = faculty;

  const facultySel = document.getElementById('ac-faculty-select');
  facultySel.innerHTML = faculty.map((f) => `<option value="${f.id}">${escapeHtml(f.name)} — ${escapeHtml(f.employeeId)}</option>`).join('');

  const currentBox = document.getElementById('ac-current');
  if (current && current.faculty) {
    currentBox.innerHTML = `
      <div class="row-start"><div class="av av-teal av-lg">${initials(current.faculty.name)}</div>
      <div><div style="font-weight:600">${escapeHtml(current.faculty.name)}</div><div style="font-size:12px;color:var(--muted)">${escapeHtml(current.faculty.employeeId)}</div></div>
      <span class="badge b-blue" style="margin-left:auto;margin-right:8px">${escapeHtml(current.courseType)}</span><span class="badge b-green">Assigned</span></div>`;
    facultySel.value = current.facultyId;
    document.getElementById('ac-course-select').value = current.courseType;
  } else {
    currentBox.innerHTML = '<div class="notice notice-amber" style="margin-bottom:0">No coordinator assigned yet for this department.</div>';
  }
  document.getElementById('ac-result').innerHTML = '';

  renderMentorAssignList(faculty);
}
function renderMentorAssignList(faculty) {
  const box = document.getElementById('mentor-assign-list');
  box.innerHTML = faculty
    .map(
      (f) => `
    <div class="row" style="padding:9px 0;border-bottom:1px solid var(--border)">
      <div class="row-start"><div class="av av-blue">${initials(f.name)}</div><div><b style="font-size:13px">${escapeHtml(f.name)}</b><div style="font-size:11px;color:var(--muted)">${escapeHtml(f.designation)} · ${escapeHtml(f.employeeId)}</div></div></div>
      <div style="display:flex;align-items:center;gap:8px">
        ${f.isMentor ? `<span class="badge b-green">Mentor · ${f.menteeCount} mentee(s)</span><button class="btn btn-xs btn-red" onclick="removeMentor('${f.mentorId}')">Remove</button>` : `<button class="btn btn-xs btn-teal" onclick="assignMentor('${f.id}')">Make Mentor</button>`}
      </div>
    </div>`
    )
    .join('');
}
async function assignMentor(facultyId) {
  const result = document.getElementById('mentor-assign-result');
  try {
    const res = await api('/api/hod/assign-mentor', { method: 'POST', body: JSON.stringify({ facultyId }) });
    result.innerHTML = notice('green', res.message);
    await loadMentors();
    onDeptChange();
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}
async function removeMentor(mentorId) {
  const result = document.getElementById('mentor-assign-result');
  try {
    const res = await api('/api/hod/remove-mentor', { method: 'POST', body: JSON.stringify({ mentorId }) });
    result.innerHTML = notice('green', res.message);
    await loadMentors();
    onDeptChange();
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}
async function assignCoordinator() {
  const department = document.getElementById('ac-dept-select').value;
  const facultyId = document.getElementById('ac-faculty-select').value;
  const courseType = document.getElementById('ac-course-select').value;
  const result = document.getElementById('ac-result');
  try {
    const res = await api('/api/hod/assign-coordinator', {
      method: 'POST',
      body: JSON.stringify({ department, facultyId, courseType })
    });
    result.innerHTML = notice('green', res.message);
    onDeptChange();
    loadCoordinators();
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Mentee Allocation
// ---------------------------------------------------------------
async function renderAllocationPage() {
  const res = await api('/api/hod/allocation');
  const box = document.getElementById('allocation-list');
  box.innerHTML = res.overview
    .map(
      (m) => `
    <div class="card">
      <div class="row" style="margin-bottom:10px">
        <div class="row-start"><div class="av av-blue">${initials(m.name)}</div><b>${escapeHtml(m.name)}</b></div>
        <span style="font-size:12px;color:var(--muted)">${m.assigned} / ${m.capacity} assigned · ${m.openSlots} open</span>
      </div>
      ${
        m.mentees.length
          ? m.mentees
              .map(
                (mn) => `
        <div class="row" style="padding:7px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:13px">${escapeHtml(mn.name)} ${mn.status === 'At risk' ? '<span class="badge b-red">At risk</span>' : ''}</span>
          <div style="display:flex;gap:6px">
            <button class="btn btn-xs btn-teal" onclick="pairingAction('${mn.id}','accept')">Accept</button>
            <button class="btn btn-xs btn-red" onclick="pairingAction('${mn.id}','decline')">Decline / Unpair</button>
          </div>
        </div>`
              )
              .join('')
          : '<div style="font-size:12px;color:var(--muted)">No mentees assigned yet.</div>'
      }
    </div>`
    )
    .join('');

  const unassignedCard = document.getElementById('unassigned-card');
  if (res.unassigned.length) {
    unassignedCard.classList.remove('hidden');
    document.getElementById('unassigned-list').innerHTML = res.unassigned.map((m) => escapeHtml(m.name)).join(', ');
  } else {
    unassignedCard.classList.add('hidden');
  }
}
async function pairingAction(menteeId, action) {
  try {
    const res = await api(`/api/hod/pairings/${menteeId}/${action}`, { method: 'POST' });
    alert(res.message);
    renderAllocationPage();
  } catch (e) {
    alert(e.message);
  }
}

// ---------------------------------------------------------------
// Mentor Capacity
// ---------------------------------------------------------------
async function renderCapacityPage() {
  const rows = await api('/api/hod/capacity');
  const table = document.getElementById('capacity-table');
  table.innerHTML =
    '<tr><th>Mentor</th><th>Assigned</th><th>Capacity</th><th>Open slots</th><th>Status</th></tr>' +
    rows
      .map(
        (r) => `<tr><td>${escapeHtml(r.name)}</td><td>${r.assigned}</td><td>${r.capacity}</td><td>${r.openSlots}</td><td>${r.compliant ? '<span class="badge b-green">Within policy</span>' : '<span class="badge b-red">Over capacity</span>'}</td></tr>`
      )
      .join('');
}

// ---------------------------------------------------------------
// Session Compliance
// ---------------------------------------------------------------
async function renderCompliancePage() {
  const res = await api('/api/hod/compliance');
  document.getElementById('compliance-pct').textContent = res.compliantPct + '%';
  const table = document.getElementById('compliance-table');
  table.innerHTML =
    '<tr><th>Mentor</th><th>Mentee</th><th>Sessions this month</th><th>Status</th></tr>' +
    (res.rows.length
      ? res.rows
          .map(
            (r) => `<tr><td>${escapeHtml(r.mentorName)}</td><td>${escapeHtml(r.menteeName)}</td><td>${r.sessionsThisMonth}</td><td>${r.met ? '<span class="badge b-green">Met</span>' : '<span class="badge b-red">Action required</span>'}</td></tr>`
          )
          .join('')
      : '<tr><td colspan="4" style="color:var(--muted)">No assigned pairs yet.</td></tr>');
}

// ---------------------------------------------------------------
// Mentoring Diaries
// ---------------------------------------------------------------
async function renderDiariesPage() {
  const res = await api('/api/hod/allocation');
  const box = document.getElementById('diaries-pairings-list');
  const pairs = [];
  res.overview.forEach((m) => m.mentees.forEach((mn) => pairs.push({ mentorName: m.name, mentorId: m.id, mentee: mn })));
  box.innerHTML = pairs.length
    ? pairs
        .map(
          (p) => `
    <div class="row" style="padding:9px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:13px">${escapeHtml(p.mentorName)} ↔ ${escapeHtml(p.mentee.name)}</span>
      <div style="display:flex;gap:6px">
        <button class="btn btn-xs btn-teal" onclick="pairingAction('${p.mentee.id}','accept')">Accept</button>
        <button class="btn btn-xs btn-red" onclick="pairingAction('${p.mentee.id}','decline')">Decline</button>
      </div>
    </div>`
        )
        .join('')
    : '<div style="font-size:13px;color:var(--muted)">No pairings yet.</div>';

  const mentorSel = document.getElementById('diary-mentor-select');
  mentorSel.innerHTML = res.overview.filter((m) => m.mentees.length).map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('') || '<option value="">No mentors with mentees</option>';
  onDiaryMentorChange();
}
function onDiaryMentorChange() {
  const mentorId = document.getElementById('diary-mentor-select').value;
  api('/api/hod/allocation').then((res) => {
    const row = res.overview.find((m) => m.id === mentorId);
    const sel = document.getElementById('diary-mentee-select');
    sel.innerHTML = row ? row.mentees.map((mn) => `<option value="${mn.id}">${escapeHtml(mn.name)}</option>`).join('') : '';
    loadDiary();
  });
}
async function loadDiary() {
  const mentorId = document.getElementById('diary-mentor-select').value;
  const menteeId = document.getElementById('diary-mentee-select').value;
  if (!mentorId || !menteeId) return;
  const res = await api(`/api/hod/remarks?mentorId=${mentorId}&menteeId=${menteeId}`);
  document.getElementById('diary-cells').innerHTML = res.cells.length
    ? res.cells.map((c) => `<div class="card" style="margin-bottom:8px"><div style="font-size:12px;color:var(--muted);margin-bottom:4px">Q: ${escapeHtml(c.question)}</div><div style="font-size:13px">${escapeHtml(c.answer)}</div></div>`).join('')
    : '<div style="font-size:13px;color:var(--muted)">No remarks logged yet.</div>';
  document.getElementById('diary-transcript').textContent = res.transcript || 'No transcript saved yet.';
}

// ---------------------------------------------------------------
// Critical Issues + Notify
// ---------------------------------------------------------------
async function renderCriticalPage() {
  const issues = await api('/api/hod/critical-issues');
  document.getElementById('critical-count').textContent = issues.filter((i) => i.status === 'Open').length;
  document.getElementById('critical-count').classList.toggle('hidden', !issues.filter((i) => i.status === 'Open').length);
  document.getElementById('critical-list').innerHTML = issues.length
    ? issues
        .map(
          (i) => `
    <div class="row" style="padding:10px 0;border-bottom:1px solid var(--border)">
      <div><b style="font-size:13px">${escapeHtml(i.category)}</b><div style="font-size:12px;color:var(--muted)">${escapeHtml(i.id)} · ${escapeHtml(i.mentorName)} → ${escapeHtml(i.menteeName)} · ${escapeHtml(i.date)}</div></div>
      <span class="badge ${i.status === 'Open' ? 'b-red' : 'b-green'}">${escapeHtml(i.status)}</span>
    </div>`
        )
        .join('')
    : '<div class="notice notice-green" style="margin-bottom:0">No escalations right now.</div>';

  document.getElementById('notify-mentor-select').innerHTML = state.mentors.map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');
  document.getElementById('notify-mentee-select').innerHTML = state.mentees.map((m) => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');
  document.getElementById('notify-coordinator-select').innerHTML = state.coordinators.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
}
function toggleNotifyAll() {
  const all = document.getElementById('notify-all').checked;
  ['mentor', 'mentee', 'coordinator'].forEach((t) => {
    const toggle = document.getElementById(`notify-${t}-toggle`);
    const select = document.getElementById(`notify-${t}-select`);
    if (all) toggle.checked = false;
    toggle.disabled = all;
    select.disabled = all || !toggle.checked;
  });
}
function toggleNotifyTarget(type) {
  const toggle = document.getElementById(`notify-${type}-toggle`);
  document.getElementById(`notify-${type}-select`).disabled = !toggle.checked;
}
async function sendTargetedNotice() {
  const result = document.getElementById('notify-result');
  const message = document.getElementById('notify-text').value.trim();
  const all = document.getElementById('notify-all').checked;
  const payload = { all, message };
  if (!all) {
    if (document.getElementById('notify-mentor-toggle').checked) payload.mentorId = document.getElementById('notify-mentor-select').value;
    if (document.getElementById('notify-mentee-toggle').checked) payload.menteeId = document.getElementById('notify-mentee-select').value;
    if (document.getElementById('notify-coordinator-toggle').checked) payload.coordinatorId = document.getElementById('notify-coordinator-select').value;
  }
  try {
    const res = await api('/api/hod/notify', { method: 'POST', body: JSON.stringify(payload) });
    result.innerHTML = notice('green', res.message);
    document.getElementById('notify-text').value = '';
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Department Notice
// ---------------------------------------------------------------
async function publishDeptNotice() {
  const message = document.getElementById('dept-notice-text').value.trim();
  const result = document.getElementById('dept-notice-result');
  try {
    const res = await api('/api/hod/department-notice', { method: 'POST', body: JSON.stringify({ message }) });
    result.innerHTML = notice('green', res.message);
  } catch (e) {
    result.innerHTML = notice('red', e.message);
  }
}

// ---------------------------------------------------------------
// Peer Mentoring
// ---------------------------------------------------------------
async function renderPeerPage() {
  const res = await api('/api/hod/peer-mentoring');
  document.getElementById('peer-mentors').textContent = res.trainedPeerMentors;
  document.getElementById('peer-groups').textContent = res.peerGroups;
  document.getElementById('peer-pct').textContent = res.trainingCompletePct + '%';
  document.getElementById('peer-principle').textContent = res.principle;
}

// ---------------------------------------------------------------
function notice(color, text) {
  const cls = { green: 'notice-green', red: 'notice-red', amber: 'notice-amber', blue: 'notice-blue' }[color];
  return `<div class="notice ${cls}" style="margin-bottom:0">${escapeHtml(text)}</div>`;
}
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
