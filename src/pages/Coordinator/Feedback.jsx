import { useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiX,
  FiEye,
} from "react-icons/fi";

const initialFeedback = [
  {
    id: 1,
    mentee: "Jasmine A",
    mentor: "Dr. Anitha",
    rating: 5,
    category: "Mentor Support",
    comment:
      "The mentor provides clear guidance and is always available when I need help.",
    date: "16 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 2,
    mentee: "Frinu P",
    mentor: "Dr. Ramesh",
    rating: 4,
    category: "Session Quality",
    comment:
      "The sessions are useful and well structured. I would like slightly more frequent meetings.",
    date: "15 Aug 2026",
    status: "Pending",
  },
  {
    id: 3,
    mentee: "Sanjay K",
    mentor: "Dr. Sunita",
    rating: 3,
    category: "Communication",
    comment:
      "The sessions are helpful, but communication between sessions could be improved.",
    date: "14 Aug 2026",
    status: "Pending",
  },
  {
    id: 4,
    mentee: "Akhil T",
    mentor: "Mr. Arun",
    rating: 5,
    category: "Mentor Support",
    comment:
      "Very supportive mentor. The feedback and suggestions have helped me improve.",
    date: "13 Aug 2026",
    status: "Reviewed",
  },
  {
    id: 5,
    mentee: "Megha S",
    mentor: "Dr. Vivek",
    rating: 4,
    category: "Session Quality",
    comment:
      "Good mentoring sessions with practical suggestions for academic improvement.",
    date: "12 Aug 2026",
    status: "Reviewed",
  },
];

