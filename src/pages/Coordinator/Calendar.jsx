import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiVideo,
} from "react-icons/fi";

const initialSessions = [
  {
    id: 1,
    date: "2026-08-16",
    time: "10:00 AM",
    duration: "45 min",
    mentor: "Dr. Rajesh R",
    mentee: "Jasmine A",
    type: "Academic Guidance",
    status: "Completed",
    mode: "Online",
  },
  {
    id: 2,
    date: "2026-08-16",
    time: "11:30 AM",
    duration: "30 min",
    mentor: "Dr. Anitha",
    mentee: "Frinu P",
    type: "Progress Review",
    status: "Upcoming",
    mode: "Online",
  },
  {
    id: 3,
    date: "2026-08-16",
    time: "02:00 PM",
    duration: "45 min",
    mentor: "Dr. Vivek",
    mentee: "Sanjay K",
    type: "Project Discussion",
    status: "Upcoming",
    mode: "In Person",
  },
  {
    id: 4,
    date: "2026-08-17",
    time: "10:30 AM",
    duration: "30 min",
    mentor: "Dr. Ramesh",
    mentee: "Akhil T",
    type: "Academic Guidance",
    status: "Upcoming",
    mode: "Online",
  },
  {
    id: 5,
    date: "2026-08-18",
    time: "03:00 PM",
    duration: "45 min",
    mentor: "Dr. Sunita",
    mentee: "Megha S",
    type: "Career Guidance",
    status: "Upcoming",
    mode: "Online",
  },
  {
    id: 6,
    date: "2026-08-19",
    time: "11:00 AM",
    duration: "30 min",
    mentor: "Dr. Rajesh R",
    mentee: "Alan Mathew",
    type: "Progress Review",
    status: "Scheduled",
    mode: "In Person",
  },
  {
    id: 7,
    date: "2026-08-20",
    time: "01:30 PM",
    duration: "45 min",
    mentor: "Dr. Anitha",
    mentee: "Sandra Joseph",
    type: "Project Discussion",
    status: "Scheduled",
    mode: "Online",
  },
  {
    id: 8,
    date: "2026-08-21",
    time: "10:00 AM",
    duration: "30 min",
    mentor: "Dr. Vivek",
    mentee: "Arjun P",
    type: "Career Guidance",
    status: "Scheduled",
    mode: "Online",
  },
];

const weekDays = [
  {
    date: "2026-08-16",
    day: "Sun",
    number: "16",
  },
  {
    date: "2026-08-17",
    day: "Mon",
    number: "17",
  },
  {
    date: "2026-08-18",
    day: "Tue",
    number: "18",
  },
  {
    date: "2026-08-19",
    day: "Wed",
    number: "19",
  },
  {
    date: "2026-08-20",
    day: "Thu",
    number: "20",
  },
  {
    date: "2026-08-21",
    day: "Fri",
    number: "21",
  },
  {
    date: "2026-08-22",
    day: "Sat",
    number: "22",
  },
];

