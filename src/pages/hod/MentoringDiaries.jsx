import { useMemo, useState } from "react";
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiSearch,
  FiEye,
  FiX,
  FiCalendar,
  FiUser,
  FiUsers,
  FiFileText,
} from "react-icons/fi";

function MentoringDiaries() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDiary, setSelectedDiary] = useState(null);

  const [diaries, setDiaries] = useState([
    {
      id: 1,
      mentor: "Dr. Anil Kumar",
      mentorId: "MNT001",
      mentee: "Rahul Menon",
      menteeId: "MEE1024",
      date: "10 Sep 2026",
      time: "10:30 AM",
      topic: "Academic Progress",
      entry:
        "Discussed current academic performance, assignment progress and preparation strategy for the upcoming internal assessment.",
      status: "Submitted",
      followUp: "Review internal assessment preparation",
    },
    {
      id: 2,
      mentor: "Ms. Priya Nair",
      mentorId: "MNT002",
      mentee: "Sneha Thomas",
      menteeId: "MEE1031",
      date: "10 Sep 2026",
      time: "11:00 AM",
      topic: "Career Guidance",
      entry:
        "Discussed career interests, internship opportunities and skills required for a data science career.",
      status: "Submitted",
      followUp: "Share internship resources",
    },
    {
      id: 3,
      mentor: "Dr. Joseph Mathew",
      mentorId: "MNT003",
      mentee: "Arjun Raj",
      menteeId: "MEE1042",
      date: "09 Sep 2026",
      time: "02:00 PM",
      topic: "Personal Development",
      entry:
        "Student discussed challenges with time management and balancing academic and extracurricular activities.",
      status: "Submitted",
      followUp: "Follow up next mentoring session",
    },
    {
      id: 4,
      mentor: "Ms. Divya Menon",
      mentorId: "MNT004",
      mentee: "Akhil Paul",
      menteeId: "MEE1056",
      date: "09 Sep 2026",
      time: "03:30 PM",
      topic: "Academic Support",
      entry:
        "Reviewed difficulties in statistics and discussed additional learning resources.",
      status: "Pending",
      followUp: "Check progress in statistics",
    },
    {
      id: 5,
      mentor: "Dr. Anil Kumar",
      mentorId: "MNT001",
      mentee: "Meera Joseph",
      menteeId: "MEE1062",
      date: "08 Sep 2026",
      time: "09:30 AM",
      topic: "Attendance",
      entry:
        "Reviewed attendance concerns and discussed the importance of maintaining the required attendance percentage.",
      status: "Submitted",
      followUp: "Monitor attendance",
    },
    {
      id: 6,
      mentor: "Ms. Priya Nair",
      mentorId: "MNT002",
      mentee: "Nikhil George",
      menteeId: "MEE1070",
      date: "08 Sep 2026",
      time: "01:00 PM",
      topic: "Academic Progress",
      entry:
        "Discussed semester performance and identified subjects requiring additional attention.",
      status: "Pending",
      followUp: "Academic performance review",
    },
    {
      id: 7,
      mentor: "Dr. Joseph Mathew",
      mentorId: "MNT003",
      mentee: "Ananya S",
      menteeId: "MEE1078",
      date: "07 Sep 2026",
      time: "11:30 AM",
      topic: "Career Planning",
      entry:
        "Discussed higher education options and preparation for competitive examinations.",
      status: "Submitted",
      followUp: "Provide higher studies information",
    },
    {
      id: 8,
      mentor: "Ms. Divya Menon",
      mentorId: "MNT004",
      mentee: "Vishnu Krishnan",
      menteeId: "MEE1084",
      date: "06 Sep 2026",
      time: "04:00 PM",
      topic: "Personal Concern",
      entry:
        "Student discussed a personal concern affecting concentration and academic activities.",
      status: "Needs Review",
      followUp: "Coordinate with student support team",
    },
  ]);

  const stats = useMemo(() => {
    const total = diaries.length;
    const submitted = diaries.filter(
      (item) => item.status === "Submitted"
    ).length;
    const pending = diaries.filter(
      (item) => item.status === "Pending"
    ).length;
    const review = diaries.filter(
      (item) => item.status === "Needs Review"
    ).length;

    const compliance =
      total === 0 ? 0 : Math.round((submitted / total) * 100);

    return {
      total,
      submitted,
      pending,
      review,
      compliance,
    };
  }, [diaries]);

  const filteredDiaries = useMemo(() => {
    return diaries.filter((diary) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        diary.mentor.toLowerCase().includes(searchValue) ||
        diary.mentee.toLowerCase().includes(searchValue) ||
        diary.topic.toLowerCase().includes(searchValue) ||
        diary.menteeId.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || diary.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [diaries, search, statusFilter]);

  const getStatusStyle = (status) => {
    if (status === "Submitted") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }

    if (status === "Pending") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }

    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  const getStatusIcon = (status) => {
    if (status === "Submitted") {
      return <FiCheckCircle />;
    }

    if (status === "Pending") {
      return <FiClock />;
    }

    return <FiAlertCircle />;
  };

  const markAsSubmitted = (id) => {
    setDiaries((current) =>
      current.map((diary) =>
        diary.id === id
          ? { ...diary, status: "Submitted" }
          : diary
      )
    );

    setSelectedDiary((current) =>
      current
        ? {
            ...current,
            status: "Submitted",
          }
        : current
    );
  };

  return (
    <div className="min-h-full bg-[#080C14] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-purple-400">
            HOD / Mentoring Diaries
          </p>

          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Mentoring Diaries
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Monitor mentoring session records, diary submissions and
                follow-up activities across the department.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#0D1220] px-4 py-3">
              <FiBookOpen className="text-purple-400" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Diary Compliance
                </p>
                <p className="text-lg font-bold text-white">
                  {stats.compliance}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <FiBookOpen />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.total}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Total Diaries
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.submitted}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Submitted
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiClock />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.pending}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Pending
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <FiAlertCircle />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.review}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Needs Review
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-800 bg-[#0D1220] p-4 sm:col-span-1">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiFileText />
            </div>

            <p className="text-2xl font-bold text-white">
              {stats.compliance}%
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Compliance
            </p>
          </div>
        </div>

        {/* Compliance */}
        <section className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-semibold text-white">
                Department Diary Compliance
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Current submission status of mentoring diaries
              </p>
            </div>

            <span className="text-sm font-semibold text-purple-400">
              {stats.submitted} / {stats.total} submitted
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
              style={{ width: `${stats.compliance}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <span>
              Submitted:{" "}
              <strong className="text-emerald-400">
                {stats.submitted}
              </strong>
            </span>

            <span>
              Pending:{" "}
              <strong className="text-amber-400">
                {stats.pending}
              </strong>
            </span>

            <span>
              Needs Review:{" "}
              <strong className="text-red-400">
                {stats.review}
              </strong>
            </span>
          </div>
        </section>

        {/* Diary Records */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1220]">
          {/* Toolbar */}
          <div className="border-b border-slate-800 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Diary Records
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  View and monitor mentor diary entries
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 sm:w-72">
                  <FiSearch className="flex-shrink-0 text-slate-500" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search mentor, mentee..."
                    className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 text-sm text-slate-300 outline-none"
                >
                  <option>All</option>
                  <option>Submitted</option>
                  <option>Pending</option>
                  <option>Needs Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/30 text-left">
                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Mentor
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Mentee
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Topic
                  </th>

                  <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDiaries.map((diary) => (
                  <tr
                    key={diary.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/10 text-xs font-semibold text-purple-300">
                          {diary.mentor
                            .split(" ")
                            .slice(-2)
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {diary.mentor}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {diary.mentorId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-200">
                        {diary.mentee}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {diary.menteeId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-300">
                        {diary.date}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {diary.time}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-800/70 px-2.5 py-1.5 text-xs text-slate-300">
                        {diary.topic}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                          diary.status
                        )}`}
                      >
                        {getStatusIcon(diary.status)}
                        {diary.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedDiary(diary)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
                      >
                        <FiEye />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="divide-y divide-slate-800 lg:hidden">
            {filteredDiaries.map((diary) => (
              <div key={diary.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-xs font-semibold text-purple-300">
                      {diary.mentor
                        .split(" ")
                        .slice(-2)
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {diary.mentor}
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Mentor · {diary.mentorId}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${getStatusStyle(
                      diary.status
                    )}`}
                  >
                    {getStatusIcon(diary.status)}
                    {diary.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiUser className="text-xs" />
                      <span className="text-[10px] uppercase tracking-wider">
                        Mentee
                      </span>
                    </div>

                    <p className="truncate text-sm text-slate-200">
                      {diary.mentee}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {diary.menteeId}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-900/50 p-3">
                    <div className="mb-1 flex items-center gap-2 text-slate-500">
                      <FiCalendar className="text-xs" />
                      <span className="text-[10px] uppercase tracking-wider">
                        Session
                      </span>
                    </div>

                    <p className="text-sm text-slate-200">
                      {diary.date}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {diary.time}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="rounded-lg bg-slate-800/70 px-2.5 py-1.5 text-xs text-slate-300">
                    {diary.topic}
                  </span>

                  <button
                    onClick={() => setSelectedDiary(diary)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 hover:border-purple-500/40 hover:text-white"
                  >
                    <FiEye />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDiaries.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
                <FiBookOpen />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-300">
                No diary records found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* View Diary Modal */}
      {selectedDiary && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDiary(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0D1220] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
                  Mentoring Diary
                </p>

                <h3 className="mt-1 text-lg font-semibold text-white">
                  Session Details
                </h3>
              </div>

              <button
                onClick={() => setSelectedDiary(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Mentor
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {selectedDiary.mentor}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedDiary.mentorId}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Mentee
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {selectedDiary.mentee}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedDiary.menteeId}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Date & Time
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {selectedDiary.date}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedDiary.time}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Topic
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {selectedDiary.topic}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-center gap-2">
                  <FiFileText className="text-purple-400" />

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Diary Entry
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {selectedDiary.entry}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Follow-up Action
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  {selectedDiary.followUp}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    Current Status
                  </p>

                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                      selectedDiary.status
                    )}`}
                  >
                    {getStatusIcon(selectedDiary.status)}
                    {selectedDiary.status}
                  </span>
                </div>

                {selectedDiary.status !== "Submitted" && (
                  <button
                    onClick={() =>
                      markAsSubmitted(selectedDiary.id)
                    }
                    className="rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:from-violet-400 hover:to-purple-500"
                  >
                    Mark Submitted
                  </button>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-800 px-5 py-4 sm:px-6">
              <button
                onClick={() => setSelectedDiary(null)}
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

export default MentoringDiaries;