function Feedback() {
  const [feedback, setFeedback] =
    useState(initialFeedback);

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedFeedback, setSelectedFeedback] =
    useState(null);

  const [message, setMessage] = useState("");

  /* ================================
     COUNTS
  ================================= */

  const totalFeedback = feedback.length;

  const pendingCount = feedback.filter(
    (item) => item.status === "Pending"
  ).length;

  const reviewedCount = feedback.filter(
    (item) => item.status === "Reviewed"
  ).length;

  const averageRating =
    feedback.length > 0
      ? (
          feedback.reduce(
            (total, item) => total + item.rating,
            0
          ) / feedback.length
        ).toFixed(1)
      : "0.0";

  /* ================================
     FILTER
  ================================= */

  const filteredFeedback = useMemo(() => {
    return feedback.filter((item) => {
      const searchMatch =
        item.mentee
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.mentor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.comment
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const ratingMatch =
        ratingFilter === "All" ||
        item.rating === Number(ratingFilter);

      const statusMatch =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        searchMatch &&
        ratingMatch &&
        statusMatch
      );
    });
  }, [
    feedback,
    search,
    ratingFilter,
    statusFilter,
  ]);

  /* ================================
     MARK AS REVIEWED
  ================================= */

  const markAsReviewed = (id) => {
    setFeedback((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Reviewed",
            }
          : item
      )
    );

    setSelectedFeedback(null);
    setMessage("Feedback marked as reviewed.");
  };

  /* ================================
     CLEAR FILTERS
  ================================= */

  const clearFilters = () => {
    setSearch("");
    setRatingFilter("All");
    setStatusFilter("All");
  };

  /* ================================
     STAR COMPONENT
  ================================= */

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`text-sm ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-700"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Feedback
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Review feedback from mentors and mentees
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
            showFilters
              ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
              : "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-700 hover:text-white"
          }`}
        >
          <FiFilter />

          Filters
        </button>

      </div>

      {/* =================================
          SUCCESS MESSAGE
      ================================= */}

      {message && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400">

          <FiCheckCircle />

          <p className="text-xs">
            {message}
          </p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="ml-auto"
          >
            <FiX />
          </button>

        </div>
      )}

      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Feedback
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalFeedback}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                All submissions
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiMessageSquare />
            </div>

          </div>

        </div>

        {/* AVERAGE */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Average Rating
              </p>

              <div className="mt-2 flex items-center gap-2">
                <p className="text-2xl font-semibold text-white">
                  {averageRating}
                </p>

                <FiStar className="fill-amber-400 text-amber-400" />
              </div>

              <p className="mt-1 text-[11px] text-amber-400">
                Out of 5.0
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiStar />
            </div>

          </div>

        </div>

        {/* PENDING */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Pending Review
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {pendingCount}
              </p>

              <p className="mt-1 text-[11px] text-amber-400">
                Needs attention
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <FiClock />
            </div>

          </div>

        </div>

        {/* REVIEWED */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Reviewed
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {reviewedCount}
              </p>

              <p className="mt-1 text-[11px] text-emerald-400">
                Completed
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiCheckCircle />
            </div>

          </div>

        </div>

      </div>

      {/* =================================
          FEEDBACK LIST
      ================================= */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

        {/* LIST HEADER */}

        <div className="border-b border-slate-800 px-5 py-4">

          <div className="flex flex-col gap-4">

            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Feedback
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Feedback submitted by mentees about their mentoring experience
              </p>
            </div>

            {/* SEARCH */}

            <div className="relative">

              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search mentor, mentee or feedback..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950/50 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
              />

            </div>

            {/* FILTER PANEL */}

            {showFilters && (
              <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-800 bg-slate-950/30 p-4 md:grid-cols-3">

                {/* RATING */}

                <div>

                  <label className="mb-2 block text-[11px] font-medium text-slate-500">
                    Rating
                  </label>

                  <select
                    value={ratingFilter}
                    onChange={(e) =>
                      setRatingFilter(
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                  >
                    <option value="All">
                      All Ratings
                    </option>

                    <option value="5">
                      5 Stars
                    </option>

                    <option value="4">
                      4 Stars
                    </option>

                    <option value="3">
                      3 Stars
                    </option>

                    <option value="2">
                      2 Stars
                    </option>

                    <option value="1">
                      1 Star
                    </option>
                  </select>

                </div>

                {/* STATUS */}

                <div>

                  <label className="mb-2 block text-[11px] font-medium text-slate-500">
                    Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                  >
                    <option value="All">
                      All Statuses
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Reviewed">
                      Reviewed
                    </option>
                  </select>

                </div>

                {/* CLEAR */}

                <div className="flex items-end">

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-700 hover:text-white"
                  >
                    Clear Filters
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* =================================
            ITEMS
        ================================= */}

        {filteredFeedback.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredFeedback.map((item) => (

              <div
                key={item.id}
                className="p-5 transition hover:bg-slate-800/20"
              >

                <div className="flex flex-col gap-4">

                  {/* PERSON */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
                        {item.mentee
                          .split(" ")
                          .map(
                            (word) =>
                              word[0]
                          )
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-medium text-white">
                            {item.mentee}
                          </h3>

                          <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[9px] text-slate-500">
                            Mentee
                          </span>

                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          Mentor:{" "}
                          <span className="text-slate-400">
                            {item.mentor}
                          </span>
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <RatingStars
                        rating={item.rating}
                      />

                      <span className="text-xs font-medium text-slate-400">
                        {item.rating}.0
                      </span>

                    </div>

                  </div>

                  {/* COMMENT */}

                  <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                    <div className="flex items-start gap-3">

                      <FiMessageSquare className="mt-0.5 shrink-0 text-slate-600" />

                      <p className="text-sm leading-6 text-slate-300">
                        {item.comment}
                      </p>

                    </div>

                  </div>

                  {/* BOTTOM */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
                        {item.category}
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                          item.status ===
                          "Pending"
                            ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-[11px] text-slate-600">
                        {item.date}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFeedback(
                            item
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-2 text-[10px] font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                      >
                        <FiEye />

                        View
                      </button>

                      {item.status ===
                        "Pending" && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsReviewed(
                              item.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[10px] font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                        >
                          <FiCheckCircle />

                          Review
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-500">
              <FiMessageSquare className="text-2xl" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-white">
              No feedback found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

      {/* =================================
          DETAILS MODAL
      ================================= */}

      {selectedFeedback && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1220] shadow-2xl">

            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Feedback Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Submitted on{" "}
                  {selectedFeedback.date}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedFeedback(null)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* CONTENT */}

            <div className="space-y-5 p-5">

              {/* PEOPLE */}

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
                  {selectedFeedback.mentee
                    .split(" ")
                    .map(
                      (word) => word[0]
                    )
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    {selectedFeedback.mentee}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Mentor:{" "}
                    <span className="text-slate-400">
                      {selectedFeedback.mentor}
                    </span>
                  </p>

                </div>

              </div>

              {/* RATING */}

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <p className="mb-2 text-[11px] text-slate-600">
                  Rating
                </p>

                <div className="flex items-center gap-3">

                  <RatingStars
                    rating={
                      selectedFeedback.rating
                    }
                  />

                  <span className="text-sm font-semibold text-white">
                    {selectedFeedback.rating}
                    .0 / 5.0
                  </span>

                </div>

              </div>

              {/* CATEGORY */}

              <div className="flex flex-wrap gap-2">

                <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
                  {selectedFeedback.category}
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                    selectedFeedback.status ===
                    "Pending"
                      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {selectedFeedback.status}
                </span>

              </div>

              {/* COMMENT */}

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                <p className="mb-2 text-[11px] text-slate-600">
                  Feedback
                </p>

                <p className="text-sm leading-6 text-slate-300">
                  {selectedFeedback.comment}
                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedFeedback(null)
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Close
                </button>

                {selectedFeedback.status ===
                  "Pending" && (
                  <button
                    type="button"
                    onClick={() =>
                      markAsReviewed(
                        selectedFeedback.id
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                  >
                    <FiCheckCircle />

                    Mark as Reviewed
                  </button>
                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Feedback;