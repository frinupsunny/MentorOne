import { useState } from "react";
import {
  FiUsers,
  FiUser,
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiAlertCircle,
  FiUserPlus,
  FiArrowRight,
  FiX,
  FiRepeat,
} from "react-icons/fi";

function MenteeAllocation() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const mentors = [
    "Dr. Ramesh Kumar",
    "Dr. Meena S",
    "Dr. Anitha Joseph",
    "Dr. Arun Mathew",
    "Dr. Sunita Pillai",
  ];

  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: "Jasmine A",
      registerNo: "DS2026-001",
      program: "MSc Data Science",
      semester: "Semester 3",
      mentor: "Dr. Ramesh Kumar",
      status: "Allocated",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      registerNo: "DS2026-014",
      program: "MSc Data Science",
      semester: "Semester 1",
      mentor: "Dr. Meena S",
      status: "Allocated",
    },
    {
      id: 3,
      name: "Ananya S",
      registerNo: "DS2026-022",
      program: "MSc Data Science",
      semester: "Semester 3",
      mentor: "Dr. Anitha Joseph",
      status: "Allocated",
    },
    {
      id: 4,
      name: "Arjun P",
      registerNo: "DS2026-031",
      program: "MSc Data Science",
      semester: "Semester 2",
      mentor: "Dr. Arun Mathew",
      status: "Allocated",
    },
    {
      id: 5,
      name: "Akhil Thomas",
      registerNo: "DS2026-047",
      program: "MSc Data Science",
      semester: "Semester 1",
      mentor: "",
      status: "Unallocated",
    },
    {
      id: 6,
      name: "Neha Joseph",
      registerNo: "DS2026-055",
      program: "MSc Data Science",
      semester: "Semester 2",
      mentor: "Dr. Sunita Pillai",
      status: "Allocated",
    },
    {
      id: 7,
      name: "Adarsh R",
      registerNo: "DS2026-063",
      program: "MSc Data Science",
      semester: "Semester 3",
      mentor: "",
      status: "Unallocated",
    },
    {
      id: 8,
      name: "Sneha Mathew",
      registerNo: "DS2026-071",
      program: "MSc Data Science",
      semester: "Semester 1",
      mentor: "Dr. Ramesh Kumar",
      status: "Allocated",
    },
  ]);

  const allocatedCount = mentees.filter(
    (mentee) => mentee.status === "Allocated"
  ).length;

  const unallocatedCount = mentees.filter(
    (mentee) => mentee.status === "Unallocated"
  ).length;

  const filteredMentees = mentees.filter((mentee) => {
    const matchesSearch =
      `${mentee.name} ${mentee.registerNo} ${mentee.program} ${mentee.mentor}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || mentee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAllocation = (mentor) => {
    if (!selectedMentee || !mentor) return;

    setMentees((current) =>
      current.map((mentee) =>
        mentee.id === selectedMentee.id
          ? {
              ...mentee,
              mentor,
              status: "Allocated",
            }
          : mentee
      )
    );

    setShowModal(false);
    setSelectedMentee(null);
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-purple-400">
          Head of Department
        </p>

        <div className="mt-1 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mentee Allocation
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Review mentor-mentee assignments and ensure every student is
              connected with an appropriate mentor.
            </p>
          </div>

          <button
            onClick={() => {
              const unallocated = mentees.find(
                (mentee) => mentee.status === "Unallocated"
              );

              if (unallocated) {
                setSelectedMentee(unallocated);
                setShowModal(true);
              }
            }}
            disabled={unallocatedCount === 0}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-600/10 transition hover:from-purple-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiUserPlus />
            Allocate Mentee
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          icon={FiUsers}
          title="Total Mentees"
          value={mentees.length}
          subtitle="Department students"
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />

        <SummaryCard
          icon={FiCheckCircle}
          title="Allocated"
          value={allocatedCount}
          subtitle="Successfully assigned"
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />

        <SummaryCard
          icon={FiAlertCircle}
          title="Unallocated"
          value={unallocatedCount}
          subtitle="Require mentor assignment"
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />

        <SummaryCard
          icon={FiRepeat}
          title="Allocation Rate"
          value={`${Math.round((allocatedCount / mentees.length) * 100)}%`}
          subtitle="Department coverage"
          iconBg="bg-indigo-500/10"
          iconColor="text-indigo-400"
        />

      </div>

      {/* Allocation Progress */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Allocation Progress
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Overall mentor-mentee allocation status
            </p>
          </div>

          <p className="text-sm font-semibold text-white">
            {allocatedCount} / {mentees.length} allocated
          </p>
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
            style={{
              width: `${(allocatedCount / mentees.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px]">
          <span className="text-emerald-400">
            {allocatedCount} Allocated
          </span>

          <span className="text-red-400">
            {unallocatedCount} Unallocated
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422]">

        {/* Toolbar */}
        <div className="border-b border-slate-800/70 p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-base font-semibold text-white">
                Mentor–Mentee Assignments
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                View and manage current student allocations.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 sm:w-64">
                <FiSearch className="flex-shrink-0 text-slate-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search mentees..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="relative flex h-10 items-center rounded-lg border border-slate-800 bg-slate-900/50 px-3">

                <FiFilter className="mr-2 text-slate-500" />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-transparent pr-5 text-xs text-slate-300 outline-none"
                >
                  <option value="All" className="bg-[#0D1422]">
                    All Status
                  </option>

                  <option value="Allocated" className="bg-[#0D1422]">
                    Allocated
                  </option>

                  <option value="Unallocated" className="bg-[#0D1422]">
                    Unallocated
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
                  Mentee
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Programme
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Semester
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Mentor
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMentees.map((mentee) => (
                <tr
                  key={mentee.id}
                  className="border-b border-slate-800/50 transition hover:bg-slate-900/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-semibold text-slate-300">
                        {mentee.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-200">
                          {mentee.name}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-600">
                          {mentee.registerNo}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {mentee.program}
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    {mentee.semester}
                  </td>

                  <td className="px-5 py-4">
                    {mentee.mentor ? (
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                          <FiUser className="text-xs" />
                        </div>

                        <span className="text-xs text-slate-300">
                          {mentee.mentor}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600">
                        Not assigned
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={mentee.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedMentee(mentee);
                        setShowModal(true);
                      }}
                      className="rounded-lg px-3 py-2 text-[11px] font-medium text-purple-400 transition hover:bg-purple-500/10"
                    >
                      {mentee.status === "Allocated"
                        ? "Reassign"
                        : "Allocate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 p-4 lg:hidden">

          {filteredMentees.map((mentee) => (
            <div
              key={mentee.id}
              className="rounded-xl border border-slate-800/70 bg-slate-900/30 p-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                    {mentee.name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {mentee.name}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {mentee.registerNo}
                    </p>
                  </div>

                </div>

                <StatusBadge status={mentee.status} />

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-800/60 pt-4">

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Programme
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {mentee.program}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Semester
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {mentee.semester}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-[9px] uppercase tracking-wide text-slate-600">
                    Mentor
                  </p>

                  <p className="mt-1 text-xs text-slate-300">
                    {mentee.mentor || "Not assigned"}
                  </p>
                </div>

              </div>

              <button
                onClick={() => {
                  setSelectedMentee(mentee);
                  setShowModal(true);
                }}
                className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 transition hover:bg-purple-500/10 hover:text-purple-400"
              >
                <FiRepeat />
                {mentee.status === "Allocated"
                  ? "Reassign Mentor"
                  : "Allocate Mentor"}
              </button>

            </div>
          ))}

        </div>

        {filteredMentees.length === 0 && (
          <div className="py-14 text-center">
            <FiUsers className="mx-auto text-3xl text-slate-700" />

            <p className="mt-3 text-sm font-medium text-slate-400">
              No mentees found
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Try changing your search or filter.
            </p>
          </div>
        )}

      </div>

      {/* Allocation Modal */}
      {showModal && selectedMentee && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
            setSelectedMentee(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0D1422] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedMentee.status === "Allocated"
                    ? "Reassign Mentor"
                    : "Allocate Mentor"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Select a mentor for {selectedMentee.name}.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMentee(null);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* Mentee */}
            <div className="mt-5 rounded-xl border border-slate-800/70 bg-slate-900/40 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <FiUser />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {selectedMentee.name}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    {selectedMentee.registerNo} · {selectedMentee.semester}
                  </p>
                </div>

              </div>

            </div>

            {/* Mentor options */}
            <div className="mt-5">

              <p className="text-xs font-medium text-slate-400">
                Available Mentors
              </p>

              <div className="mt-3 space-y-2">

                {mentors.map((mentor) => (
                  <button
                    key={mentor}
                    onClick={() => handleAllocation(mentor)}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/30 p-3 text-left transition hover:border-purple-500/30 hover:bg-purple-500/5"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-purple-400">
                      <FiUser />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-300">
                        {mentor}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Faculty Mentor
                      </p>
                    </div>

                    <FiArrowRight className="text-slate-700" />

                  </button>
                ))}

              </div>

            </div>

          </div>
        </div>
      )}

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
    <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-4">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`text-lg ${iconColor}`} />
        </div>

        <FiArrowRight className="text-slate-700" />

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

function StatusBadge({ status }) {
  if (status === "Allocated") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-400">
        <FiCheckCircle />
        Allocated
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-[9px] font-semibold text-red-400">
      <FiAlertCircle />
      Unallocated
    </span>
  );
}

export default MenteeAllocation;