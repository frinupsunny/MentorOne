import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

function Sessions() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [sessions, setSessions] = useState([]);
  const [mentees, setMentees] = useState([]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const [newSession, setNewSession] = useState({
    student: "",
    course: "",
    date: "",
    time: "",
    type: "Academic Discussion",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const getToken = () => {
    return localStorage.getItem("mentorOneToken");
  };

  const handleAuthError = (err) => {
    if (
      err.response?.status === 401 ||
      err.response?.status === 403
    ) {
      localStorage.removeItem("mentorOneToken");
      localStorage.removeItem("mentorOneRole");
      localStorage.removeItem("mentorOneUser");

      navigate("/login");
      return true;
    }

    return false;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getDisplayStatus = (status) => {
    switch (status) {
      case "confirmed":
        return "Scheduled";

      case "pending":
        return "Upcoming";

      case "completed":
        return "Completed";

      case "declined":
        return "Cancelled";

      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    const displayStatus = getDisplayStatus(status);

    switch (displayStatus) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-400";

      case "Cancelled":
        return "bg-red-500/10 text-red-400";

      case "Scheduled":
        return "bg-purple-500/10 text-purple-400";

      default:
        return "bg-blue-500/10 text-blue-400";
    }
  };

  const getSessionType = (session) => {
    if (session.type) return session.type;

    const title = (session.title || "").toLowerCase();

    if (title.includes("career")) {
      return "Career Guidance";
    }

    if (
      title.includes("progress") ||
      title.includes("academic")
    ) {
      return "Academic Discussion";
    }

    if (title.includes("personal")) {
      return "Personal Mentoring";
    }

    return "Progress Review";
  };

  const loadSessions = async () => {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mentor/sessions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessions(response.data);
    } catch (err) {
      console.error("Sessions API error:", err);

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err.response?.data?.error ||
          "Unable to load mentoring sessions."
      );
    }
  };

  const loadMentees = async () => {
    const token = getToken();

    if (!token) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mentor/mentees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMentees(response.data);
    } catch (err) {
      console.error("Mentees API error:", err);

      if (handleAuthError(err)) {
        return;
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      await Promise.all([
        loadSessions(),
        loadMentees(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const filteredSessions = sessions.filter((session) => {
    const displayStatus = getDisplayStatus(session.status);
    const sessionType = getSessionType(session);

    const studentName = (
      session.menteeName || ""
    ).toLowerCase();

    const menteeCourse =
      mentees.find(
        (mentee) => mentee.id === session.menteeId
      )?.programme || "";

    const matchesSearch =
      studentName.includes(search.toLowerCase()) ||
      menteeCourse.toLowerCase().includes(search.toLowerCase()) ||
      sessionType.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || displayStatus === filter;

    return matchesSearch && matchesFilter;
  });

  const upcomingCount = sessions.filter(
    (session) =>
      session.status === "pending" ||
      session.status === "confirmed"
  ).length;

  const completedCount = sessions.filter(
    (session) => session.status === "completed"
  ).length;

  const cancelledCount = sessions.filter(
    (session) => session.status === "declined"
  ).length;

  const handleScheduleSession = async (event) => {
    event.preventDefault();

    setFormError("");

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    const selectedMentee = mentees.find(
      (mentee) =>
        mentee.name.toLowerCase() ===
        newSession.student.trim().toLowerCase()
    );

    if (!selectedMentee) {
      setFormError(
        "Please enter the exact name of one of your assigned mentees."
      );
      return;
    }

    if (
      newSession.course.trim() &&
      selectedMentee.programme.toLowerCase() !==
        newSession.course.trim().toLowerCase()
    ) {
      setFormError(
        "The entered course does not match the selected mentee."
      );
      return;
    }

    setSubmitting(true);

    try {
      const formattedTime = formatTime(newSession.time);

      const response = await axios.post(
        `${API_BASE_URL}/api/mentor/sessions`,
        {
          menteeId: selectedMentee.id,
          date: newSession.date,
          label: `${formatDate(newSession.date)}`,
          time: newSession.time,
          timeLabel: formattedTime,
          duration: "30 minutes",
          mode: "In-person",
          agenda: newSession.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdSession = {
        ...response.data.session,
        type: newSession.type,
      };

      setSessions((current) => [
        createdSession,
        ...current,
      ]);

      setNewSession({
        student: "",
        course: "",
        date: "",
        time: "",
        type: "Academic Discussion",
      });

      setShowScheduleForm(false);
    } catch (err) {
      console.error("Schedule session error:", err);

      if (handleAuthError(err)) {
        return;
      }

      setFormError(
        err.response?.data?.error ||
          "Unable to schedule the session."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-[#080C14] p-6 text-white">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-400">
              Loading sessions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#080C14] p-6 text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm text-slate-400">
            Mentor Workspace
          </p>

          <h1 className="text-3xl font-bold">
            Sessions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your mentoring sessions and appointments.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError("");
            setShowScheduleForm(true);
          }}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
        >
          + Schedule Session
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
          <p className="text-sm text-red-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-xs font-medium text-red-300 hover:text-red-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Upcoming Sessions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            {upcomingCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Scheduled meetings
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Completed Sessions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            {completedCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Successfully completed
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Cancelled Sessions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {cancelledCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Cancelled appointments
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#27334A] bg-[#101624] p-5 md:flex-row">
        <input
          type="text"
          placeholder="Search by student, course or session type..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="flex-1 rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
        >
          <option value="All">All Sessions</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Sessions Table */}
      <div className="overflow-hidden rounded-2xl border border-[#27334A] bg-[#101624]">
        <div className="border-b border-[#27334A] px-6 py-5">
          <h2 className="text-lg font-semibold">
            Mentoring Sessions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredSessions.length} session(s) found
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-[#0B111D] text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">
                  Student
                </th>

                <th className="px-6 py-4">
                  Date & Time
                </th>

                <th className="px-6 py-4">
                  Session Type
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#27334A]">
              {filteredSessions.map((session) => {
                const mentee = mentees.find(
                  (item) => item.id === session.menteeId
                );

                const studentName =
                  session.menteeName ||
                  mentee?.name ||
                  "Mentee";

                const course =
                  mentee?.programme ||
                  "Mentoring";

                const displayStatus =
                  getDisplayStatus(session.status);

                const sessionType =
                  getSessionType(session);

                return (
                  <tr
                    key={session.id}
                    className="transition hover:bg-[#141B2A]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold">
                          {getInitials(studentName)}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {studentName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {course}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-slate-300">
                        {session.label ||
                          formatDate(session.date)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {session.timeLabel ||
                          formatTime(session.time)}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {sessionType}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                          session.status
                        )}`}
                      >
                        {displayStatus}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() =>
                          setSelectedSession({
                            ...session,
                            student: studentName,
                            course,
                            type: sessionType,
                          })
                        }
                        className="rounded-lg border border-[#33415C] px-3 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredSessions.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            No sessions found.
          </div>
        )}
      </div>

      {/* Schedule Session Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[#27334A] bg-[#101624] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Schedule Session
              </h2>

              <button
                onClick={() => {
                  setShowScheduleForm(false);
                  setFormError("");
                }}
                className="text-xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {formError && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                <p className="text-sm text-red-400">
                  {formError}
                </p>
              </div>
            )}

            <form
              onSubmit={handleScheduleSession}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Student name"
                value={newSession.student}
                onChange={(event) =>
                  setNewSession({
                    ...newSession,
                    student: event.target.value,
                  })
                }
                list="mentor-mentees"
                required
                className="w-full rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />

              <datalist id="mentor-mentees">
                {mentees.map((mentee) => (
                  <option
                    key={mentee.id}
                    value={mentee.name}
                  />
                ))}
              </datalist>

              <input
                type="text"
                placeholder="Course"
                value={newSession.course}
                onChange={(event) =>
                  setNewSession({
                    ...newSession,
                    course: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />

              <input
                type="date"
                value={newSession.date}
                onChange={(event) =>
                  setNewSession({
                    ...newSession,
                    date: event.target.value,
                  })
                }
                required
                className="w-full rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
              />

              <input
                type="time"
                value={newSession.time}
                onChange={(event) =>
                  setNewSession({
                    ...newSession,
                    time: event.target.value,
                  })
                }
                required
                className="w-full rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
              />

              <select
                value={newSession.type}
                onChange={(event) =>
                  setNewSession({
                    ...newSession,
                    type: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
              >
                <option>Academic Discussion</option>
                <option>Progress Review</option>
                <option>Career Guidance</option>
                <option>Personal Mentoring</option>
              </select>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowScheduleForm(false);
                    setFormError("");
                  }}
                  className="rounded-lg border border-[#33415C] px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Scheduling..." : "Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#27334A] bg-[#101624] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Session Details
              </h2>

              <button
                onClick={() => setSelectedSession(null)}
                className="text-xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500">
                  Student
                </p>

                <p className="mt-1 font-semibold text-white">
                  {selectedSession.student}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Course
                </p>

                <p className="mt-1 text-slate-300">
                  {selectedSession.course}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Date & Time
                </p>

                <p className="mt-1 text-slate-300">
                  {selectedSession.label ||
                    formatDate(selectedSession.date)}{" "}
                  at{" "}
                  {selectedSession.timeLabel ||
                    formatTime(selectedSession.time)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Session Type
                </p>

                <p className="mt-1 text-slate-300">
                  {selectedSession.type ||
                    getSessionType(selectedSession)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Mode
                </p>

                <p className="mt-1 text-slate-300">
                  {selectedSession.mode ||
                    "In-person"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Duration
                </p>

                <p className="mt-1 text-slate-300">
                  {selectedSession.duration ||
                    "30 minutes"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Status
                </p>

                <p className="mt-1 text-blue-400">
                  {getDisplayStatus(
                    selectedSession.status
                  )}
                </p>
              </div>

              {selectedSession.agenda && (
                <div>
                  <p className="text-slate-500">
                    Agenda
                  </p>

                  <p className="mt-1 text-slate-300">
                    {selectedSession.agenda}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedSession(null)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
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

export default Sessions;