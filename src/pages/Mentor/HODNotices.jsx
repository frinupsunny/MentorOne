import {
  FiVolume2,
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiInfo,
} from "react-icons/fi";

function HODNotices() {
  const notices = [
    {
      id: 1,
      title: "Mentoring Review Meeting",
      description:
        "All mentors are requested to attend the upcoming mentoring review meeting.",
      date: "15 Sep 2026",
      time: "10:00 AM",
      category: "Meeting",
      priority: "Important",
    },
    {
      id: 2,
      title: "Submission of Monthly Reports",
      description:
        "Submit the monthly mentoring report before the specified deadline.",
      date: "18 Sep 2026",
      time: "05:00 PM",
      category: "Report",
      priority: "Deadline",
    },
    {
      id: 3,
      title: "Student Feedback Collection",
      description:
        "Mentors should encourage mentees to complete the feedback form.",
      date: "20 Sep 2026",
      time: "03:00 PM",
      category: "Feedback",
      priority: "General",
    },
    {
      id: 4,
      title: "Department Academic Updates",
      description:
        "Important academic updates have been shared by the department.",
      date: "22 Sep 2026",
      time: "11:30 AM",
      category: "Academic",
      priority: "General",
    },
  ];

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          MentorOne / Communication
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          HOD Notices
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          View important announcements and updates from the Head of Department.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FiVolume2 className="text-xl text-blue-400" />
          </div>

          <p className="text-3xl font-bold">12</p>

          <p className="mt-1 text-sm text-slate-400">
            Total Notices
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <FiClock className="text-xl text-amber-400" />
          </div>

          <p className="text-3xl font-bold">04</p>

          <p className="mt-1 text-sm text-slate-400">
            Recent Notices
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiCalendar className="text-xl text-emerald-400" />
          </div>

          <p className="text-3xl font-bold">03</p>

          <p className="mt-1 text-sm text-slate-400">
            Upcoming Events
          </p>
        </div>
      </div>

      {/* NOTICE INFORMATION */}
      <div className="mb-8 flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <FiInfo className="mt-1 flex-shrink-0 text-xl text-blue-400" />

        <div>
          <h2 className="font-semibold text-blue-300">
            Department Announcements
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Stay updated with department meetings, academic announcements,
            deadlines, and mentoring-related instructions.
          </p>
        </div>
      </div>

      {/* NOTICES */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Recent Notices
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Announcements shared by the HOD.
          </p>
        </div>

        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-2xl border border-[#27334A] bg-[#101624] p-5 transition hover:border-blue-500/40"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600">
                    <FiVolume2 className="text-xl text-white" />
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {notice.title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          notice.priority === "Important"
                            ? "bg-red-500/10 text-red-400"
                            : notice.priority === "Deadline"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {notice.priority}
                      </span>
                    </div>

                    <p className="max-w-3xl text-sm leading-6 text-slate-400">
                      {notice.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-2">
                        <FiCalendar />
                        {notice.date}
                      </span>

                      <span className="flex items-center gap-2">
                        <FiClock />
                        {notice.time}
                      </span>

                      <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-400">
                        {notice.category}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#33415C] px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                >
                  View Notice
                  <FiChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HODNotices;