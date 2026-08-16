import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiFilter,
  FiX,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";

const initialRemarks = [
  {
    id: 1,
    person: "Sanjay K",
    role: "Mentee",
    mentor: "Dr. Vivek",
    category: "Academic",
    priority: "Medium",
    remark:
      "Needs additional guidance with the current semester project.",
    date: "16 Aug 2026",
    status: "Open",
  },
  {
    id: 2,
    person: "Dr. Anitha",
    role: "Mentor",
    mentor: "Dr. Anitha",
    category: "Session",
    priority: "Low",
    remark:
      "Mentoring sessions are being conducted regularly.",
    date: "15 Aug 2026",
    status: "Resolved",
  },
  {
    id: 3,
    person: "Jasmine A",
    role: "Mentee",
    mentor: "Dr. Anitha",
    category: "Attendance",
    priority: "High",
    remark:
      "Mentee has missed two consecutive mentoring sessions.",
    date: "14 Aug 2026",
    status: "Open",
  },
  {
    id: 4,
    person: "Dr. Rajesh R",
    role: "Mentor",
    mentor: "Dr. Rajesh R",
    category: "Performance",
    priority: "Low",
    remark:
      "Good engagement with assigned mentees and timely follow-ups.",
    date: "13 Aug 2026",
    status: "Resolved",
  },
  {
    id: 5,
    person: "Megha S",
    role: "Mentee",
    mentor: "Dr. Sunita",
    category: "Academic",
    priority: "Medium",
    remark:
      "Requires support with academic planning for the upcoming semester.",
    date: "12 Aug 2026",
    status: "Open",
  },
];

