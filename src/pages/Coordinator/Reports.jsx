import { useMemo, useState } from "react";
import {
  FiBarChart2,
  FiDownload,
  FiSearch,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";

function Reports() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("August 2025");

  const mentors = [
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      department: "Data Science",
      sessions: 24,
      completed: 22,
      attendance: 96,
      feedback: 4.8,
      feedbackPercent: 96,
      mentees: 8,
      pending: 2,
    },
    {
      id: 2,
      name: "Dr. Sunita Pillai",
      department: "Data Science",
      sessions: 18,
      completed: 16,
      attendance: 91,
      feedback: 4.2,
      feedbackPercent: 84,
      mentees: 6,
      pending: 2,
    },
    {
      id: 3,
      name: "Mr. Arun Joseph",
      department: "Data Science",
      sessions: 10,
      completed: 7,
      attendance: 78,
      feedback: 3.1,
      feedbackPercent: 62,
      mentees: 5,
      pending: 3,
    },
    {
      id: 4,
      name: "Dr. Meena S",
      department: "Data Science",
      sessions: 21,
      completed: 19,
      attendance: 94,
      feedback: 4.6,
      feedbackPercent: 92,
      mentees: 7,
      pending: 2,
    },
    {
      id: 5,
      name: "Dr. Anitha Joseph",
      department: "Data Science",
      sessions: 20,
      completed: 18,
      attendance: 89,
      feedback: 4.4,
      feedbackPercent: 88,
      mentees: 7,
      pending: 2,
    },
    {
      id: 6,
      name: "Dr. Arun Mathew",
      department: "Data Science",
      sessions: 16,
      completed: 14,
      attendance: 86,
      feedback: 4.0,
      feedbackPercent: 80,
      mentees: 6,
      pending: 2,
    },
  ];

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) =>
      mentor.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalSessions = mentors.reduce(
    (sum, mentor) => sum + mentor.sessions,
    0
  );

  const completedSessions = mentors.reduce(
    (sum, mentor) => sum + mentor.completed,
    0
  );

  const totalMentees = mentors.reduce(
    (sum, mentor) => sum + mentor.mentees,
    0
  );

  const averageFeedback =
    mentors.reduce((sum, mentor) => sum + mentor.feedback, 0) /
    mentors.length;

  const completionRate = Math.round(
    (completedSessions / totalSessions) * 100
  );

  const handleExport = () => {
    const headers = [
      "Mentor",
      "Department",
      "Total Sessions",
      "Completed",
      "Attendance",
      "Feedback",
      "Mentees",
      "Pending",
    ];

    const rows = mentors.map((mentor) => [
      mentor.name,
      mentor.department,
      mentor.sessions,
      mentor.completed,
      `${mentor.attendance}%`,
      mentor.feedback,
      mentor.mentees,
      mentor.pending,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `mentorone-report-${period.replace(" ", "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full bg-[#080C14] p-6 text-white">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <FiBarChart2 className="text-indigo-400 text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Department Reports
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Data Science Department · {period}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#0D1422] border border-slate-700 text-sm text-slate-200 outline-none focus:border-indigo-500"
          >
            <option>August 2025</option>
            <option>July 2025</option>
            <option>June 2025</option>
            <option>May 2025</option>
          </select>

          <button
            onClick={handleExport}
            className="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition flex items-center gap-2 text-sm font-medium"
          >
            <FiDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Sessions"
          value={totalSessions}
          subtitle="Scheduled this period"
          icon={FiCalendar}
          iconClass="text-indigo-400"
          bgClass="bg-indigo-500/10"
        />

        <SummaryCard
          title="Completed Sessions"
          value={completedSessions}
          subtitle={`${completionRate}% completion rate`}
          icon={FiCheckCircle}
          iconClass="text-emerald-400"
          bgClass="bg-emerald-500/10"
        />

        <SummaryCard
          title="Total Mentees"
          value={totalMentees}
          subtitle="Across all mentors"
          icon={FiUsers}
          iconClass="text-purple-400"
          bgClass="bg-purple-500/10"
        />

        <SummaryCard
          title="Average Feedback"
          value={`${averageFeedback.toFixed(1)} / 5`}
          subtitle="Overall mentor rating"
          icon={FiStar}
          iconClass="text-orange-400"
          bgClass="bg-orange-500/10"
        />
      </div>

      {/* MAIN REPORT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* SESSIONS PER MENTOR */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                Sessions per Mentor
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Session activity during {period}
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <FiBarChart2 className="text-indigo-400" />
            </div>
          </div>

          <div className="space-y-5">
            {mentors.map((mentor) => {
              const percentage = Math.round(
                (mentor.sessions / Math.max(...mentors.map((m) => m.sessions))) *
                  100
              );

              return (
                <div key={mentor.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">
                      {mentor.name}
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {mentor.sessions}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FEEDBACK SCORES */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                Feedback Scores
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Mentor satisfaction ratings
              </p>
            </div>

            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <FiStar className="text-orange-400" />
            </div>
          </div>

          <div className="space-y-5">
            {mentors.map((mentor) => (
              <div key={mentor.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">
                    {mentor.name}
                  </span>

                  <div className="flex items-center gap-2">
                    <FiStar className="text-orange-400 text-sm" />
                    <span className="text-sm font-semibold text-white">
                      {mentor.feedback}
                    </span>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-400"
                    style={{ width: `${mentor.feedbackPercent}%` }}
                  />
                </div>

                <div className="flex justify-end mt-1">
                  <span className="text-[11px] text-slate-500">
                    {mentor.feedbackPercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERFORMANCE OVERVIEW */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-white">
              Department Performance
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Overall mentoring performance indicators
            </p>
          </div>

          <FiTrendingUp className="text-emerald-400 text-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PerformanceBar
            title="Session Completion"
            value={completionRate}
            icon={FiCheckCircle}
          />

          <PerformanceBar
            title="Average Attendance"
            value={Math.round(
              mentors.reduce((sum, mentor) => sum + mentor.attendance, 0) /
                mentors.length
            )}
            icon={FiUsers}
          />

          <PerformanceBar
            title="Feedback Satisfaction"
            value={Math.round(
              (mentors.reduce(
                (sum, mentor) => sum + mentor.feedbackPercent,
                0
              ) /
                mentors.length)
            )}
            icon={FiStar}
          />
        </div>
      </div>

      {/* DETAILED TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-[#0D1422] overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Mentor Performance Details
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Detailed report for each mentor
              </p>
            </div>

            <div className="w-full md:w-64 h-10 flex items-center gap-2 px-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
              <FiSearch className="text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search mentor..."
                className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Mentor
                </th>

                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Sessions
                </th>

                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Completion
                </th>

                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Attendance
                </th>

                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Feedback
                </th>

                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Mentees
                </th>

                <th className="px-5 py-4 text-xs font-medium text-slate-500">
                  Pending
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMentors.map((mentor) => {
                const mentorCompletion = Math.round(
                  (mentor.completed / mentor.sessions) * 100
                );

                return (
                  <tr
                    key={mentor.id}
                    className="border-b border-slate-800/70 hover:bg-slate-800/20 transition"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-semibold text-indigo-300">
                          {mentor.name
                            .replace("Dr. ", "")
                            .replace("Mr. ", "")
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {mentor.name}
                          </p>

                          <p className="text-[11px] text-slate-500">
                            {mentor.department}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-300">
                      {mentor.completed}/{mentor.sessions}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${mentorCompletion}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs text-slate-400">
                          {mentorCompletion}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-medium ${
                          mentor.attendance >= 90
                            ? "text-emerald-400"
                            : mentor.attendance >= 80
                            ? "text-orange-400"
                            : "text-red-400"
                        }`}
                      >
                        {mentor.attendance}%
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-orange-400 text-sm" />
                        <span className="text-sm text-slate-300">
                          {mentor.feedback}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-300">
                      {mentor.mentees}
                    </td>

                    <td className="px-5 py-4">
                      {mentor.pending > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs">
                          <FiClock />
                          {mentor.pending}
                        </span>
                      ) : (
                        <span className="text-xs text-emerald-400">
                          Clear
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden divide-y divide-slate-800">
          {filteredMentors.map((mentor) => {
            const mentorCompletion = Math.round(
              (mentor.completed / mentor.sessions) * 100
            );

            return (
              <div key={mentor.id} className="p-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-semibold text-indigo-300">
                      {mentor.name
                        .replace("Dr. ", "")
                        .replace("Mr. ", "")
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {mentor.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {mentor.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <FiStar className="text-orange-400" />
                    <span className="text-sm text-white">
                      {mentor.feedback}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <MiniStat
                    label="Sessions"
                    value={`${mentor.completed}/${mentor.sessions}`}
                  />

                  <MiniStat
                    label="Attendance"
                    value={`${mentor.attendance}%`}
                  />

                  <MiniStat
                    label="Mentees"
                    value={mentor.mentees}
                  />

                  <MiniStat
                    label="Pending"
                    value={mentor.pending}
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">
                      Completion
                    </span>

                    <span className="text-slate-300">
                      {mentorCompletion}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${mentorCompletion}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredMentors.length === 0 && (
          <div className="py-12 text-center">
            <FiSearch className="mx-auto text-3xl text-slate-600 mb-3" />

            <p className="text-sm text-slate-400">
              No mentors found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* SUMMARY CARD */
function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
  bgClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500">{title}</p>

          <p className="text-2xl font-bold text-white mt-2">
            {value}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>

        <div
          className={`w-10 h-10 rounded-xl ${bgClass} flex items-center justify-center`}
        >
          <Icon className={`${iconClass} text-lg`} />
        </div>
      </div>
    </div>
  );
}

/* PERFORMANCE BAR */
function PerformanceBar({ title, value, icon: Icon }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="text-slate-400" />
          <span className="text-sm text-slate-300">
            {title}
          </span>
        </div>

        <span className="text-sm font-semibold text-white">
          {value}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* MOBILE MINI STAT */
function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-900/50 border border-slate-800 p-3">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-200 mt-1">
        {value}
      </p>
    </div>
  );
}

export default Reports;