function Calendar() {
  const [sessions, setSessions] =
    useState(initialSessions);

  const [selectedDate, setSelectedDate] =
    useState("2026-08-16");

  const [selectedSession, setSelectedSession] =
    useState(null);

  const [viewMode, setViewMode] =
    useState("week");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [message, setMessage] = useState("");

  const todaySessions = sessions.filter(
    (session) =>
      session.date === "2026-08-16"
  );

  const upcomingSessions = sessions.filter(
    (session) =>
      session.status === "Upcoming" ||
      session.status === "Scheduled"
  );

  const completedSessions = sessions.filter(
    (session) =>
      session.status === "Completed"
  );

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const dateMatch =
        session.date === selectedDate;

      const statusMatch =
        statusFilter === "All" ||
        session.status === statusFilter;

      return dateMatch && statusMatch;
    });
  }, [sessions, selectedDate, statusFilter]);

  const markCompleted = (id) => {
    setSessions((current) =>
      current.map((session) =>
        session.id === id
          ? {
              ...session,
              status: "Completed",
            }
          : session
      )
    );

    setSelectedSession(null);
    setMessage(
      "Session marked as completed."
    );
  };

  const cancelSession = (id) => {
    setSessions((current) =>
      current.map((session) =>
        session.id === id
          ? {
              ...session,
              status: "Cancelled",
            }
          : session
      )
    );

    setSelectedSession(null);
    setMessage(
      "Session marked as cancelled."
    );
  };

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    }

    if (status === "Upcoming") {
      return "border-indigo-500/20 bg-indigo-500/10 text-indigo-400";
    }

    if (status === "Scheduled") {
      return "border-purple-500/20 bg-purple-500/10 text-purple-400";
    }

    return "border-red-500/20 bg-red-500/10 text-red-400";
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Calendar
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage and monitor mentoring sessions
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() =>
              setSelectedDate("2026-08-16")
            }
            className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
          >
            Today
          </button>

          <button
            type="button"
            onClick={() =>
              setViewMode(
                viewMode === "week"
                  ? "list"
                  : "week"
              )
            }
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20"
          >
            {viewMode === "week"
              ? "List View"
              : "Week View"}
          </button>

        </div>

      </div>

      {/* =================================
          MESSAGE
      ================================= */}

      {message && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400">

          <FiCheckCircle />

          <p className="text-xs">
            {message}
          </p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="ml-auto"
          >
            <FiX />
          </button>

        </div>
      )}

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          label="Today's Sessions"
          value={todaySessions.length}
          description="Scheduled today"
          icon={<FiCalendar />}
          iconClass="bg-indigo-500/10 text-indigo-400"
        />

        <SummaryCard
          label="Upcoming"
          value={upcomingSessions.length}
          description="Future sessions"
          icon={<FiClock />}
          iconClass="bg-purple-500/10 text-purple-400"
        />

        <SummaryCard
          label="Completed"
          value={completedSessions.length}
          description="Sessions completed"
          icon={<FiCheckCircle />}
          iconClass="bg-emerald-500/10 text-emerald-400"
        />

        <SummaryCard
          label="Total Sessions"
          value={sessions.length}
          description="Current schedule"
          icon={<FiUsers />}
          iconClass="bg-amber-500/10 text-amber-400"
        />

      </div>

      {/* =================================
          CALENDAR
      ================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* CALENDAR HEADER */}

        <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-base font-semibold text-white">
              August 2026
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Select a day to view scheduled sessions
            </p>

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="rounded-lg border border-slate-800 p-2 text-slate-500 transition hover:border-slate-700 hover:text-white"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-800 p-2 text-slate-500 transition hover:border-slate-700 hover:text-white"
            >
              <FiChevronRight />
            </button>

          </div>

        </div>

        {/* WEEK DAYS */}

        {viewMode === "week" && (

          <div className="grid grid-cols-7 border-b border-slate-800">

            {weekDays.map((day) => {

              const daySessions =
                sessions.filter(
                  (session) =>
                    session.date === day.date
                );

              const isSelected =
                selectedDate === day.date;

              return (
                <button
                  key={day.date}
                  type="button"
                  onClick={() =>
                    setSelectedDate(day.date)
                  }
                  className={`min-h-[92px] border-r border-slate-800 p-2 text-center transition last:border-r-0 sm:p-3 ${
                    isSelected
                      ? "bg-indigo-500/10"
                      : "hover:bg-slate-800/30"
                  }`}
                >

                  <p
                    className={`text-[10px] font-medium ${
                      isSelected
                        ? "text-indigo-400"
                        : "text-slate-600"
                    }`}
                  >
                    {day.day}
                  </p>

                  <div
                    className={`mx-auto mt-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : "text-slate-300"
                    }`}
                  >
                    {day.number}
                  </div>

                  {daySessions.length > 0 && (

                    <div className="mt-2 flex justify-center gap-1">

                      {daySessions
                        .slice(0, 3)
                        .map((session) => (

                          <span
                            key={session.id}
                            className={`h-1.5 w-1.5 rounded-full ${
                              session.status ===
                              "Completed"
                                ? "bg-emerald-400"
                                : session.status ===
                                  "Cancelled"
                                ? "bg-red-400"
                                : "bg-indigo-400"
                            }`}
                          />

                        ))}

                    </div>

                  )}

                </button>
              );
            })}

          </div>

        )}

        {/* =================================
            SELECTED DAY HEADER
        ================================= */}

        <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="text-sm font-semibold text-white">
              Sessions for{" "}
              {formatDate(selectedDate)}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {filteredSessions.length} session
              {filteredSessions.length !== 1
                ? "s"
                : ""}{" "}
              scheduled
            </p>

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
          >

            <option value="All">
              All Statuses
            </option>

            <option value="Upcoming">
              Upcoming
            </option>

            <option value="Scheduled">
              Scheduled
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

        </div>

        {/* =================================
            SESSION LIST
        ================================= */}

        {filteredSessions.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredSessions.map((session) => (

              <div
                key={session.id}
                className="p-5 transition hover:bg-slate-800/20"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  {/* TIME */}

                  <div className="flex items-center gap-4">

                    <div className="w-20 shrink-0">

                      <p className="text-sm font-semibold text-white">
                        {session.time}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {session.duration}
                      </p>

                    </div>

                    <div className="h-10 w-px bg-slate-800" />

                    {/* PEOPLE */}

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="text-sm font-medium text-white">
                          {session.mentor}
                        </p>

                        <span className="text-slate-700">
                          →
                        </span>

                        <p className="text-sm font-medium text-slate-300">
                          {session.mentee}
                        </p>

                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2">

                        <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 text-[9px] text-indigo-400">
                          {session.type}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-600">

                          {session.mode ===
                          "Online" ? (
                            <FiVideo />
                          ) : (
                            <FiUsers />
                          )}

                          {session.mode}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-2">

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusClass(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSession(
                          session
                        )
                      }
                      className="rounded-lg border border-slate-800 px-3 py-2 text-[10px] font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                    >
                      View
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="px-5 py-14 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-600">

              <FiCalendar className="text-2xl" />

            </div>

            <h3 className="mt-4 text-sm font-medium text-white">
              No sessions scheduled
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              There are no sessions matching the selected filters.
            </p>

          </div>

        )}

      </div>

      {/* =================================
          SESSION DETAILS MODAL
      ================================= */}

      {selectedSession && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Session Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Mentoring session information
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedSession(
                    null
                  )
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* CONTENT */}

            <div className="space-y-5 p-5">

              {/* DATE/TIME */}

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <FiCalendar />
                  </div>

                  <div>

                    <p className="text-sm font-medium text-white">
                      {formatDate(
                        selectedSession.date
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {selectedSession.time} ·{" "}
                      {selectedSession.duration}
                    </p>

                  </div>

                </div>

              </div>

              {/* PEOPLE */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                  <p className="text-[10px] text-slate-600">
                    Mentor
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {selectedSession.mentor}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                  <p className="text-[10px] text-slate-600">
                    Mentee
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {selectedSession.mentee}
                  </p>

                </div>

              </div>

              {/* TYPE + MODE */}

              <div className="flex flex-wrap gap-2">

                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
                  {selectedSession.type}
                </span>

                <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                  {selectedSession.mode}
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusClass(
                    selectedSession.status
                  )}`}
                >
                  {selectedSession.status}
                </span>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedSession(
                      null
                    )
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Close
                </button>

                {(selectedSession.status ===
                  "Upcoming" ||
                  selectedSession.status ===
                    "Scheduled") && (

                  <>
                    <button
                      type="button"
                      onClick={() =>
                        cancelSession(
                          selectedSession.id
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                    >
                      <FiAlertCircle />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        markCompleted(
                          selectedSession.id
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                    >
                      <FiCheckCircle />
                      Mark Completed
                    </button>
                  </>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =================================
   SUMMARY CARD
================================= */

function SummaryCard({
  label,
  value,
  description,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-600">
            {description}
          </p>

        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =================================
   FORMAT DATE
================================= */

function formatDate(dateString) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default Calendar;