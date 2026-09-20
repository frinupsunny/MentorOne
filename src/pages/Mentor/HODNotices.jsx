import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiVolume2,
  FiCalendar,
  FiClock,
  FiChevronRight,
  FiInfo,
} from "react-icons/fi";

const API_BASE_URL = "http://localhost:4000";

function HODNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const token = localStorage.getItem("mentorOneToken");

  const formatDate = (value) => {
    if (!value) {
      return "Date not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (value) => {
    if (!value) {
      return "Time not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const fetchNotices = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/api/mentor/hod-notices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const noticeList = Array.isArray(data)
          ? data
          : Array.isArray(data?.notices)
          ? data.notices
          : Array.isArray(data?.entries)
          ? data.entries
          : [];

        setNotices(noticeList);
      } catch (error) {
        console.error(
          "Error loading HOD notices:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("mentorOneToken");
          localStorage.removeItem("mentorOneRole");
          localStorage.removeItem("mentorOneUser");

          alert("Session expired. Please login again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [token]);

  const normalizedNotices = useMemo(() => {
    return notices.map((notice, index) => {
      const dateValue =
        notice?.date ||
        notice?.createdAt ||
        notice?.created_at;

      const timeValue =
        notice?.time ||
        notice?.createdAt ||
        notice?.created_at;

      return {
        ...notice,

        id:
          notice?.id ||
          notice?._id ||
          `notice-${index}`,

        title:
          notice?.title ||
          notice?.subject ||
          "Department Notice",

        description:
          notice?.description ||
          notice?.message ||
          notice?.content ||
          "No notice description available.",

        date: formatDate(dateValue),

        time:
          notice?.time
            ? String(notice.time)
            : notice?.createdAt ||
              notice?.created_at
            ? formatTime(timeValue)
            : "Time not available",

        category:
          notice?.category ||
          "Department",

        priority:
          notice?.priority ||
          "General",

        from:
          notice?.from ||
          notice?.sender ||
          "Head of Department",
      };
    });
  }, [notices]);

  const totalNotices = normalizedNotices.length;

  const recentNotices = normalizedNotices.filter(
    (notice) => {
      if (!notice.date) {
        return false;
      }

      const parsed = new Date(notice.date);

      if (Number.isNaN(parsed.getTime())) {
        return false;
      }

      const today = new Date();

      const difference =
        today.getTime() - parsed.getTime();

      return (
        difference >= 0 &&
        difference <=
          7 * 24 * 60 * 60 * 1000
      );
    }
  ).length;

  const upcomingEvents = normalizedNotices.filter(
    (notice) => {
      if (!notice.date) {
        return false;
      }

      const parsed = new Date(notice.date);

      if (Number.isNaN(parsed.getTime())) {
        return false;
      }

      return parsed >= new Date();
    }
  ).length;

  const openNoticeDetails = (notice) => {
    setSelectedNotice(notice);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          MentorOne / Communication
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          HOD Notices
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          View important announcements and updates from the Head of Department.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FiVolume2 className="text-xl text-blue-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : totalNotices}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Total Notices
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <FiClock className="text-xl text-amber-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : recentNotices}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Recent Notices
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiCalendar className="text-xl text-emerald-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : upcomingEvents}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Upcoming Events
          </p>
        </div>
      </div>

      {/* NOTICE INFORMATION */}
      <div className="mb-8 flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <FiInfo className="mt-1 flex-shrink-0 text-xl text-blue-400" />

        <div>
          <h2 className="font-semibold text-blue-300">
            Department Announcements
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Stay updated with department meetings, academic announcements,
            deadlines, and mentoring-related instructions.
          </p>
        </div>
      </div>

      {/* NOTICES */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Recent Notices
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Announcements shared by the HOD.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] px-6 py-12 text-center text-sm text-slate-500">
            Loading HOD notices...
          </div>
        ) : normalizedNotices.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] px-6 py-12 text-center text-sm text-slate-500">
            No HOD notices have been sent to you yet.
          </div>
        ) : (
          <div className="space-y-4">
            {normalizedNotices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5 transition hover:border-blue-500/40"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                      <FiVolume2 className="text-xl text-white" />
                    </div>

                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {notice.title}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            notice.priority ===
                            "Important"
                              ? "bg-red-500/10 text-red-400"
                              : notice.priority ===
                                "Deadline"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {notice.priority}
                        </span>
                      </div>

                      <p className="max-w-3xl text-sm leading-6 text-slate-400">
                        {notice.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-2">
                          <FiCalendar />
                          {notice.date}
                        </span>

                        <span className="flex items-center gap-2">
                          <FiClock />
                          {notice.time}
                        </span>

                        <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-400">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openNoticeDetails(notice)
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                  >
                    View Notice
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VIEW NOTICE MODAL */}
      {showDetailsModal && selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Notice Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  From {selectedNotice.from}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDetailsModal(false)
                }
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {selectedNotice.title}
                  </h3>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                    {selectedNotice.priority}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Announcement
                </p>

                <div className="mt-2 rounded-xl border border-slate-800 bg-[#0B111D] p-4">
                  <p className="text-sm leading-7 text-slate-300">
                    {selectedNotice.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedNotice.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Time
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedNotice.time}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Category
                </p>

                <span className="mt-2 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {selectedNotice.category}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowDetailsModal(false)
                }
                className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
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

export default HODNotices;