function Remarks() {
  const [remarks, setRemarks] = useState(
    initialRemarks
  );

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [selectedRemark, setSelectedRemark] =
    useState(null);

  const [formData, setFormData] = useState({
    person: "",
    role: "Mentee",
    category: "Academic",
    priority: "Medium",
    remark: "",
  });

  const [message, setMessage] = useState("");

  /* =================================
     FILTER REMARKS
  ================================= */

  const filteredRemarks = useMemo(() => {
    return remarks.filter((item) => {
      const searchMatch =
        item.person
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.mentor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.remark
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        item.status === statusFilter;

      const categoryMatch =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        searchMatch &&
        statusMatch &&
        categoryMatch
      );
    });
  }, [
    remarks,
    search,
    statusFilter,
    categoryFilter,
  ]);

  /* =================================
     COUNTS
  ================================= */

  const openCount = remarks.filter(
    (item) => item.status === "Open"
  ).length;

  const resolvedCount = remarks.filter(
    (item) => item.status === "Resolved"
  ).length;

  const highPriorityCount = remarks.filter(
    (item) => item.priority === "High"
  ).length;

  /* =================================
     ADD REMARK
  ================================= */

  const handleAddRemark = (e) => {
    e.preventDefault();

    setMessage("");

    if (
      !formData.person.trim() ||
      !formData.remark.trim()
    ) {
      setMessage(
        "Please enter the person name and remark."
      );
      return;
    }

    const newRemark = {
      id: Date.now(),
      person: formData.person,
      role: formData.role,
      mentor:
        formData.role === "Mentor"
          ? formData.person
          : "Coordinator Review",
      category: formData.category,
      priority: formData.priority,
      remark: formData.remark,
      date: "16 Aug 2026",
      status: "Open",
    };

    setRemarks((current) => [
      newRemark,
      ...current,
    ]);

    setFormData({
      person: "",
      role: "Mentee",
      category: "Academic",
      priority: "Medium",
      remark: "",
    });

    setShowAddForm(false);

    setMessage("Remark added successfully.");
  };

  /* =================================
     RESOLVE REMARK
  ================================= */

  const handleResolve = (id) => {
    setRemarks((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Resolved",
            }
          : item
      )
    );
  };

  /* =================================
     DELETE REMARK
  ================================= */

  const handleDelete = (id) => {
    setRemarks((current) =>
      current.filter((item) => item.id !== id)
    );

    setSelectedRemark(null);
  };

  /* =================================
     RESET FILTERS
  ================================= */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-semibold text-white">
            Remarks
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Record and monitor important observations about mentors and mentees
          </p>

        </div>

        <button
          type="button"
          onClick={() => {
            setShowAddForm(true);
            setMessage("");
          }}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-purple-500"
        >
          <FiPlus />

          Add Remark
        </button>

      </div>

      {/* =================================
          SUCCESS MESSAGE
      ================================= */}

      {message && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400">

          <FiCheckCircle />

          <p className="text-xs">
            {message}
          </p>

        </div>
      )}

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Open */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Open Remarks
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {openCount}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiClock />
            </div>

          </div>

        </div>

        {/* Resolved */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Resolved
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {resolvedCount}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle />
            </div>

          </div>

        </div>

        {/* High Priority */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                High Priority
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {highPriorityCount}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FiAlertCircle />
            </div>

          </div>

        </div>

      </div>

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* TOP BAR */}

        <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-base font-semibold text-white">
                Recent Remarks
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review observations and follow-up actions
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className={`inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                showFilters
                  ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
                  : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >

              <FiFilter />

              Filters

            </button>

          </div>

          {/* SEARCH */}

          <div className="relative">

            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search remarks, mentors or mentees..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500"
            />

          </div>

          {/* FILTERS */}

          {showFilters && (

            <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-800 bg-slate-950/30 p-4 md:grid-cols-3">

              <div>

                <label className="mb-2 block text-[11px] font-medium text-slate-500">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                >

                  <option value="All">
                    All Statuses
                  </option>

                  <option value="Open">
                    Open
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-[11px] font-medium text-slate-500">
                  Category
                </label>

                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                >

                  <option value="All">
                    All Categories
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Attendance">
                    Attendance
                  </option>

                  <option value="Session">
                    Session
                  </option>

                  <option value="Performance">
                    Performance
                  </option>

                </select>

              </div>

              <div className="flex items-end">

                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-700 hover:text-white"
                >

                  <FiX />

                  Clear Filters

                </button>

              </div>

            </div>

          )}

        </div>

        {/* =================================
            REMARK LIST
        ================================= */}

        {filteredRemarks.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredRemarks.map((item) => (

              <div
                key={item.id}
                className="p-5 transition hover:bg-slate-800/20"
              >

                <div className="flex flex-col gap-4">

                  {/* TOP */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-start gap-3">

                      {/* Avatar */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">

                        {item.person
                          .split(" ")
                          .map(
                            (word) => word[0]
                          )
                          .join("")
                          .slice(0, 2)}

                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-medium text-white">
                            {item.person}
                          </h3>

                          <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[9px] text-slate-500">
                            {item.role}
                          </span>

                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          Mentor:{" "}
                          <span className="text-slate-400">
                            {item.mentor}
                          </span>
                        </p>

                      </div>

                    </div>

                    {/* DATE */}

                    <span className="text-[11px] text-slate-600">
                      {item.date}
                    </span>

                  </div>

                  {/* REMARK */}

                  <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                    <div className="flex items-start gap-3">

                      <FiMessageSquare className="mt-0.5 shrink-0 text-slate-600" />

                      <p className="text-sm leading-6 text-slate-300">
                        {item.remark}
                      </p>

                    </div>

                  </div>

                  {/* BOTTOM */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap items-center gap-2">

                      {/* CATEGORY */}

                      <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
                        {item.category}
                      </span>

                      {/* PRIORITY */}

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                          item.priority ===
                          "High"
                            ? "border-red-500/20 bg-red-500/10 text-red-400"
                            : item.priority ===
                              "Medium"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {item.priority} Priority
                      </span>

                      {/* STATUS */}

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                          item.status ===
                          "Open"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRemark(
                            item
                          )
                        }
                        className="rounded-lg border border-slate-800 px-3 py-2 text-[10px] font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                      >
                        View
                      </button>

                      {item.status ===
                        "Open" && (

                        <button
                          type="button"
                          onClick={() =>
                            handleResolve(
                              item.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[10px] font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                        >

                          <FiCheck />

                          Resolve

                        </button>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-500">

              <FiMessageSquare className="text-2xl" />

            </div>

            <h3 className="mt-4 text-sm font-medium text-white">
              No remarks found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Try changing your search or filters, or create a new remark.
            </p>

          </div>

        )}

      </div>

      {/* =================================
          ADD REMARK MODAL
      ================================= */}

      {showAddForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Add Remark
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Record an observation for future follow-up
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddForm(false)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddRemark}
              className="space-y-5 p-5"
            >

              {/* PERSON */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Person Name
                </label>

                <input
                  type="text"
                  value={formData.person}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      person: e.target.value,
                    })
                  }
                  placeholder="Enter mentor or mentee name"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

              {/* ROLE */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Role
                  </label>

                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  >

                    <option value="Mentee">
                      Mentee
                    </option>

                    <option value="Mentor">
                      Mentor
                    </option>

                  </select>

                </div>

                {/* CATEGORY */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Category
                  </label>

                  <select
                    value={
                      formData.category
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  >

                    <option value="Academic">
                      Academic
                    </option>

                    <option value="Attendance">
                      Attendance
                    </option>

                    <option value="Session">
                      Session
                    </option>

                    <option value="Performance">
                      Performance
                    </option>

                  </select>

                </div>

              </div>

              {/* PRIORITY */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Priority
                </label>

                <div className="grid grid-cols-3 gap-2">

                  {[
                    "Low",
                    "Medium",
                    "High",
                  ].map((priority) => (

                    <button
                      key={priority}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          priority,
                        })
                      }
                      className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition ${
                        formData.priority ===
                        priority
                          ? priority ===
                            "High"
                            ? "border-red-500/30 bg-red-500/10 text-red-400"
                            : priority ===
                              "Medium"
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                      }`}
                    >
                      {priority}
                    </button>

                  ))}

                </div>

              </div>

              {/* REMARK */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Remark
                </label>

                <textarea
                  rows="4"
                  value={formData.remark}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      remark: e.target.value,
                    })
                  }
                  placeholder="Write your observation..."
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

              </div>

              {/* FORM ERROR */}

              {message &&
                !message.includes(
                  "successfully"
                ) && (

                  <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400">

                    <FiAlertCircle className="mt-0.5 shrink-0" />

                    <p className="text-xs">
                      {message}
                    </p>

                  </div>

                )}

              {/* BUTTONS */}

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddForm(false)
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-purple-500"
                >

                  <FiPlus />

                  Add Remark

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================
          VIEW REMARK MODAL
      ================================= */}

      {selectedRemark && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Remark Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedRemark.date}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRemark(null)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* CONTENT */}

            <div className="space-y-5 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">

                  {selectedRemark.person
                    .split(" ")
                    .map(
                      (word) => word[0]
                    )
                    .join("")
                    .slice(0, 2)}

                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    {selectedRemark.person}
                  </p>

                  <p className="text-xs text-slate-500">
                    {selectedRemark.role}
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-2">

                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
                  {selectedRemark.category}
                </span>

                <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                  {selectedRemark.priority} Priority
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                    selectedRemark.status ===
                    "Open"
                      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {selectedRemark.status}
                </span>

              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <div className="flex items-start gap-3">

                  <FiMessageSquare className="mt-0.5 shrink-0 text-slate-600" />

                  <p className="text-sm leading-6 text-slate-300">
                    {selectedRemark.remark}
                  </p>

                </div>

              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <p className="text-[11px] text-slate-600">
                  Assigned Mentor
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {selectedRemark.mentor}
                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      selectedRemark.id
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                >

                  <FiTrash2 />

                  Delete

                </button>

                {selectedRemark.status ===
                  "Open" && (

                  <button
                    type="button"
                    onClick={() => {
                      handleResolve(
                        selectedRemark.id
                      );

                      setSelectedRemark(
                        null
                      );
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                  >

                    <FiCheck />

                    Mark Resolved

                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Remarks;