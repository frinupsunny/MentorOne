import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

function GroupMeetings() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [meetings, setMeetings] = useState([
    {
      id: "demo-1",
      title: "Academic Progress Discussion",
      topic: "Review of academic performance and upcoming examinations",
      date: "17 Sep 2026",
      time: "10:00 AM",
      participants: 8,
      location: "Seminar Hall 1",
      status: "Upcoming",
    },
    {
      id: "demo-2",
      title: "Career Guidance Session",
      topic: "Career opportunities and internship preparation",
      date: "19 Sep 2026",
      time: "02:00 PM",
      participants: 12,
      location: "Online Meeting",
      status: "Scheduled",
    },
    {
      id: "demo-3",
      title: "Personal Development Meeting",
      topic: "Communication skills and personal development",
      date: "12 Sep 2026",
      time: "11:30 AM",
      participants: 6,
      location: "Room 204",
      status: "Completed",
    },
    {
      id: "demo-4",
      title: "Project Discussion",
      topic: "Discussion about mini project progress",
      date: "22 Sep 2026",
      time: "03:00 PM",
      participants: 10,
      location: "Lab 2",
      status: "Upcoming",
    },
    {
      id: "demo-5",
      title: "Semester Review Meeting",
      topic: "Review of semester activities and student concerns",
      date: "08 Sep 2026",
      time: "10:30 AM",
      participants: 15,
      location: "Conference Hall",
      status: "Completed",
    },
  ]);

  const [mentees, setMentees] = useState([]);
  const [loadingMentees, setLoadingMentees] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const [form, setForm] = useState({
    title: "",
    topic: "",
    date: "",
    time: "",
    mode: "Online",
    duration: "60",
    menteeIds: [],
  });

  const token = localStorage.getItem("mentorOneToken");

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        if (!token) {
          setLoadingMentees(false);
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/mentor/mentees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMentees(response.data?.mentees || []);
      } catch (error) {
        console.error("Error fetching mentees:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("mentorOneToken");
          localStorage.removeItem("mentorOneRole");
          localStorage.removeItem("mentorOneUser");
        }
      } finally {
        setLoadingMentees(false);
      }
    };

    fetchMentees();
  }, [token]);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      const matchesSearch =
        meeting.title.toLowerCase().includes(search.toLowerCase()) ||
        meeting.topic.toLowerCase().includes(search.toLowerCase()) ||
        meeting.location.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || meeting.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [meetings, search, filter]);

  const upcomingCount = meetings.filter(
    (meeting) =>
      meeting.status === "Upcoming" ||
      meeting.status === "Scheduled"
  ).length;

  const completedCount = meetings.filter(
    (meeting) => meeting.status === "Completed"
  ).length;

  const totalParticipants = meetings.reduce(
    (total, meeting) => total + meeting.participants,
    0
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleMenteeSelection = (menteeId) => {
    setForm((previous) => {
      const alreadySelected = previous.menteeIds.includes(menteeId);

      return {
        ...previous,
        menteeIds: alreadySelected
          ? previous.menteeIds.filter((id) => id !== menteeId)
          : [...previous.menteeIds, menteeId],
      };
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      topic: "",
      date: "",
      time: "",
      mode: "Online",
      duration: "60",
      menteeIds: [],
    });
  };

  const handleCreateMeeting = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Please login again.");
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter a meeting title.");
      return;
    }

    if (!form.topic.trim()) {
      alert("Please enter the meeting topic.");
      return;
    }

    if (!form.date) {
      alert("Please select a date.");
      return;
    }

    if (!form.time) {
      alert("Please select a time.");
      return;
    }

    if (form.menteeIds.length === 0) {
      alert("Please select at least one mentee.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/mentor/group-meets`,
        {
          menteeIds: form.menteeIds,
          date: form.date,
          time: form.time,
          mode: form.mode,
          duration: Number(form.duration),
          agenda: form.topic.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdMeeting = response.data?.meeting;

      const formattedDate = new Date(
        `${form.date}T00:00:00`
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const formattedTime = new Date(
        `1970-01-01T${form.time}`
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMeeting = {
        id: createdMeeting?.id || `local-${Date.now()}`,
        title: form.title.trim(),
        topic: form.topic.trim(),
        date: formattedDate,
        time: formattedTime,
        participants: form.menteeIds.length,
        location:
          form.mode === "Online"
            ? "Online Meeting"
            : "Offline Meeting",
        status: "Upcoming",
        backendData: createdMeeting || null,
      };

      setMeetings((previous) => [newMeeting, ...previous]);

      setShowCreateModal(false);
      resetForm();

      alert("Group meeting created successfully.");
    } catch (error) {
      console.error("Create group meeting error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("mentorOneToken");
        localStorage.removeItem("mentorOneRole");
        localStorage.removeItem("mentorOneUser");
        alert("Session expired. Please login again.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to create group meeting."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setShowDetailsModal(true);
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
            Group Meetings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Organize and manage group mentoring meetings.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
        >
          + Create Group Meeting
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#101624] p-5">
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

        <div className="rounded-2xl border border-slate-800 bg-[#101624] p-5">
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

        <div className="rounded-2xl border border-slate-800 bg-[#101624] p-5">
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
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-[#101624] p-5 md:flex-row">
        <input
          type="text"
          placeholder="Search meetings by title, topic or location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="flex-1 rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
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
            className="rounded-2xl border border-slate-800 bg-[#101624] p-6 transition hover:border-blue-500/40"
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
                    <span>
                      👥 {meeting.participants} Participants
                    </span>
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

                <button
                  onClick={() => handleViewDetails(meeting)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-[#101624] px-6 py-12 text-center text-sm text-slate-500">
          No group meetings found.
        </div>
      )}

      {/* Create Meeting Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Create Group Meeting
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Schedule a new group mentoring meeting.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateMeeting}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Meeting Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Enter meeting title"
                  className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Topic / Agenda
                </label>

                <textarea
                  name="topic"
                  value={form.topic}
                  onChange={handleFormChange}
                  rows="3"
                  placeholder="Enter meeting topic or agenda"
                  className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Mode
                  </label>

                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Duration
                  </label>

                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                    <option value="90">90 Minutes</option>
                    <option value="120">120 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="block text-sm text-slate-400">
                    Select Mentees
                  </label>

                  <span className="text-xs text-slate-500">
                    {form.menteeIds.length} selected
                  </span>
                </div>

                {loadingMentees ? (
                  <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-4 text-sm text-slate-500">
                    Loading mentees...
                  </div>
                ) : mentees.length === 0 ? (
                  <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-4 text-sm text-slate-500">
                    No assigned mentees found.
                  </div>
                ) : (
                  <div className="max-h-48 space-y-2 overflow-y-auto rounded-xl border border-slate-800 bg-[#0B111D] p-3">
                    {mentees.map((mentee) => (
                      <label
                        key={mentee.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-slate-800/50"
                      >
                        <input
                          type="checkbox"
                          checked={form.menteeIds.includes(
                            mentee.id
                          )}
                          onChange={() =>
                            handleMenteeSelection(mentee.id)
                          }
                          className="h-4 w-4 accent-blue-500"
                        />

                        <div>
                          <p className="text-sm text-white">
                            {mentee.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {mentee.registerNo}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Creating..."
                    : "Create Meeting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedMeeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Meeting Details
              </h2>

              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500">
                  Title
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {selectedMeeting.title}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Topic
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {selectedMeeting.topic}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedMeeting.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Time
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedMeeting.time}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedMeeting.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Participants
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedMeeting.participants}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Status
                </p>

                <span className="mt-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  {selectedMeeting.status}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
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

export default GroupMeetings;