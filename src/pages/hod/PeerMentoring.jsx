import { useMemo, useState } from "react";
import {
  FiUserCheck,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiEye,
  FiX,
  FiCalendar,
  FiUser,
  FiMessageSquare,
  FiRefreshCw,
} from "react-icons/fi";

function PeerMentoring() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPair, setSelectedPair] = useState(null);

  const [pairs, setPairs] = useState([
    {
      id: "PM-001",
      mentor: "Aarav Sharma",
      mentorId: "STU2101",
      mentee: "Riya Thomas",
      menteeId: "STU2245",
      department: "Data Science",
      year: "2nd Year",
      sessions: 8,
      completed: 7,
      lastSession: "10 Sep 2026",
      nextSession: "15 Sep 2026",
      focus: "Academic Support",
      status: "Active",
      remarks:
        "Regular interaction maintained. The peer mentor is helping with coursework and semester preparation.",
    },
    {
      id: "PM-002",
      mentor: "Aditya Nair",
      mentorId: "STU2108",
      mentee: "Sneha Joseph",
      menteeId: "STU2251",
      department: "Data Science",
      year: "2nd Year",
      sessions: 6,
      completed: 6,
      lastSession: "09 Sep 2026",
      nextSession: "16 Sep 2026",
      focus: "Career Guidance",
      status: "Active",
      remarks:
        "Peer mentoring sessions are progressing well with focus on internships and career preparation.",
    },
    {
      id: "PM-003",
      mentor: "Meera Krishnan",
      mentorId: "STU2115",
      mentee: "Vishnu Raj",
      menteeId: "STU2263",
      department: "Data Science",
      year: "1st Year",
      sessions: 5,
      completed: 4,
      lastSession: "08 Sep 2026",
      nextSession: "14 Sep 2026",
      focus: "Academic Support",
      status: "Active",
      remarks:
        "Mentee is adapting to the academic environment. Additional support is being provided for core subjects.",
    },
    {
      id: "PM-004",
      mentor: "Rahul Menon",
      mentorId: "STU2122",
      mentee: "Ananya Paul",
      menteeId: "STU2270",
      department: "Data Science",
      year: "1st Year",
      sessions: 4,
      completed: 3,
      lastSession: "06 Sep 2026",
      nextSession: "13 Sep 2026",
      focus: "Personal Development",
      status: "Pending",
      remarks:
        "Next peer mentoring session is yet to be confirmed by both students.",
    },
    {
      id: "PM-005",
      mentor: "Nikhil George",
      mentorId: "STU2130",
      mentee: "Akhil Mathew",
      menteeId: "STU2281",
      department: "Data Science",
      year: "3rd Year",
      sessions: 7,
      completed: 7,
      lastSession: "05 Sep 2026",
      nextSession: "12 Sep 2026",
      focus: "Project Guidance",
      status: "Completed",
      remarks:
        "Peer mentoring cycle completed successfully. Final project guidance was provided.",
    },
    {
      id: "PM-006",
      mentor: "Diya Thomas",
      mentorId: "STU2138",
      mentee: "Joel Joseph",
      menteeId: "STU2290",
      department: "Data Science",
      year: "2nd Year",
      sessions: 5,
      completed: 2,
      lastSession: "04 Sep 2026",
      nextSession: "18 Sep 2026",
      focus: "Academic Support",
      status: "Pending",
      remarks:
        "Participation has been inconsistent. Coordinator follow-up is recommended.",
    },
    {
      id: "PM-007",
      mentor: "Arjun Kumar",
      mentorId: "STU2144",
      mentee: "Megha S",
      menteeId: "STU2298",
      department: "Data Science",
      year: "3rd Year",
      sessions: 6,
      completed: 5,
      lastSession: "03 Sep 2026",
      nextSession: "17 Sep 2026",
      focus: "Career Guidance",
      status: "Active",
      remarks:
        "Good participation. Discussions are mainly focused on placements and technical skill development.",
    },
    {
      id: "PM-008",
      mentor: "Sneha Menon",
      mentorId: "STU2151",
      mentee: "Kiran Paul",
      menteeId: "STU2305",
      department: "Data Science",
      year: "1st Year",
      sessions: 3,
      completed: 3,
      lastSession: "01 Sep 2026",
      nextSession: "-",
      focus: "Orientation",
      status: "Completed",
      remarks:
        "Initial peer mentoring cycle completed. Student has successfully settled into the department.",
    },
  ]);

  const stats = useMemo(() => {
    const totalPairs = pairs.length;

    const active = pairs.filter(
      (pair) => pair.status === "Active"
    ).length;

    const pending = pairs.filter(
      (pair) => pair.status === "Pending"
    ).length;

    const completed = pairs.filter(
      (pair) => pair.status === "Completed"
    ).length;

    const totalSessions = pairs.reduce(
      (sum, pair) => sum + pair.sessions,
      0
    );

    const completedSessions = pairs.reduce(
      (sum, pair) => sum + pair.completed,
      0
    );

    const participation =
      totalSessions === 0
        ? 0
        : Math.round(
            (completedSessions / totalSessions) * 100
          );

    return {
      totalPairs,
      active,
      pending,
      completed,
      participation,
    };
  }, [pairs]);

  const filteredPairs = useMemo(() => {
    return pairs.filter((pair) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        pair.id.toLowerCase().includes(searchValue) ||
        pair.mentor.toLowerCase().includes(searchValue) ||
        pair.mentee.toLowerCase().includes(searchValue) ||
        pair.mentorId.toLowerCase().includes(searchValue) ||
        pair.menteeId.toLowerCase().includes(searchValue) ||
        pair.focus.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        pair.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [pairs, search, statusFilter]);

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    if (status === "Pending") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-slate-500/10 text-slate-400 border-slate-700";
  };

  const getStatusIcon = (status) => {
    if (status === "Active") {
      return <FiCheckCircle />;
    }

    if (status === "Pending") {
      return <FiClock />;
    }

    return <FiUserCheck />;
  };

  const updateStatus = (id, status) => {
    setPairs((current) =>
      current.map((pair) =>
        pair.id === id
          ? {
              ...pair,
              status,
            }
          : pair
      )
    );

    setSelectedPair((current) =>
      current
        ? {
            ...current,
            status,
          }
        : current
    );
  };

  return (
    <div className="min-h-full bg-[#080C14] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-purple-400">
            HOD / Peer Mentoring
          </p>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Peer Mentoring
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Monitor peer-to-peer mentoring activities, participation
                and student support across the department.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <FiUserCheck />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Participation
                </p>

                <p className="text-lg font-bold text-white">
                  {stats.participation}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FiUsers />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.totalPairs}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total Pairs
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.active}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Active
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiClock />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.pending}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Pending
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiUserCheck />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.completed}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Completed
            </p>
          </div>
        </div>

        {/* Participation */}
        <section className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-semibold text-white">
                Peer Mentoring Participation
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Completed sessions compared with scheduled peer mentoring sessions
              </p>
            </div>

            <span className="text-sm font-semibold text-purple-400">
              {stats.participation}% completed
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
              style={{ width: `${stats.participation}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
            <span>
              Active Pairs:{" "}
              <strong className="text-emerald-400">
                {stats.active}
              </strong>
            </span>

            <span>
              Pending:{" "}
              <strong className="text-amber-400">
                {stats.pending}
              </strong>
            </span>

            <span>
              Completed:{" "}
              <strong className="text-slate-300">
                {stats.completed}
              </strong>
            </span>
          </div>
        </section>

        {/* Pair Records */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1220]">
          {/* Toolbar */}
          <div className="border-b border-slate-800 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Peer Mentoring Pairs
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View and monitor student peer mentoring relationships
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 sm:w-64">
                  <FiSearch className="flex-shrink-0 text-slate-500" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search students..."
                    className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="h-10 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 text-sm text-slate-300 outline-none"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-left">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Peer Mentor
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Mentee
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Focus
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Sessions
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPairs.map((pair) => (
                  <tr
                    key={pair.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-xs font-semibold text-purple-300">
                          {pair.mentor
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {pair.mentor}
                          </p>

                          <p className="text-[11px] text-slate-500">
                            {pair.mentorId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-200">
                        {pair.mentee}
                      </p>

                      <p className="text-[11px] text-slate-500">
                        {pair.menteeId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-800/70 px-2.5 py-1.5 text-xs text-slate-300">
                        {pair.focus}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">
                        {pair.completed}/{pair.sessions}
                      </p>

                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{
                            width: `${
                              pair.sessions === 0
                                ? 0
                                : Math.round(
                                    (pair.completed /
                                      pair.sessions) *
                                      100
                                  )
                            }%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                          pair.status
                        )}`}
                      >
                        {getStatusIcon(pair.status)}
                        {pair.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedPair(pair)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
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

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-800 lg:hidden">
            {filteredPairs.map((pair) => (
              <div key={pair.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-xs font-semibold text-purple-300">
                      {pair.mentor
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {pair.mentor}
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Peer Mentor · {pair.mentorId}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${getStatusStyle(
                      pair.status
                    )}`}
                  >
                    {getStatusIcon(pair.status)}
                    {pair.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiUser className="text-xs" />

                      <span className="text-[10px] uppercase tracking-wider">
                        Mentee
                      </span>
                    </div>

                    <p className="truncate text-sm text-slate-200">
                      {pair.mentee}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {pair.menteeId}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiMessageSquare className="text-xs" />

                      <span className="text-[10px] uppercase tracking-wider">
                        Focus
                      </span>
                    </div>

                    <p className="truncate text-sm text-slate-200">
                      {pair.focus}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-600">
                      Sessions
                    </p>

                    <p className="mt-1 text-xs text-slate-300">
                      {pair.completed} of {pair.sessions} completed
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedPair(pair)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-purple-500/40 hover:text-white"
                  >
                    <FiEye />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPairs.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                <FiUsers />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-300">
                No peer mentoring pairs found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* View Pair Modal */}
      {selectedPair && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPair(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0D1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <FiUserCheck />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
                    {selectedPair.id}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    Peer Mentoring Pair
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedPair(null)}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              {/* Students */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiUserCheck />

                    <p className="text-[10px] uppercase tracking-wider">
                      Peer Mentor
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-white">
                    {selectedPair.mentor}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedPair.mentorId}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiUser />

                    <p className="text-[10px] uppercase tracking-wider">
                      Mentee
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-white">
                    {selectedPair.mentee}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedPair.menteeId}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Department
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedPair.department}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Year
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedPair.year}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Focus Area
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedPair.focus}
                  </p>
                </div>
              </div>

              {/* Sessions */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">
                      Session Progress
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {selectedPair.completed} of{" "}
                      {selectedPair.sessions} sessions completed
                    </p>
                  </div>

                  <p className="text-lg font-bold text-purple-400">
                    {selectedPair.sessions === 0
                      ? 0
                      : Math.round(
                          (selectedPair.completed /
                            selectedPair.sessions) *
                            100
                        )}
                    %
                  </p>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                    style={{
                      width: `${
                        selectedPair.sessions === 0
                          ? 0
                          : Math.round(
                              (selectedPair.completed /
                                selectedPair.sessions) *
                                100
                            )
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiCalendar />

                    <p className="text-[10px] uppercase tracking-wider">
                      Last Session
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedPair.lastSession}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiCalendar />

                    <p className="text-[10px] uppercase tracking-wider">
                      Next Session
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedPair.nextSession}
                  </p>
                </div>
              </div>

              {/* Remarks */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-center gap-2">
                  <FiMessageSquare className="text-purple-400" />

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    HOD Remarks
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {selectedPair.remarks}
                </p>
              </div>

              {/* Status */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Update Status
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["Active", "Pending", "Completed"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateStatus(
                            selectedPair.id,
                            status
                          )
                        }
                        className={`rounded-lg border px-2 py-2.5 text-[11px] font-medium transition ${
                          selectedPair.status === status
                            ? getStatusStyle(status)
                            : "border-slate-700 bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                <FiRefreshCw className="flex-shrink-0 text-purple-400" />

                <p className="text-xs leading-5 text-slate-400">
                  Status changes are reflected immediately in the
                  peer mentoring overview.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 px-5 py-4 sm:px-6">
              <button
                onClick={() => setSelectedPair(null)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeerMentoring;