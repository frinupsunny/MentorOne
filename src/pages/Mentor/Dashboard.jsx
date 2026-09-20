import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiArrowUpRight,
  FiAlertTriangle,
  FiEdit3,
  FiMessageSquare,
} from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Mentees",
      value: "24",
      description: "Assigned mentees",
      change: "+12%",
      icon: FiUsers,
      color: "blue",
    },
    {
      title: "Upcoming Sessions",
      value: "08",
      description: "Scheduled meetings",
      change: "+8%",
      icon: FiCalendar,
      color: "green",
    },
    {
      title: "Completed Sessions",
      value: "42",
      description: "This semester",
      change: "+15%",
      icon: FiCheckCircle,
      color: "purple",
    },
    {
      title: "Pending Reviews",
      value: "05",
      description: "Need your attention",
      change: "Pending",
      icon: FiClock,
      color: "orange",
    },
  ];

  const sessions = [
    {
      id: 1,
      name: "Rahul Sharma",
      course: "MSc Data Science",
      date: "Today",
      time: "10:30 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Ananya Joseph",
      course: "BCA",
      date: "Tomorrow",
      time: "11:00 AM",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      course: "MCA",
      date: "18 Sep 2026",
      time: "02:00 PM",
      status: "Scheduled",
    },
  ];

  const mentees = [
    {
      id: 1,
      name: "Rahul Sharma",
      course: "MSc Data Science",
      progress: 85,
    },
    {
      id: 2,
      name: "Ananya Joseph",
      course: "BCA",
      progress: 70,
    },
    {
      id: 3,
      name: "Arjun Kumar",
      course: "MCA",
      progress: 55,
    },
  ];

  const colorStyles = {
    blue: {
      icon: "bg-purple-500/10 text-purple-400",
      change: "text-blue-400",
    },
    green: {
      icon: "bg-emerald-500/10 text-emerald-400",
      change: "text-emerald-400",
    },
    purple: {
      icon: "bg-purple-500/10 text-purple-400",
      change: "text-purple-400",
    },
    orange: {
      icon: "bg-orange-500/10 text-orange-400",
      change: "text-orange-400",
    },
  };

  return (
    <div className="min-h-full bg-[#080C14] p-6 text-white">
      {/* Welcome Section */}
      <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-400">
              Friday, 14 August 2026
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Hello, Dr. Anjali Menon 👋
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Welcome back to MentorOne. Here is your mentoring overview.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">
            <p className="text-xs text-slate-500">
              Role
            </p>

            <p className="mt-1 text-sm font-semibold text-indigo-400">
              Mentor
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const styles = colorStyles[stat.color];

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-800 bg-[#101624] p-5 transition hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}
                  >
                    <Icon className="text-xl" />
                  </div>

                  <span className={`text-xs font-medium ${styles.change}`}>
                    {stat.change}
                  </span>
                </div>

                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Upcoming Sessions */}
        <div className="rounded-2xl border border-slate-800 bg-[#101624] xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your next mentoring meetings
              </p>
            </div>

            <button
              onClick={() => navigate("/mentor/sessions")}
              className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              View All
              <FiArrowUpRight />
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-900/40 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold">
                    {session.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {session.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {session.course}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      {session.date}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {session.time}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-800 bg-[#101624]">
          <div className="border-b border-slate-800 px-6 py-5">
            <h2 className="text-lg font-semibold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used actions
            </p>
          </div>

          <div className="space-y-3 p-6">
            <button
              onClick={() => navigate("/mentor/mentees")}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-left transition hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <FiUsers className="text-xl text-blue-400" />

              <div>
                <p className="text-sm font-semibold text-white">
                  View My Mentees
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Check assigned students
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/mentor/sessions")}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-left transition hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <FiCalendar className="text-xl text-purple-400" />

              <div>
                <p className="text-sm font-semibold text-white">
                  Schedule Meeting
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Create a mentoring session
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/mentor/remarks")}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-left transition hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <FiEdit3 className="text-xl text-emerald-400" />

              <div>
                <p className="text-sm font-semibold text-white">
                  Add Remarks
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Update mentee progress
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/mentor/report-issue")}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-left transition hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              <FiAlertTriangle className="text-xl text-orange-400" />

              <div>
                <p className="text-sm font-semibold text-white">
                  Report an Issue
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Inform the department
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mentee Progress */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-[#101624]">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Mentee Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your mentees' academic progress
            </p>
          </div>

          <button
            onClick={() => navigate("/mentor/mentees")}
            className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View All
            <FiArrowUpRight />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          {mentees.map((mentee) => (
            <div
              key={mentee.id}
              className="rounded-xl border border-slate-800 bg-[#0B111D] p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-300">
                  {mentee.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {mentee.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {mentee.course}
                  </p>
                </div>
              </div>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Overall Progress
                </span>

                <span className="text-sm font-semibold text-blue-400">
                  {mentee.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${mentee.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attention Notice */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 md:flex-row md:items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
          <FiClock className="text-xl text-amber-400" />
        </div>

        <div>
          <h3 className="font-semibold text-amber-300">
            Pending attention required
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            You have 5 mentee reviews pending. Please update them before the
            next reporting cycle.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;