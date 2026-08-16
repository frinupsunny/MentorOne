import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiAlertTriangle,
  FiEye,
  FiFilter,
} from "react-icons/fi";

const mentees = [
  {
    id: 1,
    name: "Jasmine A",
    department: "Computer Science",
    mentor: "Dr. Rajesh R",
    sessions: 4,
    status: "On Track",
    compliance: "Good",
  },
  {
    id: 2,
    name: "Frinu P",
    department: "Data Science",
    mentor: "Dr. Rajesh R",
    sessions: 3,
    status: "On Track",
    compliance: "Good",
  },
  {
    id: 3,
    name: "Sanjay K",
    department: "Computer Science",
    mentor: "Dr. Sunita",
    sessions: 0,
    status: "Needs Attention",
    compliance: "Needs Attention",
  },
  {
    id: 4,
    name: "Akhil T",
    department: "Information Technology",
    mentor: "Mr. Arun",
    sessions: 0,
    status: "Needs Attention",
    compliance: "Needs Attention",
  },
  {
    id: 5,
    name: "Sandra Joseph",
    department: "Data Science",
    mentor: "Dr. Anitha",
    sessions: 3,
    status: "On Track",
    compliance: "Good",
  },
  {
    id: 6,
    name: "Alan Mathew",
    department: "Computer Science",
    mentor: "Dr. Vivek",
    sessions: 2,
    status: "On Track",
    compliance: "Good",
  },
];

function MyMentees() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMentees = useMemo(() => {
    return mentees.filter((mentee) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        mentee.name.toLowerCase().includes(searchValue) ||
        mentee.department.toLowerCase().includes(searchValue) ||
        mentee.mentor.toLowerCase().includes(searchValue);

      const matchesFilter =
        filter === "All" ||
        (filter === "On Track" && mentee.status === "On Track") ||
        (filter === "Needs Attention" &&
          mentee.status === "Needs Attention");

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalMentees = mentees.length;

  const assignedMentees = mentees.filter(
    (mentee) => mentee.mentor
  ).length;

  const totalSessions = mentees.reduce(
    (total, mentee) => total + mentee.sessions,
    0
  );

  const onTrackCount = mentees.filter(
    (mentee) => mentee.status === "On Track"
  ).length;

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* Page Header */}
      <div className="mb-6">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-white">
              My Mentees
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage and monitor mentees under your coordination
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full xl:w-80">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentees..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500"
            />

          </div>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Mentees */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Total Mentees
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalMentees}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <FiUsers className="text-lg" />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-500">
            Registered under your coordination
          </p>

        </div>

        {/* Assigned */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Assigned Mentees
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {assignedMentees}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <FiCheckCircle className="text-lg" />
            </div>

          </div>

          <p className="mt-3 text-xs text-emerald-400">
            {onTrackCount} currently on track
          </p>

        </div>

        {/* Sessions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Sessions This Month
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalSessions}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <FiCalendar className="text-lg" />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-500">
            Across all mentees
          </p>

        </div>

      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">

        <div className="mr-1 flex items-center gap-2 text-xs text-slate-500">
          <FiFilter />
          Filter
        </div>

        {["All", "On Track", "Needs Attention"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
              filter === option
                ? "border-indigo-500/30 bg-indigo-500/15 text-indigo-400"
                : "border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}

        <span className="ml-auto text-xs text-slate-500">
          Showing {filteredMentees.length} of {totalMentees} mentees
        </span>

      </div>

      {/* Mentee Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">

        <div className="border-b border-slate-800 px-5 py-4">

          <h2 className="text-base font-semibold text-white">
            Mentee List
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Students currently under your coordination
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b border-slate-800 text-left">

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Mentee
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Department
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Mentor
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Sessions
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Compliance
                </th>

                <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredMentees.length > 0 ? (
                filteredMentees.map((mentee) => (

                  <tr
                    key={mentee.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                  >

                    {/* Mentee */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-xs font-semibold text-white">
                          {mentee.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {mentee.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Student Mentee
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Department */}
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {mentee.department}
                    </td>

                    {/* Mentor */}
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {mentee.mentor}
                    </td>

                    {/* Sessions */}
                    <td className="px-5 py-4">

                      <span className="text-sm font-medium text-white">
                        {mentee.sessions}
                      </span>

                      <span className="ml-1 text-xs text-slate-500">
                        this month
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      {mentee.status === "On Track" ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">

                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                          On Track

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400">

                          <FiAlertTriangle />

                          Attention

                        </span>

                      )}

                    </td>

                    {/* Compliance */}
                    <td className="px-5 py-4">

                      {mentee.compliance === "Good" ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">

                          <FiCheckCircle />

                          Good

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400">

                          <FiAlertTriangle />

                          Needs Attention

                        </span>

                      )}

                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() =>
                          navigate(
                            `/coordinator/mentees/${mentee.id}`
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
                      >
                        <FiEye />
                        View
                      </button>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">

                      <FiUsers className="text-3xl text-slate-700" />

                      <p className="mt-3 text-sm font-medium text-slate-300">
                        No mentees found
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Try changing your search or filter.
                      </p>

                    </div>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MyMentees;