import { useEffect, useMemo, useState } from "react";
import {
  FiStar,
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { menteeApi, getApiError } from "./menteeApi";

function Feedback() {
  const [history, setHistory] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [ratings, setRatings] = useState({
    availability: 0,
    communication: 0,
    guidance: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");

      const [feedbackRes, sessionsRes] = await Promise.all([
        menteeApi.get("/api/mentee/feedback"),
        menteeApi.get("/api/mentee/sessions"),
      ]);

      setHistory(feedbackRes.data || []);
      setSessions(sessionsRes.data || []);
    } catch (err) {
      setError(getApiError(err, "Unable to load feedback."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const completedSessions = useMemo(
    () => sessions.filter((session) => session.status === "completed"),
    [sessions]
  );

  const setRating = (field, value) => {
    setRatings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submitFeedback = async (event) => {
    event.preventDefault();

    const values = Object.values(ratings);

    if (values.some((value) => value < 1)) {
      setError("Please give all four ratings before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const response = await menteeApi.post(
        "/api/mentee/feedback",
        {
          sessionId: selectedSessionId || null,
          ratings,
          comment: comment.trim(),
        }
      );

      setHistory((current) => [...current, response.data.entry]);
      setMessage("Feedback submitted successfully.");

      setSelectedSessionId("");
      setRatings({
        availability: 0,
        communication: 0,
        guidance: 0,
        overall: 0,
      });
      setComment("");
    } catch (err) {
      setError(getApiError(err, "Unable to submit feedback."));
    } finally {
      setSubmitting(false);
    }
  };

  const RatingRow = ({ label, field }) => (
    <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-300">
          {label}
        </p>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(field, value)}
              className={`text-xl transition ${
                value <= ratings[field]
                  ? "text-amber-400"
                  : "text-slate-700 hover:text-slate-500"
              }`}
              aria-label={`${value} star`}
            >
              <FiStar
                className={
                  value <= ratings[field]
                    ? "fill-current"
                    : ""
                }
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Mentee Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Feedback
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Share your experience with your mentor and mentoring sessions.
        </p>
      </div>

      {message && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <FiCheckCircle className="mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Give Feedback
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Rate your mentoring experience across the key areas.
            </p>
          </div>

          {loading ? (
            <div className="text-sm text-slate-400">
              Loading...
            </div>
          ) : (
            <form onSubmit={submitFeedback} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Session
                </label>

                <select
                  value={selectedSessionId}
                  onChange={(event) =>
                    setSelectedSessionId(event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                >
                  <option value="">
                    General mentor feedback
                  </option>

                  {completedSessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {(session.title || "Mentoring Session") +
                        " — " +
                        (session.date || "No date")}
                    </option>
                  ))}
                </select>
              </div>

              <RatingRow
                label="Availability"
                field="availability"
              />

              <RatingRow
                label="Communication"
                field="communication"
              />

              <RatingRow
                label="Guidance"
                field="guidance"
              />

              <RatingRow
                label="Overall experience"
                field="overall"
              />

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Comment
                </label>

                <textarea
                  rows={5}
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  placeholder="Tell us about your mentoring experience..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-800"
              >
                <FiSend />
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Previous Feedback
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Feedback you have already submitted.
            </p>
          </div>

          {history.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-[#0B111D] p-4 text-sm text-slate-500">
              No feedback submissions yet.
            </div>
          ) : (
            <div className="space-y-4">
              {history
                .slice()
                .reverse()
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-slate-800 bg-[#0B111D] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">
                        Overall
                      </p>

                      <div className="flex items-center gap-1 text-amber-400">
                        <FiStar className="fill-current" />
                        <span className="text-sm font-semibold">
                          {entry.ratings?.overall || 0}/5
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {entry.comment || "No comment provided."}
                    </p>

                    <p className="mt-3 text-xs text-slate-600">
                      {entry.date
                        ? new Date(entry.date).toLocaleString()
                        : "Recently submitted"}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Feedback;
