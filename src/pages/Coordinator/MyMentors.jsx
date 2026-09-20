import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiUsers,
  FiCheckCircle,
  FiAlertTriangle,
  FiActivity,
  FiBookOpen,
  FiCalendar,
  FiEye,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiX,
  FiUser,
} from "react-icons/fi";

function MyMentors() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState(null);

  /* =====================================================
     MENTOR DATA
  ===================================================== */

  const mentors = [
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      initials: "RK",
      department: "Computer Science",
      className: "MSc Data Science - Sem 3",
      email: "ramesh.kumar@christuniversity.in",
      phone: "+91 98765 43210",
      mentees: 18,
      capacity: 20,
      sessions: 8,
      compliance: 94,
      status: "Active",
      lastSession: "13 August 2026",
    },

    {
      id: 2,
      name: "Dr. Meena S",
      initials: "MS",
      department: "Computer Science",
      className: "MSc Data Science - Sem 1",
      email: "meena.s@christuniversity.in",
      phone: "+91 98765 12345",
      mentees: 15,
      capacity: 20,
      sessions: 7,
      compliance: 91,
      status: "Active",
      lastSession: "12 August 2026",
    },

    {
      id: 3,
      name: "Dr. Anitha Joseph",
      initials: "AJ",
      department: "Computer Science",
      className: "B.Tech CSE - Sem 2",
      email: "anitha.joseph@christuniversity.in",
      phone: "+91 98456 78123",
      mentees: 10,
      capacity: 20,
      sessions: 6,
      compliance: 88,
      status: "Active",
      lastSession: "11 August 2026",
    },

    {
      id: 4,
      name: "Dr. Arun Mathew",
      initials: "AM",
      department: "Computer Science",
      className: "B.Tech CSE - Sem 4",
      email: "arun.mathew@christuniversity.in",
      phone: "+91 98234 56781",
      mentees: 8,
      capacity: 20,
      sessions: 5,
      compliance: 85,
      status: "Active",
      lastSession: "10 August 2026",
    },

    {
      id: 5,
      name: "Dr. Priya Nair",
      initials: "PN",
      department: "Data Science",
      className: "MSc Data Science - Sem 3",
      email: "priya.nair@christuniversity.in",
      phone: "+91 98123 45678",
      mentees: 20,
      capacity: 20,
      sessions: 7,
      compliance: 79,
      status: "At Capacity",
      lastSession: "08 August 2026",
    },

    {
      id: 6,
      name: "Dr. Vivek Thomas",
      initials: "VT",
      department: "Computer Science",
      className: "BCA - Sem 3",
      email: "vivek.thomas@christuniversity.in",
      phone: "+91 98989 12345",
      mentees: 6,
      capacity: 20,
      sessions: 4,
      compliance: 82,
      status: "Active",
      lastSession: "07 August 2026",
    },
  ];

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const departments = [
    "All",
    ...new Set(mentors.map((mentor) => mentor.department)),
  ];

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        mentor.name.toLowerCase().includes(query) ||
        mentor.department.toLowerCase().includes(query) ||
        mentor.className.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || mentor.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        mentor.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [search, statusFilter, departmentFilter]);

  /* =====================================================
     SUMMARY DATA
  ===================================================== */

  const totalMentors = mentors.length;

  const activeMentors = mentors.filter(
    (mentor) => mentor.status === "Active"
  ).length;

  const atCapacity = mentors.filter(
    (mentor) => mentor.mentees >= mentor.capacity
  ).length;

  const availableSlots = mentors.reduce(
    (total, mentor) => total + (mentor.capacity - mentor.mentees),
    0
  );

  /* =====================================================
     HELPERS
  ===================================================== */

  const getCapacityPercentage = (mentor) => {
    return Math.round((mentor.mentees / mentor.capacity) * 100);
  };

  const getCapacityColor = (mentor) => {
    const percentage = getCapacityPercentage(mentor);

    if (percentage >= 100) {
      return "bg-red-500";
    }

    if (percentage >= 85) {
      return "bg-orange-500";
    }

    return "bg-emerald-500";
  };

  const getCapacityText = (mentor) => {
    const percentage = getCapacityPercentage(mentor);

    if (percentage >= 100) {
      return "Full";
    }

    if (percentage >= 85) {
      return "Almost Full";
    }

    return "Available";
  };

  const getCapacityTextColor = (mentor) => {
    const percentage = getCapacityPercentage(mentor);

    if (percentage >= 100) {
      return "text-red-400";
    }

    if (percentage >= 85) {
      return "text-orange-400";
    }

    return "text-emerald-400";
  };

  const getComplianceColor = (value) => {
    if (value >= 90) {
      return "text-emerald-400";
    }

    if (value >= 80) {
      return "text-orange-400";
    }

    return "text-red-400";
  };

  return (
    <div className="min-h-full bg-[#080C14] p-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="mb-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Coordinator</span>

              <FiArrowRight size={13} />

              <span className="text-slate-300">
                My Mentors
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
              My Mentors
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              View mentor assignments, capacity, mentoring activity and compliance.
            </p>

          </div>

          <button
            onClick={() => navigate("/coordinator/assign-mentees")}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            <FiUsers size={17} />
            Assign Mentees
          </button>

        </div>

      </section>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Mentors */}
          <SummaryCard
            title="Total Mentors"
            value={totalMentors}
            description="Mentors under coordination"
            icon={<FiUsers />}
            iconClass="bg-blue-500/10 text-blue-400"
          />

          {/* Active Mentors */}
          <SummaryCard
            title="Active Mentors"
            value={activeMentors}
            description="Currently active"
            icon={<FiCheckCircle />}
            iconClass="bg-emerald-500/10 text-emerald-400"
          />

          {/* At Capacity */}
          <SummaryCard
            title="At Capacity"
            value={atCapacity}
            description="20 mentees assigned"
            icon={<FiAlertTriangle />}
            iconClass="bg-orange-500/10 text-orange-400"
          />

          {/* Available Slots */}
          <SummaryCard
            title="Available Slots"
            value={availableSlots}
            description="Mentee slots available"
            icon={<FiActivity />}
            iconClass="bg-purple-500/10 text-purple-400"
          />

        </div>

      </section>


      {/* =====================================================
          SEARCH + FILTERS
      ===================================================== */}

      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-xl">

            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentor, department or class..."
              className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-11 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-slate-900"
            />

          </div>


          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="At Capacity">
                At Capacity
              </option>
            </select>


            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="h-11 rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
            >
              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                >
                  {department === "All"
                    ? "All Departments"
                    : department}
                </option>
              ))}
            </select>

          </div>

        </div>

      </section>


      {/* =====================================================
          MENTOR DIRECTORY
      ===================================================== */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1422]">

        {/* Directory Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">

          <div>

            <h2 className="font-semibold text-white">
              Mentor Directory
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredMentors.length} mentor
              {filteredMentors.length !== 1 ? "s" : ""} found
            </p>

          </div>

          <FiUsers className="text-indigo-400" />

        </div>


        {/* =====================================================
            DESKTOP TABLE
        ===================================================== */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-800 bg-slate-900/40">

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Mentor
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Mentees
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Sessions
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Compliance
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredMentors.map((mentor) => {

                const percentage =
                  getCapacityPercentage(mentor);

                return (
                  <tr
                    key={mentor.id}
                    className="border-b border-slate-800 transition hover:bg-slate-900/50"
                  >

                    {/* Mentor */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
                          {mentor.initials}
                        </div>

                        <div className="min-w-0">

                          <p className="text-sm font-semibold text-white">
                            {mentor.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {mentor.department}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Class */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <FiBookOpen
                          size={15}
                          className="text-slate-600"
                        />

                        <span className="whitespace-nowrap text-sm text-slate-400">
                          {mentor.className}
                        </span>

                      </div>

                    </td>


                    {/* Mentees */}
                    <td className="px-6 py-5">

                      <div className="w-40">

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-xs font-medium text-slate-300">
                            {mentor.mentees} / {mentor.capacity}
                          </span>

                          <span
                            className={`text-[11px] font-medium ${getCapacityTextColor(
                              mentor
                            )}`}
                          >
                            {getCapacityText(mentor)}
                          </span>

                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                          <div
                            className={`h-full rounded-full ${getCapacityColor(
                              mentor
                            )}`}
                            style={{
                              width: `${Math.min(
                                percentage,
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>


                    {/* Sessions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 whitespace-nowrap">

                        <FiCalendar
                          size={14}
                          className="text-slate-600"
                        />

                        <span className="text-sm text-slate-400">
                          {mentor.sessions} this month
                        </span>

                      </div>

                    </td>


                    {/* Compliance */}
                    <td className="px-6 py-5">

                      <span
                        className={`text-sm font-semibold ${getComplianceColor(
                          mentor.compliance
                        )}`}
                      >
                        {mentor.compliance}%
                      </span>

                    </td>


                    {/* Status */}
                    <td className="px-6 py-5">

                      <StatusBadge
                        status={mentor.status}
                      />

                    </td>


                    {/* Action */}
                    <td className="px-6 py-5 text-right">

                      <button
                        onClick={() =>
                          setSelectedMentor(mentor)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400"
                      >
                        <FiEye size={14} />
                        View
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>


        {/* =====================================================
            MOBILE CARDS
        ===================================================== */}

        <div className="grid gap-3 p-4 lg:hidden">

          {filteredMentors.map((mentor) => {

            const percentage =
              getCapacityPercentage(mentor);

            return (
              <div
                key={mentor.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-white">
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

                  <StatusBadge
                    status={mentor.status}
                  />

                </div>


                <div className="mt-4 flex items-center gap-2">

                  <FiBookOpen
                    size={14}
                    className="text-slate-600"
                  />

                  <p className="text-xs text-slate-400">
                    {mentor.className}
                  </p>

                </div>


                <div className="mt-4">

                  <div className="mb-2 flex justify-between">

                    <span className="text-xs text-slate-500">
                      Mentee Capacity
                    </span>

                    <span className="text-xs font-semibold text-slate-300">
                      {mentor.mentees}/{mentor.capacity}
                    </span>

                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                    <div
                      className={`h-full rounded-full ${getCapacityColor(
                        mentor
                      )}`}
                      style={{
                        width: `${Math.min(
                          percentage,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>


                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-lg bg-slate-900 p-3">

                    <p className="text-[11px] text-slate-500">
                      Sessions
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      {mentor.sessions}
                    </p>

                  </div>

                  <div className="rounded-lg bg-slate-900 p-3">

                    <p className="text-[11px] text-slate-500">
                      Compliance
                    </p>

                    <p
                      className={`mt-1 text-sm font-semibold ${getComplianceColor(
                        mentor.compliance
                      )}`}
                    >
                      {mentor.compliance}%
                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    setSelectedMentor(mentor)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-800 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  <FiEye size={14} />
                  View Mentor
                </button>

              </div>
            );
          })}

        </div>


        {/* Empty */}
        {filteredMentors.length === 0 && (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900">
              <FiSearch
                size={20}
                className="text-slate-600"
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No mentors found
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or filters.
            </p>

          </div>
        )}

      </section>


      {/* =====================================================
          MENTOR DETAILS MODAL
      ===================================================== */}

      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-[#0D1422] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-bold text-indigo-400">
                  {selectedMentor.initials}
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    {selectedMentor.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedMentor.department}
                  </p>

                </div>

              </div>


              <button
                onClick={() => setSelectedMentor(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX size={18} />
              </button>

            </div>


            {/* Modal Content */}
            <div className="space-y-6 p-6">

              {/* Contact */}
              <div>

                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contact Information
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">

                  <ContactInfo
                    icon={<FiMail />}
                    label="Email"
                    value={selectedMentor.email}
                  />

                  <ContactInfo
                    icon={<FiPhone />}
                    label="Phone"
                    value={selectedMentor.phone}
                  />

                </div>

              </div>


              {/* Assignment */}
              <div>

                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Current Assignment
                </h3>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <FiBookOpen size={17} />
                    </div>

                    <div>

                      <p className="text-[11px] text-slate-500">
                        Assigned Class
                      </p>

                      <p className="mt-1 text-sm font-medium text-white">
                        {selectedMentor.className}
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* Statistics */}
              <div>

                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Mentoring Statistics
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  <DetailStat
                    label="Mentees"
                    value={`${selectedMentor.mentees}/${selectedMentor.capacity}`}
                  />

                  <DetailStat
                    label="Sessions"
                    value={selectedMentor.sessions}
                  />

                  <DetailStat
                    label="Compliance"
                    value={`${selectedMentor.compliance}%`}
                  />

                  <DetailStat
                    label="Status"
                    value={selectedMentor.status}
                  />

                </div>

              </div>


              {/* Capacity */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <h3 className="text-sm font-semibold text-white">
                    Mentee Capacity
                  </h3>

                  <span className="text-xs text-slate-400">
                    {selectedMentor.mentees} /{" "}
                    {selectedMentor.capacity}
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className={`h-full rounded-full ${getCapacityColor(
                      selectedMentor
                    )}`}
                    style={{
                      width: `${Math.min(
                        getCapacityPercentage(
                          selectedMentor
                        ),
                        100
                      )}%`,
                    }}
                  />

                </div>

                <p className="mt-2 text-xs text-slate-500">

                  {selectedMentor.mentees >=
                  selectedMentor.capacity
                    ? "This mentor has reached the current mentee capacity."
                    : `${
                        selectedMentor.capacity -
                        selectedMentor.mentees
                      } mentee slots are currently available.`}

                </p>

              </div>


              {/* Last Session */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <FiCalendar size={17} />
                  </div>

                  <div>

                    <p className="text-[11px] text-slate-500">
                      Last Mentoring Session
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {selectedMentor.lastSession}
                    </p>

                  </div>

                </div>

              </div>


              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row">

                <button
                  onClick={() => {
                    setSelectedMentor(null);
                    navigate("/coordinator/assign-mentees");
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  <FiUsers size={16} />
                  Manage Mentees
                </button>

                <button
                  onClick={() => setSelectedMentor(null)}
                  className="flex-1 rounded-xl border border-slate-800 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  description,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {description}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const isCapacity = status === "At Capacity";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isCapacity
          ? "bg-orange-500/10 text-orange-400"
          : "bg-emerald-500/10 text-emerald-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isCapacity
            ? "bg-orange-400"
            : "bg-emerald-400"
        }`}
      />

      {status}
    </span>
  );
}


/* =========================================================
   CONTACT INFO
========================================================= */

function ContactInfo({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">

      <div className="flex items-center gap-3">

        <div className="text-slate-500">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="text-[11px] text-slate-500">
            {label}
          </p>

          <p className="mt-1 truncate text-xs font-medium text-slate-300">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   DETAIL STAT
========================================================= */

function DetailStat({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-900/60 p-3">

      <p className="text-[10px] text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>

    </div>
  );
}

export default MyMentors;