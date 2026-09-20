import { useState } from "react";

function Sessions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [sessions, setSessions] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      course: "MSc Data Science",
      date: "15 Sep 2026",
      time: "10:30 AM",
      type: "Academic Discussion",
      status: "Upcoming",
    },
    {
      id: 2,
      student: "Ananya Joseph",
      course: "BCA",
      date: "16 Sep 2026",
      time: "11:00 AM",
      type: "Progress Review",
      status: "Upcoming",
    },
    {
      id: 3,
      student: "Arjun Kumar",
      course: "MCA",
      date: "18 Sep 2026",
      time: "02:00 PM",
      type: "Career Guidance",
      status: "Scheduled",
    },
    {
      id: 4,
      student: "Sneha Thomas",
      course: "MSc Data Science",
      date: "10 Sep 2026",
      time: "03:30 PM",
      type: "Academic Discussion",
      status: "Completed",
    },
    {
      id: 5,
      student: "Vishal Raj",
      course: "BBA",
      date: "08 Sep 2026",
      time: "12:00 PM",
      type: "Personal Mentoring",
      status: "Completed",
    },
    {
      id: 6,
      student: "Megha Paul",
      course: "BCA",
      date: "20 Sep 2026",
      time: "01:00 PM",
      type: "Progress Review",
      status: "Cancelled",
    },
  ]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const [newSession, setNewSession] = useState({
    student: "",
    course: "",
    date: "",
    time: "",
    type: "Academic Discussion",
    status: "Upcoming",
  });

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.student.toLowerCase().includes(search.toLowerCase()) ||
      session.course.toLowerCase().includes(search.toLowerCase()) ||
      session.type.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || session.status === filter;

    return matchesSearch && matchesFilter;
  });

  const upcomingCount = sessions.filter(
    (session) =>
      session.status === "Upcoming" || session.status === "Scheduled"
  ).length;

  const completedCount = sessions.filter(
    (session) => session.status === "Completed"
  ).length;

  const cancelledCount = sessions.filter(
    (session) => session.status === "Cancelled"
  ).length;

  const handleScheduleSession = (event) => {
    event.preventDefault();

    const formattedDate = new Date(
      `${newSession.date}T00:00:00`
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = new Date(
      `1970-01-01T${newSession.time}`
    ).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const sessionToAdd = {
      id: sessions.length + 1,
      student: newSession.student,
      course: newSession.course,
      date: formattedDate,
      time: formattedTime,
      type: newSession.type,
      status: newSession.status,
    };

    setSessions([...sessions, sessionToAdd]);

    setNewSession({
      student: "",
      course: "",
      date: "",
      time: "",
      type: "Academic Discussion",
      status: "Upcoming",
    });

    setShowScheduleForm(false);
  };

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
          onClick={() => setShowScheduleForm(true)}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
        >
          + Schedule Session
        </button>
      </div>

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

            <tbody className="divide-y divide-slate-800">
              {filteredSessions.map((session) => (
                <tr
                  key={session.id}
                  className="transition hover:bg-[#141B2A]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold">
                        {session.student
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {session.student}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {session.course}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-slate-300">
                      {session.date}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {session.time}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-300">
                    {session.type}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        session.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : session.status === "Cancelled"
                          ? "bg-red-500/10 text-red-400"
                          : session.status === "Scheduled"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="rounded-lg border border-[#33415C] px-3 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
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
                onClick={() => setShowScheduleForm(false)}
                className="text-xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

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
                required
                className="w-full rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />

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
                required
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
                  onClick={() => setShowScheduleForm(false)}
                  className="rounded-lg border border-[#33415C] px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Schedule
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
                  {selectedSession.date} at{" "}
                  {selectedSession.time}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Session Type
                </p>

                <p className="mt-1 text-slate-300">
                  {selectedSession.type}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Status
                </p>

                <p className="mt-1 text-blue-400">
                  {selectedSession.status}
                </p>
              </div>
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