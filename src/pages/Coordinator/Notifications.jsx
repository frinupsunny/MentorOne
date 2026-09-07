import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiBell,
  FiSearch,
  FiCheck,
  FiCheckCircle,
  FiTrash2,
  FiAlertTriangle,
  FiUsers,
  FiCalendar,
  FiArrowRight,
  FiX,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";

function Notifications() {
  const navigate = useNavigate();

  /* =====================================================
     NOTIFICATION DATA
  ===================================================== */

  const initialNotifications = [
    {
      id: 1,
      type: "important",
      title: "HOD Notice: Semester mentoring schedule",
      message:
        "All mentors shall schedule mentoring sessions during regular instruction days. Minimum one session per month; weekly mentoring is recommended.",
      time: "20 minutes ago",
      date: "14 August 2026",
      sender: "Dr. Helen Mathew · HOD",
      category: "HOD Notice",
      read: false,
      action: "View HOD Notice",
      actionPath: "/coordinator/hod-notices",
    },

    {
      id: 2,
      type: "warning",
      title: "Critical mentoring issue requires attention",
      message:
        "An attendance shortage has been reported for a mentee. Please review the issue and take the necessary coordinator action.",
      time: "1 hour ago",
      date: "14 August 2026",
      sender: "Dr. Ramesh Kumar · Mentor",
      category: "Critical Issue",
      read: false,
      action: "Review Issue",
      actionPath: "/coordinator/remarks",
    },

    {
      id: 3,
      type: "assignment",
      title: "New mentee assignment completed",
      message:
        "Rahul Kumar has been assigned to Dr. Meena S successfully.",
      time: "2 hours ago",
      date: "14 August 2026",
      sender: "MentorOne System",
      category: "Assignment",
      read: false,
      action: "Manage Assignments",
      actionPath: "/coordinator/assign-mentees",
    },

    {
      id: 4,
      type: "session",
      title: "Mentoring session completed",
      message:
        "Dr. Ramesh Kumar completed a mentoring session with Jasmine A.",
      time: "3 hours ago",
      date: "14 August 2026",
      sender: "MentorOne System",
      category: "Session",
      read: true,
      action: "View Calendar",
      actionPath: "/coordinator/calendar",
    },

    {
      id: 5,
      type: "warning",
      title: "Mentor approaching capacity",
      message:
        "Dr. Ramesh Kumar currently has 18 mentees assigned out of a maximum capacity of 20.",
      time: "Yesterday",
      date: "13 August 2026",
      sender: "MentorOne System",
      category: "Capacity",
      read: true,
      action: "View Mentors",
      actionPath: "/coordinator/mentors",
    },

    {
      id: 6,
      type: "feedback",
      title: "New mentee feedback received",
      message:
        "New feedback has been submitted by a mentee and is available for coordinator review.",
      time: "Yesterday",
      date: "13 August 2026",
      sender: "MentorOne System",
      category: "Feedback",
      read: true,
      action: "View Feedback",
      actionPath: "/coordinator/feedback",
    },

    {
      id: 7,
      type: "system",
      title: "Monthly mentoring review reminder",
      message:
        "Please review mentor activity, session completion and compliance before the monthly review.",
      time: "2 days ago",
      date: "12 August 2026",
      sender: "MentorOne System",
      category: "Reminder",
      read: true,
      action: "View Reports",
      actionPath: "/coordinator/reports",
    },
  ];

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedNotification, setSelectedNotification] =
    useState(null);

  /* =====================================================
     COUNTS
  ===================================================== */

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const readCount = notifications.filter(
    (notification) => notification.read
  ).length;

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.category.toLowerCase().includes(query) ||
        notification.sender.toLowerCase().includes(query);

      let matchesFilter = true;

      if (filter === "Unread") {
        matchesFilter = !notification.read;
      }

      if (filter === "Read") {
        matchesFilter = notification.read;
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  /* =====================================================
     MARK AS READ
  ===================================================== */

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  /* =====================================================
     MARK ALL AS READ
  ===================================================== */

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );

    if (
      selectedNotification &&
      selectedNotification.id === id
    ) {
      setSelectedNotification(null);
    }
  };

  /* =====================================================
     OPEN NOTIFICATION
  ===================================================== */

  const openNotification = (notification) => {
    markAsRead(notification.id);
    setSelectedNotification({
      ...notification,
      read: true,
    });
  };

  /* =====================================================
     ICON
  ===================================================== */

  const getNotificationIcon = (type) => {
    if (type === "important") {
      return <FiBell />;
    }

    if (type === "warning") {
      return <FiAlertTriangle />;
    }

    if (type === "assignment") {
      return <FiUsers />;
    }

    if (type === "session") {
      return <FiCalendar />;
    }

    if (type === "feedback") {
      return <FiCheckCircle />;
    }

    return <FiBell />;
  };

  /* =====================================================
     ICON STYLE
  ===================================================== */

  const getNotificationIconClass = (type) => {
    if (type === "important") {
      return "bg-indigo-500/10 text-indigo-400";
    }

    if (type === "warning") {
      return "bg-red-500/10 text-red-400";
    }

    if (type === "assignment") {
      return "bg-purple-500/10 text-purple-400";
    }

    if (type === "session") {
      return "bg-emerald-500/10 text-emerald-400";
    }

    if (type === "feedback") {
      return "bg-orange-500/10 text-orange-400";
    }

    return "bg-slate-800 text-slate-400";
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
                Notifications
              </span>

            </div>

            <div className="mt-3 flex items-center gap-3">

              <h1 className="text-2xl font-bold tracking-tight text-white">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-400">
                  {unreadCount} unread
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-slate-400">
              Stay updated with mentoring activities, alerts and important notices.
            </p>

          </div>


          {/* Mark all */}
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0D1422] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              <FiCheckCircle size={16} />
              Mark all as read
            </button>
          )}

        </div>

      </section>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <NotificationSummary
            title="All Notifications"
            value={notifications.length}
            description="Total notifications"
            icon={<FiBell />}
            iconClass="bg-indigo-500/10 text-indigo-400"
          />

          <NotificationSummary
            title="Unread"
            value={unreadCount}
            description="Require your attention"
            icon={<FiAlertTriangle />}
            iconClass="bg-red-500/10 text-red-400"
          />

          <NotificationSummary
            title="Read"
            value={readCount}
            description="Already reviewed"
            icon={<FiCheckCircle />}
            iconClass="bg-emerald-500/10 text-emerald-400"
          />

        </div>

      </section>


      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-xl">

            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-11 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50"
            />

          </div>


          {/* Filters */}
          <div className="flex rounded-xl border border-slate-800 bg-slate-900/40 p-1">

            {["All", "Unread", "Read"].map((item) => (

              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  filter === item
                    ? "bg-indigo-500 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {item}

                {item === "Unread" && unreadCount > 0 && (
                  <span className="ml-1.5">
                    ({unreadCount})
                  </span>
                )}

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NOTIFICATION LIST
      ===================================================== */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1422]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">

          <div>

            <h2 className="font-semibold text-white">
              Notification Center
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredNotifications.length} notification
              {filteredNotifications.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          <FiBell className="text-indigo-400" />

        </div>


        {/* List */}
        {filteredNotifications.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredNotifications.map((notification) => (

              <div
                key={notification.id}
                className={`group p-5 transition hover:bg-slate-900/50 ${
                  !notification.read
                    ? "bg-indigo-500/[0.025]"
                    : ""
                }`}
              >

                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${getNotificationIconClass(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(
                      notification.type
                    )}
                  </div>


                  {/* Content */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3
                            className={`text-sm ${
                              notification.read
                                ? "font-medium text-slate-300"
                                : "font-semibold text-white"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-indigo-400" />
                          )}

                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">

                          <span>
                            {notification.sender}
                          </span>

                          <span>•</span>

                          <span>
                            {notification.time}
                          </span>

                        </div>

                      </div>


                      {/* Category */}
                      <span
                        className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          notification.type ===
                          "important"
                            ? "bg-indigo-500/10 text-indigo-400"
                            : notification.type ===
                              "warning"
                            ? "bg-red-500/10 text-red-400"
                            : notification.type ===
                              "assignment"
                            ? "bg-purple-500/10 text-purple-400"
                            : notification.type ===
                              "session"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {notification.category}
                      </span>

                    </div>


                    {/* Message */}
                    <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-500">
                      {notification.message}
                    </p>


                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">

                      <button
                        onClick={() =>
                          openNotification(
                            notification
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400"
                      >
                        <FiExternalLink size={13} />
                        View
                      </button>


                      {!notification.read && (
                        <button
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/10"
                        >
                          <FiCheck size={13} />
                          Mark as read
                        </button>
                      )}


                      <button
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <FiTrash2 size={13} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
              <FiBell size={22} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No notifications found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Try changing your search or filter to find another notification.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          NOTIFICATION DETAIL MODAL
      ===================================================== */}

      {selectedNotification && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-800 bg-[#0D1422] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${getNotificationIconClass(
                    selectedNotification.type
                  )}`}
                >
                  {getNotificationIcon(
                    selectedNotification.type
                  )}
                </div>

                <div>

                  <p className="text-[11px] font-medium text-indigo-400">
                    {selectedNotification.category}
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Notification Details
                  </h2>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX size={18} />
              </button>

            </div>


            {/* Modal Body */}
            <div className="space-y-5 p-6">

              <div>

                <h3 className="text-base font-semibold text-white">
                  {selectedNotification.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                  <span>
                    {selectedNotification.sender}
                  </span>

                  <span>•</span>

                  <span>
                    {selectedNotification.date}
                  </span>

                </div>

              </div>


              {/* Message */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                <p className="text-sm leading-7 text-slate-400">
                  {selectedNotification.message}
                </p>

              </div>


              {/* Time */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                  <FiClock size={16} />
                </div>

                <div>

                  <p className="text-[11px] text-slate-600">
                    Received
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-300">
                    {selectedNotification.time}
                  </p>

                </div>

              </div>


              {/* Action */}
              {selectedNotification.action && (
                <button
                  onClick={() => {
                    setSelectedNotification(null);
                    navigate(
                      selectedNotification.actionPath
                    );
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  {selectedNotification.action}
                  <FiArrowRight size={16} />
                </button>
              )}

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

function NotificationSummary({
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

export default Notifications;