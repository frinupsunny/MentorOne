import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiTrendingUp,
  FiPlus,
} from "react-icons/fi";

const API_BASE_URL = "http://localhost:4000";

function MentorFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [coordinatorFeedback, setCoordinatorFeedback] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [showRequestMessage, setShowRequestMessage] =
    useState(false);

  const token = localStorage.getItem("mentorOneToken");

  const formatDate = (value) => {
    if (!value) {
      return "Date not available";
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

  const getFeedbackText = (item) => {
    return (
      item?.feedback ||
      item?.comment ||
      item?.message ||
      item?.text ||
      item?.remarks ||
      "No feedback comment available."
    );
  };

  const getRating = (item) => {
    const rating =
      item?.rating ??
      item?.stars ??
      item?.score ??
      0;

    const numericRating = Number(rating);

    if (Number.isNaN(numericRating)) {
      return 0;
    }

    return Math.max(0, Math.min(5, numericRating));
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `${API_BASE_URL}/api/mentor/feedback`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data || {};

        const entries = Array.isArray(data)
          ? data
          : Array.isArray(data?.entries)
          ? data.entries
          : Array.isArray(data?.feedback)
          ? data.feedback
          : [];

        const coordinatorEntries =
          Array.isArray(data?.coordinatorFeedback)
            ? data.coordinatorFeedback
            : [];

        setFeedbacks(entries);
        setCoordinatorFeedback(
          coordinatorEntries
        );
      } catch (error) {
        console.error(
          "Error loading feedback:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("mentorOneToken");
          localStorage.removeItem("mentorOneRole");
          localStorage.removeItem("mentorOneUser");

          alert(
            "Session expired. Please login again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [token]);

  const normalizedFeedbacks = useMemo(() => {
    return feedbacks.map((item, index) => ({
      ...item,

      id:
        item?.id ||
        item?._id ||
        `feedback-${index}`,

      name:
        item?.name ||
        item?.menteeName ||
        item?.studentName ||
        item?.mentee ||
        "Mentee",

      department:
        item?.department ||
        item?.programme ||
        item?.program ||
        "Not specified",

      rating: getRating(item),

      feedback: getFeedbackText(item),

      date: formatDate(
        item?.date ||
          item?.createdAt ||
          item?.created_at ||
          item?.timestamp
      ),
    }));
  }, [feedbacks]);

  const totalFeedback = normalizedFeedbacks.length;

  const averageRating =
    totalFeedback > 0
      ? normalizedFeedbacks.reduce(
          (total, item) =>
            total + item.rating,
          0
        ) / totalFeedback
      : 0;

  const uniqueRespondents = new Set(
    normalizedFeedbacks.map(
      (item) =>
        item?.menteeId ||
        item?.registerNo ||
        item?.name
    )
  ).size;

  const positiveFeedbackCount =
    normalizedFeedbacks.filter(
      (item) => item.rating >= 4
    ).length;

  const positivePercentage =
    totalFeedback > 0
      ? Math.round(
          (positiveFeedbackCount /
            totalFeedback) *
            100
        )
      : 0;

  const ratingCounts = {
    5: normalizedFeedbacks.filter(
      (item) => item.rating === 5
    ).length,

    4: normalizedFeedbacks.filter(
      (item) => item.rating === 4
    ).length,

    3: normalizedFeedbacks.filter(
      (item) => item.rating === 3
    ).length,

    2: normalizedFeedbacks.filter(
      (item) => item.rating === 2
    ).length,

    1: normalizedFeedbacks.filter(
      (item) => item.rating === 1
    ).length,
  };

  const ratingPercentages = {
    5:
      totalFeedback > 0
        ? Math.round(
            (ratingCounts[5] /
              totalFeedback) *
              100
          )
        : 0,

    4:
      totalFeedback > 0
        ? Math.round(
            (ratingCounts[4] /
              totalFeedback) *
              100
          )
        : 0,

    3:
      totalFeedback > 0
        ? Math.round(
            (ratingCounts[3] /
              totalFeedback) *
              100
          )
        : 0,

    2:
      totalFeedback > 0
        ? Math.round(
            (ratingCounts[2] /
              totalFeedback) *
              100
          )
        : 0,

    1:
      totalFeedback > 0
        ? Math.round(
            (ratingCounts[1] /
              totalFeedback) *
              100
          )
        : 0,
  };

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-blue-400">
            MentorOne / Communication
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Feedback
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Review feedback received from your mentees.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowRequestMessage(true)
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
        >
          <FiPlus />
          Request Feedback
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FiMessageSquare className="text-xl text-blue-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : totalFeedback}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Total Feedback
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <FiStar className="text-xl text-amber-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : averageRating.toFixed(1)}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Average Rating
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
            <FiUsers className="text-xl text-purple-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : uniqueRespondents}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Mentees Responded
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiTrendingUp className="text-xl text-emerald-400" />
          </div>

          <p className="text-3xl font-bold">
            {loading
              ? "..."
              : `${positivePercentage}%`}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Positive Feedback
          </p>
        </div>
      </div>

      {/* RATING OVERVIEW */}
      <div className="mb-8 rounded-2xl border border-slate-800 bg-[#0D1220] p-6">
        <h2 className="text-lg font-semibold">
          Feedback Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall rating based on mentee responses.
        </p>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="text-center md:w-40">
            <p className="text-5xl font-bold text-white">
              {loading
                ? "..."
                : averageRating.toFixed(1)}
            </p>

            <div className="mt-2 flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <FiStar
                    key={star}
                    className={
                      star <=
                      Math.round(
                        averageRating
                      )
                        ? "fill-current"
                        : "text-slate-700"
                    }
                  />
                )
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Based on {totalFeedback} responses
            </p>
          </div>

          <div className="flex-1 space-y-4">
            {[
              {
                label: "5 Stars",
                value: ratingPercentages[5],
              },
              {
                label: "4 Stars",
                value: ratingPercentages[4],
              },
              {
                label: "3 Stars",
                value: ratingPercentages[3],
              },
              {
                label: "2 Stars",
                value: ratingPercentages[2],
              },
              {
                label: "1 Star",
                value: ratingPercentages[1],
              },
            ].map((rating) => (
              <div
                key={rating.label}
                className="flex items-center gap-3"
              >
                <span className="w-14 text-xs text-slate-500">
                  {rating.label}
                </span>

                <div className="h-2 flex-1 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    style={{
                      width: `${rating.value}%`,
                    }}
                  />
                </div>

                <span className="w-10 text-right text-xs text-slate-500">
                  {rating.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COORDINATOR FEEDBACK */}
      {coordinatorFeedback.length > 0 && (
        <div className="mb-8 rounded-2xl border border-slate-800 bg-[#0D1220] p-6">
          <h2 className="text-lg font-semibold">
            Coordinator Feedback
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Feedback shared by the programme coordinator.
          </p>

          <div className="mt-5 space-y-3">
            {coordinatorFeedback.map(
              (item, index) => (
                <div
                  key={
                    item?.id ||
                    item?._id ||
                    index
                  }
                  className="rounded-xl border border-slate-800 bg-[#080C14] p-4"
                >
                  <p className="text-sm leading-6 text-slate-300">
                    {getFeedbackText(item)}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {formatDate(
                      item?.date ||
                        item?.createdAt ||
                        item?.created_at
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* FEEDBACK LIST */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Recent Feedback
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Feedback shared by your mentees.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] px-6 py-12 text-center text-sm text-slate-500">
            Loading feedback...
          </div>
        ) : normalizedFeedbacks.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-[#0D1220] px-6 py-12 text-center text-sm text-slate-500">
            No feedback has been received yet.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {normalizedFeedbacks.map(
              (feedback) => (
                <div
                  key={feedback.id}
                  className="rounded-2xl border border-slate-800 bg-[#0D1220] p-5 transition hover:border-blue-500/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold">
                        {feedback.name
                          .split(" ")
                          .map(
                            (name) =>
                              name[0]
                          )
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {feedback.name}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {feedback.department}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-500">
                      {feedback.date}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-1">
                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <FiStar
                          key={star}
                          className={
                            star <=
                            feedback.rating
                              ? "fill-current text-amber-400"
                              : "text-slate-700"
                          }
                        />
                      )
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    “{feedback.feedback}”
                  </p>

                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <span className="text-xs text-emerald-400">
                      Feedback received
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* REQUEST FEEDBACK MESSAGE */}
      {showRequestMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#101624] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Request Feedback
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowRequestMessage(false)
                }
                className="text-xl text-slate-500 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              The current backend supports viewing mentor
              feedback, but it does not provide an endpoint for
              sending feedback requests.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setShowRequestMessage(false)
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

export default MentorFeedback;