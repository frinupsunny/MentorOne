import { useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiAlertTriangle,
  FiUserPlus,
  FiCalendar,
  FiMessageSquare,
  FiFileText,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";

const initialNotifications = [
  {
    id: 1,
    type: "connection",
    title: "New mentor–mentee connection request",
    message:
      "Sanjay K has requested to connect with Dr. Vivek.",
    time: "10 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "alert",
    title: "Non-compliant mentor–mentee pair",
    message:
      "The pair of Dr. Anitha and Jasmine A has missed the required mentoring activity.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "session",
    title: "Session requires attention",
    message:
      "A mentoring session scheduled for today has not been confirmed.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "assignment",
    title: "New mentee assignment",
    message:
      "Megha S has been assigned to Dr. Sunita.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "feedback",
    title: "New feedback submitted",
    message:
      "A mentee has submitted feedback after a recent mentoring session.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    type: "document",
    title: "New document uploaded",
    message:
      "A mentor has uploaded a document for coordinator review.",
    time: "2 days ago",
    unread: false,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = notifications.filter(
    (notification) => {
      if (filter === "unread") {
        return notification.unread;
      }

      return true;
    }
  );

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "connection":
        return (
          <FiUserPlus className="text-indigo-400" />
        );

      case "alert":
        return (
          <FiAlertTriangle className="text-amber-400" />
        );

      case "session":
        return (
          <FiCalendar className="text-purple-400" />
        );

      case "assignment":
        return (
          <FiCheckCircle className="text-emerald-400" />
        );

      case "feedback":
        return (
          <FiMessageSquare className="text-blue-400" />
        );

      case "document":
        return (
          <FiFileText className="text-teal-400" />
        );

      default:
        return (
          <FiBell className="text-slate-400" />
        );
    }
  };

  const getNotificationBackground = (type) => {
    switch (type) {
      case "connection":
        return "bg-indigo-500/10";

      case "alert":
        return "bg-amber-500/10";

      case "session":
        return "bg-purple-500/10";

      case "assignment":
        return "bg-emerald-500/10";

      case "feedback":
        return "bg-blue-500/10";

      case "document":
        return "bg-teal-500/10";

      default:
        return "bg-slate-800/50";
    }
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-semibold text-white">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold text-red-400">
                {unreadCount} Unread
              </span>
            )}

          </div>

          <p className="mt-1 text-sm text-slate-400">
            Stay updated with important coordinator activities
          </p>

        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
          >
            <FiCheck />

            Mark all as read
          </button>
        )}

      </div>

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Total Notifications
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {notifications.length}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiBell />
            </div>

          </div>

        </div>

        {/* Unread */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Unread
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {unreadCount}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FiAlertTriangle />
            </div>

          </div>

        </div>

        {/* Read */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-slate-500">
                Read
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {notifications.length -
                  unreadCount}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle />
            </div>

          </div>

        </div>

      </div>

      {/* =================================
          NOTIFICATION LIST
      ================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* List Header */}

        <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-base font-semibold text-white">
              Recent Notifications
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Important updates from the mentoring system
            </p>

          </div>

          {/* Filter */}

          <div className="flex rounded-lg border border-slate-800 bg-slate-950/50 p-1">

            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition ${
                filter === "all"
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium transition ${
                filter === "unread"
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              Unread
            </button>

          </div>

        </div>

        {/* Notifications */}

        {filteredNotifications.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredNotifications.map(
              (notification) => (

                <div
                  key={notification.id}
                  className={`group flex gap-4 p-5 transition hover:bg-slate-800/30 ${
                    notification.unread
                      ? "bg-indigo-500/[0.025]"
                      : ""
                  }`}
                >

                  {/* Icon */}

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getNotificationBackground(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(
                      notification.type
                    )}
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

                      <div className="flex items-center gap-2">

                        <h3 className="text-sm font-medium text-white">
                          {notification.title}
                        </h3>

                        {notification.unread && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                        )}

                      </div>

                      <span className="shrink-0 text-[11px] text-slate-600">
                        {notification.time}
                      </span>

                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {notification.message}
                    </p>

                    {/* Actions */}

                    <div className="mt-3 flex flex-wrap items-center gap-2">

                      {notification.unread && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 px-2.5 py-1.5 text-[10px] font-medium text-slate-400 transition hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400"
                        >
                          <FiCheck />

                          Mark as read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removeNotification(
                            notification.id
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-[10px] font-medium text-slate-600 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <FiTrash2 />

                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          /* Empty State */

          <div className="px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">

              <FiCheckCircle className="text-2xl" />

            </div>

            <h3 className="mt-4 text-sm font-medium text-white">
              You're all caught up
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              There are no notifications matching your current filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Notifications;