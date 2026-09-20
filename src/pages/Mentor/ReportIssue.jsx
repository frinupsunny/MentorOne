import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiMessageSquare,
} from "react-icons/fi";

const API_BASE_URL = "http://localhost:4000";

function ReportIssue() {
  const [issues, setIssues] = useState([]);
  const [mentees, setMentees] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const [form, setForm] = useState({
    menteeId: "",
    category: "Mentoring",
    priority: "Medium",
    details: "",
  });

  const token = localStorage.getItem("mentorOneToken");

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const formatDate = (value) => {
    if (!value) {
      return "Not available";
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

  const normalizeStatus = (status) => {
    if (!status) {
      return "Open";
    }

    const value = String(status).toLowerCase();

    if (value === "open") {
      return "Open";
    }

    if (
      value === "in progress" ||
      value === "in-progress" ||
      value === "progress"
    ) {
      return "In Progress";
    }

    if (
      value === "resolved" ||
      value === "closed" ||
      value === "completed"
    ) {
      return "Resolved";
    }

    return String(status);
  };

  const getIssuesFromResponse = (data) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data?.issues)) {
      return data.issues;
    }

    if (Array.isArray(data?.entries)) {
      return data.entries;
    }

    return [];
  };

  const normalizeIssue = (issue) => {
    const menteeId =
      issue?.menteeId ||
      issue?.mentee_id ||
      issue?.studentId ||
      "";

    const matchingMentee = mentees.find(
      (mentee) => String(mentee.id) === String(menteeId)
    );

    return {
      ...issue,
      id:
        issue?.id ||
        issue?._id ||
        `issue-${Date.now()}`,
      title:
        issue?.title ||
        issue?.subject ||
        issue?.category ||
        "Critical Issue",
      category:
        issue?.category ||
        "Mentoring",
      priority:
        issue?.priority ||
        issue?.severity ||
        "Medium",
      status: normalizeStatus(issue?.status),
      details:
        issue?.details ||
        issue?.description ||
        issue?.message ||
        "",
      menteeId,
      menteeName:
        issue?.menteeName ||
        issue?.mentee ||
        matchingMentee?.name ||
        "Mentee",
      registerNo:
        issue?.registerNo ||
        matchingMentee?.registerNo ||
        "",
      date: formatDate(
        issue?.date ||
          issue?.createdAt ||
          issue?.created_at
      ),
    };
  };

  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [issuesResponse, menteesResponse] =
          await Promise.all([
            axios.get(
              `${API_BASE_URL}/api/mentor/critical-issues`,
              getAuthConfig()
            ),
            axios.get(
              `${API_BASE_URL}/api/mentor/mentees`,
              getAuthConfig()
            ),
          ]);

        const menteeList =
          menteesResponse.data?.mentees || [];

        setMentees(menteeList);

        const rawIssues = getIssuesFromResponse(
          issuesResponse.data
        );

        setIssues(
          rawIssues.map((issue) => ({
            ...issue,
            menteeName:
              issue?.menteeName ||
              issue?.mentee ||
              menteeList.find(
                (mentee) =>
                  String(mentee.id) ===
                  String(
                    issue?.menteeId ||
                      issue?.mentee_id ||
                      ""
                  )
              )?.name ||
              "Mentee",
          }))
        );
      } catch (error) {
        console.error("Error loading issues:", error);

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

    loadData();
  }, [token]);

  const normalizedIssues = useMemo(() => {
    return issues.map(normalizeIssue);
  }, [issues, mentees]);

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return normalizedIssues;
    }

    return normalizedIssues.filter((issue) => {
      return (
        issue.title?.toLowerCase().includes(query) ||
        issue.category?.toLowerCase().includes(query) ||
        issue.status?.toLowerCase().includes(query) ||
        issue.priority?.toLowerCase().includes(query) ||
        issue.menteeName?.toLowerCase().includes(query) ||
        issue.details?.toLowerCase().includes(query)
      );
    });
  }, [normalizedIssues, search]);

  const totalIssues = normalizedIssues.length;

  const openIssues = normalizedIssues.filter(
    (issue) => issue.status === "Open"
  ).length;

  const inProgressIssues = normalizedIssues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolvedIssues = normalizedIssues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      menteeId: "",
      category: "Mentoring",
      priority: "Medium",
      details: "",
    });
  };

  const handleCreateIssue = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Please login again.");
      return;
    }

    if (!form.menteeId) {
      alert("Please select a mentee.");
      return;
    }

    if (!form.details.trim()) {
      alert("Please enter the issue details.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/mentor/critical-issues`,
        {
          menteeId: form.menteeId,
          category: form.category,
          details: form.details.trim(),
        },
        getAuthConfig()
      );

      const returnedIssue =
        response.data?.issue ||
        response.data?.criticalIssue ||
        response.data;

      const selectedMentee = mentees.find(
        (mentee) =>
          String(mentee.id) === String(form.menteeId)
      );

      const newIssue = {
        ...(returnedIssue &&
        typeof returnedIssue === "object"
          ? returnedIssue
          : {}),
        id:
          returnedIssue?.id ||
          `local-${Date.now()}`,
        menteeId: form.menteeId,
        menteeName:
          selectedMentee?.name || "Mentee",
        registerNo:
          selectedMentee?.registerNo || "",
        category: form.category,
        priority: form.priority,
        details: form.details.trim(),
        status: "Open",
        date: new Date().toISOString(),
      };

      setIssues((previous) => [
        ...previous,
        newIssue,
      ]);

      setShowCreateModal(false);
      resetForm();

      alert(
        "Issue reported successfully."
      );
    } catch (error) {
      console.error(
        "Error creating issue:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("mentorOneToken");
        localStorage.removeItem("mentorOneRole");
        localStorage.removeItem("mentorOneUser");

        alert(
          "Session expired. Please login again."
        );
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to report issue."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const openViewModal = (issue) => {
    setSelectedIssue(issue);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-blue-400">
            MentorOne / Support
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Report Issue
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Report mentoring-related issues and track their status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
        >
          <FiPlus />
          Report New Issue
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FiAlertTriangle className="text-xl text-blue-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : String(totalIssues).padStart(2, "0")}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Total Issues
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <FiClock className="text-xl text-amber-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : String(openIssues).padStart(2, "0")}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Open Issues
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
            <FiMessageSquare className="text-xl text-purple-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : String(inProgressIssues).padStart(2, "0")}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            In Progress
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiCheckCircle className="text-xl text-emerald-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : String(resolvedIssues).padStart(2, "0")}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Resolved Issues
          </p>
        </div>
      </div>

      {/* INFORMATION BANNER */}
      <div className="mb-8 flex gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <FiAlertCircle className="mt-1 flex-shrink-0 text-xl text-blue-400" />

        <div>
          <h2 className="font-semibold text-blue-300">
            Need assistance?
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400">
            Use this section to report technical, mentoring,
            session, or profile-related issues to the
            administration.
          </p>
        </div>
      </div>

      {/* ISSUES TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1220]">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Recent Issues
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of recently reported issues.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search issues..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-[#080C14] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500 md:w-64"
          />
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading issues...
          </div>
        ) : (
          <>
            {/* DESKTOP */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-800 bg-[#101727] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4">
                      Issue
                    </th>

                    <th className="px-5 py-4">
                      Mentee
                    </th>

                    <th className="px-5 py-4">
                      Category
                    </th>

                    <th className="px-5 py-4">
                      Priority
                    </th>

                    <th className="px-5 py-4">
                      Date
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr
                      key={issue.id}
                      className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                    >
                      <td className="max-w-xs px-5 py-5">
                        <p className="font-medium text-white">
                          {issue.title}
                        </p>

                        {issue.details && (
                          <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {issue.details}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <div>
                          <p className="text-sm text-white">
                            {issue.menteeName}
                          </p>

                          {issue.registerNo && (
                            <p className="mt-1 text-xs text-slate-500">
                              {issue.registerNo}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-slate-400">
                        {issue.category}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            issue.priority === "High"
                              ? "bg-red-500/10 text-red-400"
                              : issue.priority === "Medium"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {issue.priority}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-slate-500">
                        {issue.date}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            issue.status === "Resolved"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : issue.status === "In Progress"
                              ? "bg-purple-500/10 text-purple-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            openViewModal(issue)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}
            <div className="space-y-4 p-4 md:hidden">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="rounded-xl border border-slate-800 bg-[#080C14] p-4"
                >
                  <h3 className="font-semibold text-white">
                    {issue.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {issue.menteeName}
                    {issue.registerNo
                      ? ` · ${issue.registerNo}`
                      : ""}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    {issue.category}
                  </p>

                  {issue.details && (
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {issue.details}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        issue.priority === "High"
                          ? "bg-red-500/10 text-red-400"
                          : issue.priority === "Medium"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {issue.priority}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        issue.status === "Resolved"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : issue.status === "In Progress"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {issue.date}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        openViewModal(issue)
                      }
                      className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                    >
                      View Issue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading &&
          filteredIssues.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              No issues found.
            </div>
          )}
      </div>

      {/* CREATE ISSUE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Report New Issue
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Submit a mentoring-related issue.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleCreateIssue}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Mentee
                </label>

                <select
                  name="menteeId"
                  value={form.menteeId}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select mentee
                  </option>

                  {mentees.map((mentee) => (
                    <option
                      key={mentee.id}
                      value={mentee.id}
                    >
                      {mentee.name} ({mentee.registerNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option value="Mentoring">
                      Mentoring
                    </option>

                    <option value="Session">
                      Session
                    </option>

                    <option value="Technical">
                      Technical
                    </option>

                    <option value="Profile">
                      Profile
                    </option>

                    <option value="Academic">
                      Academic
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Issue Details
                </label>

                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleFormChange}
                  rows="6"
                  placeholder="Describe the issue clearly..."
                  className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setShowCreateModal(false)
                  }
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
                    ? "Submitting..."
                    : "Submit Issue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW ISSUE MODAL */}
      {showViewModal && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Issue Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedIssue.menteeName}
                  {selectedIssue.registerNo
                    ? ` · ${selectedIssue.registerNo}`
                    : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowViewModal(false)
                }
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-slate-500">
                  Issue
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {selectedIssue.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedIssue.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Priority
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedIssue.priority}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {selectedIssue.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      selectedIssue.status ===
                      "Resolved"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : selectedIssue.status ===
                          "In Progress"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {selectedIssue.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Details
                </p>

                <div className="mt-2 rounded-xl border border-slate-800 bg-[#0B111D] p-4">
                  <p className="text-sm leading-7 text-slate-300">
                    {selectedIssue.details ||
                      "No details available."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowViewModal(false)
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

export default ReportIssue;