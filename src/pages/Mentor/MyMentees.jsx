import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

function MyMentees() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedMentee, setSelectedMentee] = useState(null);

  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentees = async () => {
      const token = localStorage.getItem("mentorOneToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/mentor/mentees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        /*
          Backend fields:
          programme  -> course
          semester   -> year
          attendance -> progress
          Good standing -> Active
          At risk      -> Needs Attention
        */

        const mappedMentees = response.data.map((mentee) => ({
          ...mentee,
          course: mentee.programme,
          year: `Semester ${mentee.semester}`,
          progress: mentee.attendance,
          status:
            mentee.status === "Good standing"
              ? "Active"
              : "Needs Attention",
          email: mentee.email || "",
        }));

        setMentees(mappedMentees);
      } catch (err) {
        console.error("My Mentees API error:", err);

        if (
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          localStorage.removeItem("mentorOneToken");
          localStorage.removeItem("mentorOneRole");
          localStorage.removeItem("mentorOneUser");

          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.error ||
            "Unable to load your mentees."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, [navigate]);

  const filteredMentees = mentees.filter((mentee) => {
    const matchesSearch =
      mentee.name.toLowerCase().includes(search.toLowerCase()) ||
      mentee.registerNo.toLowerCase().includes(search.toLowerCase()) ||
      mentee.course.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || mentee.status === status;

    return matchesSearch && matchesStatus;
  });

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const activeCount = mentees.filter(
    (mentee) => mentee.status === "Active"
  ).length;

  const attentionCount = mentees.filter(
    (mentee) => mentee.status === "Needs Attention"
  ).length;

  if (loading) {
    return (
      <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6 lg:p-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-400">
              Loading your mentees...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-red-500/20 bg-[#101624] p-6">
          <h2 className="text-lg font-semibold text-red-400">
            Unable to load mentees
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 text-sm text-[#8B8FFF]">
            Mentor Workspace
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Mentees
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Monitor student progress, view student information, and manage
            your assigned mentees.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] px-5 py-4">
          <p className="text-xs text-slate-500">
            Assigned Students
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {mentees.length} Students
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Mentees */}
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5 transition hover:border-blue-500/40">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>

            <span className="text-sm font-medium text-blue-400">
              Assigned
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Total Mentees
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {mentees.length}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Students currently assigned to you
          </p>
        </div>

        {/* Active Mentees */}
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5 transition hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <span className="text-sm font-medium text-emerald-400">
              Active
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Active Mentees
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            {activeCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Students progressing normally
          </p>
        </div>

        {/* Needs Attention */}
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5 transition hover:border-amber-500/40">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 4h.01M10.3 4.5l-8 14A2 2 0 004 21h16a2 2 0 001.7-2.5l-8-14a2 2 0 00-3.4 0z"
                />
              </svg>
            </div>

            <span className="text-sm font-medium text-amber-400">
              Attention
            </span>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Needs Attention
          </p>

          <h2 className="mt-2 text-3xl font-bold text-amber-400">
            {attentionCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Students requiring follow-up
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 rounded-2xl border border-[#27334A] bg-[#101624] p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Student Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search and filter your assigned students.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search by name, register number or course..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-[#2B3850] bg-[#0B111D] py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-[#2B3850] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-blue-500 lg:w-56"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Needs Attention">
              Needs Attention
            </option>
          </select>
        </div>
      </div>

      {/* Assigned Students */}
      <div className="overflow-hidden rounded-2xl border border-[#27334A] bg-[#101624]">
        <div className="flex flex-col gap-2 border-b border-[#27334A] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Assigned Students
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredMentees.length} of {mentees.length} students
            </p>
          </div>

          <span className="w-fit rounded-full border border-[#2B3850] bg-[#0B111D] px-3 py-1 text-xs text-slate-400">
            {status === "All" ? "All Students" : status}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#0B111D] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">
                  Student
                </th>

                <th className="px-6 py-4">
                  Course
                </th>

                <th className="px-6 py-4">
                  Year
                </th>

                <th className="px-6 py-4">
                  Progress
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Contact
                </th>

                <th className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#27334A]">
              {filteredMentees.map((mentee) => (
                <tr
                  key={mentee.id}
                  className="transition hover:bg-slate-900/50"
                >
                  {/* Student */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-purple-500/10">
                        {getInitials(mentee.name)}
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {mentee.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {mentee.registerNo}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="px-6 py-5 text-sm text-slate-300">
                    {mentee.course}
                  </td>

                  {/* Year */}
                  <td className="px-6 py-5 text-sm text-slate-400">
                    {mentee.year}
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-5">
                    <div className="w-36">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          Progress
                        </span>

                        <span className="font-semibold text-blue-400">
                          {mentee.progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              Math.max(mentee.progress || 0, 0),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        mentee.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {mentee.status}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-5">
                    {mentee.email ? (
                      <a
                        href={`mailto:${mentee.email}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                      >
                        Email
                        <span>↗</span>
                      </a>
                    ) : (
                      <span className="text-sm text-slate-600">
                        Not available
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5">
                    <button
                      onClick={() => setSelectedMentee(mentee)}
                      className="rounded-lg border border-[#33415C] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredMentees.length === 0 && (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
            </div>

            <p className="text-sm font-medium text-slate-300">
              No mentees found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {selectedMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#27334A] bg-[#101624] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#27334A] px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Student Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View mentee information
                </p>
              </div>

              <button
                onClick={() => setSelectedMentee(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-lg font-bold text-white">
                  {getInitials(selectedMentee.name)}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedMentee.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedMentee.registerNo}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                  <p className="text-xs text-slate-500">
                    Course
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {selectedMentee.course}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                  <p className="text-xs text-slate-500">
                    Semester
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {selectedMentee.semester}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                  <p className="text-xs text-slate-500">
                    Section
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {selectedMentee.section}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                  <p className="text-xs text-slate-500">
                    Attendance
                  </p>

                  <p className="mt-1 text-sm font-medium text-blue-400">
                    {selectedMentee.attendance}%
                  </p>
                </div>

                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                  <p className="text-xs text-slate-500">
                    CGPA
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {selectedMentee.cgpa}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                  <p className="text-xs text-slate-500">
                    Backlogs
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {selectedMentee.backlogs}
                  </p>
                </div>

                <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4 sm:col-span-2">
                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <p
                    className={`mt-1 text-sm font-medium ${
                      selectedMentee.status === "Active"
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {selectedMentee.status}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-xl border border-[#27334A] bg-[#0B111D] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-slate-400">
                    Overall Progress
                  </p>

                  <p className="font-semibold text-blue-400">
                    {selectedMentee.progress}%
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{
                      width: `${Math.min(
                        Math.max(selectedMentee.progress || 0, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {selectedMentee.email ? (
                <a
                  href={`mailto:${selectedMentee.email}`}
                  className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Contact Student
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="block w-full cursor-not-allowed rounded-xl bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-slate-500"
                >
                  Contact Information Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyMentees;