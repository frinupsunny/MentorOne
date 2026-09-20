import { useState } from "react";

function GroupMeetings() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const meetings = [
    {
      id: 1,
      title: "Academic Progress Discussion",
      topic: "Review of academic performance and upcoming examinations",
      date: "17 Sep 2026",
      time: "10:00 AM",
      participants: 8,
      location: "Seminar Hall 1",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Career Guidance Session",
      topic: "Career opportunities and internship preparation",
      date: "19 Sep 2026",
      time: "02:00 PM",
      participants: 12,
      location: "Online Meeting",
      status: "Scheduled",
    },
    {
      id: 3,
      title: "Personal Development Meeting",
      topic: "Communication skills and personal development",
      date: "12 Sep 2026",
      time: "11:30 AM",
      participants: 6,
      location: "Room 204",
      status: "Completed",
    },
    {
      id: 4,
      title: "Project Discussion",
      topic: "Discussion about mini project progress",
      date: "22 Sep 2026",
      time: "03:00 PM",
      participants: 10,
      location: "Lab 2",
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Semester Review Meeting",
      topic: "Review of semester activities and student concerns",
      date: "08 Sep 2026",
      time: "10:30 AM",
      participants: 15,
      location: "Conference Hall",
      status: "Completed",
    },
  ];

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(search.toLowerCase()) ||
      meeting.topic.toLowerCase().includes(search.toLowerCase()) ||
      meeting.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || meeting.status === filter;

    return matchesSearch && matchesFilter;
  });

  const upcomingCount = meetings.filter(
    (meeting) =>
      meeting.status === "Upcoming" || meeting.status === "Scheduled"
  ).length;

  const completedCount = meetings.filter(
    (meeting) => meeting.status === "Completed"
  ).length;

  const totalParticipants = meetings.reduce(
    (total, meeting) => total + meeting.participants,
    0
  );

  return (
    <div className="min-h-full bg-[#080C14] p-6 text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm text-slate-400">
            Mentor Workspace
          </p>

          <h1 className="text-3xl font-bold">
            Group Meetings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Organize and manage group mentoring meetings.
          </p>
        </div>

        <button className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]">
          + Create Group Meeting
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Total Meetings
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {meetings.length}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            All group meetings
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Upcoming Meetings
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
            Total Participants
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            {totalParticipants}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Across all meetings
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#27334A] bg-[#101624] p-5 md:flex-row">
        <input
          type="text"
          placeholder="Search meetings by title, topic or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="flex-1 rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
        >
          <option value="All">All Meetings</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Meetings List */}
      <div className="space-y-5">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="rounded-2xl border border-[#27334A] bg-[#101624] p-6 transition hover:border-blue-500/40"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              {/* Meeting Information */}
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                  👥
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {meeting.title}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    {meeting.topic}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>📅 {meeting.date}</span>
                    <span>🕒 {meeting.time}</span>
                    <span>📍 {meeting.location}</span>
                    <span>👥 {meeting.participants} Participants</span>
                  </div>
                </div>
              </div>

              {/* Status and Action */}
              <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    meeting.status === "Completed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : meeting.status === "Scheduled"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {meeting.status}
                </span>

                <button className="rounded-lg border border-[#33415C] px-4 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] px-6 py-12 text-center text-sm text-slate-500">
          No group meetings found.
        </div>
      )}
    </div>
  );
}

export default GroupMeetings;