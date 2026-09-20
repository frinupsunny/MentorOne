import { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiSend,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { menteeApi, getApiError } from "./menteeApi";

function FindMentorMentee() {
  const [mentors, setMentors] = useState([]);
  const [connectEnabled, setConnectEnabled] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requested, setRequested] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        setError("");

        const [mentorRes, modeRes] = await Promise.all([
          menteeApi.get("/api/mentee/mentors"),
          menteeApi.get("/api/mentee/connect-mode"),
        ]);

        setMentors(mentorRes.data || []);
        setConnectEnabled(Boolean(modeRes.data?.enabled));
      } catch (err) {
        setError(getApiError(err, "Unable to load mentor list."));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return mentors;
    }

    return mentors.filter((mentor) =>
      [
        mentor.name,
        mentor.department,
        mentor.designation,
        ...(mentor.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [mentors, search]);

  const sendRequest = async (mentorId) => {
    try {
      setBusyId(mentorId);
      setMessage("");
      setError("");

      const response = await menteeApi.post(
        "/api/mentee/mentor-requests",
        { mentorId }
      );

      setRequested((current) => ({
        ...current,
        [mentorId]: true,
      }));

      setMessage(response.data?.message || "Request sent.");
    } catch (err) {
      setError(getApiError(err, "Unable to send mentor request."));
    } finally {
      setBusyId("");
    }
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Mentee Workspace</p>

        <h1 className="mt-2 text-3xl font-bold">
          Find Mentor
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Browse mentors and request a mentoring connection.
        </p>
      </div>

      {!connectEnabled && !loading && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" />
          <span>
            Direct mentor requests are currently switched off by your
            coordinator. Your coordinator will assign you a mentor directly.
          </span>
        </div>
      )}

      {message && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <FiCheckCircle className="mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-4">
        <div className="flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-800/50 px-3">
          <FiSearch className="flex-shrink-0 text-slate-500" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, department, designation..."
            className="h-12 w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-slate-400">
          Loading mentors...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                  {mentor.name
                    ?.split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("") || "M"}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold text-white">
                    {mentor.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {mentor.designation || "Faculty Mentor"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {mentor.department || "Data Science"}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-3">
                  <p className="text-xs text-slate-500">Open Slots</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    {mentor.openSlots ?? 0}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-3">
                  <p className="text-xs text-slate-500">Qualification</p>
                  <p className="mt-1 truncate text-sm font-medium text-slate-200">
                    {mentor.qualification || "Faculty"}
                  </p>
                </div>
              </div>

              {Array.isArray(mentor.tags) && mentor.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <button
                disabled={!connectEnabled || busyId === mentor.id || requested[mentor.id]}
                onClick={() => sendRequest(mentor.id)}
                className={`
                  mt-5 flex w-full items-center justify-center gap-2
                  rounded-xl px-4 py-3 text-sm font-semibold transition
                  ${
                    requested[mentor.id]
                      ? "cursor-not-allowed bg-amber-500/10 text-amber-300"
                      : "bg-violet-600 text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                  }
                `}
              >
                {requested[mentor.id] ? (
                  <>
                    <FiCheckCircle />
                    Request Sent
                  </>
                ) : (
                  <>
                    <FiSend />
                    {busyId === mentor.id ? "Sending..." : "Send Request"}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredMentors.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6 text-center text-sm text-slate-500">
          No mentors found for your search.
        </div>
      )}
    </div>
  );
}

export default FindMentorMentee;
