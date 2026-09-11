import { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiSearch,
  FiFilter,
  FiUser,
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiEye,
} from "react-icons/fi";

function SessionCompliance() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const sessions = [
    {
      id: 1,
      mentor: "Dr. Ramesh Kumar",
      mentee: "Jasmine A",
      program: "MSc Data Science",
      date: "10 September 2026",
      time: "10:30 AM",
      type: "Individual",
      status: "Completed",
      duration: "45 min",
      verified: true,
    },
    {
      id: 2,
      mentor: "Dr. Meena S",
      mentee: "Rahul Kumar",
      program: "MSc Data Science",
      date: "10 September 2026",
      time: "12:00 PM",
      type: "Individual",
      status: "Completed",
      duration: "40 min",
      verified: true,
    },
    {
      id: 3,
      mentor: "Dr. Anitha Joseph",
      mentee: "Ananya S",
      program: "MSc Data Science",
      date: "10 September 2026",
      time: "2:30 PM",
      type: "Individual",
      status: "Pending",
      duration: "-",
      verified: false,
    },
    {
      id: 4,
      mentor: "Dr. Arun Mathew",
      mentee: "Arjun P",
      program: "MSc Data Science",
      date: "9 September 2026",
      time: "11:00 AM",
      type: "Individual",
      status: "Missed",
      duration: "0 min",
      verified: false,
    },
    {
      id: 5,
      mentor: "Dr. Sunita Pillai",
      mentee: "Neha Joseph",
      program: "MSc Data Science",
      date: "9 September 2026",
      time: "3:00 PM",
      type: "Individual",
      status: "Completed",
      duration: "50 min",
      verified: true,
    },
    {
      id: 6,
      mentor: "Dr. Ramesh Kumar",
      mentee: "Sneha Mathew",
      program: "MSc Data Science",
      date: "8 September 2026",
      time: "10:00 AM",
      type: "Group",
      status: "Completed",
      duration: "55 min",
      verified: true,
    },
    {
      id: 7,
      mentor: "Dr. Joseph Thomas",
      mentee: "Adarsh R",
      program: "MSc Data Science",
      date: "8 September 2026",
      time: "1:30 PM",
      type: "Individual",
      status: "Pending",
      duration: "-",
      verified: false,
    },
    {
      id: 8,
      mentor: "Dr. Priya Nair",
      mentee: "Megha S",
      program: "MSc Data Science",
      date: "7 September 2026",
      time: "11:30 AM",
      type: "Individual",
      status: "Completed",
      duration: "42 min",
      verified: true,
    },
    {
      id: 9,
      mentor: "Dr. Rahul Menon",
      mentee: "Vishnu K",
      program: "MSc Data Science",
      date: "6 September 2026",
      time: "2:00 PM",
      type: "Individual",
      status: "Missed",
      duration: "0 min",
      verified: false,
    },
  ];

  const completed = sessions.filter(
    (session) => session.status === "Completed"
  ).length;

  const pending = sessions.filter(
    (session) => session.status === "Pending"
  ).length;

  const missed = sessions.filter(
    (session) => session.status === "Missed"
  ).length;

  const complianceRate = Math.round((completed / sessions.length) * 100);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      `${session.mentor} ${session.mentee} ${session.program}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-purple-400">
          Head of Department
        </p>

        <div className="mt-1">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Session Compliance
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor mentoring sessions, attendance and compliance across the
            department.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <SummaryCard
          icon={FiCalendar}
          title="Total Sessions"
          value={sessions.length}
          subtitle="Recorded sessions"
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />

        <SummaryCard
          icon={FiCheckCircle}
          title="Completed"
          value={completed}
          subtitle="Successfully completed"
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />

        <SummaryCard
          icon={FiClock}
          title="Pending"
          value={pending}
          subtitle="Awaiting completion"
          iconBg="bg-orange-500/10"
          iconColor="text-orange-400"
        />

        <SummaryCard
          icon={FiAlertTriangle}
          title="Missed"
          value={missed}
          subtitle="Require follow-up"
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />

        <SummaryCard
          icon={FiCheckCircle}
          title="Compliance"
          value={`${complianceRate}%`}
          subtitle="Department rate"
          iconBg="bg-indigo-500/10"
          iconColor="text-indigo-400"
        />

      </div>

      {/* Compliance Overview */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-base font-semibold text-white">
              Department Session Compliance
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Overview of scheduled mentoring sessions
            </p>
          </div>

          <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            {complianceRate}% Compliant
          </span>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
            style={{ width: `${complianceRate}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <ComplianceItem
            label="Completed"
            value={completed}
            total={sessions.length}
            color="text-emerald-400"
          />

          <ComplianceItem
            label="Pending"
            value={pending}
            total={sessions.length}
            color="text-orange-400"
          />

          <ComplianceItem
            label="Missed"
            value={missed}
            total={sessions.length}
            color="text-red-400"
          />

        </div>

      </div>

      {/* Session Records */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422]">

        {/* Toolbar */}
        <div className="border-b border-slate-800/70 p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-base font-semibold text-white">
                Session Records
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review mentoring session activity and attendance.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              {/* Search */}
              <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 sm:w-64">
                <FiSearch className="flex-shrink-0 text-slate-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sessions..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              {/* Filter */}
              <div className="flex h-10 items-center rounded-lg border border-slate-800 bg-slate-900/50 px-3">

                <FiFilter className="mr-2 text-slate-500" />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-xs text-slate-300 outline-none"
                >
                  <option value="All" className="bg-[#0D1422]">
                    All Status
                  </option>

                  <option value="Completed" className="bg-[#0D1422]">
                    Completed
                  </option>

                  <option value="Pending" className="bg-[#0D1422]">
                    Pending
                  </option>

                  <option value="Missed" className="bg-[#0D1422]">
                    Missed
                  </option>
                </select>

              </div>

            </div>

          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800/70 text-left">

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Mentor / Mentee
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Date & Time
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Type
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Duration
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Details
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredSessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-slate-800/50 transition hover:bg-slate-900/30"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                        <FiUser className="text-sm" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200">
                          {session.mentor}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          {session.mentee} · {session.program}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <p className="text-xs text-slate-300">
                      {session.date}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {session.time}
                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[9px] font-medium text-slate-400">
                      {session.type}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {session.duration}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={session.status} />
                  </td>

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === session.id ? null : session.id
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                    >
                      {expandedId === session.id ? (
                        <FiChevronUp />
                      ) : (
                        <FiEye />
                      )}
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {/* Expanded Details */}
          {expandedId && (
            <div className="border-t border-slate-800/70 bg-slate-900/20 p-5">

              {(() => {
                const session = sessions.find(
                  (item) => item.id === expandedId
                );

                if (!session) return null;

                return (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <DetailBlock
                      icon={FiUser}
                      label="Mentor"
                      value={session.mentor}
                    />

                    <DetailBlock
                      icon={FiBookOpen}
                      label="Mentee"
                      value={session.mentee}
                    />

                    <DetailBlock
                      icon={FiCalendar}
                      label="Scheduled"
                      value={`${session.date} · ${session.time}`}
                    />

                    <DetailBlock
                      icon={FiClock}
                      label="Duration"
                      value={session.duration}
                    />

                    <DetailBlock
                      icon={FiCheckCircle}
                      label="Verification"
                      value={
                        session.verified
                          ? "Session verified"
                          : "Verification pending"
                      }
                    />

                    <DetailBlock
                      icon={FiCalendar}
                      label="Session Type"
                      value={session.type}
                    />

                  </div>
                );
              })()}

            </div>
          )}

        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 p-4 lg:hidden">

          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-slate-800/70 bg-slate-900/30 p-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <FiUser />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-white">
                      {session.mentor}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-slate-600">
                      {session.mentee}
                    </p>

                  </div>

                </div>

                <StatusBadge status={session.status} />

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-800/60 pt-4">

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Date
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {session.date}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Time
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {session.time}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Type
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {session.type}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Duration
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {session.duration}
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  setExpandedId(
                    expandedId === session.id ? null : session.id
                  )
                }
                className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 transition hover:bg-purple-500/10 hover:text-purple-400"
              >
                {expandedId === session.id ? (
                  <>
                    <FiChevronUp />
                    Hide Details
                  </>
                ) : (
                  <>
                    <FiEye />
                    View Details
                  </>
                )}
              </button>

              {expandedId === session.id && (
                <div className="mt-3 rounded-lg border border-slate-800/70 bg-slate-900/40 p-3">

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-600">
                      Verification
                    </span>

                    <span
                      className={`text-[10px] font-medium ${
                        session.verified
                          ? "text-emerald-400"
                          : "text-orange-400"
                      }`}
                    >
                      {session.verified
                        ? "Session verified"
                        : "Verification pending"}
                    </span>
                  </div>

                </div>
              )}

            </div>
          ))}

        </div>

        {filteredSessions.length === 0 && (
          <div className="py-14 text-center">

            <FiCalendar className="mx-auto text-3xl text-slate-700" />

            <p className="mt-3 text-sm font-medium text-slate-400">
              No sessions found
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

      {/* Compliance Note */}
      <div className="mt-5 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">

        <div className="flex gap-3">

          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
            <FiCheckCircle className="text-indigo-400" />
          </div>

          <div>

            <h3 className="text-sm font-semibold text-slate-300">
              Session Compliance Monitoring
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Completed sessions are recorded after successful mentoring
              activity verification. Pending and missed sessions can be
              reviewed by the HOD for appropriate follow-up.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-4 transition hover:border-slate-700">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`text-lg ${iconColor}`} />
        </div>

        <span className="text-xs text-slate-700">●</span>

      </div>

      <p className="mt-4 text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">
        {title}
      </p>

      <p className="mt-1 text-[11px] text-slate-600">
        {subtitle}
      </p>

    </div>
  );
}

function ComplianceItem({ label, value, total, color }) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-3">

      <div className="flex items-center justify-between">

        <span className={`text-xs font-medium ${color}`}>
          {label}
        </span>

        <span className="text-xs font-semibold text-slate-300">
          {value}
        </span>

      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${color.replace(
            "text-",
            "bg-"
          )}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-[9px] text-slate-600">
        {percentage}% of recorded sessions
      </p>

    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-400">
        <FiCheckCircle />
        Completed
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-1 text-[9px] font-semibold text-orange-400">
        <FiClock />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-[9px] font-semibold text-red-400">
      <FiAlertTriangle />
      Missed
    </span>
  );
}

function DetailBlock({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-3">

      <div className="flex items-center gap-2">
        <Icon className="text-sm text-slate-600" />

        <p className="text-[9px] font-medium uppercase tracking-wide text-slate-600">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-xs font-medium text-slate-300">
        {value}
      </p>

    </div>
  );
}

export default SessionCompliance;