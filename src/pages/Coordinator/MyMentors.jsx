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

const mentors = [
  {
    id: 1,
    name: "Dr. Rajesh R",
    department: "Computer Science",
    mentees: 5,
    sessions: 12,
    status: "Active",
    compliance: "Good",
  },
  {
    id: 2,
    name: "Dr. Anitha",
    department: "Data Science",
    mentees: 4,
    sessions: 10,
    status: "Active",
    compliance: "Good",
  },
  {
    id: 3,
    name: "Dr. Vivek",
    department: "Computer Science",
    mentees: 6,
    sessions: 8,
    status: "Active",
    compliance: "Needs Attention",
  },
  {
    id: 4,
    name: "Dr. Ramesh",
    department: "Information Technology",
    mentees: 5,
    sessions: 11,
    status: "Active",
    compliance: "Good",
  },
  {
    id: 5,
    name: "Dr. Sunita",
    department: "Data Science",
    mentees: 3,
    sessions: 6,
    status: "Active",
    compliance: "Needs Attention",
  },
];

function MyMentors() {
    const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  /* Search + Filter */
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(search.toLowerCase()) ||
        mentor.department.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && mentor.status === "Active") ||
        (filter === "Needs Attention" &&
          mentor.compliance === "Needs Attention");

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  /* Summary values */
  const totalMentors = mentors.length;

  const totalMentees = mentors.reduce(
    (total, mentor) => total + mentor.mentees,
    0
  );

  const totalSessions = mentors.reduce(
    (total, mentor) => total + mentor.sessions,
    0
  );

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* Page Header */}
      <div className="mb-6">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-white">
              My Mentors
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage and monitor mentors under your coordination
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full xl:w-80">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentors..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500"
            />

          </div>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Mentors */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Total Mentors
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalMentors}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <FiUsers className="text-lg" />
            </div>

          </div>

          <p className="mt-3 text-xs text-emerald-400">
            {mentors.filter((mentor) => mentor.status === "Active").length} active
          </p>

        </div>

        {/* Assigned Mentees */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Assigned Mentees
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalMentees}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <FiUsers className="text-lg" />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-500">
            Across all mentors
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

          <p className="mt-3 text-xs text-emerald-400">
            On track
          </p>

        </div>

      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">

        <div className="mr-1 flex items-center gap-2 text-xs text-slate-500">
          <FiFilter />
          Filter
        </div>

        {["All", "Active", "Needs Attention"].map((option) => (
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
          Showing {filteredMentors.length} of {totalMentors} mentors
        </span>

      </div>

      {/* Mentor Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">

        <div className="border-b border-slate-800 px-5 py-4">

          <h2 className="text-base font-semibold text-white">
            Mentor List
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Mentors currently assigned under your coordination
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>
              <tr className="border-b border-slate-800 text-left">

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Mentor
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Department
                </th>

                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Mentees
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

              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (

                  <tr
                    key={mentor.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                  >

                    {/* Mentor */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
                          {mentor.name
                            .replace("Dr. ", "")
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {mentor.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Faculty Mentor
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Department */}
                    <td className="px-5 py-4 text-sm text-slate-300">
                      {mentor.department}
                    </td>

                    {/* Mentees */}
                    <td className="px-5 py-4 text-sm font-medium text-white">
                      {mentor.mentees}
                    </td>

                    {/* Sessions */}
                    <td className="px-5 py-4">

                      <span className="text-sm font-medium text-white">
                        {mentor.sessions}
                      </span>

                      <span className="ml-1 text-xs text-slate-500">
                        this month
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        {mentor.status}

                      </span>

                    </td>

                    {/* Compliance */}
                    <td className="px-5 py-4">

                      {mentor.compliance === "Good" ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">

                          <FiCheckCircle />

                          Good

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400">

                          <FiAlertTriangle />

                          Attention

                        </span>

                      )}

                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">

                      <button
                      onClick={() =>
                        navigate(`/coordinator/mentors/${mentor.id}`)
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
                        No mentors found
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

export default MyMentors;