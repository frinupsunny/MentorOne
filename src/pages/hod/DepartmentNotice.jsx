import { useMemo, useState } from "react";
import {
  FiVolume2,
  FiPlus,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiUsers,
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

function DepartmentNotice() {
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [editingNotice, setEditingNotice] = useState(null);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Mid-Semester Mentoring Review",
      content:
        "All mentors are requested to complete the mid-semester mentoring review for their assigned mentees. Please ensure that academic progress, attendance and individual concerns are properly recorded.",
      audience: "Mentors",
      priority: "High",
      published: "10 Sep 2026",
      expiry: "20 Sep 2026",
      status: "Active",
      author: "Dr. Helen Mathew",
    },
    {
      id: 2,
      title: "Mentee Attendance Monitoring",
      content:
        "Coordinators and mentors are requested to closely monitor mentee attendance and report students who require immediate intervention.",
      audience: "Mentors & Coordinators",
      priority: "High",
      published: "09 Sep 2026",
      expiry: "30 Sep 2026",
      status: "Active",
      author: "Dr. Helen Mathew",
    },
    {
      id: 3,
      title: "Mentoring Diary Submission",
      content:
        "All mentors should ensure that mentoring diary entries are submitted after every mentoring session. Pending entries should be completed at the earliest.",
      audience: "Mentors",
      priority: "Medium",
      published: "08 Sep 2026",
      expiry: "25 Sep 2026",
      status: "Active",
      author: "Dr. Helen Mathew",
    },
    {
      id: 4,
      title: "Department Mentoring Meeting",
      content:
        "A department-level mentoring review meeting will be conducted to discuss mentoring progress, critical issues and student support requirements.",
      audience: "Everyone",
      priority: "Medium",
      published: "05 Sep 2026",
      expiry: "15 Sep 2026",
      status: "Active",
      author: "Dr. Helen Mathew",
    },
    {
      id: 5,
      title: "Semester Orientation Notice",
      content:
        "The department mentoring orientation session for the current semester has been completed. Mentors are requested to follow the updated mentoring guidelines.",
      audience: "Everyone",
      priority: "Low",
      published: "25 Aug 2026",
      expiry: "05 Sep 2026",
      status: "Expired",
      author: "Dr. Helen Mathew",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    audience: "Everyone",
    priority: "Medium",
    expiry: "",
  });

  const stats = useMemo(() => {
    const total = notices.length;
    const active = notices.filter(
      (notice) => notice.status === "Active"
    ).length;
    const high = notices.filter(
      (notice) =>
        notice.priority === "High" && notice.status === "Active"
    ).length;
    const expired = notices.filter(
      (notice) => notice.status === "Expired"
    ).length;

    return {
      total,
      active,
      high,
      expired,
    };
  }, [notices]);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        notice.title.toLowerCase().includes(searchValue) ||
        notice.content.toLowerCase().includes(searchValue) ||
        notice.audience.toLowerCase().includes(searchValue);

      const matchesAudience =
        audienceFilter === "All" ||
        notice.audience === audienceFilter;

      return matchesSearch && matchesAudience;
    });
  }, [notices, search, audienceFilter]);

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      audience: "Everyone",
      priority: "Medium",
      expiry: "",
    });

    setEditingNotice(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);

    setForm({
      title: notice.title,
      content: notice.content,
      audience: notice.audience,
      priority: notice.priority,
      expiry: notice.expiry,
    });

    setShowModal(true);
  };

  const handleFormChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      return;
    }

    if (editingNotice) {
      setNotices((current) =>
        current.map((notice) =>
          notice.id === editingNotice.id
            ? {
                ...notice,
                title: form.title,
                content: form.content,
                audience: form.audience,
                priority: form.priority,
                expiry: form.expiry || notice.expiry,
              }
            : notice
        )
      );
    } else {
      const newNotice = {
        id: Date.now(),
        title: form.title,
        content: form.content,
        audience: form.audience,
        priority: form.priority,
        published: "11 Sep 2026",
        expiry: form.expiry || "30 Sep 2026",
        status: "Active",
        author: "Dr. Helen Mathew",
      };

      setNotices((current) => [newNotice, ...current]);
    }

    setShowModal(false);
    resetForm();
  };

  const deleteNotice = (id) => {
    setNotices((current) =>
      current.filter((notice) => notice.id !== id)
    );

    if (selectedNotice?.id === id) {
      setSelectedNotice(null);
    }
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-500/10 text-red-400 border-red-500/20";
    }

    if (priority === "Medium") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-slate-500/10 text-slate-400 border-slate-700";
  };

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    return "bg-slate-500/10 text-slate-400 border-slate-700";
  };

  return (
    <div className="min-h-full bg-[#080C14] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-purple-400">
            HOD / Department Notice
          </p>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Department Notice
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Publish important department announcements and communicate
                updates to mentors, coordinators and mentees.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:from-violet-400 hover:to-purple-500"
            >
              <FiPlus />
              Create Notice
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FiVolume2 />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.total}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Total Notices
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
              Active Notices
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FiAlertCircle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.high}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              High Priority
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/10 text-slate-400">
              <FiClock />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.expired}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Expired
            </p>
          </div>
        </div>

        {/* Notices */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1220]">
          {/* Toolbar */}
          <div className="border-b border-slate-800 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Published Notices
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage department announcements and communication
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 sm:w-64">
                  <FiSearch className="flex-shrink-0 text-slate-500" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search notices..."
                    className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
                  />
                </div>

                <select
                  value={audienceFilter}
                  onChange={(e) =>
                    setAudienceFilter(e.target.value)
                  }
                  className="h-10 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 text-sm text-slate-300 outline-none"
                >
                  <option>All</option>
                  <option>Everyone</option>
                  <option>Mentors</option>
                  <option>Mentors & Coordinators</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-left">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Notice
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Audience
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Priority
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Published
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredNotices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                          <FiVolume2 />
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-md truncate text-sm font-medium text-white">
                            {notice.title}
                          </p>

                          <p className="mt-1 max-w-md truncate text-[11px] text-slate-500">
                            {notice.content}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                        <FiUsers className="text-slate-500" />
                        {notice.audience}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getPriorityStyle(
                          notice.priority
                        )}`}
                      >
                        {notice.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">
                        {notice.published}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-500">
                        Expires {notice.expiry}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                          notice.status
                        )}`}
                      >
                        {notice.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            setSelectedNotice(notice)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400 transition hover:border-purple-500/40 hover:text-white"
                          title="View"
                        >
                          <FiEye />
                        </button>

                        <button
                          onClick={() =>
                            openEditModal(notice)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400 transition hover:border-purple-500/40 hover:text-white"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          onClick={() =>
                            deleteNotice(notice.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-800 lg:hidden">
            {filteredNotices.map((notice) => (
              <div key={notice.id} className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <FiVolume2 />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-white">
                        {notice.title}
                      </p>

                      <span
                        className={`flex-shrink-0 rounded-full border px-2 py-1 text-[9px] font-medium ${getPriorityStyle(
                          notice.priority
                        )}`}
                      >
                        {notice.priority}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {notice.content}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiUsers className="text-xs" />

                      <span className="text-[10px] uppercase tracking-wider">
                        Audience
                      </span>
                    </div>

                    <p className="truncate text-xs text-slate-300">
                      {notice.audience}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiCalendar className="text-xs" />

                      <span className="text-[10px] uppercase tracking-wider">
                        Published
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      {notice.published}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                      notice.status
                    )}`}
                  >
                    {notice.status}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSelectedNotice(notice)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => openEditModal(notice)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => deleteNotice(notice.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-red-400"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotices.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                <FiVolume2 />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-300">
                No notices found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing your search or audience filter.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0D1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
                  Department Communication
                </p>

                <h3 className="mt-1 text-lg font-semibold text-white">
                  {editingNotice
                    ? "Edit Notice"
                    : "Create Department Notice"}
                </h3>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto p-5 sm:p-6">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Notice Title
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      handleFormChange(
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Enter notice title"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500/60"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Notice Content
                  </label>

                  <textarea
                    value={form.content}
                    onChange={(e) =>
                      handleFormChange(
                        "content",
                        e.target.value
                      )
                    }
                    placeholder="Write the department notice..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500/60"
                    required
                  />
                </div>

                {/* Options */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Audience
                    </label>

                    <select
                      value={form.audience}
                      onChange={(e) =>
                        handleFormChange(
                          "audience",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-300 outline-none focus:border-purple-500/60"
                    >
                      <option>Everyone</option>
                      <option>Mentors</option>
                      <option>Mentors & Coordinators</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Priority
                    </label>

                    <select
                      value={form.priority}
                      onChange={(e) =>
                        handleFormChange(
                          "priority",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-300 outline-none focus:border-purple-500/60"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Expiry
                    </label>

                    <input
                      type="text"
                      value={form.expiry}
                      onChange={(e) =>
                        handleFormChange(
                          "expiry",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 30 Sep 2026"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-300 outline-none placeholder:text-slate-600 focus:border-purple-500/60"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <div className="flex items-center gap-2">
                    <FiVolume2 className="text-purple-400" />

                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                      Notice Preview
                    </p>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-white">
                    {form.title || "Notice title"}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {form.content ||
                      "Your notice content will appear here."}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-[10px] text-slate-400">
                      {form.audience}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] ${getPriorityStyle(
                        form.priority
                      )}`}
                    >
                      {form.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 border-t border-slate-800 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800/60 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:from-violet-400 hover:to-purple-500"
                >
                  {editingNotice
                    ? "Save Changes"
                    : "Publish Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Notice Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0D1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <FiVolume2 />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
                    Department Notice
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {selectedNotice.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${getPriorityStyle(
                    selectedNotice.priority
                  )}`}
                >
                  {selectedNotice.priority} Priority
                </span>

                <span
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${getStatusStyle(
                    selectedNotice.status
                  )}`}
                >
                  {selectedNotice.status}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-[11px] text-slate-400">
                  <FiUsers />
                  {selectedNotice.audience}
                </span>
              </div>

              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5">
                <p className="text-sm leading-7 text-slate-300">
                  {selectedNotice.content}
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Published
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedNotice.published}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Expiry
                  </p>

                  <p className="mt-2 text-sm font-medium text-white">
                    {selectedNotice.expiry}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Published By
                  </p>

                  <p className="mt-2 truncate text-sm font-medium text-white">
                    {selectedNotice.author}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 px-5 py-4 sm:px-6">
              <button
                onClick={() => setSelectedNotice(null)}
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

export default DepartmentNotice;