# MentorOne — Mentee + Mentor + Coordinator + HOD

A complete, four-role mentoring platform: **Mentee, Mentor, Coordinator,
and HOD apps**, each fully separate with its own dedicated login page, all
sharing one small Express backend and one synthetic in-memory
"database." They are genuinely connected — an action in one app is
visible in the others immediately, not simulated separately per app.

**Every app has its own dedicated login page and its own login route. None
of them share a login form, a login endpoint, or a role picker:**

| App | Login route | Logs in with |
|---|---|---|
| Mentee | `POST /api/auth/mentee-login` | Register Number + password |
| Mentor | `POST /api/auth/mentor-login` | Employee ID + password |
| Coordinator | `POST /api/auth/coordinator-login` | Employee ID + password |
| HOD | `POST /api/auth/hod-login` | Employee ID + password |

## Running it

Requires Node.js 18+.

```bash
cd backend
npm install
npm start
```

This starts **one server that hosts all four apps**:

- **Mentee app:** http://localhost:4000/mentee/
- **Mentor app:** http://localhost:4000/mentor/
- **Coordinator app:** http://localhost:4000/coordinator/
- **HOD app:** http://localhost:4000/hod/

(`http://localhost:4000/` on its own just shows four links to the apps
above — that page is a local dev convenience only, not part of any
portal's UX or a "role selection" screen.)

## Demo logins (every role)

| App | Login ID | Password | Who |
|---|---|---|---|
| Mentee | `2548021` | `mentee123` | Jasmine A — already has a mentor (Dr. Ramesh Kumar) |
| Mentee | `2548035` | `mentee123` | Sanjay K — **unassigned**, has a pending request to Dr. Ramesh Kumar waiting for his response |
| Mentee | `2548041` | `mentee123` | Akhil Thomas — unassigned |
| Mentee | `2548052` | `mentee123` | Sandra Joseph — unassigned |
| Mentor | `EMP2010` | `mentor123` | Dr. Ramesh Kumar |
| Mentor | `EMP2011` | `mentor123` | Dr. Sunita Pillai |
| Mentor | `EMP2012` | `mentor123` | Mr. Arun Joseph |
| Coordinator | `EMP2001` | `coord123` | Dr. Meena S — Data Science |
| HOD | `EMP1001` | `hod123` | Dr. Helen Mathew — HOD, Data Science |

Each login box is labelled for what it expects — nothing needs to be
guessed, and nothing is shown in the UI (it's "stored in the background,"
as requested — these tables are just so you can test it).

### A good way to see all four apps connect live

Open all four in separate tabs (Mentee as Jasmine `2548021`, Mentor as
Dr. Ramesh Kumar `EMP2010`, Coordinator as Dr. Meena S `EMP2001`, HOD as
Dr. Helen Mathew `EMP1001`):

1. **HOD sets the department up first — coordinator, then mentors.** This
   is the intended order: before any mentee/mentor connection can happen,
   the HOD assigns who's who. In the HOD app, go to "Assign Coordinator &
   Mentors," pick "Computer Science," and:
   - Assign a coordinator (pick a faculty member + UG/PG).
   - Scroll to "Assign Mentors" and click "Make Mentor" next to Dr. Anand P.
     He instantly becomes a real, logged-in-capable mentor — the response
     tells you his login is `EMP2020` / `mentor123`. Log into the Mentor
     app with that and his full profile (designation, qualification,
     specialisation tags) is already there, not a blank placeholder.
   - He now appears in the Coordinator's My Mentors list and the Mentee
     app's Find Mentor list immediately — no restart needed.
   - "Remove" is blocked while a mentor still has mentees assigned (try it
     on Dr. Ramesh Kumar, who has Jasmine — it'll tell you to unpair her
     first from Mentee Allocation).
2. **Mentee → Mentor pairing (request-based).** Log in as Sanjay K
   (`2548035`, unassigned) — his Find Mentor page shows the mentor list
   since he has none yet. In the Mentor app, Dr. Ramesh Kumar's Home page
   already shows a pending "Mentee Requests" entry for Sanjay K (seeded).
   Accept it, then refresh Sanjay's Mentee dashboard/Find Mentor page — he
   now shows Dr. Ramesh Kumar as his mentor instead of a browse list.
3. **HOD unpairs a mentee.** In the HOD app, go to Mentee Allocation or
   Mentoring Diaries and click "Decline / Unpair" next to Jasmine A under
   Dr. Ramesh Kumar. Refresh Jasmine's Mentee dashboard — she now has no
   mentor. Have the Coordinator re-assign her (Assign Mentees → Manual
   assign) to put her back.
4. **Coordinator switches off direct requests.** In the Coordinator app,
   Assign Mentees → "Mentor ⇄ Mentee connect," turn the toggle off. In the
   Mentee app, an unassigned mentee's Find Mentor page now shows an amber
   notice and disabled Request buttons — the coordinator must assign them
   manually instead. Turn it back on to re-enable direct requests.
5. **Session request.** As Jasmine, go to Book Session → "Book a New
   Session," pick a date and a green slot, and send the request. Switch to
   the Mentor app's Session Requests page — it appears instantly as
   Pending. Accept it, then refresh Jasmine's dashboard — it now shows
   Confirmed.
6. **OTP.** As the mentor, go to OTP Attendance, pick a session, and click
   "Request OTP" — a 6-digit code appears (valid 5 minutes). As the mentee,
   go to the OTP page, enter that exact code, and it confirms attendance.
7. **Mentor escalates, HOD sees it.** In the Mentor app, go to Report
   Critical Issue and submit one for a mentee. In the HOD app's Critical
   Issues page, it appears immediately with the mentor and mentee named.
8. **HOD sends a precisely targeted notice.** In the HOD app's Critical
   Issues → Notify panel, check only "Mentee" and pick Jasmine A
   specifically (not "Notify All"), write a message, and send. Log in as
   Jasmine — the notice is in her HOD Notices. Log in as Sanjay K instead
   — it is *not* in his, proving the targeting is per-person, not just
   per-role.
9. **HOD broadcasts a department notice.** In the HOD app's Department
   Notice page, publish one. It instantly appears in the Mentee, Mentor,
   *and* Coordinator apps' HOD Notices pages, all from one publish.
10. **Feedback, both directions.** As the mentee, submit feedback for a
    session — it shows up on the mentor's Feedback Received page instantly.
    As the coordinator, go to Feedback and rate a mentor yourself — that
    rating now shows up under "Coordinator's Feedback" on the mentor's own
    Feedback Received page.

## What's new in this round

- **HOD can now assign mentors, not just coordinators.** "Assign
  Coordinator" is now "Assign Coordinator & Mentors" — for any department,
  the HOD can promote a faculty member to mentor with one click. This
  creates a real mentor record (full profile: designation, qualification,
  specialisation tags, experience — pulled from a richer synthetic faculty
  roster, not blank placeholders) *and* a real login for the Mentor app
  (`employeeId` / `mentor123`), and it's visible instantly in the
  Coordinator's My Mentors list and the Mentee app's Find Mentor list.
  Removing a mentor is blocked while they still have mentees assigned, to
  stop mentees being silently orphaned.
- **Full HOD app**, backend-connected: Dashboard, Assign Coordinator &
  Mentors, Mentee Allocation (view + unpair any mentor-mentee pairing),
  Mentor Capacity, Session Compliance, Mentoring Diaries (pairing
  accept/decline + read-only remarks/transcript viewer), Critical Issues
  (real escalations from mentors + a precisely targeted Notify tool),
  Department Notice (broadcast), and Peer Mentoring.
- **Precise, per-person notice targeting**: the HOD's Notify tool can
  address a specific mentor, mentee, or coordinator by name (not just "all
  mentors") — the shared notice system was extended so `recipients` can
  carry either a role tag (`mentor`, `mentee-group`, `coordinator`) or an
  exact ID (`mentor:MEN-001`), and every app's HOD Notices feed matches
  both.
- **HOD actions genuinely drive Mentor/Mentee/Coordinator state**:
  assigning/removing a coordinator or mentor, unpairing a mentee, and
  sending notices all write to the same shared data the other three apps
  read.
- **Four fully separate login routes and pages** — no app has a role
  selector, and none of them share a login form or endpoint.
- (Carried over from the previous round: the Mentee app's real date
  picker on Book Session, and Find Mentor correctly showing "you already
  have a mentor" instead of a browse list when applicable.)

## Project structure

```
mentorone-app/
├── backend/
│   ├── server.js       All routes: /api/auth/*, /api/mentee/*, /api/mentor/*,
│   │                  /api/coordinator/*, /api/hod/*
│   ├── data.js          Synthetic in-memory "database" shared by all four apps
│   └── package.json
├── frontend-mentee/
│   ├── index.html        Mentee login screen + mentee app shell
│   ├── app.js             Mentee client logic
│   └── style.css
├── frontend-mentor/
│   ├── index.html        Mentor login screen + mentor app shell
│   ├── app.js             Mentor client logic
│   └── style.css
├── frontend-coordinator/
│   ├── index.html        Coordinator login screen + coordinator app shell
│   ├── app.js             Coordinator client logic
│   └── style.css
└── frontend-hod/
    ├── index.html        HOD login screen + HOD app shell
    ├── app.js             HOD client logic
    └── style.css
```

## API summary

### Auth (separate per app — see table above)
| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/api/auth/mentee-login` | `{ registerNo, password }` | `{ token, mentee }` |
| POST | `/api/auth/mentor-login` | `{ employeeId, password }` | `{ token, mentor }` |
| POST | `/api/auth/coordinator-login` | `{ employeeId, password }` | `{ token, coordinator }` |
| POST | `/api/auth/hod-login` | `{ employeeId, password }` | `{ token, hod }` |
| POST | `/api/auth/logout` | — | `{ ok:true }` |

All routes below require `Authorization: Bearer <token>` from the matching
login, and are role-checked (e.g. a mentee token cannot call a
`/api/hod/*` route).

### Mentee (`/api/mentee/*`)
`dashboard` · `mentors` (Find Mentor) · `connect-mode` (GET) ·
`mentor-requests` (POST, send a request — blocked if connect mode is off)
· `sessions` (GET list / POST book new) · `sessions/:id/reschedule` (PUT)
· `slots?date=YYYY-MM-DD` · `otp/verify` (POST) ·
`otp/status/:sessionId` · `hod-notices` · `feedback` (GET history / POST
submit)

### Mentor (`/api/mentor/*`)
`dashboard` · `mentees` · `find-mentees` · `connect-mode` (GET) ·
`mentee-requests` (POST — blocked if connect mode is off) ·
`mentee-requests/:id/respond` (POST) · `sessions` (GET / POST) ·
`sessions/:id/respond` (POST) · `sessions/:id/reschedule` (PUT) ·
`otp/generate` (POST) · `remarks/:menteeId` (GET / POST) ·
`transcript/:menteeId` (GET / PUT) · `critical-issues` (GET / POST) ·
`group-meets` (POST) · `hod-notices` (GET) · `feedback` (GET, includes
coordinator feedback) · `profile` (GET / PUT)

### Coordinator (`/api/coordinator/*`)
`dashboard` · `mentors` · `mentees/unassigned` · `assign` (POST, direct
mentee→mentor) · `classes` · `dynamic-split` (POST) · `connect-mode`
(GET / PUT) · `open-requests` (GET) · `notifications` (GET, computed) ·
`hod-notices` (GET) · `remarks?mentorId=&menteeId=` (GET, read-only) ·
`feedback` (GET / POST, coordinator's own rating of a mentor) · `reports`
(GET)

### HOD (`/api/hod/*`)
`dashboard` · `departments` (GET, list of dept names) ·
`faculty?department=` (GET, includes each faculty's current mentor status)
· `coordinator-assignment?department=` (GET) · `assign-coordinator` (POST)
· `assign-mentor` (POST, promotes a faculty member to a real mentor with
its own login) · `remove-mentor` (POST, blocked while the mentor still has
mentees) · `allocation` (GET, mentor↔mentee overview + unassigned) ·
`pairings/:menteeId/accept` / `.../decline` (POST, decline = unpair) ·
`capacity` (GET) · `compliance` (GET) · `remarks?mentorId=&menteeId=`
(GET, read-only) · `critical-issues` (GET) · `mentors-list` /
`mentees-list` / `coordinators-list` (GET, for the Notify dropdowns) ·
`notify` (POST, precisely targeted or "all") · `department-notice` (POST,
broadcast) · `peer-mentoring` (GET, static/illustrative info)

## Notes for whoever continues this build

- Auth is intentionally minimal (random in-memory token per login, no
  expiry, no password hashing) — a synthetic demo backend, not production
  auth. Replace with real sessions/JWT + hashed passwords before this
  touches real student/faculty data.
- `data.js` is the entire "database," shared by all four apps' routes in
  `server.js`. Moving to a real one means rewriting the functions/objects
  in `data.js` to read/write real storage — `server.js` never touches the
  storage format directly, so nothing else should need to change.
- Only Data Science ships with pre-seeded, already-logged-in Mentor and
  Coordinator accounts. Computer Science and AI & ML exist as departments
  with a full faculty roster in `facultyStore` — the HOD can promote any
  of them to mentor (Assign Coordinator & Mentors) and they'll get a real,
  working login on the spot. Coordinators for those departments can be
  assigned the same way, but (unlike mentors) an assigned coordinator
  doesn't automatically get a live Coordinator-app login yet — only
  Dr. Meena S's `COORD-001` account exists. That's the natural next
  increment: make `assign-coordinator` create a coordinator login the same
  way `assign-mentor` already does for mentors.
- The slot grid is still a static template regardless of which date is
  picked — wiring real per-date availability is a good next increment.
- Mentor-initiated mentee requests are supported by the backend but the
  Mentee app doesn't yet have a UI to see/accept an incoming one — only
  the reverse (mentee requests mentor) is wired up end to end.
- Recording in the Mentor's Remarks page is a simple start/stop timer with
  a manually editable transcript box — no real microphone capture.
- The HOD's Peer Mentoring page is intentionally static/illustrative
  (`GET /api/hod/peer-mentoring` returns fixed numbers) since that
  program isn't backed by the academic mentor/mentee data model here —
  said plainly rather than dressed up as computed data.
- All four roles now exist end to end. Good next steps: real per-date
  scheduling, password hashing + session expiry, and a persistent database
  behind `data.js`.
