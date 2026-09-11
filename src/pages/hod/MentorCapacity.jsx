import { useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiUser,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowUpRight,
  FiMinus,
  FiPlus,
  FiX,
} from "react-icons/fi";

function MentorCapacity() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [capacityChange, setCapacityChange] = useState(0);

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      department: "Data Science",
      mentees: 8,
      capacity: 10,
      sessions: 14,
      status: "Available",
    },
    {
      id: 2,
      name: "Dr. Meena S",
      department: "Data Science",
      mentees: 6,
      capacity: 8,
      sessions: 12,
      status: "Available",
    },
    {
      id: 3,
      name: "Dr. Anitha Joseph",
      department: "Data Science",
      mentees: 7,
      capacity: 8,
      sessions: 15,
      status: "Near Capacity",
    },
    {
      id: 4,
      name: "Dr. Arun Mathew",
      department: "Data Science",
      mentees: 10,
      capacity: 10,
      sessions: 18,
      status: "Full",
    },
    {
      id: 5,
      name: "Dr. Sunita Pillai",
      department: "Data Science",
      mentees: 8,
      capacity: 10,
      sessions: 13,
      status: "Available",
    },
    {
      id: 6,
      name: "Dr. Joseph Thomas",
      department: "Data Science",
      mentees: 4,
      capacity: 8,
      sessions: 9,
      status: "Available",
    },
    {
      id: 7,
      name: "Dr. Priya Nair",
      department: "Data Science",
      mentees: 7,
      capacity: 8,
      sessions: 11,
      status: "Near Capacity",
    },
    {
      id: 8,
      name: "Dr. Rahul Menon",
      department: "Data Science",
      mentees: 5,
      capacity: 10,
      sessions: 10,
      status: "Available",
    },
  ]);

  const totalMentees = mentors.reduce(
    (total, mentor) => total + mentor.mentees,
    0
  );

  const totalCapacity = mentors.reduce(
    (total, mentor) => total + mentor.capacity,
    0
  );

  const availableSlots = totalCapacity - totalMentees;

  const fullMentors = mentors.filter(
    (mentor) => mentor.mentees >= mentor.capacity
  ).length;

  const nearCapacityMentors = mentors.filter(
    (mentor) =>
      mentor.mentees < mentor.capacity &&
      mentor.mentees / mentor.capacity >= 0.8
  ).length;

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      `${mentor.name} ${mentor.department}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || mentor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getPercentage = (mentor) =>
    Math.min(Math.round((mentor.mentees / mentor.capacity) * 100), 100);

  const getCapacityColor = (percentage) => {
    if (percentage >= 100) {
      return "bg-red-500";
    }

    if (percentage >= 80) {
      return "bg-orange-500";
    }

    return "bg-emerald-500";
  };

  const getStatusStyle = (status) => {
    if (status === "Full") {
      return "bg-red-500/10 text-red-400";
    }

    if (status === "Near Capacity") {
      return "bg-orange-500/10 text-orange-400";
    }

    return "bg-emerald-500/10 text-emerald-400";
  };

  const updateCapacity = () => {
    if (!selectedMentor || capacityChange === 0) return;

    setMentors((current) =>
      current.map((mentor) => {
        if (mentor.id !== selectedMentor.id) {
          return mentor;
        }

        const newCapacity = Math.max(
          mentor.mentees,
          mentor.capacity + capacityChange
        );

        const percentage = mentor.mentees / newCapacity;

        let status = "Available";

        if (mentor.mentees >= newCapacity) {
          status = "Full";
        } else if (percentage >= 0.8) {
          status = "Near Capacity";
        }

        return {
          ...mentor,
          capacity: newCapacity,
          status,
        };
      })
    );

    setShowModal(false);
    setSelectedMentor(null);
    setCapacityChange(0);
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-purple-400">
          Head of Department
        </p>

        <div className="mt-1">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Mentor Capacity
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor mentor workloads and identify available capacity for
            additional mentee assignments.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <SummaryCard
          icon={FiUsers}
          title="Mentors"
          value={mentors.length}
          subtitle="Department mentors"
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />

        <SummaryCard
          icon={FiUser}
          title="Assigned Mentees"
          value={totalMentees}
          subtitle="Across all mentors"
          iconBg="bg-indigo-500/10"
          iconColor="text-indigo-400"
        />

        <SummaryCard
          icon={FiPlus}
          title="Available Slots"
          value={availableSlots}
          subtitle="Remaining capacity"
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />

        <SummaryCard
          icon={FiAlertTriangle}
          title="Near Capacity"
          value={nearCapacityMentors}
          subtitle="80% or more"
          iconBg="bg-orange-500/10"
          iconColor="text-orange-400"
        />

        <SummaryCard
          icon={FiCheckCircle}
          title="Full"
          value={fullMentors}
          subtitle="No available slots"
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />

      </div>

      {/* Overall Capacity */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-base font-semibold text-white">
              Department Capacity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Overall mentor workload across the department
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-lg font-bold text-white">
              {totalMentees} / {totalCapacity}
            </p>

            <p className="text-[10px] text-slate-600">
              Mentee assignments
            </p>
          </div>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
            style={{
              width: `${Math.min(
                (totalMentees / totalCapacity) * 100,
                100
              )}%`,
            }}
          />
        </div>

        <div className="mt-3 flex flex-wrap justify-between gap-2 text-[10px]">
          <span className="text-purple-400">
            {Math.round((totalMentees / totalCapacity) * 100)}% utilized
          </span>

          <span className="text-emerald-400">
            {availableSlots} slots remaining
          </span>
        </div>

      </div>

      {/* Mentor Capacity List */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422]">

        {/* Toolbar */}
        <div className="border-b border-slate-800/70 p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-base font-semibold text-white">
                Mentor Workload
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current mentee allocation for each mentor.
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
                  placeholder="Search mentor..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>

              {/* Filter */}
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

                  <option value="Available" className="bg-[#0D1422]">
                    Available
                  </option>

                  <option value="Near Capacity" className="bg-[#0D1422]">
                    Near Capacity
                  </option>

                  <option value="Full" className="bg-[#0D1422]">
                    Full
                  </option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800/70 text-left">

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Mentor
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Workload
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  Sessions
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

              {filteredMentors.map((mentor) => {
                const percentage = getPercentage(mentor);

                return (
                  <tr
                    key={mentor.id}
                    className="border-b border-slate-800/50 transition hover:bg-slate-900/30"
                  >

                    {/* Mentor */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                          {mentor.name
                            .replace("Dr. ", "")
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-200">
                            {mentor.name}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-600">
                            {mentor.department}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Workload */}
                    <td className="min-w-[250px] px-5 py-4">

                      <div className="flex items-center justify-between">

                        <span className="text-xs font-medium text-slate-300">
                          {mentor.mentees} / {mentor.capacity}
                        </span>

                        <span className="text-[10px] text-slate-600">
                          {percentage}%
                        </span>

                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full transition-all ${getCapacityColor(
                            percentage
                          )}`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <p className="mt-1 text-[9px] text-slate-600">
                        {mentor.capacity - mentor.mentees > 0
                          ? `${mentor.capacity - mentor.mentees} slots available`
                          : "No slots available"}
                      </p>

                    </td>

                    {/* Sessions */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-slate-400">
                        {mentor.sessions} this month
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                          mentor.status
                        )}`}
                      >
                        {mentor.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() => {
                          setSelectedMentor(mentor);
                          setCapacityChange(0);
                          setShowModal(true);
                        }}
                        className="rounded-lg px-3 py-2 text-[11px] font-medium text-purple-400 transition hover:bg-purple-500/10"
                      >
                        Manage
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Mobile */}
        <div className="space-y-3 p-4 lg:hidden">

          {filteredMentors.map((mentor) => {
            const percentage = getPercentage(mentor);

            return (
              <div
                key={mentor.id}
                className="rounded-xl border border-slate-800/70 bg-slate-900/30 p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                      {mentor.name
                        .replace("Dr. ", "")
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {mentor.name}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {mentor.department}
                      </p>
                    </div>

                  </div>

                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold ${getStatusStyle(
                      mentor.status
                    )}`}
                  >
                    {mentor.status}
                  </span>

                </div>

                <div className="mt-4 border-t border-slate-800/60 pt-4">

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Mentee Load
                    </span>

                    <span className="text-xs font-semibold text-white">
                      {mentor.mentees} / {mentor.capacity}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${getCapacityColor(
                        percentage
                      )}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-[10px] text-slate-600">
                      {percentage}% utilized
                    </span>

                    <span className="text-[10px] text-slate-600">
                      {mentor.sessions} sessions
                    </span>
                  </div>

                </div>

                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setCapacityChange(0);
                    setShowModal(true);
                  }}
                  className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 transition hover:bg-purple-500/10 hover:text-purple-400"
                >
                  <FiUsers />
                  Manage Capacity
                </button>

              </div>
            );
          })}

        </div>

        {filteredMentors.length === 0 && (
          <div className="py-14 text-center">
            <FiUsers className="mx-auto text-3xl text-slate-700" />

            <p className="mt-3 text-sm font-medium text-slate-400">
              No mentors found
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Try changing your search or status filter.
            </p>
          </div>
        )}

      </div>

      {/* Information */}
      <div className="mt-5 rounded-2xl border border-orange-500/10 bg-orange-500/5 p-5">

        <div className="flex gap-3">

          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
            <FiAlertTriangle className="text-orange-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              Capacity Monitoring
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Mentors reaching 80% of their capacity are marked as
              <span className="mx-1 text-orange-400">Near Capacity</span>
              so that new mentee allocations can be planned carefully.
              Full mentors should not receive additional assignments until
              capacity is increased.
            </p>
          </div>

        </div>

      </div>

      {/* Manage Capacity Modal */}
      {showModal && selectedMentor && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
            setSelectedMentor(null);
            setCapacityChange(0);
          }}
        >

          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0D1422] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Manage Mentor Capacity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Adjust the maximum mentee capacity.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMentor(null);
                  setCapacityChange(0);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* Mentor */}
            <div className="mt-5 rounded-xl border border-slate-800/70 bg-slate-900/40 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <FiUser />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {selectedMentor.name}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    {selectedMentor.department}
                  </p>
                </div>

              </div>

            </div>

            {/* Current Capacity */}
            <div className="mt-5">

              <div className="flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Current Capacity
                </span>

                <span className="text-sm font-semibold text-white">
                  {selectedMentor.mentees} / {selectedMentor.capacity}
                </span>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${getCapacityColor(
                    getPercentage(selectedMentor)
                  )}`}
                  style={{
                    width: `${getPercentage(selectedMentor)}%`,
                  }}
                />
              </div>

            </div>

            {/* Adjust */}
            <div className="mt-6">

              <p className="text-xs font-medium text-slate-400">
                Adjust Maximum Capacity
              </p>

              <div className="mt-3 flex items-center justify-center gap-5">

                <button
                  onClick={() =>
                    setCapacityChange((value) => value - 1)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  <FiMinus />
                </button>

                <div className="text-center">

                  <p className="text-2xl font-bold text-white">
                    {Math.max(
                      selectedMentor.mentees,
                      selectedMentor.capacity + capacityChange
                    )}
                  </p>

                  <p className="text-[10px] text-slate-600">
                    Maximum mentees
                  </p>

                </div>

                <button
                  onClick={() =>
                    setCapacityChange((value) => value + 1)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  <FiPlus />
                </button>

              </div>

            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedMentor(null);
                  setCapacityChange(0);
                }}
                className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-900 text-xs font-medium text-slate-400 transition hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={updateCapacity}
                disabled={capacityChange === 0}
                className="h-10 flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-semibold text-white transition hover:from-purple-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Changes
              </button>

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
    <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-4 transition hover:border-slate-700">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`text-lg ${iconColor}`} />
        </div>

        <FiArrowUpRight className="text-slate-700" />

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

export default MentorCapacity;