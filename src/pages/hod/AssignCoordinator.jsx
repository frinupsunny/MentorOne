import { useState } from "react";
import {
  FiUserPlus,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiChevronDown,
  FiShield,
} from "react-icons/fi";

function AssignCoordinator() {
  const [search, setSearch] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentCoordinator, setCurrentCoordinator] = useState({
    name: "Dr. Meena S",
    email: "meena.s@christuniversity.in",
    phone: "+91 98765 43210",
    department: "Data Science",
    assignedDate: "12 August 2026",
    status: "Active",
  });

  const coordinators = [
    {
      id: 1,
      name: "Dr. Meena S",
      email: "meena.s@christuniversity.in",
      phone: "+91 98765 43210",
      department: "Data Science",
      experience: "8 years",
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Anitha Joseph",
      email: "anitha.joseph@christuniversity.in",
      phone: "+91 98765 43112",
      department: "Data Science",
      experience: "7 years",
      status: "Available",
    },
    {
      id: 3,
      name: "Dr. Arun Mathew",
      email: "arun.mathew@christuniversity.in",
      phone: "+91 98765 43987",
      department: "Computer Science",
      experience: "6 years",
      status: "Available",
    },
    {
      id: 4,
      name: "Dr. Sunita Pillai",
      email: "sunita.pillai@christuniversity.in",
      phone: "+91 98765 42567",
      department: "Data Science",
      experience: "10 years",
      status: "Available",
    },
  ];

  const filteredCoordinators = coordinators.filter((coordinator) =>
    `${coordinator.name} ${coordinator.email} ${coordinator.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedCoordinator) return;

    setCurrentCoordinator({
      ...selectedCoordinator,
      assignedDate: "11 September 2026",
    });

    setShowModal(false);
    setSelectedCoordinator(null);
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">

      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-purple-400">
          Head of Department
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Assign Coordinator
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Assign and manage the coordinator responsible for the department mentoring system.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-600/10 transition hover:from-purple-500 hover:to-indigo-500"
          >
            <FiUserPlus />
            Assign Coordinator
          </button>
        </div>
      </div>

      {/* Current Coordinator */}
      <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-purple-500/20">
              MS
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">
                  {currentCoordinator.name}
                </h2>

                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-400">
                  <FiCheckCircle />
                  {currentCoordinator.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Current Department Coordinator
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-4 text-xs font-medium text-slate-300 transition hover:border-purple-500/40 hover:text-white"
          >
            Change Coordinator
            <FiChevronDown />
          </button>

        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-800/70 pt-5 sm:grid-cols-2 lg:grid-cols-4">

          <InfoItem
            icon={FiMail}
            label="Email"
            value={currentCoordinator.email}
          />

          <InfoItem
            icon={FiPhone}
            label="Phone"
            value={currentCoordinator.phone}
          />

          <InfoItem
            icon={FiBriefcase}
            label="Department"
            value={currentCoordinator.department}
          />

          <InfoItem
            icon={FiClock}
            label="Assigned Since"
            value={currentCoordinator.assignedDate}
          />

        </div>
      </div>

      {/* Search + Available Coordinators */}
      <div className="mt-5 rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-base font-semibold text-white">
              Department Coordinators
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Select a faculty member to assign as coordinator.
            </p>
          </div>

          <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 sm:w-64">
            <FiSearch className="flex-shrink-0 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

        </div>

        {/* Coordinator Cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {filteredCoordinators.map((coordinator) => {
            const isCurrent =
              coordinator.email === currentCoordinator.email;

            return (
              <div
                key={coordinator.id}
                className={`rounded-xl border p-4 transition ${
                  isCurrent
                    ? "border-purple-500/40 bg-purple-500/5"
                    : "border-slate-800/70 bg-slate-900/30 hover:border-slate-700"
                }`}
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-semibold text-slate-300">
                      {coordinator.name
                        .replace("Dr. ", "")
                        .split(" ")
                        .map((name) => name[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {coordinator.name}
                      </p>

                      <p className="truncate text-[11px] text-slate-600">
                        {coordinator.department}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold ${
                      coordinator.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >
                    {coordinator.status}
                  </span>

                </div>

                <div className="mt-4 space-y-2 border-t border-slate-800/60 pt-4">

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <FiMail className="text-slate-600" />
                    <span className="truncate">{coordinator.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <FiBriefcase className="text-slate-600" />
                    <span>{coordinator.experience} experience</span>
                  </div>

                </div>

                <button
                  disabled={isCurrent}
                  onClick={() => {
                    setSelectedCoordinator(coordinator);
                    setShowModal(true);
                  }}
                  className={`mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-xs font-medium transition ${
                    isCurrent
                      ? "cursor-not-allowed bg-emerald-500/10 text-emerald-400"
                      : "bg-slate-800 text-slate-300 hover:bg-purple-500/10 hover:text-purple-400"
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <FiCheckCircle />
                      Currently Assigned
                    </>
                  ) : (
                    <>
                      <FiUserPlus />
                      Assign
                    </>
                  )}
                </button>

              </div>
            );
          })}

        </div>

        {filteredCoordinators.length === 0 && (
          <div className="py-12 text-center">
            <FiUser className="mx-auto text-3xl text-slate-700" />

            <p className="mt-3 text-sm font-medium text-slate-400">
              No coordinators found
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Try searching with a different name or department.
            </p>
          </div>
        )}

      </div>

      {/* Assignment Information */}
      <div className="mt-5 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">

        <div className="flex gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
            <FiShield className="text-indigo-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-300">
              Coordinator Responsibility
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              The assigned coordinator manages mentor-mentee allocations,
              monitors mentoring activities, reviews feedback and supports
              the department's mentoring operations.
            </p>
          </div>
        </div>

      </div>

      {/* Assign Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0D1422] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Assign Coordinator
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Select a faculty member for this role.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-5">

              <label className="text-xs font-medium text-slate-400">
                Coordinator
              </label>

              <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
                <select
                  value={selectedCoordinator?.id || ""}
                  onChange={(e) => {
                    const coordinator = coordinators.find(
                      (item) => item.id === Number(e.target.value)
                    );

                    setSelectedCoordinator(coordinator || null);
                  }}
                  className="w-full bg-transparent text-sm text-white outline-none"
                >
                  <option value="" className="bg-[#0D1422]">
                    Select coordinator
                  </option>

                  {coordinators
                    .filter(
                      (coordinator) =>
                        coordinator.email !== currentCoordinator.email
                    )
                    .map((coordinator) => (
                      <option
                        key={coordinator.id}
                        value={coordinator.id}
                        className="bg-[#0D1422]"
                      >
                        {coordinator.name} — {coordinator.department}
                      </option>
                    ))}
                </select>
              </div>

            </div>

            {selectedCoordinator && (
              <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <FiUser />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {selectedCoordinator.name}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {selectedCoordinator.email}
                    </p>
                  </div>
                </div>

              </div>
            )}

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedCoordinator(null);
                }}
                className="h-10 flex-1 rounded-lg border border-slate-700 bg-slate-900 text-xs font-medium text-slate-400 transition hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleAssign}
                disabled={!selectedCoordinator}
                className="h-10 flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-semibold text-white transition hover:from-purple-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm Assignment
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/30 p-3">
      <div className="flex items-center gap-2">
        <Icon className="text-sm text-slate-600" />
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-600">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

export default AssignCoordinator;