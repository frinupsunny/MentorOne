import { useMemo, useState } from "react";
import {
  FiStar,
  FiSearch,
  FiUser,
  FiMessageSquare,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiEdit3,
  FiX,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";

function Feedback() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showCoordinatorForm, setShowCoordinatorForm] =
    useState(false);
  const [coordinatorFeedback, setCoordinatorFeedback] =
    useState("");
  const [submitted, setSubmitted] = useState(false);

  /* =====================================================
     FEEDBACK DATA
  ===================================================== */

  const mentorFeedback = [
    {
      id: 1,
      mentor: "Dr. Ramesh Kumar",
      initials: "RK",
      department: "Data Science",
      mentees: 5,
      average: 4.8,
      responses: 5,
      categories: {
        availability: 4.9,
        communication: 4.7,
        academicGuidance: 4.8,
        sessionRegularity: 4.8,
      },
      feedback: [
        {
          name: "Jasmine A",
          rating: 5,
          date: "23 July 2026",
          comment:
            "Dr. Ramesh is very supportive and gives clear guidance whenever I have academic doubts.",
        },
        {
          name: "Rahul Kumar",
          rating: 5,
          date: "21 July 2026",
          comment:
            "The mentoring sessions are useful and the mentor is always available when needed.",
        },
        {
          name: "Ananya S",
          rating: 4,
          date: "20 July 2026",
          comment:
            "Good mentoring experience. The sessions helped me understand my academic goals better.",
        },
      ],
    },

    {
      id: 2,
      mentor: "Dr. Meena S",
      initials: "MS",
      department: "Data Science",
      mentees: 15,
      average: 4.6,
      responses: 8,
      categories: {
        availability: 4.7,
        communication: 4.6,
        academicGuidance: 4.5,
        sessionRegularity: 4.6,
      },
      feedback: [
        {
          name: "Rahul Kumar",
          rating: 5,
          date: "22 July 2026",
          comment:
            "Very approachable mentor and always willing to listen to concerns.",
        },
        {
          name: "Akhil Thomas",
          rating: 4,
          date: "19 July 2026",
          comment:
            "The sessions are informative and help with planning academic activities.",
        },
      ],
    },

    {
      id: 3,
      mentor: "Dr. Anitha Joseph",
      initials: "AJ",
      department: "Computer Science",
      mentees: 10,
      average: 4.2,
      responses: 6,
      categories: {
        availability: 4.3,
        communication: 4.2,
        academicGuidance: 4.4,
        sessionRegularity: 3.9,
      },
      feedback: [
        {
          name: "Ananya S",
          rating: 4,
          date: "18 July 2026",
          comment:
            "Helpful mentor with good academic guidance.",
        },
        {
          name: "Arjun P",
          rating: 4,
          date: "16 July 2026",
          comment:
            "The mentor provides useful suggestions for improving academic performance.",
        },
      ],
    },

    {
      id: 4,
      mentor: "Dr. Arun Mathew",
      initials: "AM",
      department: "Computer Science",
      mentees: 8,
      average: 3.9,
      responses: 4,
      categories: {
        availability: 3.8,
        communication: 4.0,
        academicGuidance: 4.1,
        sessionRegularity: 3.7,
      },
      feedback: [
        {
          name: "Arjun P",
          rating: 4,
          date: "14 July 2026",
          comment:
            "Good academic guidance and helpful suggestions.",
        },
        {
          name: "Sanjay K",
          rating: 3,
          date: "12 July 2026",
          comment:
            "The sessions are useful, but more frequent meetings would be helpful.",
        },
      ],
    },
  ];

  /* =====================================================
     SEARCH + FILTER
  ===================================================== */

  const filteredMentors = useMemo(() => {
    const query = search.toLowerCase().trim();

    return mentorFeedback.filter((mentor) => {
      const matchesSearch =
        mentor.mentor.toLowerCase().includes(query) ||
        mentor.department.toLowerCase().includes(query) ||
        mentor.feedback.some(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.comment.toLowerCase().includes(query)
        );

      let matchesRating = true;

      if (ratingFilter === "4+") {
        matchesRating = mentor.average >= 4;
      }

      if (ratingFilter === "Below 4") {
        matchesRating = mentor.average < 4;
      }

      if (ratingFilter === "5") {
        matchesRating = mentor.average === 5;
      }

      return matchesSearch && matchesRating;
    });
  }, [search, ratingFilter]);

  /* =====================================================
     SUMMARY
  ===================================================== */

  const overallRating =
    mentorFeedback.reduce(
      (total, mentor) => total + mentor.average,
      0
    ) / mentorFeedback.length;

  const totalResponses = mentorFeedback.reduce(
    (total, mentor) => total + mentor.responses,
    0
  );

  /* =====================================================
     HELPERS
  ===================================================== */

  const toggleMentor = (id) => {
    setExpandedId((current) =>
      current === id ? null : id
    );
  };

  const getRatingClass = (rating) => {
    if (rating >= 4.5) {
      return "text-emerald-400";
    }

    if (rating >= 4) {
      return "text-indigo-400";
    }

    if (rating >= 3) {
      return "text-orange-400";
    }

    return "text-red-400";
  };

  const getProgressWidth = (rating) => {
    return `${(rating / 5) * 100}%`;
  };

  const renderStars = (rating, size = "text-sm") => {
    return (
      <div className={`flex items-center gap-0.5 ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= Math.round(rating)
                ? "text-amber-400"
                : "text-slate-700"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  /* =====================================================
     SUBMIT COORDINATOR FEEDBACK
  ===================================================== */

  const submitCoordinatorFeedback = () => {
    if (!coordinatorFeedback.trim()) {
      return;
    }

    setSubmitted(true);
    setCoordinatorFeedback("");
  };

  return (
    <div className="min-h-full bg-[#080C14] p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="mb-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Coordinator</span>
              <span>→</span>
              <span className="text-slate-300">
                Feedback
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
              Feedback
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              View mentee feedback on mentors and provide coordinator feedback.
            </p>

          </div>


          <button
            onClick={() =>
              setShowCoordinatorForm(true)
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
          >
            <FiEdit3 size={16} />
            Give Coordinator Feedback
          </button>

        </div>

      </section>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={<FiStar />}
            title="Overall Rating"
            value={overallRating.toFixed(1)}
            description="Average mentor rating"
            iconClass="bg-amber-500/10 text-amber-400"
            extra={renderStars(overallRating)}
          />

          <SummaryCard
            icon={<FiMessageSquare />}
            title="Responses"
            value={totalResponses}
            description="Mentee feedback responses"
            iconClass="bg-indigo-500/10 text-indigo-400"
          />

          <SummaryCard
            icon={<FiUser />}
            title="Mentors Reviewed"
            value={mentorFeedback.length}
            description="Mentors with feedback"
            iconClass="bg-purple-500/10 text-purple-400"
          />

        </div>

      </section>


      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-xl">

            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search mentor, mentee or feedback..."
              className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-11 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />

          </div>


          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
            className="h-11 rounded-xl border border-slate-800 bg-slate-900/60 px-4 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
          >
            <option value="All">All Ratings</option>
            <option value="5">5 Star</option>
            <option value="4+">4+ Rating</option>
            <option value="Below 4">
              Below 4
            </option>
          </select>

        </div>

      </section>


      {/* =====================================================
          MENTOR FEEDBACK
      ===================================================== */}

      <section className="mt-6">

        <div className="mb-4">

          <h2 className="font-semibold text-white">
            Mentor Feedback
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Mentee feedback and rating summaries for each mentor.
          </p>

        </div>


        <div className="space-y-4">

          {filteredMentors.map((mentor) => {

            const expanded =
              expandedId === mentor.id;

            return (
              <div
                key={mentor.id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1422]"
              >

                {/* =================================================
                    MENTOR HEADER
                ================================================= */}

                <button
                  onClick={() =>
                    toggleMentor(mentor.id)
                  }
                  className="w-full p-5 text-left"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* Mentor */}
                    <div className="flex min-w-0 flex-1 items-center gap-4">

                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 font-bold text-indigo-400">
                        {mentor.initials}
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-semibold text-white">
                          {mentor.mentor}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {mentor.department}
                        </p>

                        <div className="mt-2 flex items-center gap-2">

                          {renderStars(
                            mentor.average,
                            "text-xs"
                          )}

                          <span
                            className={`text-xs font-semibold ${getRatingClass(
                              mentor.average
                            )}`}
                          >
                            {mentor.average.toFixed(1)}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[420px]">

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-600">
                          Mentees
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          {mentor.mentees}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-600">
                          Responses
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          {mentor.responses}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-600">
                          Average
                        </p>

                        <p
                          className={`mt-1 text-sm font-semibold ${getRatingClass(
                            mentor.average
                          )}`}
                        >
                          {mentor.average}/5
                        </p>
                      </div>

                    </div>


                    {/* Expand */}
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-slate-500">

                      {expanded ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}

                    </div>

                  </div>

                </button>


                {/* =================================================
                    EXPANDED CONTENT
                ================================================= */}

                {expanded && (

                  <div className="border-t border-slate-800 p-5">

                    {/* Category Ratings */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">

                        <div className="mb-4 flex items-center justify-between">

                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              Overall Feedback Summary
                            </h4>

                            <p className="mt-1 text-xs text-slate-500">
                              Based on {mentor.responses} mentee responses
                            </p>
                          </div>

                          <div className="text-right">

                            <p
                              className={`text-3xl font-bold ${getRatingClass(
                                mentor.average
                              )}`}
                            >
                              {mentor.average}
                            </p>

                            {renderStars(
                              mentor.average,
                              "text-sm"
                            )}

                          </div>

                        </div>


                        <div className="space-y-4">

                          <RatingBar
                            label="Availability"
                            rating={
                              mentor.categories
                                .availability
                            }
                            getProgressWidth={
                              getProgressWidth
                            }
                          />

                          <RatingBar
                            label="Communication"
                            rating={
                              mentor.categories
                                .communication
                            }
                            getProgressWidth={
                              getProgressWidth
                            }
                          />

                          <RatingBar
                            label="Academic Guidance"
                            rating={
                              mentor.categories
                                .academicGuidance
                            }
                            getProgressWidth={
                              getProgressWidth
                            }
                          />

                          <RatingBar
                            label="Session Regularity"
                            rating={
                              mentor.categories
                                .sessionRegularity
                            }
                            getProgressWidth={
                              getProgressWidth
                            }
                          />

                        </div>

                      </div>


                      {/* Feedback Count */}
                      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">

                        <h4 className="text-sm font-semibold text-white">
                          Rating Overview
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          Feedback distribution
                        </p>

                        <div className="mt-5 space-y-3">

                          <RatingDistribution
                            label="5 Star"
                            percentage={
                              mentor.average >= 4.5
                                ? 80
                                : mentor.average >= 4
                                ? 60
                                : 30
                            }
                          />

                          <RatingDistribution
                            label="4 Star"
                            percentage={
                              mentor.average >= 4
                                ? 25
                                : 35
                            }
                          />

                          <RatingDistribution
                            label="3 Star"
                            percentage={
                              mentor.average < 4
                                ? 25
                                : 5
                            }
                          />

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        INDIVIDUAL FEEDBACK
                    ================================================= */}

                    <div className="mt-5">

                      <div className="mb-3 flex items-center justify-between">

                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            Mentee Feedback
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            Individual responses
                          </p>
                        </div>

                        <FiMessageSquare className="text-indigo-400" />

                      </div>


                      <div className="space-y-3">

                        {mentor.feedback.map(
                          (item, index) => (

                            <button
                              key={index}
                              onClick={() =>
                                setSelectedFeedback({
                                  ...item,
                                  mentor:
                                    mentor.mentor,
                                })
                              }
                              className="w-full rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-left transition hover:border-indigo-500/30 hover:bg-slate-900/60"
                            >

                              <div className="flex items-start gap-3">

                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400">
                                  {item.name
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word[0]
                                    )
                                    .slice(0, 2)
                                    .join("")}
                                </div>

                                <div className="min-w-0 flex-1">

                                  <div className="flex items-start justify-between gap-3">

                                    <div>

                                      <p className="text-sm font-medium text-slate-200">
                                        {item.name}
                                      </p>

                                      <div className="mt-1">
                                        {renderStars(
                                          item.rating,
                                          "text-xs"
                                        )}
                                      </div>

                                    </div>

                                    <span className="flex-shrink-0 text-[10px] text-slate-600">
                                      {item.date}
                                    </span>

                                  </div>

                                  <p className="mt-2 text-xs leading-5 text-slate-500">
                                    {item.comment}
                                  </p>

                                </div>

                              </div>

                            </button>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                )}

              </div>
            );
          })}

        </div>


        {/* Empty */}
        {filteredMentors.length === 0 && (

          <div className="rounded-2xl border border-slate-800 bg-[#0D1422] px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
              <FiStar size={22} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No feedback found
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or rating filter.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          COORDINATOR FEEDBACK MODAL
      ===================================================== */}

      {showCoordinatorForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1422] shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-800 p-5">

              <div>

                <h2 className="font-semibold text-white">
                  Coordinator Feedback
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Provide feedback for the mentoring team.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowCoordinatorForm(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>


            <div className="p-5">

              {submitted ? (

                <div className="py-8 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                    <FiCheckCircle size={25} />
                  </div>

                  <h3 className="mt-4 font-semibold text-white">
                    Feedback Submitted
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Your coordinator feedback has been recorded.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setShowCoordinatorForm(false);
                    }}
                    className="mt-5 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-600"
                  >
                    Done
                  </button>

                </div>

              ) : (

                <>

                  <label className="text-xs font-medium text-slate-400">
                    Feedback
                  </label>

                  <textarea
                    value={coordinatorFeedback}
                    onChange={(e) =>
                      setCoordinatorFeedback(
                        e.target.value
                      )
                    }
                    rows={6}
                    placeholder="Write your feedback about mentoring activities..."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
                  />

                  <button
                    onClick={submitCoordinatorFeedback}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-600"
                  >
                    <FiSend size={16} />
                    Submit Feedback
                  </button>

                </>

              )}

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          INDIVIDUAL FEEDBACK MODAL
      ===================================================== */}

      {selectedFeedback && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1422] shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 p-5">

              <div>

                <p className="text-xs text-indigo-400">
                  Mentee Feedback
                </p>

                <h2 className="mt-1 font-semibold text-white">
                  {selectedFeedback.mentor}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedFeedback(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <FiX />
              </button>

            </div>


            <div className="space-y-5 p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 font-bold text-indigo-400">
                  {selectedFeedback.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div>

                  <p className="text-sm font-semibold text-white">
                    {selectedFeedback.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    {renderStars(
                      selectedFeedback.rating
                    )}

                    <span className="text-xs text-slate-500">
                      {selectedFeedback.rating}/5
                    </span>
                  </div>

                </div>

              </div>


              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">

                <p className="text-sm leading-7 text-slate-400">
                  "{selectedFeedback.comment}"
                </p>

              </div>


              <div className="flex items-center gap-2 text-xs text-slate-500">

                <FiCalendar />

                <span>
                  Submitted on {selectedFeedback.date}
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
  description,
  iconClass,
  extra,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

          {extra && (
            <div className="mt-1">
              {extra}
            </div>
          )}

          <p className="mt-1 text-[11px] text-slate-500">
            {description}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   RATING BAR
========================================================= */

function RatingBar({
  label,
  rating,
  getProgressWidth,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs text-slate-400">
          {label}
        </span>

        <span className="text-xs font-semibold text-slate-300">
          {rating}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-amber-400 transition-all"
          style={{
            width: getProgressWidth(rating),
          }}
        />

      </div>

    </div>
  );
}


/* =========================================================
   RATING DISTRIBUTION
========================================================= */

function RatingDistribution({
  label,
  percentage,
}) {
  return (
    <div className="flex items-center gap-3">

      <span className="w-14 text-xs text-slate-500">
        {label}
      </span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-amber-400"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <span className="w-10 text-right text-xs text-slate-500">
        {percentage}%
      </span>

    </div>
  );
}

export default Feedback;