import { useMemo, useState } from "react";
import {
  FiBarChart2,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiAlertTriangle,
  FiStar,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiX,
} from "react-icons/fi";

const reportData = [
  {
    id: 1,
    mentor: "Dr. Rajesh R",
    department: "Computer Science",
    mentees: 8,
    sessions: 14,
    completed: 12,
    compliance: 86,
    rating: 4.7,
    status: "Good",
  },
  {
    id: 2,
    mentor: "Dr. Anitha",
    department: "Data Science",
    mentees: 7,
    sessions: 13,
    completed: 11,
    compliance: 85,
    rating: 4.5,
    status: "Good",
  },
  {
    id: 3,
    mentor: "Dr. Vivek",
    department: "Computer Science",
    mentees: 8,
    sessions: 15,
    completed: 10,
    compliance: 67,
    rating: 4.1,
    status: "Attention",
  },
  {
    id: 4,
    mentor: "Dr. Ramesh",
    department: "Information Technology",
    mentees: 6,
    sessions: 11,
    completed: 10,
    compliance: 91,
    rating: 4.8,
    status: "Good",
  },
  {
    id: 5,
    mentor: "Dr. Sunita",
    department: "Data Science",
    mentees: 5,
    sessions: 9,
    completed: 6,
    compliance: 67,
    rating: 3.9,
    status: "Attention",
  },
];

const sessionData = [
  {
    month: "May",
    scheduled: 42,
    completed: 38,
  },
  {
    month: "June",
    scheduled: 48,
    completed: 43,
  },
  {
    month: "July",
    scheduled: 51,
    completed: 45,
  },
  {
    month: "August",
    scheduled: 56,
    completed: 49,
  },
];

function Reports() {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [selectedReport, setSelectedReport] =
    useState(null);

  const filteredReports = useMemo(() => {
    return reportData.filter((item) => {
      const searchMatch =
        item.mentor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.department
          .toLowerCase()
          .includes(search.toLowerCase());

      const departmentMatch =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      return searchMatch && departmentMatch;
    });
  }, [search, departmentFilter]);

  /* ================================
     SUMMARY
  ================================= */

  const totalMentors = reportData.length;

  const totalMentees = reportData.reduce(
    (total, item) => total + item.mentees,
    0
  );

  const totalSessions = reportData.reduce(
    (total, item) => total + item.sessions,
    0
  );

  const completedSessions = reportData.reduce(
    (total, item) => total + item.completed,
    0
  );

  const overallCompletion =
    totalSessions > 0
      ? Math.round(
          (completedSessions / totalSessions) * 100
        )
      : 0;

  const averageRating =
    reportData.length > 0
      ? (
          reportData.reduce(
            (total, item) => total + item.rating,
            0
          ) / reportData.length
        ).toFixed(1)
      : "0.0";

  const attentionCount = reportData.filter(
    (item) => item.status === "Attention"
  ).length;

  /* ================================
     EXPORT
  ================================= */

  const handleExport = () => {
    const headers = [
      "Mentor",
      "Department",
      "Mentees",
      "Sessions",
      "Completed",
      "Compliance",
      "Rating",
      "Status",
    ];

    const rows = filteredReports.map((item) => [
      item.mentor,
      item.department,
      item.mentees,
      item.sessions,
      item.completed,
      `${item.compliance}%`,
      item.rating,
      item.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "coordinator-report.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-semibold text-white">
            Reports
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Monitor mentoring performance, sessions and compliance
          </p>

        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-purple-500"
        >

          <FiDownload />

          Export Report

        </button>

      </div>

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* MENTORS */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Total Mentors
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalMentors}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                Under coordination
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiUsers />
            </div>

          </div>

        </div>

        {/* MENTEES */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Total Mentees
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalMentees}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                Assigned students
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FiUsers />
            </div>

          </div>

        </div>

        {/* SESSIONS */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Session Completion
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {overallCompletion}%
              </p>

              <p className="mt-1 text-[11px] text-emerald-400">
                {completedSessions} of{" "}
                {totalSessions} sessions
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCalendar />
            </div>

          </div>

        </div>

        {/* RATING */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Average Rating
              </p>

              <div className="mt-2 flex items-center gap-2">

                <p className="text-2xl font-semibold text-white">
                  {averageRating}
                </p>

                <FiStar className="fill-amber-400 text-amber-400" />

              </div>

              <p className="mt-1 text-[11px] text-amber-400">
                Mentor feedback
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiStar />
            </div>

          </div>

        </div>

      </div>

      {/* =================================
          PERFORMANCE + ATTENTION
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* SESSION TREND */}

        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">

            <h2 className="text-base font-semibold text-white">
              Session Completion Trend
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Scheduled versus completed mentoring sessions
            </p>

          </div>

          <div className="p-5">

            <div className="space-y-5">

              {sessionData.map((item) => {

                const percentage =
                  Math.round(
                    (item.completed /
                      item.scheduled) *
                      100
                  );

                return (
                  <div key={item.month}>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-xs font-medium text-slate-400">
                        {item.month}
                      </span>

                      <span className="text-xs text-slate-500">
                        {item.completed} /{" "}
                        {item.scheduled}
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <p className="mt-1 text-right text-[10px] text-slate-600">
                      {percentage}% completed
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* ATTENTION */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">

            <h2 className="text-base font-semibold text-white">
              Needs Attention
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Mentors requiring coordinator review
            </p>

          </div>

          <div className="p-5">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">

                <FiAlertTriangle />

              </div>

              <div>

                <p className="text-2xl font-semibold text-white">
                  {attentionCount}
                </p>

                <p className="text-xs text-slate-500">
                  Mentors need attention
                </p>

              </div>

            </div>

            <div className="space-y-3">

              {reportData
                .filter(
                  (item) =>
                    item.status === "Attention"
                )
                .map((item) => (

                  <div
                    key={item.id}
                    className="rounded-xl border border-amber-500/10 bg-amber-500/5 p-3"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-medium text-white">
                          {item.mentor}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {item.compliance}%
                          compliance
                        </p>

                      </div>

                      <FiAlertTriangle className="text-amber-400" />

                    </div>

                  </div>

                ))}

            </div>

          </div>

        </div>

      </div>

      {/* =================================
          MENTOR PERFORMANCE TABLE
      ================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* HEADER */}

        <div className="border-b border-slate-800 px-5 py-4">

          <div className="flex flex-col gap-4">

            <div>

              <h2 className="text-base font-semibold text-white">
                Mentor Performance
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Compare mentor workload, sessions, compliance and ratings
              </p>

            </div>

            {/* SEARCH */}

            <div className="flex flex-col gap-3 md:flex-row">

              <div className="relative flex-1">

                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search mentor or department..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
                />

              </div>

              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
              >

                <option value="All">
                  All Departments
                </option>

                <option value="Computer Science">
                  Computer Science
                </option>

                <option value="Data Science">
                  Data Science
                </option>

                <option value="Information Technology">
                  Information Technology
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-slate-800">

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Mentor
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Mentees
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Sessions
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Compliance
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Rating
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {filteredReports.map((item) => (

                <tr
                  key={item.id}
                  className="transition hover:bg-slate-800/20"
                >

                  {/* MENTOR */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-semibold text-white">

                        {item.mentor
                          .replace("Dr. ", "")
                          .split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .join("")
                          .slice(0, 2)}

                      </div>

                      <div>

                        <p className="text-xs font-medium text-white">
                          {item.mentor}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          {item.department}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* MENTEES */}

                  <td className="px-5 py-4">

                    <span className="text-xs text-slate-300">
                      {item.mentees}
                    </span>

                  </td>

                  {/* SESSIONS */}

                  <td className="px-5 py-4">

                    <div>

                      <p className="text-xs text-slate-300">
                        {item.completed} /{" "}
                        {item.sessions}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        completed
                      </p>

                    </div>

                  </td>

                  {/* COMPLIANCE */}

                  <td className="px-5 py-4">

                    <div className="w-28">

                      <div className="mb-1 flex items-center justify-between">

                        <span
                          className={`text-[10px] font-medium ${
                            item.compliance >=
                            80
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {item.compliance}%
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                        <div
                          className={`h-full rounded-full ${
                            item.compliance >=
                            80
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                          style={{
                            width: `${item.compliance}%`,
                          }}
                        />

                      </div>

                    </div>

                  </td>

                  {/* RATING */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-1.5">

                      <FiStar className="fill-amber-400 text-amber-400" />

                      <span className="text-xs text-slate-300">
                        {item.rating}
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                        item.status ===
                        "Good"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedReport(
                          item
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-2 text-[10px] font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                    >

                      <FiEye />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}

        {filteredReports.length === 0 && (

          <div className="px-5 py-14 text-center">

            <FiBarChart2 className="mx-auto text-3xl text-slate-700" />

            <p className="mt-3 text-sm text-slate-400">
              No report data found
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Try changing your search or department filter.
            </p>

          </div>

        )}

      </div>

      {/* =================================
          DETAIL MODAL
      ================================= */}

      {selectedReport && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Mentor Performance
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Detailed performance summary
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedReport(null)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >

                <FiX />

              </button>

            </div>

            {/* CONTENT */}

            <div className="space-y-5 p-5">

              {/* PROFILE */}

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">

                  {selectedReport.mentor
                    .replace("Dr. ", "")
                    .split(" ")
                    .map(
                      (word) =>
                        word[0]
                    )
                    .join("")
                    .slice(0, 2)}

                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    {selectedReport.mentor}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedReport.department}
                  </p>

                </div>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-2 gap-3">

                <DetailStat
                  label="Mentees"
                  value={
                    selectedReport.mentees
                  }
                />

                <DetailStat
                  label="Sessions"
                  value={`${selectedReport.completed}/${selectedReport.sessions}`}
                />

                <DetailStat
                  label="Compliance"
                  value={`${selectedReport.compliance}%`}
                />

                <DetailStat
                  label="Rating"
                  value={`${selectedReport.rating}/5`}
                />

              </div>

              {/* STATUS */}

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[11px] text-slate-600">
                      Overall Status
                    </p>

                    <p
                      className={`mt-1 text-sm font-medium ${
                        selectedReport.status ===
                        "Good"
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {selectedReport.status}
                    </p>

                  </div>

                  {selectedReport.status ===
                  "Good" ? (
                    <FiCheckCircle className="text-emerald-400" />
                  ) : (
                    <FiAlertTriangle className="text-amber-400" />
                  )}

                </div>

              </div>

              {/* CLOSE */}

              <div className="flex justify-end border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedReport(null)
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =================================
   DETAIL STAT
================================= */

function DetailStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

      <p className="text-[10px] text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-white">
        {value}
      </p>

    </div>
  );
}

export default Reports;