import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiMessageSquare,
} from "react-icons/fi";

function ReportIssue() {
  const issues = [
    {
      id: 1,
      title: "Unable to attend mentoring session",
      category: "Session",
      priority: "Medium",
      status: "Open",
      date: "12 Sep 2026",
    },
    {
      id: 2,
      title: "Mentee profile information is incomplete",
      category: "Profile",
      priority: "Low",
      status: "Resolved",
      date: "10 Sep 2026",
    },
    {
      id: 3,
      title: "Technical issue during group meeting",
      category: "Technical",
      priority: "High",
      status: "In Progress",
      date: "08 Sep 2026",
    },
  ];

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-blue-400">
            MentorOne / Support
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Report Issue
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Report mentoring-related issues and track their status.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
        >
          <FiPlus />
          Report New Issue
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FiAlertTriangle className="text-xl text-blue-400" />
          </div>

          <p className="text-3xl font-bold">08</p>
          <p className="mt-1 text-sm text-slate-400">Total Issues</p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <FiClock className="text-xl text-amber-400" />
          </div>

          <p className="text-3xl font-bold">03</p>
          <p className="mt-1 text-sm text-slate-400">Open Issues</p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
            <FiMessageSquare className="text-xl text-purple-400" />
          </div>

          <p className="text-3xl font-bold">02</p>
          <p className="mt-1 text-sm text-slate-400">In Progress</p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiCheckCircle className="text-xl text-emerald-400" />
          </div>

          <p className="text-3xl font-bold">03</p>
          <p className="mt-1 text-sm text-slate-400">Resolved Issues</p>
        </div>
      </div>

      {/* INFORMATION BANNER */}
      <div className="mb-8 flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <FiAlertCircle className="mt-1 flex-shrink-0 text-xl text-blue-400" />

        <div>
          <h2 className="font-semibold text-blue-300">
            Need assistance?
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Use this section to report technical, mentoring, session, or
            profile-related issues to the administration.
          </p>
        </div>
      </div>

      {/* ISSUES TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#27334A] bg-[#101624]">
        <div className="border-b border-[#27334A] p-5">
          <h2 className="text-lg font-semibold">
            Recent Issues
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of recently reported issues.
          </p>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#27334A] bg-[#101727] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Issue</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {issues.map((issue) => (
                <tr
                  key={issue.id}
                  className="border-b border-[#27334A]/70 transition hover:bg-slate-800/30"
                >
                  <td className="max-w-xs px-5 py-5">
                    <p className="font-medium text-white">
                      {issue.title}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-slate-400">
                    {issue.category}
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        issue.priority === "High"
                          ? "bg-red-500/10 text-red-400"
                          : issue.priority === "Medium"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-5 text-slate-500">
                    {issue.date}
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        issue.status === "Resolved"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : issue.status === "In Progress"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-right">
                    <button
                      type="button"
                      className="rounded-lg border border-[#33415C] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW */}
        <div className="space-y-4 p-4 md:hidden">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="rounded-xl border border-[#27334A] bg-[#080C14] p-4"
            >
              <h3 className="font-semibold text-white">
                {issue.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {issue.category} · {issue.date}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  {issue.priority} Priority
                </span>

                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                  {issue.status}
                </span>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg border border-[#33415C] py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
              >
                View Issue
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportIssue;