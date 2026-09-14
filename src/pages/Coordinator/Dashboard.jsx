import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUsers,
  FiUserCheck,
  FiAlertTriangle,
  FiActivity,
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiBookOpen,
  FiCalendar,
  FiBell,
  FiBarChart2,
  FiRepeat,
  FiArrowUpRight,
} from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [page, setPage] = useState(1);

  const mentors = [
    {
      id: 1,
      initials: "RK",
      name: "Dr. Ramesh Kumar",
      department: "Computer Science",
      className: "MSc Data Science - Sem 3",
      mentees: "18 / 20",
      assigned: 18,
      capacity: "Almost Full",
      sessions: "8 this month",
      compliance: 94,
      status: "Active",
    },
    {
      id: 2,
      initials: "MS",
      name: "Dr. Meena S",
      department: "Data Science",
      className: "MSc Data Science - Sem 1",
      mentees: "15 / 20",
      assigned: 15,
      capacity: "Available",
      sessions: "7 this month",
      compliance: 91,
      status: "Active",
    },
    {
      id: 3,
      initials: "AN",
      name: "Dr. Anitha",
      department: "Data Science",
      className: "MSc Data Science - Sem 3",
      mentees: "14 / 20",
      assigned: 14,
      capacity: "Available",
      sessions: "6 this month",
      compliance: 86,
      status: "Active",
    },
    {
      id: 4,
      initials: "VK",
      name: "Dr. Vivek",
      department: "Computer Science",
      className: "MSc Data Science - Sem 1",
      mentees: "20 / 20",
      assigned: 20,
      capacity: "Full",
      sessions: "10 this month",
      compliance: 78,
      status: "At Capacity",
    },
    {
      id: 5,
      initials: "RS",
      name: "Dr. Rajesh R",
      department: "Statistics",
      className: "MSc Data Science - Sem 2",
      mentees: "16 / 20",
      assigned: 16,
      capacity: "Available",
      sessions: "5 this month",
      compliance: 88,
      status: "Active",
    },
    {
      id: 6,
      initials: "PM",
      name: "Dr. Priya Menon",
      department: "Analytics",
      className: "MSc Data Science - Sem 4",
      mentees: "12 / 20",
      assigned: 12,
      capacity: "Available",
      sessions: "4 this month",
      compliance: 82,
      status: "Active",
    },
  ];

  const filteredMentors = mentors.filter((mentor) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      mentor.name.toLowerCase().includes(searchText) ||
      mentor.department.toLowerCase().includes(searchText) ||
      mentor.className.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All Status" ||
      mentor.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "All Departments" ||
      mentor.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departmentData = [
    {
      name: "Computer Science",
      count: 2,
      percentage: 33,
      color: "bg-blue-500",
    },
    {
      name: "Data Science",
      count: 3,
      percentage: 50,
      color: "bg-purple-500",
    },
    {
      name: "Statistics",
      count: 1,
      percentage: 17,
      color: "bg-emerald-500",
    },
    {
      name: "Analytics",
      count: 0,
      percentage: 0,
      color: "bg-orange-500",
    },
  ];

  const quickActions = [
    {
      title: "Assign Mentees",
      description: "Allocate mentees to mentors",
      icon: FiUsers,
      path: "/coordinator/assign-mentees",
      color: "purple",
    },
    {
      title: "View Reports",
      description: "Generate and view reports",
      icon: FiBarChart2,
      path: "/coordinator/reports",
      color: "blue",
    },
    {
      title: "Manage Calendar",
      description: "Schedule and manage sessions",
      icon: FiCalendar,
      path: "/coordinator/calendar",
      color: "purple",
    },
    {
      title: "Send Notification",
      description: "Notify mentors and mentees",
      icon: FiBell,
      path: "/coordinator/notifications",
      color: "orange",
    },
  ];

  const getCapacityStyle = (capacity) => {
    if (capacity === "Full") {
      return "text-red-400";
    }

    if (capacity === "Almost Full") {
      return "text-orange-400";
    }

    return "text-emerald-400";
  };

  const getStatusStyle = (status) => {
    if (status === "At Capacity") {
      return "bg-orange-500/15 text-orange-400";
    }

    return "bg-emerald-500/15 text-emerald-400";
  };

  const getComplianceStyle = (value) => {
    if (value >= 90) {
      return "text-emerald-400";
    }

    if (value >= 80) {
      return "text-orange-400";
    }

    return "text-red-400";
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      {/* =========================
          WELCOME SECTION
      ========================= */}
      <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-400">
              Friday, 14 August 2026
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Hello, Dr. Meena S 👋
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Welcome back to MentorOne. Here's what's happening today.
            </p>
          </div>

          <div className="w-fit rounded-xl border border-purple-500/20 bg-purple-500/10 px-5 py-4">
            <p className="text-xs text-slate-500">
              Role
            </p>

            <p className="mt-1 text-sm font-semibold text-purple-400">
              Coordinator
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          STATISTICS
      ========================= */}
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <FiUsers className="text-2xl" />
            </div>

            <FiArrowUpRight className="text-lg text-slate-600" />
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Total Mentors
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            6
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Mentors under coordination
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <FiUserCheck className="text-2xl" />
            </div>

            <FiArrowUpRight className="text-lg text-slate-600" />
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Active Mentors
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            5
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Currently active
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <FiAlertTriangle className="text-2xl" />
            </div>

            <FiArrowUpRight className="text-lg text-slate-600" />
          </div>

          <p className="mt-5 text-sm text-slate-400">
            At Capacity
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            1
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            20 mentees assigned
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <FiActivity className="text-2xl" />
            </div>

            <FiArrowUpRight className="text-lg text-slate-600" />
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Available Slots
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            43
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Mentee slots available
          </p>
        </div>
      </section>

      {/* =========================
          SEARCH AND FILTERS
      ========================= */}
      <section className="mt-5 rounded-2xl border border-slate-800 bg-[#0D1422] p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-800 bg-[#0A1120] px-4">
            <FiSearch className="flex-shrink-0 text-lg text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search mentor, department or class..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="h-12 w-full appearance-none rounded-xl border border-slate-800 bg-[#0A1120] px-4 pr-10 text-sm text-slate-300 outline-none focus:border-purple-500 lg:w-44"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>At Capacity</option>
            </select>

            <FiChevronDown className="pointer-events-none absolute right-3 top-4 text-slate-500" />
          </div>

          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(event) => {
                setDepartmentFilter(event.target.value);
                setPage(1);
              }}
              className="h-12 w-full appearance-none rounded-xl border border-slate-800 bg-[#0A1120] px-4 pr-10 text-sm text-slate-300 outline-none focus:border-purple-500 lg:w-48"
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Data Science</option>
              <option>Statistics</option>
              <option>Analytics</option>
            </select>

            <FiChevronDown className="pointer-events-none absolute right-3 top-4 text-slate-500" />
          </div>
        </div>
      </section>

      {/* =========================
          MENTOR DIRECTORY
      ========================= */}
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1422]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 p-5">
          <div>
            <h2 className="text-lg font-semibold">
              Mentor Directory
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredMentors.length} mentors found
            </p>
          </div>

          <FiUsers className="text-xl text-purple-400" />
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0A1120] text-left text-[11px] uppercase tracking-wider text-slate-500">
                <th className="px-4 py-4 font-medium">
                  Mentor
                </th>

                <th className="px-4 py-4 font-medium">
                  Class
                </th>

                <th className="px-4 py-4 font-medium">
                  Mentees
                </th>

                <th className="px-4 py-4 font-medium">
                  Sessions
                </th>

                <th className="px-4 py-4 font-medium">
                  Compliance
                </th>

                <th className="px-4 py-4 font-medium">
                  Status
                </th>

                <th className="px-4 py-4 text-right font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMentors.map((mentor) => (
                <tr
                  key={mentor.id}
                  className="border-b border-slate-800/80 transition hover:bg-slate-800/20"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17233A] text-xs font-bold text-slate-200">
                        {mentor.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {mentor.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {mentor.department}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <FiBookOpen className="text-slate-500" />
                      {mentor.className}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="min-w-[130px]">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="text-slate-300">
                          {mentor.mentees}
                        </span>

                        <span
                          className={getCapacityStyle(
                            mentor.capacity
                          )}
                        >
                          {mentor.capacity}
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                        <div
                          className={`h-1.5 rounded-full ${
                            mentor.capacity === "Full"
                              ? "bg-red-500"
                              : mentor.capacity === "Almost Full"
                              ? "bg-orange-500"
                              : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${(mentor.assigned / 20) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <FiCalendar className="text-slate-500" />
                      {mentor.sessions}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`text-sm font-semibold ${getComplianceStyle(
                        mentor.compliance
                      )}`}
                    >
                      {mentor.compliance}%
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium ${getStatusStyle(
                        mentor.status
                      )}`}
                    >
                      <span className="mr-1.5">●</span>
                      {mentor.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate(
                          `/coordinator/mentors/${mentor.id}`
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-purple-500 hover:text-white"
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

        {/* Mobile cards */}
        <div className="space-y-3 p-4 lg:hidden">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-xl border border-slate-800 bg-[#0A1120] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17233A] text-xs font-bold">
                    {mentor.initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {mentor.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {mentor.department}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-[10px] ${getStatusStyle(
                    mentor.status
                  )}`}
                >
                  {mentor.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500">
                    Class
                  </p>

                  <p className="mt-1 text-slate-300">
                    {mentor.className}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Sessions
                  </p>

                  <p className="mt-1 text-slate-300">
                    {mentor.sessions}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Mentees
                  </p>

                  <p className="mt-1 text-slate-300">
                    {mentor.mentees}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Compliance
                  </p>

                  <p
                    className={`mt-1 font-semibold ${getComplianceStyle(
                      mentor.compliance
                    )}`}
                  >
                    {mentor.compliance}%
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/coordinator/mentors/${mentor.id}`)
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-purple-500 hover:text-white"
              >
                <FiEye />
                View Mentor
              </button>
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            No mentors found.
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-800 p-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-purple-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft />
          </button>

          <button
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
              page === 1
                ? "bg-purple-600 text-white"
                : "border border-slate-800 text-slate-400"
            }`}
          >
            1
          </button>

          <button
            onClick={() => setPage(Math.min(2, page + 1))}
            disabled={page === 2}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-purple-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      {/* =========================
          BOTTOM SECTION
      ========================= */}
      <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Department Overview */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5 sm:p-6">
          <h2 className="text-lg font-semibold">
            Department Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Mentor distribution by department
          </p>

          <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row">
            <div
              className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#3b82f6 0deg 120deg, #8b5cf6 120deg 300deg, #10b981 300deg 360deg)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-[#0D1422]">
                <span className="text-2xl font-bold">
                  6
                </span>

                <span className="text-xs text-slate-500">
                  Mentors
                </span>
              </div>
            </div>

            <div className="w-full space-y-4">
              {departmentData.map((department) => (
                <div
                  key={department.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${department.color}`}
                    />

                    <span className="text-sm text-slate-300">
                      {department.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-white">
                      {department.count}
                    </span>

                    <span className="w-10 text-right text-xs text-slate-500">
                      {department.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5 sm:p-6">
          <h2 className="text-lg font-semibold">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Frequently used coordinator actions
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-[#0A1120] p-4 text-left transition hover:border-purple-500/50 hover:bg-purple-500/5"
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                      action.color === "orange"
                        ? "bg-orange-500/15 text-orange-400"
                        : action.color === "blue"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-purple-500/15 text-purple-400"
                    }`}
                  >
                    <Icon className="text-xl" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      {action.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  <FiChevronRight className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-purple-400" />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;