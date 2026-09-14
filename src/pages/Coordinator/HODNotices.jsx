import { FiVolume2, FiInfo } from "react-icons/fi";

function HODNotices() {
  const notices = [
    {
      id: 1,
      title: "Mentoring Session Compliance",
      message:
        "All mentors are requested to complete their mentoring sessions and update the session records regularly.",
      date: "14 August 2026",
      priority: "Important",
    },
    {
      id: 2,
      title: "Monthly Mentoring Report",
      message:
        "Please ensure that the monthly mentoring report is submitted before the deadline.",
      date: "12 August 2026",
      priority: "Normal",
    },
    {
      id: 3,
      title: "Department Mentoring Meeting",
      message:
        "A department mentoring review meeting will be conducted soon. All coordinators are requested to attend.",
      date: "10 August 2026",
      priority: "Important",
    },
  ];

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-indigo-400">Coordinator</p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            HOD Notices
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            View important notices and announcements from the Head of Department.
          </p>
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5 transition hover:border-indigo-500/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-xl text-indigo-400">
                  <FiVolume2 />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      {notice.title}
                    </h2>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                        notice.priority === "Important"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-slate-700/60 text-slate-300"
                      }`}
                    >
                      {notice.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {notice.message}
                  </p>

                  <p className="mt-4 text-xs text-slate-500">
                    Published on {notice.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Information */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
          <FiInfo className="mt-0.5 flex-shrink-0 text-indigo-400" />

          <p className="text-sm text-slate-400">
            These notices are sample announcements. They can later be connected
            to the HOD notice management module.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HODNotices;