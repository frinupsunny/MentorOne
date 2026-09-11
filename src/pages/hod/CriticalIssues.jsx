import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiSearch,
  FiEye,
  FiX,
  FiUser,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiArrowUpRight,
} from "react-icons/fi";

function CriticalIssues() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [issues, setIssues] = useState([
    {
      id: "ISS-001",
      title: "Attendance Concern",
      category: "Attendance",
      priority: "High",
      status: "Open",
      mentor: "Dr. Anil Kumar",
      mentee: "Rahul Menon",
      menteeId: "MEE1024",
      date: "10 Sep 2026",
      description:
        "Mentee attendance has fallen below the required percentage. The mentor has recommended immediate academic follow-up.",
      action:
        "Discuss attendance improvement plan with the mentee and monitor attendance weekly.",
    },
    {
      id: "ISS-002",
      title: "Academic Performance Drop",
      category: "Academic",
      priority: "High",
      status: "In Progress",
      mentor: "Ms. Priya Nair",
      mentee: "Sneha Thomas",
      menteeId: "MEE1031",
      date: "09 Sep 2026",
      description:
        "A significant decline in academic performance was identified in two core subjects during the recent review.",
      action:
        "Additional academic support and regular mentor follow-up have been initiated.",
    },
    {
      id: "ISS-003",
      title: "Repeated Session Absence",
      category: "Mentoring",
      priority: "Medium",
      status: "Open",
      mentor: "Dr. Joseph Mathew",
      mentee: "Arjun Raj",
      menteeId: "MEE1042",
      date: "08 Sep 2026",
      description:
        "The mentee has missed multiple scheduled mentoring sessions without prior communication.",
      action:
        "Mentor to contact the mentee and identify the reason for repeated absence.",
    },
    {
      id: "ISS-004",
      title: "Personal Support Required",
      category: "Personal",
      priority: "High",
      status: "In Progress",
      mentor: "Ms. Divya Menon",
      mentee: "Vishnu Krishnan",
      menteeId: "MEE1084",
      date: "07 Sep 2026",
      description:
        "Mentee reported a personal concern that is affecting concentration and academic activities.",
      action:
        "Coordinate with the appropriate student support team and continue mentor follow-up.",
    },
    {
      id: "ISS-005",
      title: "Communication Gap",
      category: "Mentoring",
      priority: "Medium",
      status: "Resolved",
      mentor: "Dr. Anil Kumar",
      mentee: "Meera Joseph",
      menteeId: "MEE1062",
      date: "06 Sep 2026",
      description:
        "Communication between the mentor and mentee had become inconsistent over the previous few weeks.",
      action:
        "Communication schedule was re-established and regular follow-up has resumed.",
    },
    {
      id: "ISS-006",
      title: "Internship Guidance",
      category: "Career",
      priority: "Low",
      status: "Resolved",
      mentor: "Ms. Priya Nair",
      mentee: "Nikhil George",
      menteeId: "MEE1070",
      date: "05 Sep 2026",
      description:
        "Mentee requested additional guidance regarding internship opportunities and preparation.",
      action:
        "Relevant internship resources were shared and a career discussion was completed.",
    },
    {
      id: "ISS-007",
      title: "Academic Backlog",
      category: "Academic",
      priority: "High",
      status: "Open",
      mentor: "Dr. Joseph Mathew",
      mentee: "Ananya S",
      menteeId: "MEE1078",
      date: "04 Sep 2026",
      description:
        "Mentee has pending academic work in multiple subjects and requires structured academic support.",
      action:
        "Prepare a weekly academic recovery plan and review progress with the mentor.",
    },
    {
      id: "ISS-008",
      title: "Mentoring Follow-up",
      category: "Mentoring",
      priority: "Low",
      status: "Resolved",
      mentor: "Ms. Divya Menon",
      mentee: "Akhil Paul",
      menteeId: "MEE1056",
      date: "03 Sep 2026",
      description:
        "A previously reported mentoring concern required additional follow-up from the mentor.",
      action:
        "Follow-up completed and issue marked as resolved.",
    },
  ]);

  const stats = useMemo(() => {
    const total = issues.length;
    const open = issues.filter((item) => item.status === "Open").length;
    const progress = issues.filter(
      (item) => item.status === "In Progress"
    ).length;
    const resolved = issues.filter(
      (item) => item.status === "Resolved"
    ).length;
    const high = issues.filter(
      (item) => item.priority === "High" && item.status !== "Resolved"
    ).length;

    return {
      total,
      open,
      progress,
      resolved,
      high,
    };
  }, [issues]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        issue.id.toLowerCase().includes(searchValue) ||
        issue.title.toLowerCase().includes(searchValue) ||
        issue.category.toLowerCase().includes(searchValue) ||
        issue.mentor.toLowerCase().includes(searchValue) ||
        issue.mentee.toLowerCase().includes(searchValue) ||
        issue.menteeId.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || issue.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || issue.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [issues, search, statusFilter, priorityFilter]);

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    if (priority === "Medium") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-slate-500/10 text-slate-400 border-slate-600/30";
  };

  const getStatusStyle = (status) => {
    if (status === "Open") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    if (status === "In Progress") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  const getStatusIcon = (status) => {
    if (status === "Open") {
      return <FiAlertCircle />;
    }

    if (status === "In Progress") {
      return <FiClock />;
    }

    return <FiCheckCircle />;
  };

  const updateStatus = (id, newStatus) => {
    setIssues((current) =>
      current.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status: newStatus,
            }
          : issue
      )
    );

    setSelectedIssue((current) =>
      current
        ? {
            ...current,
            status: newStatus,
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
            HOD / Critical Issues
          </p>

          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Critical Issues
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Monitor important mentoring concerns and coordinate timely
                intervention across the department.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <FiAlertTriangle />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Active High Priority
                </p>

                <p className="text-lg font-bold text-white">
                  {stats.high}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Total */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FiAlertTriangle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.total}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total Issues
            </p>
          </div>

          {/* Open */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FiAlertCircle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.open}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Open
            </p>
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiClock />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.progress}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              In Progress
            </p>
          </div>

          {/* Resolved */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.resolved}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Resolved
            </p>
          </div>

          {/* High */}
          <div className="col-span-2 rounded-2xl border border-slate-800 bg-[#0D1220] p-4 sm:col-span-1">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FiArrowUpRight />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.high}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              High Priority
            </p>
          </div>
        </div>

        {/* Priority Overview */}
        <section className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              Issue Overview
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Current distribution of unresolved issues by priority
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["High", "Medium", "Low"].map((priority) => {
              const count = issues.filter(
                (issue) =>
                  issue.priority === priority &&
                  issue.status !== "Resolved"
              ).length;

              const percentage =
                stats.total === 0
                  ? 0
                  : Math.round((count / stats.total) * 100);

              return (
                <div
                  key={priority}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getPriorityStyle(
                        priority
                      )}`}
                    >
                      {priority} Priority
                    </span>

                    <span className="text-lg font-bold text-white">
                      {count}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        priority === "High"
                          ? "bg-red-500"
                          : priority === "Medium"
                          ? "bg-amber-500"
                          : "bg-slate-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-slate-500">
                    {percentage}% of all reported issues
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Issues Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1220]">
          {/* Toolbar */}
          <div className="border-b border-slate-800 p-4 sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Reported Issues
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Review and manage mentoring-related concerns
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 sm:w-64">
                  <FiSearch className="flex-shrink-0 text-slate-500" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search issues..."
                    className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 text-sm text-slate-300 outline-none"
                >
                  <option>All</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="h-10 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 text-sm text-slate-300 outline-none"
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-left">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Issue
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Mentee
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Mentor
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Priority
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
                {filteredIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                          <FiAlertTriangle />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">
                            {issue.title}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-500">
                            {issue.id} · {issue.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-200">
                        {issue.mentee}
                      </p>

                      <p className="text-[11px] text-slate-500">
                        {issue.menteeId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">
                        {issue.mentor}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getPriorityStyle(
                          issue.priority
                        )}`}
                      >
                        {issue.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                          issue.status
                        )}`}
                      >
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedIssue(issue)}
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

          {/* Mobile */}
          <div className="divide-y divide-slate-800 lg:hidden">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                      <FiAlertTriangle />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {issue.title}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        {issue.id} · {issue.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex-shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium ${getPriorityStyle(
                      issue.priority
                    )}`}
                  >
                    {issue.priority}
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
                      {issue.mentee}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {issue.menteeId}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiUsers className="text-xs" />

                      <span className="text-[10px] uppercase tracking-wider">
                        Mentor
                      </span>
                    </div>

                    <p className="truncate text-sm text-slate-200">
                      {issue.mentor}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                      issue.status
                    )}`}
                  >
                    {getStatusIcon(issue.status)}
                    {issue.status}
                  </span>

                  <button
                    onClick={() => setSelectedIssue(issue)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-purple-500/40 hover:text-white"
                  >
                    <FiEye />
                    View Issue
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                <FiAlertTriangle />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-300">
                No issues found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* View Issue Modal */}
      {selectedIssue && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedIssue(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0D1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <FiAlertTriangle />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400">
                    {selectedIssue.id}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {selectedIssue.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedIssue(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiUser />

                    <p className="text-[10px] uppercase tracking-wider">
                      Mentee
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-white">
                    {selectedIssue.mentee}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedIssue.menteeId}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiUsers />

                    <p className="text-[10px] uppercase tracking-wider">
                      Mentor
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-white">
                    {selectedIssue.mentor}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiCalendar />

                    <p className="text-[10px] uppercase tracking-wider">
                      Reported Date
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-white">
                    {selectedIssue.date}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FiAlertCircle />

                    <p className="text-[10px] uppercase tracking-wider">
                      Category
                    </p>
                  </div>

                  <p className="mt-2 font-medium text-white">
                    {selectedIssue.category}
                  </p>
                </div>
              </div>

              {/* Priority + Status */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${getPriorityStyle(
                    selectedIssue.priority
                  )}`}
                >
                  {selectedIssue.priority} Priority
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                    selectedIssue.status
                  )}`}
                >
                  {getStatusIcon(selectedIssue.status)}
                  {selectedIssue.status}
                </span>
              </div>

              {/* Description */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-center gap-2">
                  <FiMessageSquare className="text-purple-400" />

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Issue Description
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {selectedIssue.description}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Recommended Action
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedIssue.action}
                </p>
              </div>

              {/* Update Status */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Update Issue Status
                </p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["Open", "In Progress", "Resolved"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateStatus(
                            selectedIssue.id,
                            status
                          )
                        }
                        className={`rounded-lg border px-2 py-2.5 text-[11px] font-medium transition ${
                          selectedIssue.status === status
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
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 px-5 py-4 sm:px-6">
              <button
                onClick={() => setSelectedIssue(null)}
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

export default CriticalIssues;