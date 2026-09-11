import {
  FiBell,
  FiAlertTriangle,
  FiUsers,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiActivity,
} from "react-icons/fi";

import StatCard from "../../components/cards/StatCard";
import SessionOverview from "../../components/dashboard/SessionOverview";
import TodaysSessions from "../../components/dashboard/TodaysSessions";
import ComplianceMatrix from "../../components/dashboard/ComplianceMatrix";
import AttentionRequired from "../../components/dashboard/AttentionRequired";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="min-h-full bg-[#080C14] p-6">

      {/* =====================================================
          WELCOME SECTION
      ===================================================== */}
      <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-sm font-medium text-indigo-400">
              Friday, 14 August 2026
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Hello, Dr. Meena S 👋
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Welcome back to MentorOne. Here's what's happening today.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">
            <p className="text-xs text-slate-500">
              Role
            </p>

            <p className="mt-1 text-sm font-semibold text-indigo-400">
              Coordinator
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          STATISTICS
      ===================================================== */}
      <section className="mt-6">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <StatCard
            type="mentors"
            title="Total mentors"
            value="86"
            change="↑ 8 this month"
            color="blue"
            data={[
              30, 45, 35, 55, 42, 60, 48,
              70, 52, 66, 58, 75, 62
            ]}
          />

          <StatCard
            type="mentees"
            title="Total mentees"
            value="240"
            change="↑ 12 this month"
            color="green"
            data={[
              35, 55, 42, 70, 50, 65, 45,
              78, 58, 70, 60, 82, 72
            ]}
          />

          <StatCard
            type="sessions"
            title="Sessions this month"
            value="45"
            change="↑ 6 this month"
            color="purple"
            data={[
              50, 35, 55, 42, 62, 38, 58,
              45, 68, 50, 72, 55, 75
            ]}
          />

          <StatCard
            type="active"
            title="Active sessions"
            value="18"
            change="On track"
            color="orange"
            data={[
              55, 40, 60, 45, 50, 38, 62,
              48, 70, 52, 45, 65, 50
            ]}
          />

          <StatCard
            type="problems"
            title="Non-compliant pairs"
            value="7"
            change="↑ 2 this month"
            changeType="negative"
            color="red"
            data={[
              60, 55, 62, 50, 45, 52, 40,
              48, 35, 50, 30, 42, 28
            ]}
          />

        </div>

      </section>


      {/* =====================================================
          NEW: COORDINATOR OVERVIEW
      ===================================================== */}
      <section className="mt-6">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* HOD Notices */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <FiBell />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    HOD Notices
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    2
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] font-semibold text-indigo-400">
                New
              </span>

            </div>

            <p className="mt-4 text-sm text-slate-400">
              Important instructions and updates from the HOD.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/coordinator/hod-notices")
              }
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              View notices
              <FiArrowRight />
            </button>

          </div>


          {/* Critical Issues */}
          <div className="rounded-2xl border border-red-500/20 bg-[#0D1422] p-5">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <FiAlertTriangle />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Critical Issues
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    1
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-semibold text-red-400">
                Attention
              </span>

            </div>

            <p className="mt-4 text-sm text-slate-400">
              Critical mentoring issues requiring coordinator attention.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/coordinator/remarks")
              }
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300"
            >
              Review issues
              <FiArrowRight />
            </button>

          </div>


          {/* Allocation */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <FiUsers />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Allocation Status
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    92%
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-400">
                On track
              </span>

            </div>

            <p className="mt-4 text-sm text-slate-400">
              Current mentor-mentee allocation completion.
            </p>

            <button
              onClick={() =>
                (window.location.href = "/coordinator/assign-mentees")
              }
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Manage allocation
              <FiArrowRight />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          SESSION OVERVIEW + TODAY'S SESSIONS
      ===================================================== */}
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">

        <SessionOverview />

        <TodaysSessions />

      </div>


      {/* =====================================================
          COMPLIANCE
      ===================================================== */}
      <div className="mt-5">

        <ComplianceMatrix />

      </div>


      {/* =====================================================
          ATTENTION + QUICK ACTIONS
      ===================================================== */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        <AttentionRequired />

        <QuickActions />

      </div>


      {/* =====================================================
          NEW: RECENT ACTIVITY + UPCOMING
      ===================================================== */}
      <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422]">

          <div className="flex items-center justify-between border-b border-slate-800 p-5">

            <div>
              <h2 className="font-semibold text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest mentoring system activity
              </p>
            </div>

            <FiActivity className="text-indigo-400" />

          </div>


          <div className="divide-y divide-slate-800">

            <ActivityItem
              icon={<FiCheckCircle />}
              iconClass="bg-emerald-500/10 text-emerald-400"
              title="Mentoring session completed"
              description="Dr. Ramesh Kumar completed a session with Jasmine A."
              time="20 min ago"
            />

            <ActivityItem
              icon={<FiUsers />}
              iconClass="bg-indigo-500/10 text-indigo-400"
              title="Mentee assigned"
              description="Rahul Kumar was assigned to Dr. Meena S."
              time="1 hour ago"
            />

            <ActivityItem
              icon={<FiBell />}
              iconClass="bg-purple-500/10 text-purple-400"
              title="New HOD notice"
              description="Semester mentoring schedule was published."
              time="2 hours ago"
            />

            <ActivityItem
              icon={<FiAlertTriangle />}
              iconClass="bg-red-500/10 text-red-400"
              title="Critical issue reported"
              description="Attendance shortage requires review."
              time="3 hours ago"
            />

          </div>

        </div>


        {/* Upcoming Sessions */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422]">

          <div className="flex items-center justify-between border-b border-slate-800 p-5">

            <div>
              <h2 className="font-semibold text-white">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Scheduled mentoring sessions
              </p>
            </div>

            <FiCalendar className="text-purple-400" />

          </div>


          <div className="p-4 space-y-3">

            <UpcomingSession
              time="10:30 AM"
              mentor="Dr. Ramesh Kumar"
              mentee="Jasmine A"
              status="Today"
            />

            <UpcomingSession
              time="12:00 PM"
              mentor="Dr. Meena S"
              mentee="Rahul Kumar"
              status="Today"
            />

            <UpcomingSession
              time="03:30 PM"
              mentor="Dr. Anitha Joseph"
              mentee="Ananya S"
              status="Today"
            />

            <UpcomingSession
              time="10:00 AM"
              mentor="Dr. Arun Mathew"
              mentee="Arjun P"
              status="Tomorrow"
            />

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
  icon,
  iconClass,
  title,
  description,
  time,
}) {
  return (
    <div className="flex items-start gap-3 p-4">

      <div
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-3">

          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>

          <span className="flex-shrink-0 text-[10px] text-slate-600">
            {time}
          </span>

        </div>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   UPCOMING SESSION
========================================================= */

function UpcomingSession({
  time,
  mentor,
  mentee,
  status,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">

      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
        <FiClock />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-2">

          <p className="text-sm font-semibold text-white">
            {time}
          </p>

          <span
            className={`rounded-full px-2 py-1 text-[10px] font-medium ${
              status === "Today"
                ? "bg-indigo-500/10 text-indigo-400"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {status}
          </span>

        </div>

        <p className="mt-1 text-xs text-slate-400">
          {mentor}
        </p>

        <p className="mt-0.5 text-xs text-slate-600">
          Mentee: {mentee}
        </p>

      </div>

    </div>
  );
}

export default Dashboard;