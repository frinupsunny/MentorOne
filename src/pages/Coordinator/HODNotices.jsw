import { useState } from "react";
import {
  FiBell,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
  FiX,
  FiCalendar,
  FiUser,
  FiUsers,
  FiAlertCircle,
} from "react-icons/fi";

function HODNotices() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Semester mentoring schedule",
      message:
        "All mentors shall schedule mentoring sessions during regular instruction days. Minimum one session per month; weekly mentoring is recommended.",
      from: "Dr. Helen Mathew",
      role: "HOD",
      recipients: ["Mentor", "Coordinator", "Mentee Group"],
      date: "Today",
      time: "09:30 AM",
      unread: true,
      priority: "Important",
    },
    {
      id: 2,
      title: "Monthly mentoring review",
      message:
        "Coordinators are requested to review mentoring activities and ensure that pending mentor reports are completed before the monthly review.",
      from: "Dr. Helen Mathew",
      role: "HOD",
      recipients: ["Coordinator"],
      date: "Yesterday",
      time: "03:15 PM",
      unread: true,
      priority: "Normal",
    },
    {
      id: 3,
      title: "Mentoring documentation update",
      message:
        "Please ensure that mentoring records and session remarks are updated regularly for departmental review.",
      from: "Dr. Helen Mathew",
      role: "HOD",
      recipients: ["Mentor", "Coordinator"],
      date: "Aug 28, 2026",
      time: "11:00 AM",
      unread: false,
      priority: "Normal",
    },
  ]);

  const unreadCount = notices.filter((notice) => notice.unread).length;

  const filteredNotices = notices.filter((notice) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && notice.unread);

    const searchText = search.toLowerCase();

    const matchesSearch =
      notice.title.toLowerCase().includes(searchText) ||
      notice.message.toLowerCase().includes(searchText) ||
      notice.from.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id
          ? { ...notice, unread: false }
          : notice
      )
    );
  };

  const openNotice = (notice) => {
    setSelectedNotice(notice);
    markAsRead(notice.id);
  };

  return (
    <div className="min-h-full bg-[#0B1020] text-white p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
        <div>
          <p className="text-sm text-indigo-400 font-medium mb-2">
            Coordinator
          </p>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              HOD Notices
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-400">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-slate-400">
            View important notices and instructions from the Head of
            Department.
          </p>
        </div>

        {/* Notice summary */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-[#111827] px-4 py-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <FiBell />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Total Notices
            </p>

            <p className="text-lg font-bold">
              {notices.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3.5 text-slate-500" />

            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
            />
          </div>

          {/* Filter */}
          <div className="flex rounded-xl border border-slate-700 bg-slate-900/70 p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                filter === "unread"
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 text-[10px]">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-3">
        {filteredNotices.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#111827] py-16 text-center">
            <FiBell className="mx-auto text-3xl text-slate-600 mb-3" />

            <h3 className="font-semibold text-slate-300">
              No notices found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <button
              key={notice.id}
              onClick={() => openNotice(notice)}
              className={`w-full text-left rounded-2xl border p-5 transition-all hover:border-slate-700 ${
                notice.unread
                  ? "border-indigo-500/20 bg-indigo-500/[0.04]"
                  : "border-slate-800 bg-[#111827]"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notice.priority === "Important"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-indigo-500/10 text-indigo-400"
                  }`}
                >
                  {notice.priority === "Important" ? (
                    <FiAlertCircle />
                  ) : (
                    <FiBell />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-white">
                        {notice.title}
                      </h2>

                      {notice.unread && (
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FiClock />
                      {notice.date} · {notice.time}
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-6">
                    {notice.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <FiUser />
                      {notice.from} · {notice.role}
                    </span>

                    <span className="text-slate-700">
                      |
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {notice.recipients.map((recipient) => (
                        <span
                          key={recipient}
                          className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-400"
                        >
                          {recipient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <FiChevronRight className="text-slate-600 mt-2 flex-shrink-0" />
              </div>
            </button>
          ))
        )}
      </div>

      {/* Notice Details Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#111827] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <FiBell />
                </div>

                <div>
                  <p className="text-xs text-indigo-400 font-medium mb-1">
                    HOD Notice
                  </p>

                  <h2 className="text-xl font-bold">
                    {selectedNotice.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotice(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                <p className="text-sm leading-7 text-slate-300">
                  {selectedNotice.message}
                </p>
              </div>

              {/* Sender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div className="rounded-xl border border-slate-800 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <FiUser />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        From
                      </p>

                      <p className="text-sm font-medium mt-1">
                        {selectedNotice.from}
                      </p>

                      <p className="text-xs text-slate-500">
                        {selectedNotice.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <FiCalendar />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Received
                      </p>

                      <p className="text-sm font-medium mt-1">
                        {selectedNotice.date}
                      </p>

                      <p className="text-xs text-slate-500">
                        {selectedNotice.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipients */}
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiUsers className="text-slate-500" />

                  <p className="text-sm font-medium text-slate-300">
                    Intended Recipients
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedNotice.recipients.map((recipient) => (
                    <span
                      key={recipient}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-400"
                    >
                      {recipient}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-slate-800 p-4">
              <button
                onClick={() => setSelectedNotice(null)}
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
              >
                <FiCheckCircle />
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HODNotices;