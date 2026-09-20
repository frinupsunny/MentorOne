import {
  FiEdit3,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

function MentorRemarks() {
  const mentees = [
    {
      id: 1,
      name: "Rahul Kumar",
      department: "Computer Science",
      lastRemark: "Good progress in programming assignments.",
      status: "Reviewed",
      date: "12 Sep 2026",
    },
    {
      id: 2,
      name: "Sneha Thomas",
      department: "Data Science",
      lastRemark: "Needs improvement in statistical concepts.",
      status: "Pending",
      date: "10 Sep 2026",
    },
    {
      id: 3,
      name: "Arjun Nair",
      department: "Computer Applications",
      lastRemark: "Actively participating in mentoring sessions.",
      status: "Reviewed",
      date: "08 Sep 2026",
    },
    {
      id: 4,
      name: "Meera Joseph",
      department: "Data Science",
      lastRemark: "Submitted the project proposal successfully.",
      status: "Pending",
      date: "06 Sep 2026",
    },
  ];

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-blue-400">
            MentorOne / Mentoring
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Remarks
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Record and review observations about your mentees.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
        >
          <FiPlus />
          Add Remark
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <FiUsers className="text-xl text-blue-400" />
            </div>

            <span className="text-xs text-slate-500">Total</span>
          </div>

          <p className="text-3xl font-bold">24</p>
          <p className="mt-1 text-sm text-slate-400">Total Mentees</p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <FiCheckCircle className="text-xl text-emerald-400" />
            </div>

            <span className="text-xs text-slate-500">Completed</span>
          </div>

          <p className="text-3xl font-bold">18</p>
          <p className="mt-1 text-sm text-slate-400">Reviewed Remarks</p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
              <FiClock className="text-xl text-amber-400" />
            </div>

            <span className="text-xs text-slate-500">Pending</span>
          </div>

          <p className="text-3xl font-bold">6</p>
          <p className="mt-1 text-sm text-slate-400">Pending Remarks</p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
              <FiEdit3 className="text-xl text-purple-400" />
            </div>

            <span className="text-xs text-slate-500">This Month</span>
          </div>

          <p className="text-3xl font-bold">12</p>
          <p className="mt-1 text-sm text-slate-400">Remarks Added</p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-2xl border border-[#27334A] bg-[#101624]">
        {/* TABLE HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#27334A] p-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Mentee Remarks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent observations and mentoring updates.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search mentee..."
              className="w-full rounded-xl border border-[#33415C] bg-[#080C14] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#27334A] bg-[#101727] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Mentee</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Latest Remark</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {mentees.map((mentee) => (
                <tr
                  key={mentee.id}
                  className="border-b border-[#27334A]/70 transition hover:bg-slate-800/30"
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-xs font-bold">
                        {mentee.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="font-medium text-white">
                        {mentee.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-5 text-slate-400">
                    {mentee.department}
                  </td>

                  <td className="max-w-xs px-5 py-5 text-slate-400">
                    {mentee.lastRemark}
                  </td>

                  <td className="whitespace-nowrap px-5 py-5 text-slate-500">
                    {mentee.date}
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        mentee.status === "Reviewed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {mentee.status}
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

        {/* MOBILE CARDS */}
        <div className="space-y-4 p-4 md:hidden">
          {mentees.map((mentee) => (
            <div
              key={mentee.id}
              className="rounded-xl border border-[#27334A] bg-[#080C14] p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-xs font-bold">
                  {mentee.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {mentee.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {mentee.department}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {mentee.lastRemark}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {mentee.date}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    mentee.status === "Reviewed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {mentee.status}
                </span>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg border border-[#33415C] py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
              >
                View Remark
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MentorRemarks;