import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiEdit3,
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

const API_BASE_URL = "http://localhost:4000";

function MentorRemarks() {
  const [mentees, setMentees] = useState([]);
  const [remarksByMentee, setRemarksByMentee] = useState({});
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedMentee, setSelectedMentee] = useState(null);

  const [remarkText, setRemarkText] = useState("");

  const token = localStorage.getItem("mentorOneToken");

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const normalizeRemarks = (responseData) => {
    if (Array.isArray(responseData)) {
      return responseData;
    }

    if (Array.isArray(responseData?.remarks)) {
      return responseData.remarks;
    }

    if (Array.isArray(responseData?.entries)) {
      return responseData.entries;
    }

    if (responseData?.remark) {
      return [responseData.remark];
    }

    return [];
  };

  const getRemarkText = (remark) => {
    return (
      remark?.remark ||
      remark?.text ||
      remark?.content ||
      remark?.message ||
      ""
    );
  };

  const getRemarkDate = (remark) => {
    const value =
      remark?.date ||
      remark?.createdAt ||
      remark?.created_at ||
      remark?.timestamp;

    if (!value) {
      return "";
    }

    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      return String(value);
    }

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchRemarks = async (menteeId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mentor/remarks/${menteeId}`,
        getAuthConfig()
      );

      return normalizeRemarks(response.data);
    } catch (error) {
      console.error(
        `Error loading remarks for mentee ${menteeId}:`,
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("mentorOneToken");
        localStorage.removeItem("mentorOneRole");
        localStorage.removeItem("mentorOneUser");
      }

      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/api/mentor/mentees`,
          getAuthConfig()
        );

        const menteeList = response.data?.mentees || [];

        setMentees(menteeList);

        const remarksResults = await Promise.all(
          menteeList.map(async (mentee) => {
            const remarks = await fetchRemarks(mentee.id);

            return {
              menteeId: mentee.id,
              remarks,
            };
          })
        );

        const remarksMap = {};

        remarksResults.forEach((item) => {
          remarksMap[item.menteeId] = item.remarks;
        });

        setRemarksByMentee(remarksMap);
      } catch (error) {
        console.error("Error loading mentor remarks:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("mentorOneToken");
          localStorage.removeItem("mentorOneRole");
          localStorage.removeItem("mentorOneUser");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  const menteeRows = useMemo(() => {
    return mentees.map((mentee) => {
      const remarks = remarksByMentee[mentee.id] || [];

      const sortedRemarks = [...remarks].sort((a, b) => {
        const dateA = new Date(
          a?.createdAt ||
            a?.created_at ||
            a?.date ||
            a?.timestamp ||
            0
        ).getTime();

        const dateB = new Date(
          b?.createdAt ||
            b?.created_at ||
            b?.date ||
            b?.timestamp ||
            0
        ).getTime();

        return dateB - dateA;
      });

      const latestRemark = sortedRemarks[0];

      return {
        ...mentee,
        department:
          mentee.department ||
          mentee.programme ||
          "Not specified",
        remarks: sortedRemarks,
        lastRemark: latestRemark
          ? getRemarkText(latestRemark)
          : "No remark added yet.",
        date: latestRemark
          ? getRemarkDate(latestRemark)
          : "Not reviewed",
        status: latestRemark ? "Reviewed" : "Pending",
      };
    });
  }, [mentees, remarksByMentee]);

  const filteredMentees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return menteeRows;
    }

    return menteeRows.filter((mentee) => {
      return (
        mentee.name?.toLowerCase().includes(query) ||
        mentee.registerNo?.toLowerCase().includes(query) ||
        mentee.department?.toLowerCase().includes(query) ||
        mentee.lastRemark?.toLowerCase().includes(query)
      );
    });
  }, [menteeRows, search]);

  const totalMentees = menteeRows.length;

  const reviewedRemarks = menteeRows.filter(
    (mentee) => mentee.status === "Reviewed"
  ).length;

  const pendingRemarks = menteeRows.filter(
    (mentee) => mentee.status === "Pending"
  ).length;

  const remarksAddedThisMonth = Object.values(
    remarksByMentee
  ).reduce((total, remarks) => {
    return (
      total +
      remarks.filter((remark) => {
        const value =
          remark?.createdAt ||
          remark?.created_at ||
          remark?.date ||
          remark?.timestamp;

        if (!value) {
          return false;
        }

        const date = new Date(value);
        const now = new Date();

        return (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        );
      }).length
    );
  }, 0);

  const openAddRemark = (mentee = null) => {
    setSelectedMentee(mentee);
    setRemarkText("");
    setShowAddModal(true);
  };

  const openViewRemark = (mentee) => {
    setSelectedMentee(mentee);
    setShowViewModal(true);
  };

  const handleAddRemark = async (event) => {
    event.preventDefault();

    if (!selectedMentee) {
      alert("Please select a mentee.");
      return;
    }

    if (!remarkText.trim()) {
      alert("Please enter a remark.");
      return;
    }

    if (!token) {
      alert("Please login again.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/mentor/remarks/${selectedMentee.id}`,
        {
          remark: remarkText.trim(),
          text: remarkText.trim(),
        },
        getAuthConfig()
      );

      const returnedRemark = response.data?.remark;

      const newRemark = returnedRemark || {
        id: `local-${Date.now()}`,
        remark: remarkText.trim(),
        text: remarkText.trim(),
        createdAt: new Date().toISOString(),
      };

      setRemarksByMentee((previous) => ({
        ...previous,
        [selectedMentee.id]: [
          ...(previous[selectedMentee.id] || []),
          newRemark,
        ],
      }));

      setRemarkText("");
      setShowAddModal(false);

      alert("Remark added successfully.");
    } catch (error) {
      console.error("Error adding remark:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("mentorOneToken");
        localStorage.removeItem("mentorOneRole");
        localStorage.removeItem("mentorOneUser");
        alert("Session expired. Please login again.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to add remark."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-blue-400">
            MentorOne / Mentoring
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Remarks
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Record and review observations about your mentees.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openAddRemark()}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
        >
          <FiPlus />
          Add Remark
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <FiUsers className="text-xl text-blue-400" />
            </div>

            <span className="text-xs text-slate-500">
              Total
            </span>
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : totalMentees}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Total Mentees
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <FiCheckCircle className="text-xl text-emerald-400" />
            </div>

            <span className="text-xs text-slate-500">
              Completed
            </span>
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : reviewedRemarks}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Reviewed Remarks
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
              <FiClock className="text-xl text-amber-400" />
            </div>

            <span className="text-xs text-slate-500">
              Pending
            </span>
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : pendingRemarks}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Pending Remarks
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
              <FiEdit3 className="text-xl text-purple-400" />
            </div>

            <span className="text-xs text-slate-500">
              This Month
            </span>
          </div>

          <p className="text-3xl font-bold">
            {loading ? "..." : remarksAddedThisMonth}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Remarks Added
          </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1220]">
        {/* TABLE HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Mentee Remarks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent observations and mentoring updates.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search mentee..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-[#080C14] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading mentee remarks...
          </div>
        )}

        {/* DESKTOP TABLE */}
        {!loading && (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-[#101727] text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">
                    Mentee
                  </th>

                  <th className="px-5 py-4">
                    Department
                  </th>

                  <th className="px-5 py-4">
                    Latest Remark
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
                {filteredMentees.map((mentee) => (
                  <tr
                    key={mentee.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold">
                          {mentee.name
                            ?.split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <span className="font-medium text-white">
                            {mentee.name}
                          </span>

                          <p className="mt-1 text-xs text-slate-500">
                            {mentee.registerNo}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-slate-400">
                      {mentee.department}
                    </td>

                    <td className="max-w-xs px-5 py-5 text-slate-400">
                      {mentee.lastRemark}
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 text-slate-500">
                      {mentee.date}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          mentee.status === "Reviewed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {mentee.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openViewRemark(mentee)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openAddRemark(mentee)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10"
                        >
                          Add
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MOBILE CARDS */}
        {!loading && (
          <div className="space-y-4 p-4 md:hidden">
            {filteredMentees.map((mentee) => (
              <div
                key={mentee.id}
                className="rounded-xl border border-slate-800 bg-[#080C14] p-4"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold">
                    {mentee.name
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {mentee.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {mentee.registerNo}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  {mentee.department}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {mentee.lastRemark}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {mentee.date}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      mentee.status === "Reviewed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {mentee.status}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openViewRemark(mentee)
                    }
                    className="flex-1 rounded-lg border border-slate-700 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                  >
                    View Remark
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openAddRemark(mentee)
                    }
                    className="flex-1 rounded-lg border border-slate-700 py-2 text-xs font-medium text-blue-400 transition hover:border-blue-500 hover:bg-blue-500/10"
                  >
                    Add Remark
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading &&
          filteredMentees.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              No mentees found.
            </div>
          )}
      </div>

      {/* ADD REMARK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Add Remark
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Record an observation for a mentee.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddRemark}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Mentee
                </label>

                <select
                  value={selectedMentee?.id || ""}
                  onChange={(event) => {
                    const mentee = menteeRows.find(
                      (item) =>
                        String(item.id) === event.target.value
                    );

                    setSelectedMentee(mentee || null);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select mentee
                  </option>

                  {menteeRows.map((mentee) => (
                    <option
                      key={mentee.id}
                      value={mentee.id}
                    >
                      {mentee.name} ({mentee.registerNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Remark
                </label>

                <textarea
                  rows="6"
                  value={remarkText}
                  onChange={(event) =>
                    setRemarkText(event.target.value)
                  }
                  placeholder="Enter your observation or remark..."
                  className="w-full rounded-xl border border-slate-700 bg-[#0B111D] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                    ? "Saving..."
                    : "Save Remark"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW REMARKS MODAL */}
      {showViewModal && selectedMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Remarks
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedMentee.name} ·{" "}
                  {selectedMentee.registerNo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            {selectedMentee.remarks?.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-[#0B111D] px-5 py-8 text-center text-sm text-slate-500">
                No remarks have been added for this mentee.
              </div>
            ) : (
              <div className="space-y-4">
                {selectedMentee.remarks.map(
                  (remark, index) => (
                    <div
                      key={
                        remark.id ||
                        remark._id ||
                        index
                      }
                      className="rounded-xl border border-slate-800 bg-[#0B111D] p-5"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-400">
                          Remark {index + 1}
                        </span>

                        <span className="text-xs text-slate-500">
                          {getRemarkDate(remark) ||
                            "Date not available"}
                        </span>
                      </div>

                      <p className="text-sm leading-7 text-slate-300">
                        {getRemarkText(remark) ||
                          "No remark text available."}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

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

export default MentorRemarks;