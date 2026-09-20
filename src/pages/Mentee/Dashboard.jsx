import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { menteeApi, getApiError } from "./menteeApi";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setError("");
      const response = await menteeApi.get("/api/mentee/dashboard");
      setData(response.data);
    } catch (err) {
      setError(getApiError(err, "Unable to load your dashboard."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const mentee = data?.mentee;
  const mentor = data?.mentor;
  const stats = data?.stats || {};
  const upcoming = data?.upcoming || [];
  const donut = data?.donut || {};

  if (loading) {
    return (
      <div className="min-h-full bg-[#080C14] p-6 text-white">
        <div className="text-sm text-slate-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-violet-400">
          Mentee Workspace
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Hello{mentee?.name ? `, ${mentee.name}` : ""} 👋
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Track your mentor, sessions, attendance, and mentoring activity.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <FiCalendar />
          </div>

          <p className="text-sm text-slate-500">Sessions this month</p>
          <p className="mt-2 text-3xl font-bold">{stats.sessionsThisMonth ?? 0}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <FiCheckCircle />
          </div>

          <p className="text-sm text-slate-500">Attendance</p>
          <p className="mt-2 text-3xl font-bold">
            {stats.attendance ?? 0}%
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <FiClock />
          </div>

          <p className="text-sm text-slate-500">Total sessions</p>
          <p className="mt-2 text-3xl font-bold">
            {stats.totalSessions ?? 0}
          </p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">My Mentor</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your current mentoring assignment
              </p>
            </div>

            <FiUser className="text-xl text-violet-400" />
          </div>

          {mentor ? (
            <div className="rounded-xl border border-slate-800/80 bg-[#0B111D] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {mentor.name
                    ?.split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("") || "M"}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-white">
                    {mentor.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {mentor.department || "Data Science"}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-800 bg-[#0D1422] p-3">
                  <p className="text-xs text-slate-500">Designation</p>
                  <p className="mt-1 text-sm text-slate-200">
                    {mentor.designation || "Faculty Mentor"}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-[#0D1422] p-3">
                  <p className="text-xs text-slate-500">Open Slots</p>
                  <p className="mt-1 text-sm text-emerald-400">
                    {mentor.openSlots ?? 0}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="text-sm text-amber-300">
                You do not have a mentor assigned yet.
              </p>

              <button
                onClick={() => navigate("/mentee/find-mentor")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Find Mentor
                <FiArrowRight />
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Session Summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your completed and upcoming sessions
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="mx-auto flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(rgb(139 92 246) ${
                  donut.completedPct || 0
                }%, rgb(30 41 59) 0)`,
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#0D1422]">
                <span className="text-3xl font-bold">
                  {donut.completedPct || 0}%
                </span>
                <span className="text-xs text-slate-500">completed</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-slate-300">
                Completed:{" "}
                <span className="font-semibold text-emerald-400">
                  {donut.completed ?? 0}
                </span>
              </p>

              <p className="text-slate-300">
                Pending / Upcoming:{" "}
                <span className="font-semibold text-amber-400">
                  {donut.pending ?? 0}
                </span>
              </p>

              <button
                onClick={() => navigate("/mentee/sessions")}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300"
              >
                Manage sessions
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your next scheduled mentoring sessions
            </p>
          </div>

          <button
            onClick={() => navigate("/mentee/sessions")}
            className="hidden items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 sm:flex"
          >
            View all
            <FiArrowRight />
          </button>
        </div>

        {upcoming.length ? (
          <div className="space-y-3">
            {upcoming.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="rounded-xl border border-slate-800 bg-[#0B111D] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-white">
                      {session.title || "Mentoring Session"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {session.date || "Date not set"} ·{" "}
                      {session.timeLabel || session.time || "Time not set"}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold capitalize text-amber-400">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-5 text-sm text-slate-500">
            No upcoming sessions.
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
